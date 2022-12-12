import React, { useRef } from 'react';
import { ToastContext } from '.';
import { Toast } from 'primereact/toast';

type Props = {
    children: React.ReactNode;
};

const ToastProvider = ({ children }: Props) => {
    const toast = useRef<any>(null!);

    return (
        <ToastContext.Provider value={{ toast }}>
            <Toast ref={toast} />

            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
