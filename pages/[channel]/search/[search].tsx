import React, { FunctionComponent, ReactElement } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { BaseLayout } from 'widgets/BaseLayout';
import { getGameData } from 'requests/getGameData';
import { getChannels } from 'requests/getChannels';
import { Category, GameData } from 'models/GameData';
import { getCartProducts } from 'requests/getCartProducts';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { CartItem } from 'models/CartItem';
import { IGame } from 'models/game';
import { SearchLayout } from 'widgets';
import Error from 'next/error';
import { getCategories } from 'requests/get-categories';
import queryString from 'query-string';
import { getProductsByCategories } from 'requests/getProductByCategories';
import { ProductPreview } from 'models/ProductsByCategoriesList';

const Search: FunctionComponent<Props> = ({
    gameData,
    channel,
    categories,
    games,
    currentGame,
    results,
    search,
}: Props): ReactElement => {
    if (!gameData) {
        return <Error statusCode={400} />;
    }
    return (
        <BaseLayout games={games} categories={categories}>
            <Head>
                <title>Search</title>
            </Head>
            <SearchLayout
                gameData={gameData}
                channel={channel}
                categories={categories}
                mobileImage={currentGame.mobileImage}
                search={search}
                results={results}
            />
        </BaseLayout>
    );
};

interface Props {
    gameData: GameData | null;
    channel: string;
    cartProducts: CartItem[];
    games: IGame[];
    categories: Category[];
    currentGame: IGame;
    search: string;
    results: ProductPreview[];
}

export async function getServerSideProps(
    context: GetServerSidePropsContext<any>
): Promise<GetServerSidePropsResult<Props>> {
    const { channel, search } = context.params;
    const parsedSearch = queryString.parse(search);
    const gameData = await getGameData(channel);
    const games = (await getChannels()) || [];
    const data = await getCartProducts(context.params.channel);
    const cartProducts = data?.products || [];
    const categories = await getCategories(context.params.channel);
    const currentGame = games.find((game: IGame): boolean => game.channel === channel) as IGame;
    const topCategories = gameData?.categories.map((category: Category): string => category.id);
    const productsByCategories = await getProductsByCategories(context.params.channel, topCategories as string[]);

    return {
        props: {
            gameData,
            channel,
            cartProducts,
            games,
            categories: categories.categories || [],
            currentGame,
            search: parsedSearch.search as string,
            results: productsByCategories?.categories[0].products || [],
        },
    };
}

export default Search;
