import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { BaseLayout, GamePageLayout } from 'widgets';
import { getGameData } from 'requests/getGameData';
import { Category, GameData } from 'models/GameData';
import ErrorPage from 'pages/_error';
import { getProductsByCategories } from 'requests/getProductByCategories';
import { ProductsByCategoriesList } from 'models/ProductsByCategoriesList';
import { Categories } from 'models/Categories';
import { getCategories } from 'requests/get-categories';
import { getCartProducts } from 'requests/getCartProducts';
import { connect } from 'react-redux';
import { IStore } from 'stores';
import { setCartProducts } from 'stores/reducers/cartReducer/actions';
import { CartItem } from 'models/CartItem';
import { getChannels } from 'requests/getChannels';
import { IGame } from 'models/game';

interface IPageProps {
    gameData: GameData | null;
    productsByCategories: ProductsByCategoriesList | null;
    channel: string;
    categories: Categories | null;
    cartProducts: CartItem[];
    games: IGame[];
}

interface IGamePage extends IPageProps {
    setCartProducts: (products: CartItem[]) => void;
}

const GamePage = ({
    channel,
    gameData,
    productsByCategories,
    categories,
    setCartProducts,
    cartProducts,
    games,
}: IGamePage): ReactElement => {
    if (!gameData || !productsByCategories || !categories) {
        return <ErrorPage />;
    }

    const { mobileImage } = games.find((game: IGame): boolean => game.channel === channel) as IGame;

    useEffect((): void => {
        setCartProducts(cartProducts);
    }, []);

    return (
        <BaseLayout games={games} categories={categories.categories}>
            <Head>
                <title>Game Page</title>
            </Head>
            <GamePageLayout
                channel={channel}
                gameData={gameData}
                productsByCategories={productsByCategories}
                categories={categories}
                mobileImage={mobileImage}
            />
        </BaseLayout>
    );
};

interface IInitialProps {
    props: IPageProps;
}

export async function getServerSideProps(context: any): Promise<IInitialProps> {
    const gameData = await getGameData(context.params.channel);
    const channels = await getChannels();
    if (!gameData) {
        return {
            props: {
                gameData: null,
                productsByCategories: null,
                channel: '',
                categories: null,
                cartProducts: [],
                games: channels || [],
            },
        };
    }
    const categories = await getCategories(context.params.channel);
    const topCategories = gameData.categories.map((category: Category): string => category.id);
    const productsByCategories = await getProductsByCategories(context.params.channel, topCategories);
    const data = await getCartProducts(context.params.channel);
    const products = data || { products: [] };
    // TODO as we use [channel] in few components we need to pass it through "redux" or "context"

    return {
        props: {
            gameData,
            productsByCategories,
            channel: context.params.channel,
            categories,
            cartProducts: products.products || [],
            games: channels || [],
        },
    };
}

export default connect(({ cart }: IStore) => ({ products: cart.products }), { setCartProducts })(GamePage);
