import { NavLink } from 'react-router-dom';
import { Navigation } from '../interfaces';

const MenuLink = ({ icon, label, to }: Navigation) => {
    return (
        <NavLink to={to}>
            <span className='flex cursor-pointer items-center p-4 font-sans text-[#9D9DA6] outline-none hover:text-white'>
                <span className='mr-2'>
                    {icon}
                    {/* <DashboardIcon /> */}
                </span>
                <span className='font-sans text-[13px]'>{label}</span>
                <span>{/* <RightIcon /> */}</span>
            </span>
        </NavLink>
    );
};

export default MenuLink;
