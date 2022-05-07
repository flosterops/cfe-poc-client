import React, { FunctionComponent, ReactElement } from 'react';
import { Button, CloseIcon, Column, Description, Row, Title } from 'ui';
import { colors } from 'helpers/colors';
import { AlignItemsTypes, ComponentSizesTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { TitleTags } from 'ui/Title';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { IButton } from 'ui/Button';
import config from './config.json';
import { IAccountPaymentModel } from 'models/account';

interface IRemovePaymentConfig {
    title: string;
    remove: string;
    cancel: string;
}

const Footer = styled(Row)<ILayout>`
    border-top: 2px solid ${colors.yellow};
`;

const StyledButton = styled(Button)<IButton>`
    p {
        font-size: 16px;
    }
    button {
        height: 58px;
        border: 1px solid ${colors.yellow};
    }
`;

interface IRemovePayment {
    payment: IAccountPaymentModel;
    onCancel: () => void;
    onAccept: (id: string) => void;
}

const RemovePayment: FunctionComponent<IRemovePayment> = ({
    payment,
    onCancel,
    onAccept,
}: IRemovePayment): ReactElement => {
    const { title, cancel, remove } = config as IRemovePaymentConfig;
    return (
        <Column componentWidth="740px">
            <Column padding="12px" ai={AlignItemsTypes.center} bg={colors.purplePink} componentHeight="175px">
                <Row jc={JustifyContentTypes.flexEnd}>
                    <CloseIcon width={22} height={22} color={colors.dark} onClick={onCancel} />
                </Row>
                <Title tagName={TitleTags.h2} fontSize={FontSizeTypes.m} uppercase>
                    {title}
                </Title>
                <Description uppercase mtop="40px">
                    {`${payment.type}: ${payment.card}`}
                </Description>
            </Column>
            <Footer
                padding="0 50px"
                bg={colors.dark}
                componentHeight="135px"
                jc={JustifyContentTypes.spaceBetween}
                ai={AlignItemsTypes.center}
            >
                <StyledButton
                    onClick={onCancel}
                    componentSize={ComponentSizesTypes.full}
                    color={colors.dark}
                    mright="55px"
                >
                    <Description weight={WeightTypes.w600} uppercase>
                        {cancel}
                    </Description>
                </StyledButton>
                <StyledButton
                    onClick={(): void => onAccept(payment.id)}
                    componentSize={ComponentSizesTypes.full}
                    color={colors.yellow}
                >
                    <Description weight={WeightTypes.w600} uppercase color={colors.darkText}>
                        {remove}
                    </Description>
                </StyledButton>
            </Footer>
        </Column>
    );
};

export { RemovePayment };
