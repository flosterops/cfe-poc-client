import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from 'helpers/colors';
import Link from 'next/link';
import { UrlObject } from 'url';

interface Props {
    text: string;
    href: string | UrlObject;
}

const LinkItem = styled.a`
    font-size: 16px;
    color: ${colors.lightText};
    letter-spacing: 1px;
    text-align: center;
    margin-right: 30px;
    text-transform: uppercase;
    cursor: pointer;
    &:last-of-type {
        margin: 0;
    }
    &:hover {
        color: ${colors.yellow};
    }
`;

// TODO not ready
export function GameMenuItem(props: Props): ReactElement {
    return (
        <Link href={props.href}>
            <LinkItem>{props.text}</LinkItem>
        </Link>
    );
}
