import React, { ReactElement } from 'react';
import { GameMenu, GameSubMenu } from 'widgets';
import { Layout } from 'ui/Layout';
import { CartMain } from './CartMain';
import { Categories } from 'models/Categories';
import { GameData } from 'models/GameData';

interface Props {
    channel: string;
    categories: Categories;
    gameData: GameData;
}

export function CartLayout(props: Props): ReactElement {
    const { channel, categories, gameData } = props;
    return (
        <Layout componentWidth="100%">
            <GameMenu channel={channel} categories={categories.categories} />
            <GameSubMenu channel={channel} gameData={gameData} />
            <CartMain channel={channel} />
        </Layout>
    );
}
