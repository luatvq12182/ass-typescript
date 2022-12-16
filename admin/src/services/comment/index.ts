import { Comment, Post } from '../../interfaces';
import { http } from '../http';

const POST = '/comments';

const CommentService = {
    getComments: () => {
        return http.get(POST);
    },
    allowComment: (data: Comment) => {
        return http.put(POST + '/' + data.id, data);
    },
    deleteComment: (id: number) => {
        return http.delete(POST + '/' + id);
    },
};

export default CommentService;
