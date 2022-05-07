import React, { FunctionComponent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Column, Description, Icon, LightCart, Message, Modal, Row } from 'ui';
import { PaymentCartTypes } from 'widgets/AccountLayout/AccountPayments/NewPayment';
import { ILayout } from 'ui/Layout';
import { AlignItemsTypes, JustifyContentTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import { IconTypes } from 'helpers/icons';
import { RemovePayment } from './RemovePayment';
import { Field, Form } from 'widgets';
import { IFieldProps } from 'widgets/Form/FieldWrap';
import { StyledCheckboxSpan } from 'widgets/Form/Fields/Checkbox';
import { FormikProps, FormikValues } from 'formik';
import { IAccountPaymentModel } from 'models/account';

export function getPaymentIcon(type: PaymentCartTypes): IconTypes {
    switch (type) {
        case PaymentCartTypes.mastercard:
            return IconTypes.mastercard;
        case PaymentCartTypes.paypal:
            return IconTypes.paypal;
        case PaymentCartTypes.credit:
        default:
            return IconTypes.credit;
    }
}

const QuestionCircle = styled(Row)<ILayout>`
    border-radius: 100%;
    color: ${colors.black};
    font-size: 12px;
`;

const Checkbox = styled(Field)<
    IFieldProps & { checked: boolean; handleChange: (name: string, value: boolean) => void }
>`
    & ${StyledCheckboxSpan} {
        border-radius: 3px;
        border-color: ${(props) => (props.checked ? colors.yellow : colors.lightPink)};
    }
    p {
        color: ${(props) => (props.checked ? colors.yellow : colors.lightPink)};
    }
`;

const Remove = styled(Row)<ILayout>`
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

export interface IPaymentsConfig {
    id: string;
    via: string;
    card: string;
    type: PaymentCartTypes;
    default: boolean;
}

function getInitialValues(payments: IAccountPaymentModel[]) {
    const values = {} as { [key: string]: boolean };
    payments.forEach((payment: IPaymentsConfig): void => {
        values[payment.id] = payment.default;
    });
    return values;
}

interface IPayments {
    paymentMethods: IAccountPaymentModel[];
}

const Payments: FunctionComponent<IPayments> = ({ paymentMethods }: IPayments): ReactElement => {
    const [payments, setPayments] = useState<IAccountPaymentModel[]>(paymentMethods);
    const [isRemoved, setIsRemoved] = useState<boolean>(false);
    const [modal, setModal] = useState<{ payment: IAccountPaymentModel } | null>(null);
    const onRemove = (payment: IPaymentsConfig): void => {
        setModal({ payment });
    };

    const removePayment = (id: string): void => {
        setPayments(payments.filter((payment: IAccountPaymentModel): boolean => id !== payment.id));
        setModal(null);
        setIsRemoved(true);
    };

    const setDefault = (id: string, formik: FormikProps<FormikValues>): void => {
        const updatedPayments = payments.map(
            (payment: IAccountPaymentModel): IAccountPaymentModel => {
                if (payment.id === id) {
                    return { ...payment, default: !payment.default };
                }
                return { ...payment, default: false };
            }
        );
        setPayments(updatedPayments);

        const values = getInitialValues(updatedPayments);
        formik.setValues(values);
    };

    const onCancel = (): void => setModal(null);
    const initial = getInitialValues(payments);

    return (
        <Column componentHeight="100%" mtop="30px">
            {modal && (
                <Modal>
                    <RemovePayment onCancel={onCancel} onAccept={removePayment} payment={modal.payment} />
                </Modal>
            )}
            {isRemoved && (
                <Column mbottom="25px">
                    <Message
                        text="Your payment method has been deleted"
                        componentHeight="47px"
                        padding="0 22px"
                        icon={IconTypes.success}
                        bg={colors.grayMedium}
                        textColor={colors.black}
                    />
                </Column>
            )}
            <Form initialValues={initial}>
                {(formik: FormikProps<FormikValues>): ReactElement[] => {
                    return payments.map(
                        (payment: IAccountPaymentModel): ReactElement => {
                            const { type, id, card, via } = payment;
                            const icon = getPaymentIcon(type);
                            const checked = payment.default;
                            return (
                                <LightCart active={checked} key={id}>
                                    <Row ai={AlignItemsTypes.center} pleft="30px" componentWidth="auto">
                                        <Row componentWidth="50px">
                                            <Icon icon={icon} alt={icon} />
                                        </Row>
                                        <Column mleft="60px" componentWidth="auto">
                                            <Description>{card}</Description>
                                            {via && (
                                                <Row ai={AlignItemsTypes.center}>
                                                    <Description color={colors.lightPink}>{`via ${via}`}</Description>
                                                    <QuestionCircle
                                                        mleft="5px"
                                                        ai={AlignItemsTypes.center}
                                                        jc={JustifyContentTypes.center}
                                                        componentHeight="15px"
                                                        componentWidth="15px"
                                                        bg={colors.lightPink}
                                                    >
                                                        ?
                                                    </QuestionCircle>
                                                </Row>
                                            )}
                                        </Column>
                                    </Row>
                                    <Row ai={AlignItemsTypes.center} componentWidth="35%">
                                        <Row componentHeight="auto">
                                            <Checkbox
                                                type="checkbox"
                                                checked={checked}
                                                handleChange={(): void => setDefault(id, formik)}
                                                name={id}
                                                placeholder={checked ? 'default payment' : 'Set as default'}
                                            />
                                        </Row>
                                        <Remove
                                            onClick={(): void => onRemove(payment)}
                                            componentWidth="auto"
                                            ai={AlignItemsTypes.center}
                                            mleft="75px"
                                        >
                                            <Icon mright="5px" alt={IconTypes.bucket} icon={IconTypes.bucket} />
                                            <Description color={colors.yellow}>Remove</Description>
                                        </Remove>
                                    </Row>
                                </LightCart>
                            );
                        }
                    );
                }}
            </Form>
        </Column>
    );
};

export { Payments };
