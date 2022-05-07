import React, { FunctionComponent, ReactElement } from 'react';
import { IDashboardConfig } from 'widgets/AccountLayout/AccountDashboard';
import { Column, DashboardCart, Row } from 'ui';
import { Code } from './Code';
import { History } from './History';
import config from './config.json';
import { IApplyCodeTransactions } from 'models/account';

enum ApplyCodeComponentTypes {
    code = 'code',
    history = 'history',
}

interface ApplyCodeConfig extends IDashboardConfig {
    component: ApplyCodeComponentTypes;
}

interface IAccountApplyCode {
    transactions: IApplyCodeTransactions[];
}

const AccountApplyCode: FunctionComponent<IAccountApplyCode> = ({ transactions }: IAccountApplyCode): ReactElement => {
    const CodeComponent = (component: ApplyCodeComponentTypes): ReactElement | null => {
        switch (component) {
            case ApplyCodeComponentTypes.code:
                return <Code />;
            case ApplyCodeComponentTypes.history:
                return <History transactions={transactions} />;
            default:
                return null;
        }
    };

    return (
        <Column componentHeight="100%">
            {(config as ApplyCodeConfig[]).map(
                ({ id, title, link, width, padding, height, component }: ApplyCodeConfig): ReactElement => {
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

export { AccountApplyCode };
