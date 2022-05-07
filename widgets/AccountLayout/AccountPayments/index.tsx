import React, { FunctionComponent, ReactElement } from 'react';
import { IDashboardConfig } from 'widgets/AccountLayout/AccountDashboard';
import { Column, DashboardCart, Row } from 'ui';
import { IAccountPaymentModel } from 'models/account';
import { Payments } from './Payments';
import { NewPayment } from './NewPayment';
import config from './config.json';
import { useAuth } from 'helpers/useAuth';

enum AccountPaymentsComponentTypes {
    payments = 'payments',
    newPayments = 'newPayments',
}

interface AccountPaymentsConfig extends IDashboardConfig {
    component: AccountPaymentsComponentTypes;
}

interface AccountPayments {
    paymentMethods: IAccountPaymentModel[];
}

const AccountPayments: FunctionComponent<AccountPayments> = ({
    paymentMethods,
}: AccountPayments): ReactElement | null => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const CodeComponent = (component: AccountPaymentsComponentTypes): ReactElement | null => {
        switch (component) {
            case AccountPaymentsComponentTypes.payments:
                return <Payments paymentMethods={paymentMethods} />;
            case AccountPaymentsComponentTypes.newPayments:
                return <NewPayment />;
            default:
                return null;
        }
    };

    return (
        <Column componentHeight="100%">
            {(config as AccountPaymentsConfig[]).map(
                ({ id, title, link, width, padding, height, component }: AccountPaymentsConfig): ReactElement => {
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

export { AccountPayments };
