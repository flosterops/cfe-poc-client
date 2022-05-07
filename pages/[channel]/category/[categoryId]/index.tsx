import React, { ReactElement } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { CategoryLayout } from 'widgets/CategoryLayout';
import { getCategories } from 'requests/get-categories';
import { Categories } from 'models/Categories';
import { getProductsByCategories } from 'requests/getProductByCategories';
import { ProductsByCategoriesList } from 'models/ProductsByCategoriesList';
import ErrorPage from 'pages/_error';
import { BaseLayout } from 'widgets/BaseLayout';
import { GameData } from 'models/GameData';
import { getGameData } from 'requests/getGameData';

interface Props {
    channel: string;
    categories: Categories;
    gameData: GameData | null;
    products: ProductsByCategoriesList | null;
}

const Category = (props: Props): ReactElement => {
    // TODO need to think how to show error
    if (!props.products || !props.gameData) {
        return <ErrorPage />;
    }

    return (
        <BaseLayout>
            <Head>
                <title>Category</title>
            </Head>
            <CategoryLayout
                channel={props.channel}
                categories={props.categories}
                products={props.products}
                gameData={props.gameData}
            />
        </BaseLayout>
    );
};

interface InitialProps {
    props: Props;
}

export async function getServerSideProps(context: any): Promise<InitialProps> {
    const categories = await getCategories(context.params.channel);
    const products = await getProductsByCategories(context.params.channel, [context.params.categoryId]);
    const gameData = await getGameData(context.params.channel);
    return {
        props: {
            channel: context.params.channel,
            categories,
            products,
            gameData,
        },
    };
}

export default Category;
