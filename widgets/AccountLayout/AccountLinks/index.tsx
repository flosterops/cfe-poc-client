import React, { FunctionComponent, ReactElement } from 'react';
import { IDashboardConfig } from 'widgets/AccountLayout/AccountDashboard';
import { Column, DashboardCart, Row } from 'ui';
import { IAccountLinks } from 'models/account';
import config from './config.json';
import { Links } from './Links';
import { useAuth } from 'helpers/useAuth';

enum AccountLinksComponentTypes {
    links = 'links',
}

interface AccountLinksConfig extends IDashboardConfig {
    component: AccountLinksComponentTypes;
}

interface AccountLinks {
    accountLinks: IAccountLinks[];
}

const AccountLinks: FunctionComponent<AccountLinks> = ({ accountLinks }: AccountLinks): ReactElement | null => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const CodeComponent = (component: AccountLinksComponentTypes): ReactElement | null => {
        switch (component) {
            case AccountLinksComponentTypes.links:
                return <Links accountLinks={accountLinks} />;
            default:
                return null;
        }
    };

    return (
        <Column componentHeight="100%">
            {(config as AccountLinksConfig[]).map(
                ({ id, title, link, width, padding, height, component }: AccountLinksConfig): ReactElement => {
                    return (
                        <Row key={id} componentHeight={height} componentWidth={width} padding={padding}>
                            <DashboardCart title={title} link={link}>
                                {CodeComponent(component)}
                            </DashboardCart>
                        </Row>
                    );
                }
            )}
        </Column>
    );
};

export { AccountLinks };
