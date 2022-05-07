import React, { FunctionComponent, ReactElement } from 'react';
import { IDashboardConfig } from 'widgets/AccountLayout/AccountDashboard';
import { Column, DashboardCart, Row } from 'ui';
import { IAccountInfoModel } from 'models/account';
import config from './config.json';
import { ChangePassword } from './ChangePassword';
import { Questions } from './Questions';
import { Mobile } from './Mobile';
import { Verify } from './Verify';
import { Locations } from './Locations';
import { useAuth } from '../../../helpers/useAuth';

enum AccountSecurityComponentTypes {
    password = 'password',
    questions = 'questions',
    mobile = 'mobile',
    verify = 'verify',
    locations = 'locations',
}

interface AccountSecurityConfig extends IDashboardConfig {
    component: AccountSecurityComponentTypes;
}

interface AccountSecurity {
    accountInfo: IAccountInfoModel;
}

const AccountSecurity: FunctionComponent<AccountSecurity> = ({ accountInfo }: AccountSecurity): ReactElement | null => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const CodeComponent = (component: AccountSecurityComponentTypes): ReactElement | null => {
        const hasQuestions = !!(accountInfo.secretQuestionFirst.answer && accountInfo.secretQuestionSecond.answer);
        switch (component) {
            case AccountSecurityComponentTypes.password:
                return <ChangePassword />;
            case AccountSecurityComponentTypes.questions:
                return <Questions hasQuestions={hasQuestions} />;
            case AccountSecurityComponentTypes.mobile:
                return <Mobile hasQuestions={hasQuestions} hasMobileAuth={!!accountInfo.mobileAuthKey} />;
            case AccountSecurityComponentTypes.verify:
                return <Verify verified={accountInfo.emailVerified} />;
            case AccountSecurityComponentTypes.locations:
                return <Locations />;
            default:
                return null;
        }
    };

    return (
        <Column componentHeight="100%">
            {(config as AccountSecurityConfig[]).map(
                ({ id, title, link, width, padding, height, component }: AccountSecurityConfig): ReactElement => {
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

export { AccountSecurity };
