import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Button, Column, Description, Row, Title, Message } from 'ui';
import { TitleTags } from 'ui/Title';
import { ComponentSizesTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import config from './config.json';
import { colors } from 'helpers/colors';
import styled from 'styled-components';
import { IButton } from 'ui/Button';
import { IconTypes } from 'helpers/icons';

interface IVerifyConfig {
    title: string;
    submit: string;
    success: string;
    verifiedMessage: string;
}

const SaveButton = styled(Button)<IButton>`
    height: 45px;
    button {
        height: 43px;
    }
    border: 1px solid ${colors.yellow};
`;

interface IVerifyComponent {
    setSendEmail: (value: boolean) => void;
}

const VerifyComponent: FunctionComponent<IVerifyComponent> = ({ setSendEmail }: IVerifyComponent): ReactElement => {
    const { submit } = config as IVerifyConfig;
    return (
        <Row mbottom="15px">
            <SaveButton
                onClick={(): void => setSendEmail(true)}
                componentSize={ComponentSizesTypes.l}
                color={colors.yellow}
            >
                <Description uppercase color={colors.darkText} weight={WeightTypes.w600}>
                    {submit}
                </Description>
            </SaveButton>
        </Row>
    );
};

function getVerifyStep(verified: boolean, sendEmail: boolean) {
    if (verified) {
        return 1;
    }
    return sendEmail ? 0 : -1;
}

function getVerifyComponent(step: number, setSendEmail: (value: boolean) => void): ReactElement {
    const { verifiedMessage, success } = config as IVerifyConfig;

    switch (step) {
        case 1:
            return <Message padding="10px 0" text={verifiedMessage} icon={IconTypes.lock} />;
        case 0:
            return (
                <Message
                    padding="0 22px"
                    text={success}
                    icon={IconTypes.success}
                    componentHeight="47px"
                    bg={colors.grayMedium}
                />
            );
        case -1:
        default:
            return <VerifyComponent setSendEmail={setSendEmail} />;
    }
}

interface IVerify {
    verified: boolean;
}

const Verify: FunctionComponent<IVerify> = ({ verified }: IVerify): ReactElement => {
    const [sendEmail, setSendEmail] = useState<boolean>(false);
    const step = getVerifyStep(verified, sendEmail);
    const Component = getVerifyComponent(step, setSendEmail);
    const { title } = config as IVerifyConfig;
    return (
        <Column componentHeight="100%">
            <Title tagName={TitleTags.h2} margin="20px 0" fontSize={FontSizeTypes.m}>
                {title}
            </Title>
            {Component}
        </Column>
    );
};

export { Verify };
