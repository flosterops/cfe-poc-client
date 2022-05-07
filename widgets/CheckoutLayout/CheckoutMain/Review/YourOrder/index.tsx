import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Layout, Row } from 'ui/Layout';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { Checkbox } from 'widgets/CheckoutLayout/common/Checkbox';
import { OrderItem } from './OrderItem';
import { CartData, CartItem } from 'models/CartItem';
import { formatCurrency } from 'helpers/formatter/formatCurrency';

const Wrapper = styled(Layout)`
    background: ${colors.transparentDark};
    color: ${colors.secondaryText};
`;

const Title = styled.h2`
    font-size: 25px;
    margin-bottom: 12px;
`;

const Total = styled.span`
    font-size: 25px;
`;

const TaxInfo = styled.span`
    font-size: 16px;
    margin-bottom: 12px;
`;

const Text = styled.span`
    font-size: 16px;
`;

interface BuyNowButtonProps {
    active: boolean;
}

const BuyNowButton = styled.button<BuyNowButtonProps>`
    width: 375px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: ${colors.contrastToYellow};
    text-transform: uppercase;
    border: none;
    border-radius: 0;
    cursor: ${(props: BuyNowButtonProps): string => (props.active ? 'pointer' : 'auto')};
    background: ${(props: BuyNowButtonProps): string => (props.active ? colors.yellow : colors.disabled)};
`;

const List = styled(Layout)`
    max-height: 400px;
    overflow: scroll;
`;

interface Props {
    toSummary: () => void;
    cart: CartData;
}

export function YourOrder({ toSummary, cart }: Props): ReactElement {
    const { t } = useTranslation('checkout');
    const [agree, setAgree] = useState(false);

    let button: ReactElement | undefined;
    button = agree ? (
        <BuyNowButton active={true} onClick={toSummary}>
            {t('buy now')}
        </BuyNowButton>
    ) : (
        <BuyNowButton active={false} disabled={true}>
            {t('buy now')}
        </BuyNowButton>
    );

    const total = cart.products.reduce((prev: number, curr: CartItem): number => prev + parseInt(curr.price), 0);
    // TODO not sure about this logic
    let currencyType = 'EUR';
    if (cart.products.length > 0) {
        currencyType = cart.products[0].currencyType;
    }

    return (
        <Wrapper padding="30px 40px">
            <Title>{t('your order')}</Title>
            <List>
                {cart.products.map(
                    (item: CartItem): ReactElement => (
                        <OrderItem key={item.id} item={item} />
                    )
                )}
            </List>
            <Row jc={JustifyContentTypes.spaceBetween} margin="30px 0">
                <div>
                    <Total>{t('total')}</Total>
                    <TaxInfo>&nbsp;{t('tax included if applicable')}&nbsp;</TaxInfo>
                    <Total>:</Total>
                </div>
                <Total>{formatCurrency(total.toString(), currencyType)}</Total>
            </Row>
            <Text>{t('terms of use')}</Text>
            <Row ai={AlignItemsTypes.center} margin="30px 0">
                <Layout mright="10px" componentWidth="auto">
                    <Checkbox value={agree} change={(): void => setAgree(!agree)} />
                </Layout>
                <span onClick={(): void => setAgree(!agree)}>{t('i agree')}</span>
            </Row>
            {button}
        </Wrapper>
    );
}
