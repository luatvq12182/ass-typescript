import { Navigation } from './interfaces';
import DashboardIcon from './assets/icons/DashboardIcon';

const navigations: Navigation[] = [
    // {
    //     icon: <DashboardIcon />,
    //     label: 'Dashboard',
    //     to: '/admin/dashboard',
    // },
    {
        icon: <DashboardIcon />,
        label: 'Media',
        to: '/admin/upload',
    },
    {
        icon: <DashboardIcon />,
        label: 'Danh sách bài viết',
        to: '/admin/posts',
    },
    {
        icon: <DashboardIcon />,
        label: 'Thêm bài viết',
        to: '/admin/posts/add-post',
    },
    {
        icon: <DashboardIcon />,
        label: 'Chuyên mục',
        to: '/admin/term?taxonomy=category',
    },
    // {
    //     icon: <DashboardIcon />,
    //     label: 'Thẻ',
    //     to: '/admin/term?taxonomy=tag',
    // },
];

export default navigations;
