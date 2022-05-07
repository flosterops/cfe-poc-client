import React, { FunctionComponent, ReactElement } from 'react';
import { Button, Column, Description, Message, Row } from 'ui';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { Field, Form } from 'widgets';
import { IFieldProps, TFieldType } from 'widgets/Form/FieldWrap';
import { FormikValues } from 'formik';
import { IButton } from 'ui/Button';
import { colors } from 'helpers/colors';
import { ComponentSizesTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import { inputStyles } from 'helpers/inputStyled';
import { selectStyles } from 'widgets/Form/Fields/SelectSearch/helpers';
import options from './options.json';
import config from './config.json';
import { IconTypes } from 'helpers/icons';

const { getFieldBorder, getFieldBg, getFieldHeight } = inputStyles.account;

interface IQuestionsFieldConfig {
    id: string;
    label: string;
    type: TFieldType;
    name: string;
    margin: string;
    placeholder: string;
}

interface IQuestionsConfig {
    subTitle: string;
    fields: IQuestionsFieldConfig[];
    hasQuestionsMessage: string;
}

function getInitialValues(fields: IQuestionsFieldConfig[]): FormikValues {
    const initial = {} as FormikValues;
    fields.forEach(({ name }: IQuestionsFieldConfig): void => {
        initial[name] = '';
    });
    return initial;
}

const RowWrap = styled(Row)<ILayout>`
    flex-wrap: wrap;
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
        ${getFieldBorder};
        ${getFieldBg};
        ${getFieldHeight};
    }
`;

const QuestionsForm = (): ReactElement => {
    const { subTitle, fields } = config as IQuestionsConfig;
    const initialValues = getInitialValues(fields);
    return (
        <Column>
            <Description margin="50px 0">{subTitle}</Description>
            <Form initialValues={initialValues}>
                {(): ReactElement => {
                    return (
                        <Column>
                            <RowWrap>
                                {fields.map(
                                    ({
                                        id,
                                        label,
                                        type,
                                        name,
                                        margin,
                                        placeholder,
                                    }: IQuestionsFieldConfig): ReactElement => {
                                        return (
                                            <Row key={id} componentWidth="50%">
                                                <StyledField
                                                    componentSize={ComponentSizesTypes.full}
                                                    name={name}
                                                    type={type}
                                                    selectProps={{ style: selectStyles.account, isSearchable: false }}
                                                    margin={margin}
                                                    options={options}
                                                    label={label}
                                                    placeholder={placeholder}
                                                />
                                            </Row>
                                        );
                                    }
                                )}
                            </RowWrap>
                            <SaveButton mtop="35px" componentSize={ComponentSizesTypes.m} color={colors.yellow}>
                                <Description
                                    weight={WeightTypes.w600}
                                    color={colors.dark}
                                    uppercase
                                    fontSize={FontSizeTypes.s}
                                >
                                    submit
                                </Description>
                            </SaveButton>
                        </Column>
                    );
                }}
            </Form>
        </Column>
    );
};

interface IQuestions {
    hasQuestions: boolean;
}

const Questions: FunctionComponent<IQuestions> = ({ hasQuestions }: IQuestions): ReactElement => {
    const { hasQuestionsMessage } = config as IQuestionsConfig;
    return (
        <Column componentHeight="100%">
            {hasQuestions ? (
                <Message padding="20px 0" text={hasQuestionsMessage} icon={IconTypes.lock} />
            ) : (
                <QuestionsForm />
            )}
        </Column>
    );
};

export { Questions };
