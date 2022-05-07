import React, { ReactElement } from 'react';
import { AccountTabIdTypes } from 'widgets/AccountTabs';
import { BaseLayout, AccountLayout, AccountLinks } from 'widgets';
import Head from 'next/head';
import { IAccountLinks } from 'models/account';
import { IGame } from 'models/game';
import { GetServerSidePropsResult } from 'next';
import { getChannels } from 'requests/getChannels';
import { fetchAccountLinks } from 'requests/fetchAccountLinks';

interface ServerSideProps {
    accountLinks: IAccountLinks[];
    games: IGame[];
}

const Linking = ({ games, accountLinks }: ServerSideProps): ReactElement => {
    return (
        <BaseLayout games={games} withFooter={false}>
            <Head>
                <title>Account Page</title>
            </Head>
            <AccountLayout tabId={AccountTabIdTypes.linking}>
                <AccountLinks accountLinks={accountLinks} />;
            </AccountLayout>
        </BaseLayout>
    );
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ServerSideProps>> {
    const games = (await getChannels()) || [];
    const accountLinks = (await fetchAccountLinks()) || [];
    return { props: { games, accountLinks } };
}

export default Linking;
