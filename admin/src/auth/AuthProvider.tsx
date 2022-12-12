import React, { useEffect, useState } from 'react';
import { http } from '../services/http';
import AuthContext from './AuthContext';

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<any>(null);
    const [isDoneChecking, setIsDoneChecking] = useState(false);

    const signIn = (newUser: string, callback: VoidFunction) => {
        setUser(newUser);
        callback();
    };

    const signOut = (callback: VoidFunction) => {
        setUser(null);
        callback();
    };

    const value = {
        user,
        signIn,
        signOut,
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        let user: any = localStorage.getItem('user');

        if (accessToken && user) {
            user = JSON.parse(user);

            setUser(user.username);
            http.setAuthorizationHeader(accessToken);
        }

        setIsDoneChecking(true);
    }, []);

    if (!isDoneChecking) return <div>'Loading...'</div>;

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
