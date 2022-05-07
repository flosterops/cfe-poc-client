import React, { FunctionComponent, ReactElement } from 'react';
import { Column } from 'ui';
import { GameHeader } from 'widgets/GamePageLayout/GameHeader';
import { GameMenu, GameSubMenu } from 'widgets';
import { Category, GameData } from 'models/GameData';
import { SearchMain } from './SearchMain';
import { ProductPreview } from 'models/ProductsByCategoriesList';

interface ISearchLayout {
    channel: string;
    gameData: GameData;
    categories: Category[];
    mobileImage: string;
    search: string;
    results: ProductPreview[];
}

const SearchLayout: FunctionComponent<ISearchLayout> = ({
    channel,
    gameData,
    categories,
    mobileImage,
    search,
    results,
}: ISearchLayout): ReactElement => {
    return (
        <Column>
            <GameHeader mobileImage={mobileImage} bgUrl={gameData.headerBackground} name={gameData.name} />
            <GameMenu channel={channel} categories={categories} />
            <GameSubMenu channel={channel} gameData={gameData} search={search} />
            <SearchMain search={search} results={results} channel={channel} />
        </Column>
    );
};

export { SearchLayout };
