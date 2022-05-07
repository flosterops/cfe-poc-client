import React, { ReactElement } from 'react';
import { DashboardCart, Row } from 'ui';
import config from './config.json';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { ApplyCode } from './ApplyCode';
import { Info } from './Info';
import { IAccountInfoModel, IAccountPaymentTransactionsModel } from 'models/account';
import { Security } from './Security';
import { Balance } from './Balance';
import { Transactions } from './Transactions';
import { useAuth } from 'helpers/useAuth';

enum CartComponentTypes {
    code = 'code',
    security = 'security',
    info = 'info',
    balance = 'balance',
    transaction = 'transaction',
}

export interface IDashboardConfigLink {
    href: string;
    text: string;
}

export interface IDashboardConfig {
    id: string;
    title: string;
    link: IDashboardConfigLink | null;
    width: string;
    height: string;
    padding: string;
}

interface IDashboardTabConfig extends IDashboardConfig {
    component: CartComponentTypes;
}

const Dashboard = styled(Row)<ILayout>`
    flex-wrap: wrap;
`;

interface IAccountDashboard {
    accountInfo: IAccountInfoModel;
    transactions: IAccountPaymentTransactionsModel[];
}

const AccountDashboard = ({ accountInfo, transactions }: IAccountDashboard): ReactElement | null => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const CartComponent = (type: CartComponentTypes): ReactElement | null => {
        switch (type) {
            case CartComponentTypes.code:
                return <ApplyCode />;
            case CartComponentTypes.info:
                return <Info email={accountInfo.email} glyphTag={accountInfo.glyphTag} />;
            case CartComponentTypes.security:
                return <Security status={accountInfo.securityStatus} />;
            case CartComponentTypes.balance:
                return (
                    <Balance
                        channel="Test info"
                        glyph={accountInfo.balance.glyph}
                        binary={accountInfo.balance.binary}
                    />
                );
            case CartComponentTypes.transaction:
                return <Transactions transactions={transactions} />;
            default:
                return null;
        }
    };

    return (
        <Dashboard componentHeight="100%">
            {(config as IDashboardTabConfig[]).map(
                ({ id, title, link, width, padding, height, component }: IDashboardTabConfig): ReactElement => {
                    return (
                        <Row key={id} componentHeight={height} componentWidth={width} padding={padding}>
                            <DashboardCart title={title} link={link}>
                                {CartComponent(component)}
                            </DashboardCart>
                        </Row>
                    );
                }
            )}
        </Dashboard>
    );
};

export { AccountDashboard };
