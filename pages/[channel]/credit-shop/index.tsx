import React, { ReactElement } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { BaseLayout } from 'widgets/BaseLayout';

const CreditShop = (): ReactElement => {
    return (
        <BaseLayout>
            <Head>
                <title>Credit Shop</title>
            </Head>
            <h1>Credit Shop</h1>
        </BaseLayout>
    );
};

export default CreditShop;
