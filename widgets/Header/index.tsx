import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import { Account, DownloadGlyph, Locales, RenderLinks } from 'widgets';
import { ILinkItem } from 'widgets/RenderLinks';
import { Layout, Logo, NavLink, Row } from 'ui';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { BreakPoints } from 'helpers/responsive';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { media } from 'helpers/theme';
import { constants } from 'helpers/constants';

const StyledMobileHeader = styled(Row)<ILayout>`
    max-width: ${constants.width.lgDesktop};
    margin: 0 auto;
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
        height: 40px;
    }
    ${media.moreThan(BreakPoints.phone)} {
        display: flex;
    }
`;

const AccountContainer = styled(Row)<ILayout>`
    margin: 0 30px 0 10px;
    ${media.lessThan(BreakPoints.desktop)} {
        margin: 0 10px 0 0;
    }
`;

export interface HeaderElements {
    logo?: boolean;
    menu?: boolean;
    locales?: boolean;
    account?: boolean;
    downloadButton?: boolean;
}

interface IHeader {
    links: ILinkItem[];
    title?: ReactNode;
    show?: HeaderElements;
}

const Header: FunctionComponent<IHeader> = ({ links, title, show }: IHeader): ReactElement => {
    const { logo = true, menu = true, locales = true, account = true, downloadButton = true } = show || {};

    let leftWidth = 'auto';
    let centerWidth = '';
    let rightWidth = '100%';
    // to put title in center we should give left and right components same width, it's not necessary 33% but it's not clear how to calculate it more precise
    if (title) {
        leftWidth = centerWidth = rightWidth = '33%';
    }

    return (
        <StyledMobileHeader ai={AlignItemsTypes.center} componentHeight="60px" jc={JustifyContentTypes.spaceBetween}>
            <Row componentWidth={leftWidth} componentHeight="100%" ai={AlignItemsTypes.center}>
                {logo && (
                    <NavLink href="/">
                        <Logo padding="2px 0" />
                    </NavLink>
                )}
                {menu && <RenderLinks config={links} />}
            </Row>
            {title && (
                <Layout componentWidth={centerWidth} ai={AlignItemsTypes.center}>
                    {title}
                </Layout>
            )}
            <Row componentWidth={rightWidth} ai={AlignItemsTypes.center} jc={JustifyContentTypes.flexEnd}>
                {locales && <Locales />}
                {account && (
                    <AccountContainer componentWidth="auto">
                        <Account />
                    </AccountContainer>
                )}
                {downloadButton && <DownloadGlyph />}
            </Row>
        </StyledMobileHeader>
    );
};

export { Header };
