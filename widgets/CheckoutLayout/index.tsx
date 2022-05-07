import React, { ReactElement } from 'react';
import { Layout } from 'ui/Layout';
import { CheckoutMain } from './CheckoutMain';
import { CartData } from 'models/CartItem';
import { PaymentMethodsList } from 'requests/get-payment-methods';

interface Props {
    channel: string;
    paymentMethods: PaymentMethodsList;
    cart: CartData;
}

export function CheckoutLayout(props: Props): ReactElement {
    const { channel, paymentMethods, cart } = props;
    return (
        <Layout componentWidth="100%">
            <CheckoutMain channel={channel} paymentMethods={paymentMethods} cart={cart} />
        </Layout>
    );
}
