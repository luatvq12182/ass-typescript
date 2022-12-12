import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import AuthProvider from './auth/AuthProvider';
import LoadingProvider from './contexts/loading';
import { ConfirmProvider } from './contexts/confirm';
import { ToastProvider } from './contexts/toast';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import './index.css';
import 'primereact/resources/themes/tailwind-light/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

const router = createBrowserRouter(routes);

const queryClient = new QueryClient();

console.log(import.meta.env.VITE_API_URL)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <ConfirmProvider>
                <ToastProvider>
                    <LoadingProvider>
                        <QueryClientProvider client={queryClient}>
                            <RouterProvider router={router} />
                        </QueryClientProvider>
                    </LoadingProvider>
                </ToastProvider>
            </ConfirmProvider>
        </AuthProvider>
    </React.StrictMode>
);
