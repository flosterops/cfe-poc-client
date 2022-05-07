import React, { FunctionComponent, ReactElement } from 'react';
import { Column, DashboardCart, Row } from 'ui';
import { IDashboardConfig } from 'widgets/AccountLayout/AccountDashboard';
import { IAccountInfoModel } from 'models/account';
import { Email } from './Email';
import { GlyphTag } from './GlyphTag';
import { Offers } from './Offers';
import config from './config.json';
import { useAuth } from 'helpers/useAuth';

enum AccountInfoComponentTypes {
    tag = 'tag',
    email = 'email',
    offers = 'offers',
}

interface AccountInfoConfig extends IDashboardConfig {
    component: AccountInfoComponentTypes;
}

interface IAccountInfo {
    accountInfo: IAccountInfoModel;
}

const AccountInfo: FunctionComponent<IAccountInfo> = ({ accountInfo }: IAccountInfo): ReactElement | null => {
    const { user } = useAuth();
    if (!user) {
        return null;
    }

    const CodeComponent = (component: AccountInfoComponentTypes): ReactElement | null => {
        switch (component) {
            case AccountInfoComponentTypes.email:
                return <Email email={user?.account?.email as string} />;
            case AccountInfoComponentTypes.tag:
                return <GlyphTag glyphTag={accountInfo.glyphTag} />;
            case AccountInfoComponentTypes.offers:
                return <Offers />;
            default:
                return null;
        }
    };

    return (
        <Column componentHeight="100%">
            {(config as AccountInfoConfig[]).map(
                ({ id, title, link, width, padding, height, component }: AccountInfoConfig): ReactElement => {
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

export { AccountInfo };
