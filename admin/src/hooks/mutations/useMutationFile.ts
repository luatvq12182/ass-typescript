import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { FileService } from '../../services';
import useLoading from '../useLoading';
import useToast from '../useToast';

const useMutationFile = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { showLoading, hideLoading } = useLoading();

    const { mutate: uploadFile, isLoading: isLoadingUpload } = useMutation(
        FileService.uploadFile,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('files');
                toast.success(`Upload file thành công!`);
            },
            onError: (err: any) => {
                toast.error(`Upload file thất bại: ` + err?.message);
            },
        }
    );

    const { mutate: deleteFile, isLoading: isLoadingDelete } = useMutation(
        FileService.deleteFile,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('files');
                toast.success(`Xóa file thành công!`);
            },
            onError: (err: any) => {
                toast.error(`Xóa file thất bại: ` + err?.message);
            },
        }
    );

    useEffect(() => {
        if (isLoadingUpload || isLoadingDelete) {
            showLoading();
        } else {
            hideLoading();
        }
    }, [isLoadingUpload, isLoadingDelete]);

    return {
        uploadFile,
        deleteFile,
    };
};

export default useMutationFile;
