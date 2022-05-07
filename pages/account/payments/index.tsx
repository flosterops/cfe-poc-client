import React, { ReactElement } from 'react';
import { AccountTabIdTypes } from 'widgets/AccountTabs';
import { BaseLayout, AccountLayout, AccountPayments } from 'widgets';
import Head from 'next/head';
import { IAccountPaymentModel } from 'models/account';
import { IGame } from 'models/game';
import { GetServerSidePropsResult } from 'next';
import { getChannels } from 'requests/getChannels';
import { fetchUsablePaymentMethods } from 'requests/fetchUsablePaymentMethods';

interface ServerSideProps {
    paymentMethods: IAccountPaymentModel[];
    games: IGame[];
}

const Payments = ({ games, paymentMethods }: ServerSideProps): ReactElement => {
    return (
        <BaseLayout games={games} withFooter={false}>
            <Head>
                <title>Account Page</title>
            </Head>
            <AccountLayout tabId={AccountTabIdTypes.payments}>
                <AccountPayments paymentMethods={paymentMethods} />;
            </AccountLayout>
        </BaseLayout>
    );
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ServerSideProps>> {
    const games = (await getChannels()) || [];
    const paymentMethods = (await fetchUsablePaymentMethods()) || [];
    return { props: { games, paymentMethods } };
}

export default Payments;
