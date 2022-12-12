import { Post } from '../../interfaces';
import { http } from '../http';

const POST = '/posts';

const PostService = {
    getPosts: () => {
        return http.get(POST);
    },
    getDetailPost: (id: number) => {
        return http.get(POST + '/' + id);
    },
    createPost: (data: Post) => {
        return http.post(POST, data);
    },
    updatePost: (data: Post) => {
        return http.put(POST + '/' + data.id, data);
    },
    deletePost: (id: number) => {
        return http.delete(POST + '/' + id);
    },
};

export default PostService;
