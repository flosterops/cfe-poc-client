import React, { ReactElement } from 'react';
import { ILayout, Layout, Row } from 'ui/Layout';
import { constants } from 'helpers/constants';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import { IconTypes } from 'helpers/icons';
import { Icon } from 'ui/Icon';
import { BreadCrumbs, SearchGlyph } from 'widgets';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { GameData, PurchaseType } from 'models/GameData';
import { NavLink } from 'ui/NavLink';

interface Props {
    channel: string;
    productId?: string;
    search?: string;
    gameData: GameData | null;
}

const Wrapper = styled(Layout)`
    background: ${colors.black};
    height: 55px;
    padding: 0 35px;
    ${media.lessThan(BreakPoints.phone)} {
        height: 50px;
        padding: 0 15px;
    }
`;

const StyledIcon = styled(Icon)`
    cursor: pointer;
    ${media.lessThan(BreakPoints.phone)} {
        width: 32px;
    }
`;

const SearchLink = styled(Row)<ILayout>`
    display: flex;
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;

const Content = styled(Row)<ILayout>`
    max-width: ${constants.width.lgDesktop};
`;

export function GameSubMenu({ channel, productId, gameData, search = '' }: Props): ReactElement {
    return (
        <Wrapper componentWidth="100%">
            <Content
                componentHeight="100%"
                margin="auto"
                jc={JustifyContentTypes.spaceBetween}
                ai={AlignItemsTypes.center}
            >
                <BreadCrumbs channel={channel} productId={productId} />
                {channel && (
                    <Row componentHeight="100%" ai={AlignItemsTypes.center} componentWidth="auto">
                        <SearchLink componentHeight="100%" ai={AlignItemsTypes.center} componentWidth="auto">
                            <SearchGlyph channel={channel} defaultValue={search} />
                        </SearchLink>
                        <Row ai={AlignItemsTypes.center} componentWidth="auto">
                            {gameData?.purchaseType === PurchaseType.cart && (
                                <NavLink
                                    mleft="20px"
                                    href={{
                                        pathname: '/[channel]/cart/',
                                        query: { channel },
                                    }}
                                >
                                    <StyledIcon icon={IconTypes.cart} alt="cart" />
                                </NavLink>
                            )}
                        </Row>
                    </Row>
                )}
            </Content>
        </Wrapper>
    );
}
