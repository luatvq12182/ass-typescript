import { useQuery } from 'react-query';
import { PostService } from '../../services';

const usePosts = () => {
    return useQuery(['posts'], PostService.getPosts, {
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    });
};

export default usePosts;
