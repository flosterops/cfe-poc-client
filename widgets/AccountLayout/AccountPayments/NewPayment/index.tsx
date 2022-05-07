import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { Button, Column, Description, Icon, LightCart, Row } from 'ui';
import { IButton } from 'ui/Button';
import { AlignItemsTypes, ComponentSizesTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import { getPaymentIcon } from 'widgets/AccountLayout/AccountPayments/Payments';
import { IconTypes } from 'helpers/icons';
import { Collapse } from 'ui/Collapse';
import { Field, Form } from 'widgets';
import { IFieldProps } from 'widgets/Form/FieldWrap';
import { inputStyles } from 'helpers/inputStyled';
import { selectStyles } from 'widgets/Form/Fields/SelectSearch/helpers';
import { isRequired } from 'widgets/Form/validations';
import { FormikProps, FormikValues } from 'formik';
import { ISpecialSelectOptions } from 'widgets/Form/Fields/SelectSearch';

const { getFieldBorder, getFieldBg, getFieldHeight } = inputStyles.account;

const AddPayment = styled(Button)<IButton>`
    button {
        width: 15px;
        height: 15px;
        border-radius: 3px;
    }
`;

const SaveButton = styled(Button)<IButton>`
    width: 180px;
    height: 45px;
    button {
        height: 43px;
    }
    border: 1px solid ${colors.yellow};
`;

const StyledField = styled(Field)<IFieldProps>`
    input {
        padding: 0 12px;
        ${getFieldBorder};
        ${getFieldBg};
        ${getFieldHeight};
        border-radius: 5px;
    }
`;

const validationSchema = {
    name: [isRequired()],
    street: [isRequired()],
    type: [isRequired()],
    city: [isRequired()],
    number: [isRequired()],
    state: [isRequired()],
    zip: [isRequired()],
    year: [isRequired()],
    month: [isRequired()],
    country: [isRequired()],
    code: [isRequired()],
};

interface CreditIcon {
    visible: boolean;
}

const AddCreditCart = (): ReactElement => {
    const Heading = (): ReactElement => {
        return (
            <Row componentWidth="auto" ai={AlignItemsTypes.center}>
                <Row componentWidth="50px">
                    <Icon icon={getPaymentIcon(PaymentCartTypes.credit)} alt="credits" />
                </Row>
                <Description mleft="60px" uppercase>
                    credit
                </Description>
            </Row>
        );
    };

    const CreditIcon = ({ visible }: CreditIcon): ReactElement => {
        return (
            <AddPayment componentSize="auto" color={visible ? colors.lightText : colors.yellow}>
                <Description color={colors.dark}>+</Description>
            </AddPayment>
        );
    };

    const selectProps = { style: selectStyles.accountBordered, isSearchable: false };
    return (
        <Collapse
            componentHeight="95px"
            mbottom="25px"
            padding="0 50px"
            color="#FFFFFF12"
            heading={<Heading />}
            icon={(visible: boolean) => <CreditIcon visible={visible} />}
        >
            <Form initialValues={{}} validations={validationSchema}>
                {({ isValid }: FormikProps<FormikValues>): ReactElement => {
                    return (
                        <CardForm
                            selectProps={selectProps}
                            submitView={
                                <SaveButton disabled={!isValid} color={colors.yellow}>
                                    <Description uppercase color={colors.dark} fontSize={FontSizeTypes.m}>
                                        Save
                                    </Description>
                                </SaveButton>
                            }
                        />
                    );
                }}
            </Form>
        </Collapse>
    );
};

interface ICardForm {
    selectProps: ISpecialSelectOptions;
    submitView: ReactNode;
}

export function CardForm({ selectProps, submitView }: ICardForm) {
    return (
        <Column>
            <Row mbottom="30px">
                <Row componentWidth="50%" pright="20px">
                    <StyledField
                        componentSize={ComponentSizesTypes.full}
                        type="text"
                        name="name"
                        label="Your name as it appears on your credit card"
                    />
                </Row>
                <Row componentWidth="50%" pleft="20px">
                    <StyledField
                        componentSize={ComponentSizesTypes.full}
                        type="text"
                        name="street"
                        label="Street Address"
                    />
                </Row>
            </Row>
            <Row mbottom="30px">
                <Row componentWidth="50%" pright="20px">
                    <StyledField
                        componentSize={ComponentSizesTypes.full}
                        type="select"
                        placeholder=""
                        selectProps={selectProps}
                        name="type"
                        label="Card Type"
                    />
                </Row>
                <Row componentWidth="50%" pleft="20px">
                    <StyledField componentSize={ComponentSizesTypes.full} type="text" name="city" label="City" />
                </Row>
            </Row>
            <Row mbottom="30px">
                <Row componentWidth="50%" pright="20px">
                    <StyledField
                        componentSize={ComponentSizesTypes.full}
                        type="text"
                        name="number"
                        label="Credit Card number"
                    />
                </Row>
                <Row componentWidth="50%" pleft="20px">
                    <Row componentWidth="65%" pright="8px">
                        <StyledField componentSize={ComponentSizesTypes.full} type="text" name="state" label="State" />
                    </Row>
                    <Row componentWidth="35%" pleft="8px">
                        <StyledField componentSize={ComponentSizesTypes.full} type="text" name="zip" label="ZIP" />
                    </Row>
                </Row>
            </Row>
            <Row mbottom="30px">
                <Column componentWidth="50%" pright="20px">
                    <Description>Expiration Date</Description>
                    <Row>
                        <Row componentWidth="30%" pright="8px">
                            <StyledField
                                componentSize={ComponentSizesTypes.full}
                                type="select"
                                selectProps={selectProps}
                                name="year"
                                placeholder=""
                            />
                        </Row>
                        <Row componentWidth="40%" pright="8px">
                            <StyledField
                                componentSize={ComponentSizesTypes.full}
                                type="select"
                                selectProps={selectProps}
                                name="month"
                                placeholder=""
                            />
                        </Row>
                    </Row>
                </Column>
                <Row componentWidth="50%" pleft="20px">
                    <StyledField
                        componentSize={ComponentSizesTypes.full}
                        type="select"
                        selectProps={selectProps}
                        name="country"
                        label="Country"
                        placeholder=""
                    />
                </Row>
            </Row>
            <Row mbottom="30px" ai={AlignItemsTypes.flexEnd}>
                <Row componentWidth="50%" pright="20px">
                    <StyledField
                        componentSize={ComponentSizesTypes.full}
                        type="text"
                        name="code"
                        label="Card security Code"
                    />
                </Row>
                <Row componentWidth="50%" pleft="20px" jc={JustifyContentTypes.flexEnd}>
                    {submitView}
                </Row>
            </Row>
        </Column>
    );
}

export enum PaymentCartTypes {
    credit = 'credit',
    mastercard = 'mastercard',
    paypal = 'paypal',
}

interface Payment {
    name: string;
    icon: IconTypes;
}

const Payment: FunctionComponent<Payment> = ({ name, icon }: Payment): ReactElement => {
    return (
        <LightCart>
            <Row componentWidth="auto" pleft="30px" ai={AlignItemsTypes.center}>
                <Row componentWidth="50px">
                    <Icon icon={icon} alt={icon} />
                </Row>
                <Description mleft="60px" uppercase>
                    {name}
                </Description>
            </Row>
            <AddPayment componentSize="auto" color={colors.yellow}>
                <Description color={colors.darkText}>+</Description>
            </AddPayment>
        </LightCart>
    );
};

const NewPayment = (): ReactElement => {
    return (
        <Column componentHeight="100%">
            <Description mbottom="30px" weight={WeightTypes.w600}>
                Add a new payment method
            </Description>
            <AddCreditCart />
            <Payment name="paypal" icon={getPaymentIcon(PaymentCartTypes.paypal)} />
        </Column>
    );
};

export { NewPayment };
