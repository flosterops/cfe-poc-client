import React, { ReactElement, useState } from 'react';
import { Layout } from 'ui/Layout';
import { useTranslation } from 'react-i18next';
import { MethodItem } from './MethodItem';
import { PaymentMethod } from 'models/purchase/PaymentMethod';
import { BackToShopButton } from 'widgets/CheckoutLayout/common/BackToShopButton';
import { Title } from 'widgets/CheckoutLayout/common/Title';
import { CardMethod } from './CardMethod';
import { PaymentMethodsList } from 'requests/get-payment-methods';
import { Description } from 'ui/Description';
import { colors } from 'helpers/colors';
import { SelectedMethod } from 'models/purchase/SelectedMethod';

interface Props {
    setMethod: (method: SelectedMethod) => void;
    paymentMethods: PaymentMethodsList;
}

export function ChoseMethod({ setMethod, paymentMethods }: Props): ReactElement {
    const [checkedMethod, setCheckedMethod] = useState<string | undefined>();
    const { t } = useTranslation('checkout');

    const check = (index: string): void =>
        checkedMethod !== index ? setCheckedMethod(index) : setCheckedMethod(undefined);

    function renderItem(method: PaymentMethod): ReactElement {
        return method.id === 'credit_card' ? (
            <CardMethod
                isChecked={checkedMethod === method.id}
                check={(): void => check(method.id)}
                method={method}
                setMethod={setMethod}
                key={method.id}
            />
        ) : (
            <MethodItem
                isChecked={checkedMethod === method.id}
                check={(): void => check(method.id)}
                method={method}
                setMethod={setMethod}
                key={method.id}
            />
        );
    }

    return (
        <Layout mbottom="60px">
            <Title>{t('chose a payment method')}</Title>
            <Layout>
                <Description color={colors.lightText} uppercase={true} mbottom="16px">
                    {t('your payment methods')}
                </Description>
                {paymentMethods.saved.map((method: PaymentMethod): ReactElement => renderItem(method))}
                <Description color={colors.lightText} uppercase={true} margin="39px 0 16px">
                    {t('chose another payment method')}
                </Description>
                {paymentMethods.another.map((method: PaymentMethod): ReactElement => renderItem(method))}
            </Layout>
            <BackToShopButton />
        </Layout>
    );
}
