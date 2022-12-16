import { useQuery } from 'react-query';
import { CommentService } from '../../services';

const useComments = () => {
    return useQuery(['comments'], CommentService.getComments, {
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });
};

export default useComments;
