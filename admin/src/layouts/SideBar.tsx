import { Link } from 'react-router-dom';
import { Navigation } from '../interfaces';
import MenuLink from './MenuLink';
import DashboardIcon from '../assets/icons/DashboardIcon';
// import RightIcon from '../assets/icons/RightIcon';

type Props = {
    navigations: Navigation[];
};

const SideBar = ({ navigations }: Props) => {
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
            {/* <ul>
                {navigations.map(({ label, to }: Navigation, i: number) => {
                    return (
                        <NavLink key={i} to={to}>
                            {label}
                        </NavLink>
                    );
                })}
            </ul> */}
        </div>
    );
};

export default SideBar;
