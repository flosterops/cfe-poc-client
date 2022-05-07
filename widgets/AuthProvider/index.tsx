import { ReactNode, ReactNodeArray } from 'react';
import { authContext, useAuthProvider } from 'helpers/useAuth';

interface IAuthProvider {
    children: ReactNode | ReactNodeArray;
}

const AuthProvider = ({ children }: IAuthProvider) => {
    const auth = useAuthProvider();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export { AuthProvider };
