import { useMutation, useQueryClient } from 'react-query';
import { FileService } from '../../services';
import useToast from '../useToast';

const useMutationFile = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { mutate: uploadFile } = useMutation(FileService.uploadFile, {
        onSuccess: () => {
            queryClient.invalidateQueries('files');
            toast.success(`Upload file thành công!`);
        },
        onError: (err: any) => {
            toast.error(`Upload file thất bại: ` + err?.message);
        },
    });

    const { mutate: deleteFile } = useMutation(FileService.deleteFile, {
        onSuccess: () => {
            queryClient.invalidateQueries('files');
            toast.success(`Xóa file thành công!`);
        },
        onError: (err: any) => {
            toast.error(`Xóa file thất bại: ` + err?.message);
        },
    });

    return {
        uploadFile,
        deleteFile,
    };
};

export default useMutationFile;
