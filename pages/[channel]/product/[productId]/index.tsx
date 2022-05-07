import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { getProductUrl } from 'requests/get-product-url';
import { getProduct } from 'requests/get-product';
import { createProductFromResponse, Product } from 'models/product';
import { getGameData } from 'requests/getGameData';
import { Category, GameData, PurchaseType } from 'models/GameData';
import { GameHeader } from 'widgets/GamePageLayout/GameHeader';
import {
    GameMenu,
    GameSubMenu,
    MessageAddCart,
    ProductLayout,
    MobileProductAddCart,
    MobileGoToCart,
    BaseLayout,
} from 'widgets';
import ErrorPage from 'pages/_error';
import { getChannels } from 'requests/getChannels';
import { IGame } from 'models/game';

interface ICurrentGamePage {
    product: Product | null;
    productId: string;
    categories: Category[];
    channel: string;
    gameData: GameData | null;
    games: IGame[];
}

const ProductPage = ({ product, productId, categories, gameData, channel, games }: ICurrentGamePage): ReactElement => {
    // TODO need to think how to show error
    if (!gameData || !product) {
        return <ErrorPage />;
    }

    let purchaseType = PurchaseType.buyNow;
    // TODO check with somebody if rule is right
    // TWC is virtual currency, if we buy product with it we should do it without confirmation
    if (product.currencyType === 'TWC') {
        purchaseType = PurchaseType.fastBuy;
    } else if (gameData.purchaseType) {
        purchaseType = gameData.purchaseType;
    }

    const [modalMessage, setModalMessage] = useState<boolean>(false);

    useEffect((): void | (() => void) => {
        return (): void => {
            setModalMessage(false);
        };
    }, []);

    const onAddToCart = (): void => {
        if (modalMessage) {
            setModalMessage(false);
            // When user adding new item to the cart, but message still in the DOM now should to close previous and open new
            // Added setTimeout to open new message after previous will close
            setTimeout((): void => {
                setModalMessage(true);
            }, 0);
        } else {
            setModalMessage(true);
        }
    };
    return (
        <BaseLayout games={games}>
            <Head>
                <title>Product Page</title>
            </Head>
            {modalMessage && <MobileGoToCart channel={channel} />}
            {gameData && <GameHeader bgUrl={gameData.headerBackground} name={gameData.name} />}
            {modalMessage && <MessageAddCart onClose={(): void => setModalMessage(false)} channel={channel} />}
            <GameMenu channel={channel} categories={categories} />
            <GameSubMenu channel={channel} productId={productId} gameData={gameData} />
            <ProductLayout
                product={product}
                productId={productId}
                categories={categories}
                setModalMessage={onAddToCart}
                channel={channel}
                purchaseType={purchaseType}
            />
            <MobileProductAddCart setModalMessage={setModalMessage} price={product.price} />
        </BaseLayout>
    );
};

interface IInitialProps {
    props: ICurrentGamePage;
}

export async function getServerSideProps(context: any): Promise<IInitialProps> {
    const productUrl = await getProductUrl(context.params.channel, context.params.productId);
    const productResponse = await getProduct(productUrl);
    const product = createProductFromResponse(productResponse);
    const gameData = await getGameData(context.params.channel);
    const categories = gameData ? gameData.categories : [];
    const channels = await getChannels();

    return {
        props: {
            product,
            productId: context.params.productId,
            channel: context.params.channel,
            categories,
            gameData,
            games: channels || [],
        },
    };
}

export default ProductPage;
