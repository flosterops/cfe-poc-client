import React, { ReactElement } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { CheckoutLayout } from 'widgets/CheckoutLayout';
import ErrorPage from 'pages/_error';
import { getPaymentMethods, PaymentMethodsList } from 'requests/get-payment-methods';
import { getProductUrl } from 'requests/get-product-url';
import { getProduct } from 'requests/get-product';
import { createProductFromResponse } from 'models/product';
import { BaseLayout } from 'widgets/BaseLayout';
import { Description } from 'ui/Description';
import { colors } from 'helpers/colors';
import { CartItem } from 'models/CartItem';

// TODO check is [productId] needed or whole product
interface Props {
    channel: string;
    productId: string;
    paymentMethods: PaymentMethodsList;
    product: CartItem | null;
}

const BuyNow = ({ channel, paymentMethods, product }: Props): ReactElement => {
    // TODO need to think how to show error
    if (!product) {
        return <ErrorPage />;
    }

    const title = <Description color={colors.lightText}>CHECKOUT</Description>;

    return (
        <>
            <Head>
                <title>Buy Now</title>
            </Head>
            <BaseLayout title={title} showOnHeader={{ menu: false, locales: false, downloadButton: false }}>
                <CheckoutLayout cart={{ products: [product] }} channel={channel} paymentMethods={paymentMethods} />
            </BaseLayout>
        </>
    );
};

interface InitialProps {
    props: Props;
}

export async function getServerSideProps(context: any): Promise<InitialProps> {
    const paymentMethods = await getPaymentMethods();
    const productUrl = await getProductUrl(context.params.channel, context.params.productId);
    // TODO [getProduct] should call [getProductUrl] and [createProductFromResponse] inside it
    const productData = await getProduct(productUrl);
    const product = createProductFromResponse(productData);

    const cartItem = product && {
        code: context.params.productId,
        id: context.params.productId,
        img: product.img || '',
        additionalInfo: '',
        name: product.name,
        bonus: '',
        price: product.rawPrice,
        count: 1,
        currencyType: product.currencyType,
    };
    return {
        props: {
            productId: context.params.productId,
            channel: context.params.channel,
            paymentMethods,
            product: cartItem,
        },
    };
}

export default BuyNow;
