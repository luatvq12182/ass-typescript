import { http } from '../http';

const SIGN_IN = '/signin';

const AuthService = {
    signIn: (data: { email: string; password: string | number }) => {
        return http.post(SIGN_IN, data);
    },
    setLocalStorage: (data: { accessToken: string; user: any }) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
    },
    signOut: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    },
};

export default AuthService;
