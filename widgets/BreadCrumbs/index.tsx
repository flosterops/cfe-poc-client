import React, { FunctionComponent, ReactElement } from 'react';
import { Description, NavLink, Row } from 'ui';
import { AlignItemsTypes, FontSizeTypes } from 'helpers/enums';
import styled from 'styled-components';
import { INavLink } from 'ui/NavLink';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { ILayout } from 'ui/Layout';
import { useRouter } from 'next/router';
import { getLinkColor, getBreadCrumbsLinks } from 'widgets/BreadCrumbs/helpers';

interface StyledLink extends INavLink {
    length: number;
    index: number;
}

const StyledLink = styled(NavLink)<StyledLink>`
    color: ${({ length, index }: StyledLink) => getLinkColor(length, index)};
    ${media.lessThan(BreakPoints.phone)} {
        font-size: 10px;
    }
`;

const DesktopBreadCrumbs = styled(Row)<ILayout>`
    ${media.lessThan(BreakPoints.phone)} {
        display: none;
    }
`;
const MobileBreadCrumbs = styled(Row)<ILayout>`
    display: none;
    ${media.lessThan(BreakPoints.phone)} {
        display: flex;
    }
`;

const BackTo = styled(Row)<ILayout>`
    &:hover {
        opacity: 0.8;
    }
`;

export interface IBreadCrumb {
    href: string;
    text: string;
}

interface IBreadCrumbs {
    channel?: string;
    productId?: string;
    subcategory?: string;
}

const BreadCrumbs: FunctionComponent<IBreadCrumbs> = ({
    channel,
    productId,
    subcategory,
}: IBreadCrumbs): ReactElement => {
    const links = getBreadCrumbsLinks(channel, productId, subcategory);
    const router = useRouter();
    return (
        <Row componentWidth="auto" ai={AlignItemsTypes.center}>
            <DesktopBreadCrumbs>
                {links.map(
                    ({ text, href }: IBreadCrumb, index: number): ReactElement => {
                        const navText = index !== links.length - 1 ? `${text} >` : text;
                        return (
                            <StyledLink key={text} length={links.length} index={index} href={href} mright="10px">
                                {navText}
                            </StyledLink>
                        );
                    }
                )}
            </DesktopBreadCrumbs>
            <MobileBreadCrumbs ai={AlignItemsTypes.center}>
                <BackTo ai={AlignItemsTypes.center} onClick={(): void => router.back()}>
                    <Description fontSize={FontSizeTypes.m}>{`< Back to`}</Description>
                </BackTo>
            </MobileBreadCrumbs>
        </Row>
    );
};

export { BreadCrumbs };
