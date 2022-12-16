import { useContext } from 'react';
import { LoadingContext } from '../contexts/loading';

const useLoading = () => {
    const { showLoading, hideLoading } = useContext(LoadingContext);

    return { showLoading, hideLoading };
};

export default useLoading;
