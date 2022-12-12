import axios, { AxiosInstance } from 'axios';

const http = (() => {
    const instance: AxiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}/api`,
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (
                error?.response?.status === 401 &&
                error?.response?.data === 'jwt expired'
            ) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.alert('Phiên đăng nhập đã hết hạn');
                window.location.reload();
            }
            return Promise.reject(error);
        }
    );

    const setAuthorizationHeader = (token: string) => {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    };

    const get = (url: string, config?: any) => {
        return instance.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        });
    };

    const post = (url: string, data: any, config?: any) => {
        return instance.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        });
    };

    const postMultipart = (url: string, formData: FormData, config?: any) => {
        return instance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...config,
        });
    };

    const put = (url: string, data: any, config?: any) => {
        return instance.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
        });
    };

    const del = (url: string, config?: any) => {
        return instance.delete(url, config);
    };

    return {
        setAuthorizationHeader,
        get,
        post,
        postMultipart,
        put,
        delete: del,
    };
})();

export { http };
