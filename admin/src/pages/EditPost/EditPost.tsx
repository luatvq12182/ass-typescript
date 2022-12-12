import slugify from 'slugify';
import { useForm } from 'react-hook-form';
import { Post, Term } from '../../interfaces';
import useTerms from '../../hooks/queries/useTerms';
import useMutationPost from '../../hooks/mutations/useMutationPost';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Tree } from 'primereact/tree';
import SelectImage from '../../components/SelectImage';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { PostService } from '../../services';
import { listToTree } from '../../utils';
import { Dialog } from 'primereact/dialog';
import TermForm from '../Term/components/TermForm';
import useMutationTerm from '../../hooks/mutations/useMutationTerm';

const EditPost = () => {
    const { id } = useParams();
    const { data: post } = useQuery(
        'detailPost',
        () => PostService.getDetailPost(Number(id)),
        {
            refetchOnMount: true,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
        }
    );
    const { createTerm } = useMutationTerm('category');
    const { data: terms } = useTerms();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Post>();
    const { updatePost } = useMutationPost();
    const [categoriesSelected, setCategoriesSelected] = useState<any>({});
    const [visibleCategoryDialog, setVisibleCategoryDialog] =
        useState<boolean>(false);

    const categories = terms?.data
        .filter((term: Term) => {
            return term.taxonomy === 'category';
        })
        .map((category: Term) => {
            return {
                ...category,
                key: category.id,
                label: category.name,
            };
        });

    const submitHandler = (data: Post) => {
        updatePost({
            ...data,
            slug: data.slug ? data.slug : slugify(data.title).toLowerCase(),
        });
    };

    useEffect(() => {
        reset(post?.data);
        if (post?.data?.categories) {
            const selections: any = {};
            post?.data?.categories.forEach((id: number) => {
                selections[id] = {
                    checked: true,
                    partialChecked: false,
                };
            });
            setCategoriesSelected(selections);
        }
    }, [post?.data]);

    const toggleCategoryDialog = () =>
        setVisibleCategoryDialog(!visibleCategoryDialog);

    return (
        <div>
            <Dialog
                header={'Thêm chuyên mục'}
                style={{ width: '50vh' }}
                visible={visibleCategoryDialog}
                onHide={toggleCategoryDialog}
            >
                <TermForm
                    taxonomy='category'
                    categories={categories}
                    onCreateTerm={createTerm}
                />
            </Dialog>

            <div className='mb-2'>
                <Link
                    className='flex items-center text-sky-500 hover:text-sky-600'
                    to={'/admin/posts'}
                >
                    <i className='pi pi-angle-left' /> Danh sách bài viết
                </Link>
            </div>

            <div className='grid grid-cols-4 gap-7'>
                <div className='col-span-3 rounded-md bg-white p-7 shadow-lg'>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className='mb-4'>
                            <label htmlFor='title' className='block'>
                                Tiêu đề
                            </label>

                            <InputText
                                id='title'
                                aria-describedby='name-help'
                                className='w-full'
                                {...register('title', {
                                    required: 'Không được để trống',
                                })}
                            />

                            {errors['title'] && (
                                <small className='p-error'>
                                    {errors['title'].message}
                                </small>
                            )}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='slug' className='block'>
                                Đường dẫn
                            </label>

                            <InputText
                                id='slug'
                                aria-describedby='slug-help'
                                className='w-full'
                                {...register('slug')}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='content' className='block'>
                                Nội dung
                            </label>

                            {watch().content && (
                                <Editor
                                    id='content'
                                    style={{
                                        height: '320px',
                                        fontFamily: 'Inter',
                                        fontSize: '16px',
                                    }}
                                    value={watch().content}
                                    onTextChange={(e) =>
                                        setValue('content', e.htmlValue || '')
                                    }
                                />
                            )}
                        </div>

                        <div className='mt-8'>
                            <Button>Cập nhật bài viết</Button>
                        </div>
                    </form>
                </div>

                <div className='col-span-1 rounded-md bg-white p-7 shadow-lg'>
                    <div>
                        <SelectImage
                            label='Chọn ảnh đại diện'
                            onSelect={(img: string) => {
                                setValue('thumbnail', img);
                            }}
                            imgSelect={watch().thumbnail}
                        />

                        {watch().thumbnail && (
                            <div
                                className='relative mt-4 h-[200px] w-full rounded-md bg-cover'
                                style={{
                                    backgroundImage: `url(${
                                        `${
                                            import.meta.env.VITE_API_URL
                                        }/images/` + watch().thumbnail
                                    })`,
                                }}
                            />
                        )}
                    </div>

                    <div className='mt-8'>
                        <h4>Chuyên mục</h4>

                        <Tree
                            className='mt-2 max-h-[280px] overflow-auto'
                            value={listToTree(categories || []) || []}
                            selectionMode='checkbox'
                            selectionKeys={categoriesSelected}
                            onSelectionChange={(e) => {
                                setCategoriesSelected(e.value);
                                setValue(
                                    'categories',
                                    Object.keys(e?.value || {}).map((item) =>
                                        Number(item)
                                    )
                                );
                            }}
                        />

                        <p
                            onClick={toggleCategoryDialog}
                            className='mt-2 cursor-pointer text-sky-500 hover:text-sky-600'
                        >
                            + Thêm chuyên mục mới
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
