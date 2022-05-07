import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Namespaces, withDefaultNamespaces } from 'i18n/helpers';
import { FormikProps, FormikValues } from 'formik';
import { BaseLayout, Field, Form, ValidationPopOver, LoginLayout } from 'widgets';
import {
    allowLowercase,
    allowSpecialChapter,
    allowUppercase,
    isEmail,
    isRequired,
    lessThan,
    moreThan,
    onlyLatin,
    onlyTenDigits,
    repeatPassword,
} from 'widgets/Form/validations';
import { Button, Column, Description, Error, Modal, Row } from 'ui';
import { registerBackground } from 'helpers/theme';
import { isEmptyObject } from 'helpers/isEmptyObject';
import {
    AlignItemsTypes,
    ButtonTypes,
    ComponentSizesTypes,
    FontSizeTypes,
    JustifyContentTypes,
    WeightTypes,
} from 'helpers/enums';
import { IconTypes } from 'helpers/icons';
import { colors } from 'helpers/colors';
import { IValidationModel } from 'models/validation';
import { IError } from 'ui/Error';
import { ILayout } from 'ui/Layout';
import { useAuth } from 'helpers/useAuth';

const StyledValidationPopOver = styled.div<{ size: number }>`
    position: absolute;
    left: -380px;
    top: -20px;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 20px 40px;
    &:after {
        content: '';
        position: absolute;
        z-index: 2;
        top: ${(props) => `calc(50% - ${props.size / 2}px);`}
        right: ${(props) => -props.size / 2}px;
        width: 0;
        height: 0;
        transform: rotate(-45deg);
        border-left: ${(props) => props.size}px solid transparent;
        border-right: ${(props) => props.size}px solid ${colors.dark};
        border-top: ${(props) => props.size}px solid transparent;
        clear: both;
    }
`;

const ModalContainer = styled(Column)<ILayout>`
    border-radius: 4px;
`;

// TODO create and add register locales
const registerNamespaces = withDefaultNamespaces(Namespaces.login);
const initialRegisterValues = { email: '', password: '', configPassword: '', terms: false, promotion: false };

const registerValidationSchema = {
    email: [isRequired(), isEmail(), onlyLatin()],
    password: [
        isRequired(),
        moreThan(8),
        lessThan(32),
        allowUppercase(),
        allowLowercase(),
        onlyTenDigits(),
        allowSpecialChapter(),
    ],
    confirmPassword: [isRequired(), repeatPassword()],
    terms: [isRequired()],
};

interface IPasswordPopOverValidations {
    validate: (value: string) => boolean;
    text: string;
}

const passwordPopOverValidations: IPasswordPopOverValidations[] = [
    {
        text: 'Lowercase letter of European languages',
        validate: (value: string): boolean => !allowLowercase()({ value }),
    },
    {
        text: 'Uppercase letter of European languages',
        validate: (value: string): boolean => !allowUppercase()({ value }),
    },
    {
        text: 'Base 10 digits',
        validate: (value: string): boolean => !onlyTenDigits()({ value }),
    },
    {
        text: 'Non-alphanumeric characters (special characters)',
        validate: (value: string): boolean => !allowSpecialChapter()({ value }),
    },
];

const getPasswordPopOverValidation = (password: string): IValidationModel[] => {
    return passwordPopOverValidations.map(
        ({ validate, text }: IPasswordPopOverValidations): IValidationModel => ({ text, valid: validate(password) })
    );
};

const RegisterPage = (): ReactElement => {
    const [error, setError] = useState<IError | null>(null);
    const router = useRouter();
    const { register } = useAuth();
    const { t } = useTranslation(registerNamespaces);

    const onSubmit = async (values: FormikValues): Promise<void> => {
        try {
            const { error } = await register(values.email, values.password, '1001');
            if (!error) {
                router.push('/');
            } else {
                setError(error);
            }
        } catch (e) {}
    };
    return (
        <BaseLayout withFooter={false} withHeader={false}>
            <LoginLayout bgImage={registerBackground}>
                {error && (
                    <Modal>
                        <ModalContainer
                            jc={JustifyContentTypes.center}
                            ai={AlignItemsTypes.center}
                            componentWidth="40%"
                            padding="0 0 20px"
                            bg={colors.dark}
                        >
                            <Error status={error.status} message={error.message} />
                            <Button onClick={(): void => setError(null)} color={colors.yellow}>
                                <Description color={colors.dark} uppercase fontSize={FontSizeTypes.m}>
                                    OK
                                </Description>
                            </Button>
                        </ModalContainer>
                    </Modal>
                )}
                <Row jc={JustifyContentTypes.center} mbottom="40px">
                    <Description
                        mright="5px"
                        fontSize={FontSizeTypes.l}
                        weight={WeightTypes.w700}
                        color={colors.yellow}
                        uppercase
                    >
                        create
                    </Description>
                    <Description fontSize={FontSizeTypes.l} weight={WeightTypes.w700} uppercase>
                        your glyph account
                    </Description>
                </Row>
                <Form initialValues={initialRegisterValues} validations={registerValidationSchema}>
                    {({ errors, touched, values }: FormikProps<FormikValues>): ReactElement => {
                        const isValid = isEmptyObject(errors) && !isEmptyObject(touched);
                        return (
                            <>
                                <Row mbottom="40px">
                                    <Field
                                        name="email"
                                        type="text"
                                        componentSize={ComponentSizesTypes.full}
                                        label={t('login:email')}
                                    />
                                </Row>
                                <Row mbottom="40px">
                                    <Field
                                        name="password"
                                        type="password"
                                        componentSize={ComponentSizesTypes.full}
                                        label={t('login:password')}
                                        icon={IconTypes.showPw}
                                    />
                                    {values.password && (
                                        <StyledValidationPopOver size={20}>
                                            <ValidationPopOver
                                                validations={getPasswordPopOverValidation(values.password)}
                                            />
                                        </StyledValidationPopOver>
                                    )}
                                </Row>
                                <Row mbottom="40px">
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        componentSize={ComponentSizesTypes.full}
                                        label="Confirm password"
                                        icon={IconTypes.showPw}
                                    />
                                </Row>

                                <Row mbottom="20px">
                                    <Field
                                        name="terms"
                                        type="checkbox"
                                        placeholder="I have read and agree to Trion's Terms of Usage and Privacy Policy."
                                    />
                                </Row>
                                <Row mbottom="40px">
                                    <Field
                                        name="promotion"
                                        type="checkbox"
                                        placeholder="Click this box to receive Glyph announcement and promotional messages."
                                    />
                                </Row>
                                <Row>
                                    <Button
                                        type={ButtonTypes.submit}
                                        color={colors.yellow}
                                        componentSize={ComponentSizesTypes.full}
                                        onClick={(): Promise<void> => onSubmit(values)}
                                        disabled={!isValid}
                                    >
                                        Create Account
                                    </Button>
                                </Row>
                            </>
                        );
                    }}
                </Form>
            </LoginLayout>
        </BaseLayout>
    );
};

interface IServerSideProps {
    namespacesRequired: Namespaces[];
    forgotPassword: false;
}

RegisterPage.getInitialProps = async (): Promise<IServerSideProps> => {
    return { namespacesRequired: registerNamespaces, forgotPassword: false };
};

export default RegisterPage;
