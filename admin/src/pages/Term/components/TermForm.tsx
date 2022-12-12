import { Term } from '../../../interfaces';
import slugify from 'slugify';

import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

type Props = {
    categories: Term[];
    onCreateTerm: any;
    taxonomy: string;
};

const TermForm = ({ categories, onCreateTerm, taxonomy }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Term>();

    const submitHandler = async (data: Term) => {
        try {
            const payload = {
                ...data,
                slug: data.slug ? data.slug : slugify(data.name.toLowerCase()),
                taxonomy: taxonomy,
            };

            onCreateTerm(payload);

            reset();
        } catch (error) {
            console.log({ error });
        }
    };

    const formValues = watch();

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='mb-4'>
                <label htmlFor='name' className='block'>
                    Tên
                </label>

                <InputText
                    id='name'
                    aria-describedby='name-help'
                    className='w-full'
                    {...register('name', { required: 'Không được để trống' })}
                />

                {errors['name'] && (
                    <small className='p-error'>{errors['name'].message}</small>
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

            {taxonomy === 'category' && (
                <div className='mb-4'>
                    <label htmlFor='parentId' className='block'>
                        Chuyên mục cha
                    </label>

                    <Dropdown
                        value={formValues['parentId']}
                        options={categories}
                        optionValue='id'
                        optionLabel='name'
                        className='w-full'
                        onChange={(e) => {
                            setValue('parentId', e.target.value);
                        }}
                    />
                </div>
            )}

            <div className='mt-8'>
                <Button>
                    {taxonomy === 'category' ? 'Thêm chuyên mục' : 'Thêm thẻ'}
                </Button>
            </div>
        </form>
    );
};

export default TermForm;
