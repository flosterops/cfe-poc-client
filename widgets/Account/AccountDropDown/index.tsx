import React, { FunctionComponent, ReactElement } from 'react';
import { Button, Column, Description } from 'ui';
import { colors } from 'helpers/colors';
import styled from 'styled-components';
import { IButton } from 'ui/Button';
import { ComponentSizesTypes, FontSizeTypes } from 'helpers/enums';
import { ILayout } from 'ui/Layout';
import { useRouter } from 'next/router';
import { useAuth } from 'helpers/useAuth';

const Register = styled(Button)<IButton>`
    border: 2px solid ${colors.yellow};
`;

const LogOut = styled(Button)<IButton>`
    border: 1px solid ${colors.yellow};
`;

const StyledDropDown = styled(Column)<ILayout>`
    position: absolute;
    left: 0;
    top: 60px;
    z-index: 5;
`;

interface AccountDropDown {
    setVisible: (value: boolean) => void;
}

const AccountDropDown: FunctionComponent<AccountDropDown> = ({ setVisible }: AccountDropDown): ReactElement => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const handleClick = async (url: string): Promise<void> => {
        await router.push(url);
        setVisible(false);
    };

    const handleLogUt = async (): Promise<void> => {
        logout();
        setVisible(false);
        await router.push('/');
    };

    if (!user) {
        return (
            <StyledDropDown bg={colors.dark} padding="20px 15px">
                <Button
                    componentSize={ComponentSizesTypes.full}
                    onClick={(): Promise<void> => handleClick('/login')}
                    height="45px"
                    color={colors.yellow}
                >
                    <Description fontSize={FontSizeTypes.m} color={colors.dark} uppercase>
                        login
                    </Description>
                </Button>
                <Register
                    componentSize={ComponentSizesTypes.full}
                    onClick={(): Promise<void> => handleClick('/register')}
                    height="45px"
                    mtop="20px"
                    color={colors.dark}
                >
                    <Description fontSize={FontSizeTypes.m} uppercase>
                        register
                    </Description>
                </Register>
            </StyledDropDown>
        );
    }

    return (
        <StyledDropDown bg={colors.dark} padding="20px 15px">
            <Button
                componentSize={ComponentSizesTypes.full}
                onClick={(): Promise<void> => handleClick('/account/dashboard')}
                height="45px"
                color={colors.dark}
            >
                <Description fontSize={FontSizeTypes.m} uppercase>
                    account
                </Description>
            </Button>
            <Button
                componentSize={ComponentSizesTypes.full}
                onClick={(): Promise<void> => handleClick('/account/code')}
                height="45px"
                mtop="20px"
                color={colors.dark}
            >
                <Description fontSize={FontSizeTypes.m} uppercase>
                    apply code
                </Description>
            </Button>
            <LogOut
                componentSize={ComponentSizesTypes.full}
                onClick={handleLogUt}
                height="45px"
                mtop="20px"
                color={colors.dark}
            >
                <Description fontSize={FontSizeTypes.m} uppercase>
                    sign out
                </Description>
            </LogOut>
        </StyledDropDown>
    );
};

export { AccountDropDown };
