import Endpoints from './endpoints.ts';
import axios from 'axios';
import Cookies from 'js-cookie';


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
});

const urlSkipAuth = [Endpoints.AUTH.LOGIN, Endpoints.AUTH.REGISTER, Endpoints.AUTH.LOGOUT, Endpoints.AUTH.REFRESH];


axiosInstance.interceptors.request.use(async (config) => {
    if (config.url && urlSkipAuth.includes(config.url)) {
        return config;
    }

    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
        const authorization = `Bearer ${accessToken}`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        config.headers = {
            ...config.headers,
            Authorization: authorization,
        };
    }
    return config;
});

axiosInstance.interceptors.response.use(
 (response) => response,
 async (error) => {
     const originalRequest = error.config;
     // Проверяем, была ли ошибка 401 (неавторизованный доступ)
     if (error.response && error.response.status === 401 && !originalRequest._retry && !urlSkipAuth.includes(originalRequest.url)) {
         originalRequest._retry = true; // Устанавливаем флаг, чтобы не повторять запрос бесконечно

         try {
             const response = await axiosInstance.post(Endpoints.AUTH.REFRESH, {
                 refresh: Cookies.get('refresh'),
             });
             window.localStorage.setItem('access_token', response.data.access);

             originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
             return axiosInstance(originalRequest);
         } catch (refreshError) {
             console.error('Ошибка при обновлении токена:', refreshError);
         }
     }
     return Promise.reject(error);
 }
);

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError) => {
//         const isLoggedIn = !!store.getState().auth.authData.accessToken
//
//         if ((error.response?.status === 401) && isLoggedIn && error.request.url !== Endpoints.AUTH.LOGOUT) {
//             store.dispatch(logoutUser())
//         }
//
//         throw error
//     }
// )