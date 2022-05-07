import React, { ReactElement } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { GameData } from 'models/GameData';
import { getGameData } from 'requests/getGameData';
import ErrorPage from 'pages/_error';
import { getPurchaseData, PurchaseResult } from 'requests/getPurchaseData';
import { BaseLayout } from 'widgets';
import { PurchaseSummaryLayout } from 'widgets/PurchaseSummaryLayout';
import { Description } from 'ui/Description';
import { colors } from 'helpers/colors';

// TODO check is [productId] needed or whole product
interface Props {
    channel: string;
    gameData: GameData | null;
    purchaseData: PurchaseResult;
}

const PurchaseSummary = ({ channel, gameData, purchaseData }: Props): ReactElement => {
    // TODO need to think how to show error
    if (!gameData) {
        return <ErrorPage />;
    }

    const title = <Description color={colors.lightText}>CHECKOUT</Description>;

    return (
        <>
            <Head>
                <title>Purchase Summary</title>
            </Head>
            <BaseLayout title={title} showOnHeader={{ menu: false, locales: false, downloadButton: false }}>
                <PurchaseSummaryLayout channel={channel} purchaseData={purchaseData} />
            </BaseLayout>
        </>
    );
};

interface InitialProps {
    props: Props;
}

export async function getServerSideProps(context: any): Promise<InitialProps> {
    const gameData = await getGameData(context.params.channel);
    const purchaseData = await getPurchaseData(context.params.channel, context.params.transactionId);
    return {
        props: {
            purchaseData,
            channel: context.params.channel,
            gameData,
        },
    };
}

export default PurchaseSummary;
