import React, { FunctionComponent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { IDashboardConfig } from 'widgets/AccountLayout/AccountDashboard';
import { Column, DashboardCart, Description, Icon, Row } from 'ui';
import { IAccountPaymentTransactionsModel } from 'models/account';
import { colors } from 'helpers/colors';
import { ILayout } from 'ui/Layout';
import { AlignItemsTypes } from 'helpers/enums';
import { History } from './History';
import { Order } from './Order';
import config from './config.json';
import { IconTypes } from 'helpers/icons';
import { useAuth } from 'helpers/useAuth';

const BackToLink = styled(Row)<ILayout>`
    cursor: pointer;
    &: hover {
        opacity: 0.8;
    }
`;

enum AccountTransactionComponentTypes {
    history = 'history',
    order = 'order',
}

interface AccountLinksConfig extends IDashboardConfig {
    component: AccountTransactionComponentTypes;
}

interface AccountTransaction {
    transactions: IAccountPaymentTransactionsModel[];
}

const AccountTransaction: FunctionComponent<AccountTransaction> = ({
    transactions,
}: AccountTransaction): ReactElement | null => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const [selectedTransaction, setSelectedTransaction] = useState<IAccountPaymentTransactionsModel | null>(null);

    const CodeComponent = (component: AccountTransactionComponentTypes): ReactElement | null => {
        switch (true) {
            case component === AccountTransactionComponentTypes.history && !selectedTransaction:
                return <History setSelectedTransaction={setSelectedTransaction} transactions={transactions} />;
            case component === AccountTransactionComponentTypes.order && !!selectedTransaction:
                return <Order transaction={selectedTransaction as IAccountPaymentTransactionsModel} />;
            default:
                return null;
        }
    };

    return (
        <Column componentHeight="100%">
            {(config as AccountLinksConfig[]).map(
                ({ id, title, link, width, padding, height, component }: AccountLinksConfig): ReactElement | null => {
                    const Component = CodeComponent(component);

                    if (!Component) {
                        return null;
                    }

                    return (
                        <Column key={id}>
                            <Row componentHeight={height} componentWidth={width} padding={padding}>
                                <DashboardCart title={title} link={link}>
                                    {Component}
                                </DashboardCart>
                            </Row>
                            {component === AccountTransactionComponentTypes.order && (
                                <BackToLink
                                    mbottom="40px"
                                    onClick={(): void => setSelectedTransaction(null)}
                                    ai={AlignItemsTypes.center}
                                >
                                    <Icon mright="10px" icon={IconTypes.backArrow} alt={IconTypes.backArrow} />
                                    <Description color={colors.yellow}>Back to transaction History</Description>
                                </BackToLink>
                            )}
                        </Column>
                    );
                }
            )}
        </Column>
    );
};

export { AccountTransaction };
