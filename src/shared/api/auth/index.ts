import {axiosInstance} from "../instance.ts";
import {ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse} from "./types.ts";
import Endpoints from "../endpoints.ts";
import {AxiosPromise} from "axios";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
    axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const register = (params: IRegisterRequest): AxiosPromise<IRegisterResponse> =>
    axiosInstance.post(Endpoints.AUTH.REGISTER, params);