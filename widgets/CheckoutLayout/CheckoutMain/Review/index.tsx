import React, { ReactElement } from 'react';
import { Layout } from 'ui/Layout';
import { Title } from 'widgets/CheckoutLayout/common/Title';
import { useTranslation } from 'react-i18next';
import { BackToShopButton } from 'widgets/CheckoutLayout/common/BackToShopButton';
import { SelectedPaymentMethod } from './SelectedPaymentMethod';
import { YourOrder } from './YourOrder';
import { CartData } from 'models/CartItem';
import { SelectedMethod } from 'models/purchase/SelectedMethod';

interface Props {
    paymentMethod: SelectedMethod;
    resetMethod: () => void;
    toSummary: () => void;
    cart: CartData;
}

export function Review({ paymentMethod, resetMethod, toSummary, cart }: Props): ReactElement {
    const { t } = useTranslation('checkout');
    return (
        <Layout pbottom="60px">
            <Title>{t('review your order')}</Title>
            <SelectedPaymentMethod resetMethod={resetMethod} paymentMethod={paymentMethod.name} />
            <YourOrder toSummary={toSummary} cart={cart} />
            <BackToShopButton />
        </Layout>
    );
}
