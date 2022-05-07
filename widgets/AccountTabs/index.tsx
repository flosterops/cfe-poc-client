import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';
import { INavLink } from 'ui/NavLink';
import { IDescription } from 'ui/Description';
import { Column, Description, Icon, NavLink, Row } from 'ui';
import { IIcon } from 'ui/Icon';
import { ILayout } from 'ui/Layout';
import { IconTypes } from 'helpers/icons';
import { hoverEffect } from 'helpers/theme';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes } from 'helpers/enums';
import config from './config.json';

export enum AccountTabIdTypes {
    dashboard = 'dashboard',
    info = 'info',
    code = 'code',
    payments = 'payments',
    transactions = 'transactions',
    security = 'security',
    linking = 'linking',
}

interface ILink {
    id: string;
    text: string;
    tabId: AccountTabIdTypes;
}

const ExpandIcon = styled(Icon)<IIcon>`
    ${hoverEffect}
    opacity: 0;
`;

interface ILinkText extends IDescription {
    active: boolean;
}

const LinkText = styled(Description)<ILinkText>`
    color: ${(props: ILinkText) => (props.active ? colors.darkText : colors.lightText)};
`;

interface IAccountLink extends INavLink {
    active: boolean;
}

const AccountLink = styled(NavLink)<IAccountLink>`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    background: ${(props: IAccountLink): string => (props.active ? colors.yellow : colors.dark)};
    border-bottom: 3px solid transparent;
    ${hoverEffect}
    &:hover {
        opacity: 1 !important;
        border-bottom: 3px solid ${colors.yellow};
        & ${ExpandIcon} {
            opacity: ${(props: IAccountLink) => (props.active ? '0' : ' 1')};
        }
    }
`;

const TabsContainer = styled(Column)<ILayout>`
    max-width: 350px;
`;

interface IAccountTabs {
    selectedTab: string;
}

const AccountTabs: FunctionComponent<IAccountTabs> = ({ selectedTab }: IAccountTabs): ReactElement => {
    return (
        <TabsContainer mright="30px">
            {(config as ILink[]).map(
                ({ id, text, tabId }: ILink): ReactElement => {
                    const active = selectedTab === tabId;
                    return (
                        <AccountLink
                            padding="0 10px 0 20px"
                            mbottom="20px"
                            href={`/account/${tabId}`}
                            key={id}
                            active={active}
                        >
                            <Row
                                ai={AlignItemsTypes.center}
                                jc={JustifyContentTypes.spaceBetween}
                                componentHeight="100%"
                            >
                                <LinkText fontSize={FontSizeTypes.m} active={active} uppercase>
                                    {text}
                                </LinkText>
                                <ExpandIcon alt={IconTypes.expand} icon={IconTypes.expand} />
                            </Row>
                        </AccountLink>
                    );
                }
            )}
        </TabsContainer>
    );
};

export { AccountTabs };
