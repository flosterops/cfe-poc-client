import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { FormikProps, FormikValues } from 'formik';
import { Namespaces, withDefaultNamespaces } from 'i18n/helpers';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { isEmail, isRequired, lessThan, moreThan, onlyLatin } from 'widgets/Form/validations';
import { BaseLayout, Field, Form, LoginLayout } from 'widgets';
import { Button, Column, Description, Error, Modal, NavLink, Row } from 'ui';
import {
    AlignItemsTypes,
    AlignTextTypes,
    ButtonTypes,
    ComponentSizesTypes,
    FontSizeTypes,
    JustifyContentTypes,
} from 'helpers/enums';
import { isEmptyObject } from 'helpers/isEmptyObject';
import { colors } from 'helpers/colors';
import { IconTypes } from 'helpers/icons';
import { loginBackground } from 'helpers/theme';
import { IError } from 'ui/Error';
import { ILayout } from 'ui/Layout';
import { useAuth } from 'helpers/useAuth';

const ModalContainer = styled(Column)<ILayout>`
    border-radius: 4px;
`;

const StyledForm = styled(Form)`
    width: 100%;
`;

// TODO add error text by locales
const loginValidationSchema = {
    email: [isRequired(), isEmail(), onlyLatin()],
    password: [isRequired(), moreThan(8), lessThan(32)],
};

const loginNamespaces = withDefaultNamespaces(Namespaces.login);

const LoginPage = (): ReactElement => {
    const router = useRouter();
    const { t } = useTranslation(loginNamespaces);
    const [error, setError] = useState<IError | null>(null);
    const initialValues = { password: '', email: '', remember: false };
    const { login } = useAuth();

    const onSubmit = async (values: FormikValues): Promise<void> => {
        try {
            const { error } = await login(values.email, values.password);
            if (!error) {
                router.push('/');
            } else {
                setError(error);
            }
        } catch (e) {}
    };

    return (
        <BaseLayout withHeader={false} withFooter={false}>
            <LoginLayout bgImage={loginBackground}>
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
                <StyledForm initialValues={initialValues} validations={loginValidationSchema}>
                    {({ errors, values }: FormikProps<FormikValues>): ReactElement => {
                        const isValid = isEmptyObject(errors);
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
                                </Row>

                                <Row jc={JustifyContentTypes.spaceBetween} mbottom="40px">
                                    <Field name="remember" type="checkbox" placeholder={t('login:rememberMe')} />
                                    <Description color={colors.yellow}>{t('login:forgotPass')}</Description>
                                </Row>
                                <Row mbottom="100px">
                                    <Button
                                        type={ButtonTypes.submit}
                                        color={colors.yellow}
                                        componentSize={ComponentSizesTypes.full}
                                        onClick={(): Promise<void> => onSubmit(values)}
                                        disabled={!isValid}
                                    >
                                        {t('login:signIn')}
                                    </Button>
                                </Row>
                                <Column ai={AlignItemsTypes.center}>
                                    <Description mbottom="25px" textAlign={AlignTextTypes.center}>
                                        {t('login:noAccount')}
                                    </Description>
                                    <NavLink href="/register">
                                        <Description textAlign={AlignTextTypes.center} color={colors.yellow}>
                                            {t('login:registerYourSelf')}
                                        </Description>
                                    </NavLink>
                                </Column>
                            </>
                        );
                    }}
                </StyledForm>
            </LoginLayout>
        </BaseLayout>
    );
};

interface InitialProps {
    namespacesRequired: string[];
    withHeader: boolean;
    withFooter: boolean;
    forgotPassword: boolean;
}

LoginPage.getInitialProps = async (): Promise<InitialProps> => {
    return {
        namespacesRequired: loginNamespaces,
        withHeader: false,
        withFooter: false,
        forgotPassword: false,
    };
};

export default LoginPage;
