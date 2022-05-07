import React, { FunctionComponent, ReactElement, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Namespaces } from 'i18n/helpers';
import { Description, Row } from 'ui';
import { AlignItemsTypes } from 'helpers/enums';
import styled from 'styled-components';
import { IDescription } from 'ui/Description';
import { media } from 'helpers/theme';
import { BreakPoints } from 'helpers/responsive';
import { ILayout } from 'ui/Layout';
import { AccountDropDown } from './AccountDropDown';
import { colors } from 'helpers/colors';
import { useOnClickOutside } from 'helpers/useOnClickOutside';
import { useAuth } from 'helpers/useAuth';
import { IAuthModel } from 'pages/_app';
import { AccountIcon } from 'ui/Icon/AccountIcon';

function getAccountBg(visible: boolean, footer?: boolean): string {
    if (footer) {
        return 'transparent';
    }
    return visible ? colors.purplePink : colors.dark;
}

const Nickname = styled(Description)<IDescription>`
    ${media.lessThan(BreakPoints.smallDesktop)} {
        display: none;
    }
`;

const ClickableRow = styled(Row)<ILayout>`
    cursor: pointer;
    height: 60px;
    padding: 0 5px;
`;

interface IAccount {
    footer?: boolean;
}

function getAccountText(t: (value: string) => string, user: IAuthModel | null): string {
    if (user && user.account && user.account.email) {
        return user.account.email;
    }
    return t('myAccount');
}

const Account: FunctionComponent<IAccount> = ({ footer = false }: IAccount): ReactElement => {
    const { t } = useTranslation(Namespaces.common);
    const [visible, setVisible] = useState<boolean>(false);
    const ref = useRef(null);
    const { user } = useAuth();

    useOnClickOutside(ref, (): void => setVisible(false));
    const userName = getAccountText(t, user);
    const bgColor = getAccountBg(visible, footer);

    return (
        <ClickableRow
            bg={bgColor}
            componentWidth="auto"
            ai={AlignItemsTypes.center}
            onClick={(): void => setVisible(!visible)}
            layoutRef={ref}
        >
            <AccountIcon mright="10px" />
            <Nickname>{userName?.toUpperCase()}</Nickname>
            {visible && <AccountDropDown setVisible={setVisible} />}
        </ClickableRow>
    );
};

export { Account };
