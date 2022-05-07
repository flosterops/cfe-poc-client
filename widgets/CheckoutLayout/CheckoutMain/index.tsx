import React, { ReactElement, useState } from 'react';
import { Layout, Row } from 'ui/Layout';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { constants } from 'helpers/constants';
import { AlignItemsTypes } from 'helpers/enums';
import { ChoseMethod } from './ChoseMethod';
import { Review } from './Review';
import { CheckoutProgress } from 'widgets/CheckoutLayout/common/CheckoutProgress';
import { purchaseProduct, PurchaseResult } from 'requests/purchase-product';
import { useRouter } from 'next/router';
import { cartToPurchaseItem, IPurchaseItem } from 'models/purchaseItem';
import { CartData, CartItem } from 'models/CartItem';
import { PaymentMethodsList } from 'requests/get-payment-methods';
import { SelectedMethod } from 'models/purchase/SelectedMethod';
import { useAuth } from 'helpers/useAuth';

interface Props {
    channel: string;
    paymentMethods: PaymentMethodsList;
    cart: CartData;
}

const Wrapper = styled(Layout)`
    background: ${colors.purplePink};
    min-width: ${constants.width.desktop};
`;

enum CheckoutSteps {
    choseMethod,
    review,
}

export function CheckoutMain({ channel, paymentMethods, cart }: Props): ReactElement {
    const router = useRouter();
    const [step, setStep] = useState(CheckoutSteps.choseMethod);
    const [method, setMethod] = useState<SelectedMethod | undefined>();
    const { user } = useAuth();
    let content: ReactElement | undefined;
    let stepIndex = 1;

    // TODO remove hardcoded currencyCode
    const finish = (): void => {
        const products = cart.products.map((item: CartItem): IPurchaseItem => cartToPurchaseItem(item));
        // TODO need to add loading and error
        const token = user?.token || '';
        const accountId = user?.account?.accountId || 0;
        purchaseProduct(products, channel, token, accountId).then((data: PurchaseResult): void => {
            router.replace({
                pathname: '/[channel]/purchase-summary/[transactionId]',
                query: {
                    channel,
                    transactionId: data.transactionId,
                },
            });
        });
    };

    if (step === CheckoutSteps.choseMethod) {
        content = (
            <ChoseMethod
                paymentMethods={paymentMethods}
                setMethod={(selectedMethod: SelectedMethod): void => {
                    setMethod(selectedMethod);
                    setStep(CheckoutSteps.review);
                }}
            />
        );
    } else if (step === CheckoutSteps.review && method) {
        content = (
            <Review
                paymentMethod={method}
                resetMethod={(): void => {
                    setMethod(undefined);
                    setStep(CheckoutSteps.choseMethod);
                }}
                toSummary={finish}
                cart={cart}
            />
        );
        stepIndex = 2;
    }

    return (
        <Wrapper ai={AlignItemsTypes.center}>
            <Row componentWidth={constants.width.desktop}>
                <CheckoutProgress stepIndex={stepIndex} />
                {content}
            </Row>
        </Wrapper>
    );
}
