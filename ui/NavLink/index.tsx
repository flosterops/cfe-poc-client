import React, { PropsWithChildren, ReactElement } from 'react';
import { ISpaceTypes } from 'helpers/enums';
import Link, { LinkProps } from 'next/link';
import styled from 'styled-components';
import { space } from 'helpers/theme';
import { LinkUrl, useAuth } from 'helpers/useAuth';

export interface INavLinkModel extends LinkProps {
    external?: boolean;
    withAuth?: boolean;
}

export type INavLink = INavLinkModel & ISpaceTypes;

const StyledLink = styled.a<ISpaceTypes>`
    ${space}
    height: 100%;
    cursor: pointer;
    border-bottom: 4px solid transparent;
    border-top: 4px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function getWithAuthHref(href: LinkUrl, isAuth: boolean, withAuth?: boolean): LinkUrl {
    if (withAuth && !isAuth) {
        return '/login';
    }
    return href;
}

const NavLink = ({
    href,
    as,
    children,
    external,
    withAuth = false,
    ...props
}: PropsWithChildren<INavLink>): ReactElement => {
    const { user } = useAuth();
    const withAuthHref = getWithAuthHref(href, !!user, withAuth);
    if (external) {
        return (
            <StyledLink href={withAuthHref as string} {...props}>
                {children}
            </StyledLink>
        );
    }

    return (
        <Link href={withAuthHref as string} as={as}>
            <StyledLink {...props}>{children}</StyledLink>
        </Link>
    );
};

export { NavLink };
