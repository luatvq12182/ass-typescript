import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TermService } from '../../services';
import useLoading from '../useLoading';
import useToast from '../useToast';

const useMutationTerm = (taxonomy: string) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { showLoading, hideLoading } = useLoading();

    const name: any = {
        category: 'Danh mục',
        tag: 'Thẻ',
        link: 'Liên kết',
    };

    const { mutate: createTerm, isLoading: isLoadingCreate } = useMutation(
        TermService.createTerm,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('terms');
                toast.success(`Thêm mới ${name[taxonomy]} thành công!`);
            },
            onError: (err: any) => {
                toast.error(
                    `Thêm mới ${name[taxonomy]} thất bại: ` + err?.message
                );
            },
        }
    );

    const { mutate: updateTerm, isLoading: isLoadingUpdate } = useMutation(
        TermService.updateTerm,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('terms');
                toast.success(`Cập nhật ${name[taxonomy]} thành công!`);
            },
            onError: (err: any) => {
                toast.error(
                    `Cập nhật ${name[taxonomy]} thất bại: ` + err?.message
                );
            },
        }
    );

    const { mutate: updateMenu, isLoading: isLoadingUpdateMenu } = useMutation(
        TermService.updateMenu,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('terms');
                toast.success(`Cập nhật Menu thành công!`);
            },
            onError: (err: any) => {
                toast.error(
                    `Cập nhật Menu thất bại: ` + err?.message
                );
            },
        }
    );

    const { mutate: deleteTerm, isLoading: isLoadingDelete } = useMutation(
        TermService.deleteTerm,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('terms');
                toast.success(`Xóa ${name[taxonomy]} thành công!`);
            },
            onError: (err: any) => {
                toast.error(`Xóa ${name[taxonomy]} thất bại: ` + err?.message);
            },
        }
    );

    useEffect(() => {
        if (
            isLoadingCreate ||
            isLoadingUpdate ||
            isLoadingDelete ||
            isLoadingUpdateMenu
        ) {
            showLoading();
        } else {
            hideLoading();
        }
    }, [
        isLoadingCreate,
        isLoadingUpdate,
        isLoadingDelete,
        isLoadingUpdateMenu,
    ]);

    return {
        createTerm,
        updateTerm,
        updateMenu,
        deleteTerm,
    };
};

export default useMutationTerm;
