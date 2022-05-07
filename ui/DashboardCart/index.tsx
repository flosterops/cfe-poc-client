import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Column, Description, NavLink, Row, Title, BackToIcon } from 'ui';
import { TitleTags } from 'ui/Title';
import { IDashboardConfigLink } from 'widgets/AccountLayout/AccountDashboard';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';

interface IDashboardCart {
    title: string;
    link: IDashboardConfigLink | null;
}

const DashboardCart: FunctionComponent<IDashboardCart> = ({
    title,
    link,
    children,
}: PropsWithChildren<IDashboardCart>): ReactElement => {
    const href = {
        pathname: '/account/[accountTabId]',
        query: { accountTabId: link?.href },
    };
    return (
        <Column componentHeight="100%" padding="25px 30px" bg={colors.transparentDark}>
            <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.spaceBetween}>
                {title && (
                    <Title uppercase tagName={TitleTags.h2}>
                        {title}
                    </Title>
                )}
                {link && (
                    <Row componentWidth="auto" ai={AlignItemsTypes.center}>
                        <NavLink href={href}>
                            <Description color={colors.yellow}>{link.text}</Description>
                            <BackToIcon color={colors.yellow} width={20} height={18} />
                        </NavLink>
                    </Row>
                )}
            </Row>
            {children}
        </Column>
    );
};

export { DashboardCart };
