import React from 'react';
import { AuthContextType } from '../interfaces';

const AuthContext = React.createContext<AuthContextType>(null!);

export default AuthContext;
