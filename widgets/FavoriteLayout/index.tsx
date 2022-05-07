import React, { FunctionComponent, ReactElement } from 'react';
import { Column, GameCart, Row, Title } from 'ui';
import { TitleTags } from 'ui/Title';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { IGame } from 'models/game';
import { StyledGameCart, StyledImage } from 'ui/GameCart';
import { FontSizeTypes } from 'helpers/enums';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';

const StyledFavoriteLayout = styled(Column)<ILayout>`
    padding: 68px 0 60px;
    ${media.lessThan(BreakPoints.tablet)} {
        display: none;
    }
`;

const Favorites = styled(Row)<ILayout>`
    flex-wrap: wrap;
    & ${StyledGameCart} {
        width: 240px;
        overflow: hidden;
        margin-right: 30px;
        ${media.lessThan(BreakPoints.phone)} {
            width: 100%;
        }
    }
    & ${StyledImage} {
        height: 330px;
        width: auto;
    }
`;

interface IFavoriteLayout {
    favorites: string[];
    favoriteGames: IGame[];
    changeFavorite: (e: MouseEvent, channel: string) => void;
}

const FavoriteLayout: FunctionComponent<IFavoriteLayout> = ({
    favorites,
    favoriteGames,
    changeFavorite,
}: IFavoriteLayout): ReactElement => {
    return (
        <StyledFavoriteLayout>
            <Title fontSize={FontSizeTypes.l} tagName={TitleTags.h2} uppercase>
                your favourites
            </Title>
            <Favorites>
                {favoriteGames.map(
                    (game: IGame): ReactElement => {
                        return (
                            <GameCart
                                favourite={favorites.includes(game.channel)}
                                key={game.id}
                                game={game}
                                changeFavorite={changeFavorite}
                            />
                        );
                    }
                )}
            </Favorites>
        </StyledFavoriteLayout>
    );
};

export { FavoriteLayout };
