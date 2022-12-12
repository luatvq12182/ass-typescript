import { useRef } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../components/CommonTable';
import useMutationPost from '../../hooks/mutations/useMutationPost';
import usePosts from '../../hooks/queries/usePosts';
import useConfirm from '../../hooks/useConfirm';
import { ColumnType, Post } from '../../interfaces';

const Posts = () => {
    const navigate = useNavigate();
    const idSelected = useRef<number>(null!);
    const { data } = usePosts();
    const { deletePost } = useMutationPost();
    const { showConfirm } = useConfirm({
        message: 'Bạn có chắc muốn xóa bài viết này?',
        accept: () => {
            deletePost(idSelected.current);
        },
    });

    const columns: ColumnType[] = [
        {
            field: 'thumbnail',
            header: 'Ảnh đại diện',
            body: (data: Post) => {
                return (
                    <img
                        className='w-[150px] rounded-md'
                        src={`${import.meta.env.VITE_API_URL}/images/${
                            data.thumbnail
                        }`}
                    />
                );
            },
        },
        {
            field: 'title',
            header: 'Tiêu đề',
        },
        {
            field: 'slug',
            header: 'Đường dẫn',
        },
        {
            body: (data: Post) => {
                return (
                    <div>
                        <Button
                            icon='pi pi-pencil'
                            className='p-button-rounded p-button-info p-button-text'
                            onClick={() => {
                                navigate(`/admin/posts/edit-post/${data.id}`);
                            }}
                        />
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
                width: '120px'
            }
        },
    ];

    return (
        <div>
            <div className='mb-3'>
                <Button
                    onClick={() => {
                        navigate('/admin/posts/add-post');
                    }}
                >
                    Thêm bài viết mới
                </Button>
            </div>
            <div className='col-span-2 rounded-md bg-white p-7 shadow-lg'>
                <CommonTable value={data?.data || []} columns={columns} />
            </div>
        </div>
    );
};

export default Posts;
