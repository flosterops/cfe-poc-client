import React, { ReactElement } from 'react';
import { AccountTabIdTypes } from 'widgets/AccountTabs';
import { BaseLayout, AccountLayout, AccountApplyCode } from 'widgets';
import Head from 'next/head';
import { IApplyCodeTransactions } from 'models/account';
import { IGame } from 'models/game';
import { GetServerSidePropsResult } from 'next';
import { getChannels } from 'requests/getChannels';
import { fetchApplyCodeTransactions } from 'requests/fetchApplyCodeTransactions';

interface ServerSideProps {
    applyCodeTransactions: IApplyCodeTransactions[];
    games: IGame[];
}

const Code = ({ applyCodeTransactions, games }: ServerSideProps): ReactElement => {
    return (
        <BaseLayout games={games} withFooter={false}>
            <Head>
                <title>Account Page</title>
            </Head>
            <AccountLayout tabId={AccountTabIdTypes.code}>
                <AccountApplyCode transactions={applyCodeTransactions} />;
            </AccountLayout>
        </BaseLayout>
    );
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ServerSideProps>> {
    const applyCodeTransactions = (await fetchApplyCodeTransactions()) || [];
    const channels = await getChannels();
    return {
        props: { applyCodeTransactions, games: channels || [] },
    };
}

export default Code;
