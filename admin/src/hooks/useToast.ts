import { useContext } from 'react';
import { ToastContext } from '../contexts/toast';

const useToast = () => {
    const { toast } = useContext(ToastContext);

    return {
        toast: {
            success: (message: string) => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: message,
                    life: 3000,
                });
            },
            warning: (message: string) => {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Cảnh báo',
                    detail: message,
                    life: 3000,
                });
            },
            error: (message: string) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: message,
                    life: 3000,
                });
            },
            info: (message: string) => {
                toast.current.show({
                    severity: 'info',
                    summary: 'Thông tin',
                    detail: message,
                    life: 3000,
                });
            },
        },
    };
};

export default useToast;
