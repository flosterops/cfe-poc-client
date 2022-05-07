import React, { ReactElement } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { BaseLayout } from 'widgets/BaseLayout';

const BonusShop = (): ReactElement => {
    return (
        <BaseLayout>
            <Head>
                <title>Bonus Shop</title>
            </Head>
            <h1>Bonus Shop</h1>
        </BaseLayout>
    );
};

export default BonusShop;
