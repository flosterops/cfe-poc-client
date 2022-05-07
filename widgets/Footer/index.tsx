import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { ILinkItem } from 'widgets/RenderLinks';
import { Account, DownloadGlyph } from 'widgets';
import { DownloadGlyphType } from 'widgets/DownloadGlyph';
import { Column, Description, Logo, NavLink, Row } from 'ui';
import { IDescription } from 'ui/Description';
import { ILayout, LayoutTags } from 'ui/Layout';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes } from 'helpers/enums';
import config from './config.json';
import { useTranslation } from 'react-i18next';
import { withDefaultNamespaces } from 'i18n/helpers';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { constants } from 'helpers/constants';

interface IFooterDescription {
    id: string;
    text: string;
}

const StyledFooter = styled(Column)<ILayout>`
    max-width: ${constants.width.lgDesktop};
    margin: 0 auto;
    background: ${colors.purpleMain};
    min-height: 420px;
    padding: 40px 0 80px;
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;

const StyledLinkWrapper = styled(Column)<ILayout>`
    margin-left: 20px;
    &:first-of-type {
        margin-top: 0;
    }
    &:last-of-type {
        margin-bottom: 0;
    }
`;

const StyledDownloadGlyphWrapper = styled(Row)<ILayout>`
    button {
        height: 45px;
    }
`;

const StyledDescription = styled(Description)<IDescription>`
    &:last-of-type {
        margin-bottom: 0;
    }
`;

interface IFooter {
    links: ILinkItem[];
}

const Footer = ({ links }: IFooter): ReactElement => {
    const { t } = useTranslation(withDefaultNamespaces());
    return (
        <StyledFooter bg={colors.purpleMain} jc={JustifyContentTypes.spaceBetween} tagName={LayoutTags.footer}>
            <Row jc={JustifyContentTypes.spaceBetween}>
                <Row componentWidth="auto" noFlex>
                    <Logo />
                    <Column mleft="140px" tagName={LayoutTags.ul}>
                        {links.map(
                            ({ id, text, to }: ILinkItem): ReactElement => {
                                return (
                                    <StyledLinkWrapper key={id} margin="15px 0" tagName={LayoutTags.li}>
                                        <NavLink href={to}>{t(text).toUpperCase()}</NavLink>
                                    </StyledLinkWrapper>
                                );
                            }
                        )}
                    </Column>
                </Row>
                <Row noFlex ai={AlignItemsTypes.center}>
                    <Account footer />
                    <StyledDownloadGlyphWrapper noFlex mleft="20px" componentHeight="45px">
                        <DownloadGlyph type={DownloadGlyphType.dark} />
                    </StyledDownloadGlyphWrapper>
                </Row>
            </Row>
            <Column mtop="60px">
                {config.map(
                    ({ id, text }: IFooterDescription): ReactElement => {
                        return (
                            <StyledDescription fontSize={FontSizeTypes.xs} mbottom="15px" key={id}>
                                {t(text)}
                            </StyledDescription>
                        );
                    }
                )}
            </Column>
        </StyledFooter>
    );
};

export { Footer };
