import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { NavLink, Row } from 'ui';
import { LayoutTags } from 'ui/Layout';
import { INavLink } from 'ui/NavLink';
import { AlignItemsTypes, FontSizeTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import { useTranslation } from 'react-i18next';
import { Namespaces } from 'i18n/helpers';
import { fontSize, media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';

const StyledList = styled.ul`
    display: flex;
    with: auto;
    align-item: center;
    height: 100%;
`;

const StyledListItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

interface IStyledLinkNext extends INavLink {
    active: boolean;
    external?: boolean;
}

const StyledLinkNext = styled(NavLink)<IStyledLinkNext>`
    margin: 0 15px;
    ${media.lessThan(BreakPoints.desktop)} {
        ${fontSize({ fontSize: FontSizeTypes.s })}
        margin: 0 8px;
    }
    border-bottom-color: ${(props: IStyledLinkNext): string => (props.active ? colors.yellow : 'transparent')};
`;

export interface ILinkItem {
    id: string;
    to: string;
    text: string;
    external?: boolean;
}

interface IRenderLink {
    config: ILinkItem[];
}

export const RenderLinks = ({ config }: IRenderLink): ReactElement => {
    const { t } = useTranslation(Namespaces.common);
    const { pathname } = useRouter();
    return (
        <Row tagName={LayoutTags.nav} componentWidth="auto" componentHeight="100%" ai={AlignItemsTypes.center}>
            <StyledList>
                {config.map(
                    ({ id, to, text, external }: ILinkItem): ReactElement => {
                        const active = pathname === to;
                        return (
                            <StyledListItem key={id}>
                                <StyledLinkNext active={active} href={to} external={external} padding="0 8px">
                                    {t(text).toUpperCase()}
                                </StyledLinkNext>
                            </StyledListItem>
                        );
                    }
                )}
            </StyledList>
        </Row>
    );
};
