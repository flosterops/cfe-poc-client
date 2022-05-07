import React, { ReactElement } from 'react';
import Head from 'next/head';
import { BaseLayout } from 'widgets/BaseLayout';
import { GetServerSidePropsResult } from 'next';
import { IGame } from 'models/game';
import { getChannels } from 'requests/getChannels';

const SupportPage = ({ games }: Props): ReactElement => {
    return (
        <BaseLayout games={games} withFooter={false}>
            <Head>
                <title>Support Page</title>
            </Head>
            <h1>Support Page</h1>
        </BaseLayout>
    );
};

interface Props {
    games: IGame[];
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
    const channels = await getChannels();
    return {
        props: {
            games: channels || [],
        },
    };
}

export default SupportPage;
