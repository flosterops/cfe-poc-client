import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Button, Column, Description, Icon, Row, Captcha } from 'ui';
import { AlignItemsTypes, ComponentSizesTypes, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'helpers/enums';
import config from './config.json';
import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { Field, Form } from 'widgets';
import { colors } from 'helpers/colors';
import { IButton } from 'ui/Button';
import { IFieldProps, TFieldType } from 'widgets/Form/FieldWrap';
import { inputStyles } from 'helpers/inputStyled';
import { IconTypes } from 'helpers/icons';
import { isEmail, isRequired } from 'widgets/Form/validations';
import { FormikProps, FormikValues } from 'formik';
import { isEmptyObject } from 'helpers/isEmptyObject';

const { getFieldBorder, getFieldBg, getFieldHeight } = inputStyles.account;

interface IChangeEmailFiled {
    id: string;
    label: string;
    title: string | null;
    padding: string;
    size: ComponentSizesTypes;
    type: TFieldType;
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
    border: 1px solid ${(props) => (props.disabled ? colors.disabled : colors.yellow)};
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
    input {
        height: 45px;
        padding: 0 12px;
        ${getFieldBorder};
        ${getFieldBg};
        ${getFieldHeight};
    }
`;

const emailEditValidationSchema = {
    // TODO add validations
    email: [isRequired(), isEmail()],
    confirmEmail: [isRequired(), isEmail()],
    firstSecret: [isRequired()],
    secondSecret: [isRequired()],
    password: [isRequired()],
};

interface IEmailEdit {
    onCancel: () => void;
}

const EmailEdit: FunctionComponent<IEmailEdit> = ({ onCancel }: IEmailEdit): ReactElement => {
    const initialValues = {
        email: '',
        confirmEmail: '',
        firstSecret: '',
        secondSecret: '',
        password: '',
    };
    return (
        <Form initialValues={initialValues} validations={emailEditValidationSchema}>
            {({ isValid, touched }: FormikProps<FormikValues>): ReactElement => {
                return (
                    <Column>
                        <RowWrap>
                            {(config as IChangeEmailFiled[]).map(
                                ({ padding, id, label, title, size, type }: IChangeEmailFiled): ReactElement => {
                                    return (
                                        <Row mtop="40px" key={id} componentWidth="50%" padding={padding}>
                                            <Column>
                                                {title && <Description mbottom="15px">{title}</Description>}
                                                <StyledField type={type} name={id} label={label} componentSize={size} />
                                            </Column>
                                        </Row>
                                    );
                                }
                            )}
                            <Row mtop="60px" componentWidth="50%" pleft="40px" ai={AlignItemsTypes.center}>
                                <Captcha />
                            </Row>
                        </RowWrap>
                        <Row mtop="60px">
                            <SaveButton
                                mright="60px"
                                disabled={!isValid || isEmptyObject(touched)}
                                componentSize={ComponentSizesTypes.m}
                                color={colors.yellow}
                            >
                                <Description
                                    weight={WeightTypes.w600}
                                    color={colors.dark}
                                    uppercase
                                    fontSize={FontSizeTypes.s}
                                >
                                    save new email
                                </Description>
                            </SaveButton>
                            <CancelButton onClick={onCancel} componentSize={ComponentSizesTypes.m} color={colors.dark}>
                                <Description uppercase fontSize={FontSizeTypes.s}>
                                    cancel
                                </Description>
                            </CancelButton>
                        </Row>
                    </Column>
                );
            }}
        </Form>
    );
};

const EditButton = styled(Button)<IButton>`
    &:hover {
        button {
            background: ${colors.lightText};
        }
    }
    button {
        width: 35px;
        height: 35px;
    }
`;

interface IEmailDefault {
    email: string;
    onEdit: () => void;
}

const EmailDefault = ({ email, onEdit }: IEmailDefault): ReactElement => {
    return (
        <Row margin="30px 0" componentWidth="auto" ai={AlignItemsTypes.center}>
            <Description mright="30px">{email}</Description>
            <EditButton color={colors.yellow} componentSize="auto" onClick={onEdit}>
                <Icon alt={IconTypes.edit} icon={IconTypes.edit} />
            </EditButton>
        </Row>
    );
};

interface IEmail {
    email: string;
}

const Email: FunctionComponent<IEmail> = ({ email }: IEmail): ReactElement => {
    const [edit, setEdit] = useState<boolean>(false);
    return (
        <Column componentHeight="100%" jc={JustifyContentTypes.center}>
            {edit ? (
                <EmailEdit onCancel={(): void => setEdit(false)} />
            ) : (
                <EmailDefault email={email} onEdit={(): void => setEdit(true)} />
            )}
        </Column>
    );
};

export { Email };
