import { axiosInstance } from '../instance.ts';
import Endpoints from '../endpoints.ts';
import { ILoginRequest, IPostSendRequest, IRegisterRequest } from './types.ts';
import { AxiosPromise } from 'axios';

export const login = (params: ILoginRequest) => axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const register = (params: IRegisterRequest) => axiosInstance.post(Endpoints.AUTH.REGISTER, params);

export const profile = (): AxiosPromise => {
    return axiosInstance.get(Endpoints.AUTH.PROFILE);
};

export const userGetProfile = (id: number): AxiosPromise => {
    return axiosInstance.get(Endpoints.AUTH.PROFILE_GET + id);
};

export const userPosts = (id: number): AxiosPromise => {
    return axiosInstance.get(Endpoints.AUTH.PROFILE_GET_POSTS(id));
};

export const refresh = (params: string | undefined) =>
    axiosInstance.post(Endpoints.AUTH.REFRESH, {
        refresh: params,
    });

export const postSend = (newpost: IPostSendRequest): AxiosPromise => axiosInstance.post(Endpoints.AUTH.POST_SEND, newpost);

export const postsGet = (): AxiosPromise => {
    return axiosInstance.get(Endpoints.AUTH.POST_GET);
};
