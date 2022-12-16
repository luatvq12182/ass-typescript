import { useRef } from 'react';
import { Button } from 'primereact/button';
import CommonTable from '../../components/CommonTable';
import { ColumnType, Comment as CommentInterface } from '../../interfaces';
import useConfirm from '../../hooks/useConfirm';
import useMutationComment from '../../hooks/mutations/useMutationComment';
import useComments from '../../hooks/queries/useComments';
import { InputSwitch } from 'primereact/inputswitch';

const Comment = () => {
    const idSelected = useRef<number>(null!);
    const { data, isFetching } = useComments();
    const { deleteComment, allowComment } = useMutationComment();
    const { showConfirm } = useConfirm({
        message: 'Bạn có chắc muốn xóa bình luận này?',
        accept: () => {
            deleteComment(idSelected.current);
        },
    });

    const columns: ColumnType[] = [
        {
            field: 'name',
            header: 'Người bình luận',
        },
        {
            field: 'email',
            header: 'Email',
        },
        {
            field: 'content',
            header: 'Nội dung',
        },
        {
            header: 'Hiển thị',
            body: (data: CommentInterface) => {
                return (
                    <InputSwitch
                        checked={data.allow}
                        onChange={(e) => {
                            allowComment({
                                ...data,
                                allow: e.value,
                            });
                        }}
                    />
                );
            },
        },
        {
            body: (data: CommentInterface) => {
                return (
                    <div>
                        <Button
                            icon='pi pi-trash'
                            className='p-button-rounded p-button-danger p-button-text'
                            onClick={() => {
                                if (data.id) {
                                    idSelected.current = data.id;
                                    showConfirm();
                                }
                            }}
                        />
                    </div>
                );
            },
            style: {
                width: '120px',
            },
        },
    ];

    return (
        <div>
            <div className='col-span-2 rounded-md bg-white p-7 shadow-lg'>
                <CommonTable
                    value={data?.data || []}
                    columns={columns}
                    loading={isFetching}
                />
            </div>
        </div>
    );
};

export default Comment;
