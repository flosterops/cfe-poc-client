import React, { ReactElement, useEffect } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { CartLayout } from 'widgets/CartLayout';
import { CartItem } from 'models/CartItem';
import { Categories } from 'models/Categories';
import { getCategories } from 'requests/get-categories';
import { getCartProducts } from 'requests/getCartProducts';
import { connect } from 'react-redux';
import { setCartProducts } from 'stores/reducers/cartReducer/actions';
import { BaseLayout } from 'widgets/BaseLayout';
import { GameData } from 'models/GameData';
import { getGameData } from 'requests/getGameData';
import ErrorPage from 'pages/_error';

interface Props {
    channel: string;
    products: CartItem[];
    categories: Categories;
    gameData: GameData | null;
}

interface ICart extends Props {
    setCartProducts: (products: CartItem[]) => void;
}

const Cart = ({ products, setCartProducts, channel, categories, gameData }: ICart): ReactElement => {
    // TODO need to think how to show error
    if (!gameData) {
        return <ErrorPage />;
    }

    useEffect(() => {
        setCartProducts(products);
    }, []);
    return (
        <BaseLayout>
            <Head>
                <title>Cart</title>
            </Head>
            <CartLayout channel={channel} categories={categories} gameData={gameData} />
        </BaseLayout>
    );
};

interface InitialProps {
    props: Props;
}

export async function getServerSideProps(context: any): Promise<InitialProps> {
    const categories = await getCategories(context.params.channel);
    const data = await getCartProducts(context.params.channel);
    const gameData = await getGameData(context.params.channel);
    const products = data?.products || [];
    return {
        props: {
            products,
            channel: context.params.channel,
            categories,
            gameData,
        },
    };
}

export default connect(null, { setCartProducts })(Cart);
