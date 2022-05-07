import React, { ReactElement, useState } from 'react';
import { Button, Column, Description, Icon, Row, Title } from 'ui';
import { TitleTags } from 'ui/Title';
import config from './config.json';
import { Form } from 'widgets/Form';
import { FormikProps, FormikValues } from 'formik';
import { Field } from 'widgets';
import { AlignItemsTypes, ComponentSizesTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import { colors } from 'helpers/colors';
import styled from 'styled-components';
import { IButton } from 'ui/Button';
import { IFieldProps } from 'widgets/Form/FieldWrap';
import { inputStyles } from 'helpers/inputStyled';
import { IconTypes } from 'helpers/icons';
import { StyledIconWrapper } from 'widgets/Form/Fields/Input';
import {
    allowLowercase,
    allowSpecialChapter,
    allowUppercase,
    isRequired,
    lessThan,
    moreThan,
    onlyTenDigits,
    repeatPassword,
} from 'widgets/Form/validations';

const { getFieldBorder, getFieldBg, getFieldHeight } = inputStyles.account;

interface IChangePasswordFields {
    id: string;
    name: string;
    label: string;
}

interface IChangePasswordConfig {
    title: string;
    subTitle: string;
    successChanged: string;
    fields: IChangePasswordFields[];
}

function getInitialValues(): FormikValues {
    const initial = {} as FormikValues;
    (config as IChangePasswordConfig).fields.forEach(({ name }: IChangePasswordFields): void => {
        initial[name] = '';
    });
    return initial;
}

const SaveButton = styled(Button)<IButton>`
    width: 180px;
    height: 45px;
    button {
        height: 43px;
    }
    border: 1px solid ${colors.yellow};
`;

const CancelButton = styled(Button)<IButton>`
    width: 180px;
    height: 45px;
    button {
        height: 43px;
    }
    border: 1px solid ${colors.yellow};
`;

const StyledField = styled(Field)<IFieldProps>`
    ${StyledIconWrapper} {
        right: 10px;
    }
    input {
        padding: 0 12px;
        ${getFieldBorder};
        ${getFieldBg};
        ${getFieldHeight};
    }
`;

const validations = {
    password: [
        isRequired(),
        moreThan(8),
        lessThan(32),
        allowUppercase(),
        allowLowercase(),
        onlyTenDigits(),
        allowSpecialChapter(),
    ],
    newPassword: [
        isRequired(),
        moreThan(8),
        lessThan(32),
        allowUppercase(),
        allowLowercase(),
        onlyTenDigits(),
        allowSpecialChapter(),
    ],
    confirmPassword: [isRequired(), repeatPassword()],
};

const ChangePassword = (): ReactElement => {
    const [changed, setChanged] = useState<boolean>(false);
    const { title, fields, subTitle, successChanged } = config as IChangePasswordConfig;

    const initialValues = getInitialValues();
    const checkValidField = (formik: FormikProps<FormikValues>, name: string): boolean => {
        const { values, errors } = formik;
        return values[name] && !errors.hasOwnProperty(name);
    };

    const handleSubmit = (): void => {
        setChanged(true);
    };

    const onCancel = (formik: FormikProps<FormikValues>): void => {
        formik.resetForm();
        setChanged(false);
    };

    return (
        <Column componentHeight="100%">
            <Description mbottom="60px">{subTitle}</Description>
            <Title uppercase tagName={TitleTags.h2} mbottom="35px">
                {title}
            </Title>
            {changed && (
                <Row
                    mbottom="55px"
                    ai={AlignItemsTypes.center}
                    bg={colors.grayMedium}
                    componentHeight="47px"
                    padding="0 22px"
                >
                    <Icon mright="10px" alt={IconTypes.success} icon={IconTypes.success} />
                    <Description color={colors.black}>{successChanged}</Description>
                </Row>
            )}
            <Form initialValues={initialValues} onSubmit={handleSubmit} validations={validations}>
                {(formik: FormikProps<FormikValues>): ReactElement => {
                    return (
                        <Column>
                            {fields.map(
                                ({ id, label, name }: IChangePasswordFields): ReactElement => {
                                    const isValidField = checkValidField(formik, name);
                                    return (
                                        <Row key={id} componentWidth="390px">
                                            <StyledField
                                                margin="0 0 30px 0"
                                                label={label}
                                                type="password"
                                                name={name}
                                                color={colors.dark}
                                                icon={isValidField ? IconTypes.circleCheck : ''}
                                                componentSize={ComponentSizesTypes.full}
                                            />
                                        </Row>
                                    );
                                }
                            )}
                            <Row mtop="35px">
                                <SaveButton
                                    type="submit"
                                    onClick={formik.handleSubmit}
                                    mright="60px"
                                    componentSize={ComponentSizesTypes.m}
                                    color={colors.yellow}
                                    disabled={!formik.isValid}
                                >
                                    <Description
                                        weight={WeightTypes.w600}
                                        color={colors.dark}
                                        uppercase
                                        fontSize={FontSizeTypes.s}
                                    >
                                        submit
                                    </Description>
                                </SaveButton>
                                <CancelButton
                                    onClick={(): void => onCancel(formik)}
                                    componentSize={ComponentSizesTypes.m}
                                    color={colors.dark}
                                >
                                    <Description uppercase fontSize={FontSizeTypes.s}>
                                        cancel
                                    </Description>
                                </CancelButton>
                            </Row>
                        </Column>
                    );
                }}
            </Form>
        </Column>
    );
};

export { ChangePassword };
