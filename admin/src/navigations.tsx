import { Navigation } from './interfaces';

const navigations: Navigation[] = [
    {
        label: 'Media',
        to: '/admin/upload',
    },
    {
        label: 'Menu',
        to: '/admin/menu',
    },
    {
        label: 'Danh sách bài viết',
        to: '/admin/posts',
    },
    {
        label: 'Thêm bài viết',
        to: '/admin/posts/add-post',
    },
    {
        label: 'Chuyên mục',
        to: '/admin/term?taxonomy=category',
    },
    {
        label: 'Bình luận',
        to: '/admin/comments',
    },
    // {
    //     label: 'Thẻ',
    //     to: '/admin/term?taxonomy=tag',
    // },
];

export default navigations;
