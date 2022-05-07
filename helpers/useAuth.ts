import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IAuthModel } from 'pages/_app';
import { getParseAuthTicket, requestAuth, requestRegister } from 'helpers/useAuthHeleprs';
import { getAuthFromCookies, removeAuthFromCookies, saveAuthInCookies } from 'helpers/cookiesHelpers';
import { IAccountModel } from 'models/account';
import { IError } from 'ui/Error';
import { touch } from 'requests/touch';
import { UrlObject } from 'url';

export interface LoginReturn {
    account: IAccountModel | null;
    token: string;
    ticket: string;
    error: IError | null;
}

export type LinkUrl = UrlObject | string;

export interface RegisterReturn {
    token: string;
    error: IError | null;
}

export interface IUseAuthProvider {
    user: IAuthModel | null;
    login: (email: string, password: string) => Promise<LoginReturn>;
    register: (email: string, password: string, channelId: string) => Promise<RegisterReturn>;
    logout: () => null;
    getAuth: () => Promise<IAuthModel | null>;
    routerPush: (href: LinkUrl, as?: string) => void;
}

const useAuthProvider = (): IUseAuthProvider => {
    const [user, setUser] = useState<IAuthModel | null>(null);
    const router = useRouter();

    useEffect((): void => {}, []);

    const routerPush = (href: LinkUrl, as?: string): void => {
        if (!user) {
            router.push('/login');
        } else {
            router.push(href, as);
        }
    };

    const login = async (email: string, password: string): Promise<LoginReturn> => {
        const authResponse = await requestAuth(email, password);
        if (authResponse.status !== 200) {
            removeAuthFromCookies();
            setUser(null);
            return {
                account: null,
                token: '',
                ticket: '',
                error: { status: authResponse.status, message: authResponse.message },
            };
        }

        const { account, token, ticket } = authResponse;
        saveAuthInCookies(token, ticket);
        setUser({ account, token, ticket });
        return { account, token, ticket, error: null };
    };

    const register = async (email: string, password: string, channelId: string): Promise<RegisterReturn> => {
        const data: any = await requestRegister(email, password, channelId);
        if (data.status.toLowerCase() === 'failed') {
            saveAuthInCookies('');
            return { token: '', error: { status: data.status, message: data.message } };
        } else {
            saveAuthInCookies(data.storeToken);
            return { token: data.storeToken, error: null };
        }
    };

    const getAuth = async (): Promise<IAuthModel | null> => {
        const { token, ticket } = getAuthFromCookies();
        const toucheResponse = await touch(ticket);
        if (!toucheResponse) {
            setUser(null);
            return null;
        } else {
            const stringifyTicket = await toucheResponse.text();
            const account = stringifyTicket ? getParseAuthTicket(stringifyTicket).account : null;
            setUser({ account, ticket, token });
            return { account, ticket, token };
        }
    };

    const logout = (): null => {
        removeAuthFromCookies();
        setUser(null);
        return null;
    };

    useEffect((): void => {
        const fetchAuth = async () => {
            await getAuth();
        };
        fetchAuth();
    }, []);

    return { user, routerPush, login, register, logout, getAuth };
};

const authContext = createContext<IUseAuthProvider>({} as IUseAuthProvider);
const useAuth = (): IUseAuthProvider => {
    return useContext(authContext);
};

export { authContext, useAuth, useAuthProvider };
