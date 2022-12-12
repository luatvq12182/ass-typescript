import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';

type Props = { children: JSX.Element };

const RequireAuth = ({ children }: Props) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return (
            <Navigate
                to='/sign-in'
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    return children;
};

export default RequireAuth;
