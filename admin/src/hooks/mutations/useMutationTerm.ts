import { useMutation, useQueryClient } from 'react-query';
import { TermService } from '../../services';
import useToast from '../useToast';

const useMutationTerm = (taxonomy: string) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const name = taxonomy === 'category' ? 'Danh mục' : 'Thẻ';

    const { mutate: createTerm } = useMutation(TermService.createTerm, {
        onSuccess: () => {
            queryClient.invalidateQueries('terms');
            toast.success(`Thêm mới ${name} thành công!`);
        },
        onError: (err: any) => {
            toast.error(`Thêm mới ${name} thất bại: ` + err?.message);
        },
    });

    const { mutate: updateTerm } = useMutation(TermService.updateTerm, {
        onSuccess: () => {
            queryClient.invalidateQueries('terms');
            toast.success(`Cập nhật ${name} thành công!`);
        },
        onError: (err: any) => {
            toast.error(`Cập nhật ${name} thất bại: ` + err?.message);
        },
    });

    const { mutate: deleteTerm } = useMutation(TermService.deleteTerm, {
        onSuccess: () => {
            queryClient.invalidateQueries('terms');
            toast.success(`Xóa ${name} thành công!`);
        },
        onError: (err: any) => {
            toast.error(`Xóa ${name} thất bại: ` + err?.message);
        },
    });

    return {
        createTerm,
        updateTerm,
        deleteTerm,
    };
};

export default useMutationTerm;
