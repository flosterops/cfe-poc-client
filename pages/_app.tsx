import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import App, { AppProps } from 'next/app';
import { wrapper } from 'stores';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router, useRouter } from 'next/router';
import { Column } from 'ui';
import { ILayout } from 'ui/Layout';
import { GlobalStyle } from 'helpers/theme';
import { AuthProvider } from 'widgets/AuthProvider';
import { IAccountModel } from 'models/account';
import { useAuthProvider } from 'helpers/useAuth';
import { colors } from 'helpers/colors';

import i18next from 'i18n';

const { appWithTranslation } = i18next;

export interface IAuthModel {
    account: IAccountModel | null;
    token: string;
    ticket: string;
}

const StyledPage = styled(Column)<ILayout>`
    height: 100%;
`;

const StyledLoader = styled.div`
    position: absolute;
    height: 100vh;
    background: ${colors.dark};
    width: 100%;
    color: ${colors.lightText};
`;

interface IApplication extends AppProps {}

const Application = ({ Component, pageProps }: IApplication): ReactElement => {
    const { authRequired } = pageProps;
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuthProvider();

    const router = useRouter();
    if (authRequired && !user) {
        router.push('/login');
    }

    useEffect((): void => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/gcy7xxe.css" />
            </Head>
            <GlobalStyle />
            <AuthProvider>
                <StyledPage>
                    {loading ? <StyledLoader>Loading...</StyledLoader> : <Component {...pageProps} />}
                </StyledPage>
            </AuthProvider>
        </>
    );
};

interface InitialProps {
    pageProps: any;
}

Application.getInitialProps = async (appContext: AppContextType<Router>): Promise<InitialProps> => {
    return { ...(await App.getInitialProps(appContext)) };
};

export default wrapper.withRedux(appWithTranslation(Application));
