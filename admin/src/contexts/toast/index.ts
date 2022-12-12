import React from 'react';
import ToastProvider from './ToastProvider';

const ToastContext = React.createContext<{
    toast: any;
}>(null!);

export { ToastContext, ToastProvider };
