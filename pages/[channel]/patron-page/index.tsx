import React, { ReactElement } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { BaseLayout } from 'widgets/BaseLayout';

const PatronPage = (): ReactElement => {
    return (
        <BaseLayout>
            <Head>
                <title>Patron Page</title>
            </Head>
            <h1>Patron Page</h1>
        </BaseLayout>
    );
};

export default PatronPage;
