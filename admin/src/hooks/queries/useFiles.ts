import { useQuery } from 'react-query';
import { FileService } from '../../services';

const useFiles = () => {
    return useQuery(['files'], FileService.getFiles, {
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });
};

export default useFiles;
