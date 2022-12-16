import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CommentService } from '../../services';
import useLoading from '../useLoading';
import useToast from '../useToast';

const useMutationComment = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { showLoading, hideLoading } = useLoading();

    const { mutate: allowComment, isLoading: isLoadingUpdate } = useMutation(
        CommentService.allowComment,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('comments');
                toast.success(`Cập nhật thành công!`);
            },
            onError: (err: any) => {
                toast.error(`Cập nhật thất bại: ` + err?.message);
            },
        }
    );

    const { mutate: deleteComment, isLoading: isLoadingDelete } = useMutation(
        CommentService.deleteComment,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('comments');
                toast.success(`Xóa bình luận thành công!`);
            },
            onError: (err: any) => {
                toast.error(`Xóa bình luận thất bại: ` + err?.message);
            },
        }
    );

    useEffect(() => {
        if (isLoadingUpdate || isLoadingDelete) {
            showLoading();
        } else {
            hideLoading();
        }
    }, [isLoadingUpdate, isLoadingDelete]);

    return {
        allowComment,
        deleteComment,
    };
};

export default useMutationComment;
