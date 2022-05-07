import Cookies from 'js-cookie';

const saveAuthInCookies = (token: string, ticket?: string): void => {
    Cookies.set('token', token);
    if (ticket) {
        Cookies.set('ticket', ticket);
    }
};

const removeAuthFromCookies = (): void => {
    Cookies.remove('token');
    Cookies.remove('ticket');
};

interface IAuthLocalStorage {
    token: string;
    ticket: string;
}

const getAuthFromCookies = (): IAuthLocalStorage => {
    const token = Cookies.get('token') || '';
    const ticket = Cookies.get('ticket') || '';
    return { token, ticket };
};

export { saveAuthInCookies, removeAuthFromCookies, getAuthFromCookies };
