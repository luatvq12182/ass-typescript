import React, { useRef, useState } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';

const ConfirmContext = React.createContext<{
    setVisible: any;
    setMessage: any;
    acceptFn: any;
}>(null!);

type Props = {
    children: React.ReactNode;
};

const ConfirmProvider = ({ children }: Props) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const acceptFn = useRef<any>(null!);

    return (
        <ConfirmContext.Provider
            value={{
                setVisible,
                setMessage,
                acceptFn,
            }}
        >
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message={message}
                header='Xác nhận'
                icon='pi pi-exclamation-triangle'
                accept={acceptFn.current}
            />

            {children}
        </ConfirmContext.Provider>
    );
};

export { ConfirmContext, ConfirmProvider };
