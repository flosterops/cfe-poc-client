import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Column, Description, Row } from 'ui';
import { ILayout } from 'ui/Layout';
import { FontSizeTypes, JustifyContentTypes } from 'helpers/enums';
import { IGame } from 'models/game';
import { colors } from 'helpers/colors';
import { fontSize, media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { IDescription } from 'ui/Description';
import { useRouter } from 'next/router';
import { IStarIcon, StarIcon } from 'ui/Icon/StarIcon';

export const StyledGameCart = styled(Column)<ILayout>`
    &:nth-child(odd) {
        margin-right: 30px;
    }
    margin-top: 40px;
    width: calc(50% - 15px);
    ${media.lessThan(BreakPoints.smallDesktop)} {
        max-width: 700px;
        width: 100%;
        &:nth-child(odd) {
            margin-right: 0;
        }
    }
    ${media.lessThan(BreakPoints.tablet)} {
        max-width: 700px;
        width: 100%;
    }

    ${media.lessThan(BreakPoints.phone)} {
        margin-top: 20px;
        max-height: 200px;
        width: 100%;
        cursor: pointer;
        &:nth-child(odd) {
            margin-right: 0;
        }
    }
`;

export const StyledImage = styled.img`
    width: 100%;
    max-height: 290px;
    ${media.lessThan(BreakPoints.phone)} {
        max-height: 160px;
    }
`;

const StyledGameCartFooter = styled(Column)`
    padding: 0 0 0 15px;
    background-color: ${colors.purpleGray};
    height: 85px;

    ${media.lessThan(BreakPoints.phone)} {
        height: 40px;
        padding: 0 15px;
        background-color: ${colors.purpleThin};
    }
`;

const GameName = styled(Description)<IDescription>`
    ${fontSize({ fontSize: FontSizeTypes.m })}

    ${media.lessThan(BreakPoints.phone)} {
        text-transform: none;
        ${fontSize({ fontSize: FontSizeTypes.s })};
    }
`;

const GameCategory = styled(Description)<IDescription>`
    ${media.lessThan(BreakPoints.phone)} {
        ${fontSize({ fontSize: FontSizeTypes.xs })};
    }
`;

const StyledStarIcon = styled(StarIcon)<IStarIcon>`
    position: absolute;
    right: 3px;
    bottom: 4px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

interface IGameCart {
    game: IGame;
    favourite?: boolean;
    changeFavorite: (e: MouseEvent, channel: string) => void;
}

const GameCart = ({ game, favourite, changeFavorite }: IGameCart): ReactElement => {
    const router = useRouter();
    const href = { pathname: '/[channel]', query: { channel: game.channel } };

    return (
        <StyledGameCart onClick={(): Promise<boolean> => router.push(href)}>
            <StyledImage alt={game.name} src={game.image} />
            <StyledGameCartFooter jc={JustifyContentTypes.spaceAround}>
                <Row jc={JustifyContentTypes.spaceBetween}>
                    <GameName>{game.name}</GameName>
                </Row>
                <GameCategory color="#838383">{game.category}</GameCategory>
                <StyledStarIcon
                    onClick={(e: MouseEvent): void => changeFavorite(e, game.channel)}
                    color={favourite ? colors.yellow : '#838383'}
                />
            </StyledGameCartFooter>
        </StyledGameCart>
    );
};

export { GameCart };
