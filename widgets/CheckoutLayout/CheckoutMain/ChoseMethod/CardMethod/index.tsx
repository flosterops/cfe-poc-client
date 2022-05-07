import { FormikProps, FormikValues } from 'formik';
import React, { ReactElement } from 'react';
import { CardForm } from 'widgets/AccountLayout/AccountPayments/NewPayment';
import { Form } from 'widgets/Form';
import { selectStyles } from 'widgets/Form/Fields/SelectSearch/helpers';
import { isRequired } from 'widgets/Form/validations';
import { Collapse } from 'ui/Collapse';
import { Layout, Row } from 'ui/Layout';
import { AlignItemsTypes } from 'helpers/enums';
import { Description } from 'ui/Description';
import { colors } from 'helpers/colors';
import styled from 'styled-components';
import { Checkbox } from 'widgets/CheckoutLayout/common/Checkbox';
import { PaymentMethod } from 'models/purchase/PaymentMethod';
import { useTranslation } from 'react-i18next';
import { SelectedMethod } from 'models/purchase/SelectedMethod';

const validationSchema = {
    number: [isRequired()],
};

interface IProceed {
    active: boolean;
}

const Proceed = styled.button<IProceed>`
    height: 45px;
    background: ${(props: IProceed): string => (props.active ? colors.yellow : colors.disabled)};
    font-size: 14px;
    font-weight: bold;
    color: ${colors.contrastToYellow};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-right: 16px;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 0 28px;
    cursor: pointer;
`;

interface Props {
    method: PaymentMethod;
    setMethod: (method: SelectedMethod) => void;
    isChecked: boolean;
    check: () => void;
}

export function CardMethod({ method, setMethod, check, isChecked }: Props): ReactElement {
    const { t } = useTranslation('checkout');
    const Heading = (): ReactElement => {
        return (
            <Row componentHeight="68px" componentWidth="100%" ai={AlignItemsTypes.center} onClick={check}>
                <Layout componentWidth="16px" margin="0 70px">
                    <Checkbox value={isChecked} change={check} />
                </Layout>
                <Description uppercase={true}>{method.name}</Description>
            </Row>
        );
    };

    const selectProps = { style: selectStyles.accountBordered, isSearchable: false };
    return (
        <Collapse
            mbottom="8px"
            componentHeight="68px"
            color={colors.transparentDark}
            heading={<Heading />}
            icon={<div />}
        >
            <Form initialValues={{}} validations={validationSchema}>
                {({ isValid, values }: FormikProps<FormikValues>): ReactElement => {
                    return (
                        <Layout padding="0 70px">
                            <CardForm
                                selectProps={selectProps}
                                submitView={
                                    <Proceed
                                        disabled={!isValid}
                                        active={isValid}
                                        onClick={(): void =>
                                            setMethod({
                                                id: method.id,
                                                name: '****-****-****-' + values['number'].slice(12, 16),
                                            })
                                        }
                                    >
                                        {t('proceed')}
                                    </Proceed>
                                }
                            />
                        </Layout>
                    );
                }}
            </Form>
        </Collapse>
    );
}
