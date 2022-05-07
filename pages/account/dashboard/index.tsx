import React, { ReactElement } from 'react';
import Head from 'next/head';
import { AccountDashboard, AccountLayout, BaseLayout } from 'widgets';
import { GetServerSidePropsResult } from 'next';
import { fetchAccountInfo } from 'requests/fetchAccountInfo';
import { fetchAccountPayments } from 'requests/fetchAccountPayments';
import { getChannels } from 'requests/getChannels';
import { IAccountInfoModel, IAccountPaymentTransactionsModel } from 'models/account';
import { IGame } from 'models/game';
import { AccountTabIdTypes } from 'widgets/AccountTabs';

const Dashboard = ({ accountInfo, paymentTransactions, games }: ServerSideProps): ReactElement => {
    return (
        <BaseLayout games={games} withFooter={false}>
            <Head>
                <title>Account Page</title>
            </Head>
            <AccountLayout tabId={AccountTabIdTypes.dashboard}>
                <AccountDashboard
                    accountInfo={accountInfo}
                    transactions={paymentTransactions.filter((_, i) => i < 3)}
                />
            </AccountLayout>
        </BaseLayout>
    );
};

interface ServerSideProps {
    accountInfo: IAccountInfoModel;
    paymentTransactions: IAccountPaymentTransactionsModel[];
    games: IGame[];
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ServerSideProps>> {
    const accountInfo = await fetchAccountInfo();
    const paymentTransactions = (await fetchAccountPayments()) || [];
    const channels = (await getChannels()) || [];
    return {
        props: { accountInfo, paymentTransactions, games: channels || [] },
    };
}

export default Dashboard;
