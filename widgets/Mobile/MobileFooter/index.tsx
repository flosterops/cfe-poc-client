import React, { ReactElement } from 'react';
import { Locales } from 'widgets/index';
import { Column, Description, Logo, NavLink, Row } from 'ui';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes } from 'helpers/enums';
import config from './config.json';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';

interface IMobileFooterConfig {
    social: string[];
    links: IFooterLink[];
}

interface IFooterLink {
    href: string;
    text: string;
}

const StyledMobileFooter = styled(Column)<ILayout>`
    display: none;
    ${media.lessThan(BreakPoints.phone)} {
        display: flex;
    }
`;

const LinksContainer = styled(Row)<ILayout>`
    flex-wrap: wrap;
`;

const MobileFooter = (): ReactElement => {
    const { links, social } = config as IMobileFooterConfig;
    return (
        <StyledMobileFooter padding="33px 0 40px">
            <Row ai={AlignItemsTypes.center} componentHeight="40px" jc={JustifyContentTypes.spaceBetween}>
                <Logo />
                <Row componentWidth="auto" ai={AlignItemsTypes.center}>
                    {social.map(
                        (src: string): ReactElement => {
                            return (
                                <Row key={src} mleft="13px" componentWidth="auto">
                                    <NavLink href="https://www.google.com/">
                                        <img src={src} alt={src} />
                                    </NavLink>
                                </Row>
                            );
                        }
                    )}
                </Row>
            </Row>
            <Row margin="30px 0 25px" jc={JustifyContentTypes.flexEnd}>
                <Locales footer />
            </Row>
            <LinksContainer>
                {links.map(
                    (link: IFooterLink): ReactElement => {
                        return (
                            <Row key={link.text} componentWidth="50%">
                                <NavLink href={link.href}>
                                    <Description fontSize={FontSizeTypes.xs} uppercase>
                                        {link.text}
                                    </Description>
                                </NavLink>
                            </Row>
                        );
                    }
                )}
            </LinksContainer>
            <Column mtop="30px">
                <Description fontSize={FontSizeTypes.xxs}>
                    GLYPH © 2020-2020 gamigo US Inc, a member of gamigo group. Glyph is a registered trademark of gamigo
                    US Inc.
                </Description>
                <Description fontSize={FontSizeTypes.xxs}>
                    in the European Union and the US. All other trademarks are properties of their respective owners.
                    All rights reserved.
                </Description>
            </Column>
        </StyledMobileFooter>
    );
};

export { MobileFooter };
