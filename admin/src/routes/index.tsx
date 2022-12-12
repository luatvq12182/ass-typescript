import { RouteObject } from 'react-router-dom';
import App from '../App';
import RequireAuth from '../auth/RequireAuth';
import { AddPost, EditPost, NotFound, Posts, SignIn, Term, Upload } from '../pages';

const routes: RouteObject[] = [
    {
        path: 'admin',
        element: (
            <RequireAuth>
                <App />
            </RequireAuth>
        ),
        children: [
            {
                path: 'upload',
                element: <Upload />,
            },
            {
                path: 'posts',
                element: <Posts />,
            },
            {
                path: 'posts/add-post',
                element: <AddPost />,
            },
            {
                path: 'posts/edit-post/:id',
                element: <EditPost />,
            },
            {
                path: 'term',
                element: <Term />,
            },
        ],
    },
    {
        path: 'sign-in',
        element: <SignIn />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;
