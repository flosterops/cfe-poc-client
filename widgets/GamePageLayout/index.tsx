import React, { ReactElement } from 'react';
import { GameData } from 'models/GameData';
import { GameHeader } from './GameHeader';
import { Column, ILayout, Layout } from 'ui/Layout';
import { TopCategories } from './TopCategories';
import { GameMenu, GameSubMenu } from 'widgets';
import { ProductsByCategoriesLayout } from './ProductsByCategoriesLayout';
import { ProductsByCategoriesList } from 'models/ProductsByCategoriesList';
import { Categories } from 'models/Categories';
import styled from 'styled-components';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { JustifyContentTypes } from 'helpers/enums';

interface Props {
    gameData: GameData;
    productsByCategories: ProductsByCategoriesList;
    channel: string;
    categories: Categories;
    mobileImage: string;
}

const GameMainContainer = styled(Column)<ILayout>`
    padding: 0 35px;
    ${media.lessThan(BreakPoints.phone)} {
        padding: 0 15px;
        min-height: 45.5vh;
    }
`;

export const GamePageLayout = (props: Props): ReactElement => {
    const { gameData, productsByCategories, channel, categories, mobileImage } = props;
    return (
        <Layout componentWidth="100%" pbottom="20px">
            <GameHeader mobileImage={mobileImage} bgUrl={gameData.headerBackground} name={gameData.name} />
            <GameMenu channel={channel} categories={categories.categories} />
            <GameSubMenu channel={channel} gameData={gameData} />
            <GameMainContainer jc={JustifyContentTypes.flexStart}>
                <TopCategories channel={channel} topCategories={gameData.categories} />
                <ProductsByCategoriesLayout channel={channel} productsByCategories={productsByCategories} />
            </GameMainContainer>
        </Layout>
    );
};
