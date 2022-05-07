import React, { ReactElement } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { CheckoutLayout } from 'widgets/CheckoutLayout';
import { getPaymentMethods, PaymentMethodsList } from 'requests/get-payment-methods';
import { getCartProducts } from 'requests/getCartProducts';
import { CartData } from 'models/CartItem';
import { BaseLayout } from 'widgets/BaseLayout';
import { Description } from 'ui/Description';
import { colors } from 'helpers/colors';

interface Props {
    channel: string;
    paymentMethods: PaymentMethodsList;
    // TODO types should reuse each other, so we need to remove useless
    cart: CartData;
}

const Checkout = ({ channel, paymentMethods, cart }: Props): ReactElement => {
    const title = <Description color={colors.lightText}>CHECKOUT</Description>;

    return (
        <>
            <Head>
                <title>Buy Now</title>
            </Head>
            <BaseLayout title={title} showOnHeader={{ menu: false, locales: false, downloadButton: false }}>
                <CheckoutLayout channel={channel} paymentMethods={paymentMethods} cart={cart} />
            </BaseLayout>
        </>
    );
};

interface InitialProps {
    props: Props;
}

export async function getServerSideProps(context: any): Promise<InitialProps> {
    const paymentMethods = await getPaymentMethods();
    const data = await getCartProducts(context.params.channel);
    const cart = data || { products: [] };
    return {
        props: {
            channel: context.params.channel,
            paymentMethods,
            cart,
        },
    };
}

export default Checkout;
