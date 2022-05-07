import React, { ReactElement } from 'react';
import { AccountTabIdTypes } from 'widgets/AccountTabs';
import { BaseLayout, AccountLayout, AccountSecurity } from 'widgets';
import Head from 'next/head';
import { IAccountInfoModel } from 'models/account';
import { IGame } from 'models/game';
import { GetServerSidePropsResult } from 'next';
import { getChannels } from 'requests/getChannels';
import { fetchAccountInfo } from 'requests/fetchAccountInfo';

interface ServerSideProps {
    accountInfo: IAccountInfoModel;
    games: IGame[];
}

const Security = ({ games, accountInfo }: ServerSideProps): ReactElement => {
    return (
        <BaseLayout games={games} withFooter={false}>
            <Head>
                <title>Account Page</title>
            </Head>
            <AccountLayout tabId={AccountTabIdTypes.security}>
                <AccountSecurity accountInfo={accountInfo} />;
            </AccountLayout>
        </BaseLayout>
    );
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ServerSideProps>> {
    const games = (await getChannels()) || [];
    const accountInfo = await fetchAccountInfo();
    return { props: { games, accountInfo } };
}

export default Security;
