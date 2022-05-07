import React, { ReactElement } from 'react';
import { AccountTabIdTypes } from 'widgets/AccountTabs';
import { BaseLayout, AccountLayout, AccountTransaction } from 'widgets';
import Head from 'next/head';
import { IAccountPaymentTransactionsModel } from 'models/account';
import { IGame } from 'models/game';
import { GetServerSidePropsResult } from 'next';
import { getChannels } from 'requests/getChannels';
import { fetchAccountPayments } from 'requests/fetchAccountPayments';

interface ServerSideProps {
    paymentTransactions: IAccountPaymentTransactionsModel[];
    games: IGame[];
}

const Payments = ({ games, paymentTransactions }: ServerSideProps): ReactElement => {
    return (
        <BaseLayout games={games} withFooter={false}>
            <Head>
                <title>Account Page</title>
            </Head>
            <AccountLayout tabId={AccountTabIdTypes.transactions}>
                <AccountTransaction transactions={paymentTransactions} />;
            </AccountLayout>
        </BaseLayout>
    );
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ServerSideProps>> {
    const games = (await getChannels()) || [];
    const paymentTransactions = (await fetchAccountPayments()) || [];
    return { props: { games, paymentTransactions } };
}

export default Payments;
