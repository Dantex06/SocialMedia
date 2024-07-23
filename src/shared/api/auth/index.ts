import { axiosInstance } from '../instance.ts';
import Endpoints from '../endpoints.ts';
import { ILoginRequest, IPostSendRequest, IRegisterRequest } from './types.ts';
import { AxiosPromise } from 'axios';

export const login = (params: ILoginRequest) => axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const register = (params: IRegisterRequest) => axiosInstance.post(Endpoints.AUTH.REGISTER, params);

export const profile = (): AxiosPromise => {
    return axiosInstance.get(Endpoints.PROFILE.MY_PROFILE);
};

export const like = (id: number): AxiosPromise => {
    return axiosInstance.post(Endpoints.LIKES.LIKE(id))
}

export const whoLiked = (id: number): AxiosPromise => {
    return axiosInstance.get(Endpoints.LIKES.WHO_LIKED(id));
}

export const delLike = (id: number): AxiosPromise => {
    return axiosInstance.delete(Endpoints.LIKES.DELETE_LIKE(id))
}

export const userGetProfile = (id: number): AxiosPromise => {
    return axiosInstance.get(Endpoints.USERS.PROFILE_GET + id);
};

export const userPosts = (id: number): AxiosPromise => {
    return axiosInstance.get(Endpoints.POSTS.PROFILE_GET_POSTS(id));
};

export const postSend = (newpost: IPostSendRequest): AxiosPromise => axiosInstance.post(Endpoints.PROFILE.POST_SEND, newpost);

export const postsGet = (): AxiosPromise => {
    return axiosInstance.get(Endpoints.POSTS.POST_GET);
};

export const postsGetMore = (page: number) => {
    return axiosInstance.get(Endpoints.POSTS.POST_GET_MORE(page))
}