import React, { ReactElement } from 'react';
import { Layout } from 'ui/Layout';
import { GameMenu } from 'widgets/GameMenu';
import { GameSubMenu } from 'widgets/GameSubMenu';
import { CategoryMain } from 'widgets/CategoryLayout/CategoryMain';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { Categories } from 'models/Categories';
import { ProductsByCategoriesList } from 'models/ProductsByCategoriesList';
import { GameData } from 'models/GameData';

interface Props {
    channel: string;
    categories: Categories;
    products: ProductsByCategoriesList;
    gameData: GameData;
}

const Wrapper = styled(Layout)`
    background: ${colors.purpleMain};
    min-height: 70vh;
`;

export const CategoryLayout = (props: Props): ReactElement => {
    const { channel, categories, products, gameData } = props;
    return (
        <Wrapper>
            <Layout>
                <GameMenu channel={channel} categories={categories.categories} />
                <GameSubMenu channel={channel} gameData={gameData} />
                <CategoryMain channel={channel} categories={categories} products={products} />
            </Layout>
        </Wrapper>
    );
};
