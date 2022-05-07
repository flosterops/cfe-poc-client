import React, { ReactElement } from 'react';
import { Field, Form } from 'widgets';
import { Button, Column, Description, Row } from 'ui';
import config from './config.json';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { colors } from 'helpers/colors';
import { ComponentSizesTypes, WeightTypes } from 'helpers/enums';
import { IButton } from 'ui/Button';
import { FormikProps, FormikValues } from 'formik';

const { title, subTitle, fields } = config as IOffersConfig;

interface IOffersRadioConfig {
    id: string;
    label: string;
}

interface IOffersConfig {
    title: string;
    subTitle: string;
    fields: IOffersRadioConfig[];
}

interface IInitialModel {
    [key: string]: boolean;
}

function getInitialOffers() {
    const initialValues = {} as IInitialModel;
    fields.forEach(({ id }: IOffersRadioConfig) => (initialValues[id] = false));
    return initialValues;
}

const WrapRow = styled(Row)<ILayout>`
    flex-wrap: wrap;
`;

const SaveButton = styled(Button)<IButton>`
    width: 180px;
    height: 45px;
    button {
        height: 43px;
    }
    border: 1px solid ${(props) => (props.disabled ? colors.disabled : colors.yellow)};
`;

const Offers = (): ReactElement => {
    const initialValues = getInitialOffers();
    return (
        <Column componentHeight="100%">
            <Description mtop="30px">{title}</Description>
            <Description mtop="30px">{subTitle}</Description>
            <Form initialValues={initialValues}>
                {({ dirty }: FormikProps<FormikValues>): ReactElement => {
                    return (
                        <Column>
                            <WrapRow>
                                {fields.map(
                                    ({ id, label }: IOffersRadioConfig): ReactElement => {
                                        return (
                                            <Row key={id} componentWidth="33%">
                                                <Field margin="20px 0 0" name={id} type="radio" placeholder={label} />
                                            </Row>
                                        );
                                    }
                                )}
                            </WrapRow>
                            <Row componentWidth="180px" mtop="60px">
                                <SaveButton
                                    disabled={!dirty}
                                    color={colors.yellow}
                                    componentSize={ComponentSizesTypes.full}
                                >
                                    <Description uppercase color={colors.darkText} weight={WeightTypes.w600}>
                                        save changes
                                    </Description>
                                </SaveButton>
                            </Row>
                        </Column>
                    );
                }}
            </Form>
        </Column>
    );
};

export { Offers };
