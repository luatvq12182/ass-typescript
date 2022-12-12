import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import useAuth from '../../auth/useAuth';
import { InputText } from 'primereact/inputtext';
import { http } from '../../services/http';
import { AuthService } from '../../services';

type Fields = {
    email: string;
    password: string | number;
};

const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Fields>();

    const from = location.state?.from?.pathname || '/';

    const submitHandler = async (data: Fields) => {
        try {
            const res = await AuthService.signIn(data);

            http.setAuthorizationHeader(res.data.accessToken);

            auth.signIn(res.data.user.username, () => {
                AuthService.setLocalStorage(res.data);
            });
        } catch (error: any) {
            window.alert(error?.response?.data);
        }
    };

    useEffect(() => {
        if (auth.user) {
            navigate(from, {
                replace: true,
            });
        }
    }, [auth]);

    return (
        <div className='fixed top-1/2 left-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-md bg-white p-10 shadow-sm xl:w-1/3'>
            <h1 className='mb-10 font-sans text-3xl font-bold'>Sign In</h1>

            <form onSubmit={handleSubmit(submitHandler)}>
                <InputText
                    {...register('email', {
                        required: 'Không được để trống trường này!',
                    })}
                    type='email'
                    className='w-full'
                    placeholder='Username'
                    autoFocus
                />
                {errors['email'] && (
                    <small className='p-error'>{errors['email'].message}</small>
                )}

                <InputText
                    {...register('password', {
                        required: 'Không được để trống trường này!',
                    })}
                    type='password'
                    className='w-full'
                    placeholder='Password'
                />
                {errors['password'] && (
                    <small className='p-error'>
                        {errors['password'].message}
                    </small>
                )}

                <Button type='submit' label='Sign In' className='w-full' />
            </form>
        </div>
    );
};

export default SignIn;
