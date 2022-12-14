import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { PostService } from '../../services';
import useLoading from '../useLoading';
import useToast from '../useToast';

const useMutationPost = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { showLoading, hideLoading } = useLoading();

    const { mutate: createPost, isLoading: isLoadingCreate } = useMutation(
        PostService.createPost,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('posts');
                toast.success(`Thêm mới bài viết thành công!`);
                navigate('/admin/posts');
            },
            onError: (err: any) => {
                toast.error(`Thêm mới bài viết thất bại: ` + err?.message);
            },
        }
    );

    const { mutate: updatePost, isLoading: isLoadingUpdate } = useMutation(
        PostService.updatePost,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('posts');
                toast.success(`Cập nhật bài viết thành công!`);
                navigate('/admin/posts');
            },
            onError: (err: any) => {
                toast.error(`Cập nhật bài viết thất bại: ` + err?.message);
            },
        }
    );

    const { mutate: deletePost, isLoading: isLoadingDelete } = useMutation(
        PostService.deletePost,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('posts');
                toast.success(`Xóa bài viết thành công!`);
            },
            onError: (err: any) => {
                toast.error(`Xóa bài viết thất bại: ` + err?.message);
            },
        }
    );

    useEffect(() => {
        if (isLoadingCreate || isLoadingUpdate || isLoadingDelete) {
            showLoading();
        } else {
            hideLoading();
        }
    }, [isLoadingCreate, isLoadingUpdate, isLoadingDelete]);

    return {
        createPost,
        updatePost,
        deletePost,
    };
};

export default useMutationPost;
