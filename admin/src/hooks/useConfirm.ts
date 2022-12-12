import { useContext, useEffect } from 'react';
import { ConfirmContext } from '../contexts/confirm';

type Props = {
    accept: VoidFunction;
    message: string;
};

const useConfirm = ({ accept, message }: Props) => {
    const { setVisible, setMessage, acceptFn } = useContext(ConfirmContext);

    useEffect(() => {
        setMessage(message);
        acceptFn.current = accept;
    }, [accept, message]);

    const showConfirm = () => {
        setVisible(true);
    };

    return {
        showConfirm,
    };
};

export default useConfirm;
