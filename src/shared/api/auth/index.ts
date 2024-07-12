import {axiosInstance} from "../instance.ts";
import {ILoginRequest, IRefreshRequest, IRegisterRequest} from "./types.ts";
import Endpoints from "../endpoints.ts";
import {AxiosPromise} from "axios";

export const login = (params: ILoginRequest) =>
    axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const register = (params: IRegisterRequest)  =>
    axiosInstance.post(Endpoints.AUTH.REGISTER, params);

export const profile = (): AxiosPromise => {
    return axiosInstance.get(Endpoints.AUTH.PROFILE)
}

export const refresh = (params: IRefreshRequest) =>
    axiosInstance.post(Endpoints.AUTH.REFRESH, params)
