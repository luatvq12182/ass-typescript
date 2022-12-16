import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../interfaces';
import MenuLink from './MenuLink';
import { Button } from 'primereact/button';
import { AuthService } from '../services';

type Props = {
    navigations: Navigation[];
};

const SideBar = ({ navigations }: Props) => {
    const navigate = useNavigate();

    return (
        <div className='fixed top-0 bottom-0 left-0 bg-[#1e1e2d] lg:w-[265px]'>
            <div className='flex items-center justify-around border-b-[1px] border-dashed border-[#393945] lg:h-[70px]'>
                <Link to={'/'}>
                    <img
                        className='h-[25px]'
                        src='https://preview.keenthemes.com/metronic8/demo1/assets/media/logos/default-dark.svg'
                        alt='logo'
                    />
                </Link>
            </div>

            <div className='flex flex-col px-3 pt-3'>
                {navigations.map((navigation: Navigation, i: number) => {
                    return <MenuLink key={i} {...navigation} />;
                })}
            </div>

            <div className='fixed bottom-0 w-[265px] bg-red-200'>
                <Button
                    onClick={() => {
                        AuthService.signOut();
                        navigate('/sign-in');
                    }}
                    label='Đăng xuất'
                    className='p-button-danger p-button-text w-full'
                />
            </div>
        </div>
    );
};

export default SideBar;
