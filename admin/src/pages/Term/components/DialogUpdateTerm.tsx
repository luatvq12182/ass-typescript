import { useEffect } from 'react';
import slugify from 'slugify';
import { useForm } from 'react-hook-form';
import { Term } from '../../../interfaces';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

type Props = {
    categories: Term[];
    isOpen: boolean;
    onClose: VoidFunction;
    onUpdateTerm: any;
    taxonomy: string;
    data: Term;
};

const DialogUpdateTerm = ({
    isOpen,
    onClose,
    data: initData,
    categories,
    onUpdateTerm,
    taxonomy,
}: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Term>();

    useEffect(() => {
        reset(initData);
    }, [initData]);

    const submitHandler = async (data: Term) => {
        try {
            const payload = {
                ...data,
                slug: data.slug ? data.slug : slugify(data.name.toLowerCase()),
                taxonomy: taxonomy,
            };

            onUpdateTerm(payload);

            reset();
            onClose();
        } catch (error) {
            console.log({ error });
        }
    };

    const formValues = watch();

    return (
        <Dialog
            header={`Cập nhật ${
                taxonomy === 'category' ? 'chuyên mục' : 'thẻ'
            }`}
            visible={isOpen}
            onHide={onClose}
            style={{ width: '500px' }}
        >
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className='mb-4'>
                    <label htmlFor='update-name' className='block'>
                        Tên
                    </label>

                    <InputText
                        id='update-name'
                        autoFocus
                        aria-describedby='name-help'
                        className='w-full'
                        {...register('name', {
                            required: 'Không được để trống',
                        })}
                    />

                    {errors['name'] && (
                        <small className='p-error'>
                            {errors['name'].message}
                        </small>
                    )}
                </div>

                <div className='mb-4'>
                    <label htmlFor='update-slug' className='block'>
                        Đường dẫn
                    </label>

                    <InputText
                        id='update-slug'
                        aria-describedby='slug-help'
                        className='w-full'
                        {...register('slug')}
                    />
                </div>

                {taxonomy === 'category' && (
                    <div className='mb-4'>
                        <label htmlFor='update-parentId' className='block'>
                            Chuyên mục cha
                        </label>

                        <Dropdown
                            id='update-parentId'
                            value={formValues['parentId']}
                            options={[
                                {
                                    id: '',
                                    name: 'Trống',
                                },
                                ...categories.filter(
                                    (item) => item.id !== watch().id
                                ),
                            ]}
                            optionValue='id'
                            optionLabel='name'
                            className='w-full'
                            onChange={(e) => {
                                setValue('parentId', e.target.value);
                            }}
                        />
                    </div>
                )}

                <div className='mt-8 flex justify-end'>
                    <Button
                        className='p-button-secondary'
                        onClick={onClose}
                        type='button'
                    >
                        Đóng
                    </Button>
                    <div className='mr-2'></div>
                    <Button type='submit'>Xác nhận</Button>
                </div>
            </form>
        </Dialog>
    );
};

export default DialogUpdateTerm;
