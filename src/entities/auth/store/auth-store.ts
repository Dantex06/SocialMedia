import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '@/shared/api/auth/types.ts';
import { login, register } from '@/shared/api/auth';
import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

export interface IAuthState {
    authData: {
        accessToken: string | null;
        refreshToken: string | null;
        isLoading: boolean;
        error: AxiosError | null | undefined;
    };
}

class AuthStore {
    initialState: IAuthState = {
        authData: {
            accessToken: null,
            refreshToken: null,
            isLoading: false,
            error: null,
        },
    };

    login = (data: ILoginRequest): Promise<ILoginResponse> => {
        this.initialState.authData.error = null;
        this.initialState.authData.isLoading = true;
        return login(data)
            .then((response) => {
                window.localStorage.setItem('access_token', response.data.access);
                this.initialState.authData.accessToken = response.data.access;
                this.initialState.authData.refreshToken = response.data.refresh;
                return response.data;
            })
            .catch((err) => {
                this.initialState.authData.error = err;
            })
            .finally(() => {
                this.initialState.authData.isLoading = false;
            });
    };

    registration = (data: IRegisterRequest): Promise<IRegisterResponse> => {
        this.initialState.authData.error = null;
        this.initialState.authData.isLoading = true;
        return register(data)
            .then((response) => {
                window.localStorage.setItem('access_token', response.data.access);
                this.initialState.authData.accessToken = response.data.access;
                this.initialState.authData.refreshToken = response.data.refresh;
                return response.data;
            })
            .catch((err) => {
                this.initialState.authData.error = err;
            })
            .finally(() => {
                this.initialState.authData.isLoading = false;
            });
    };

    logout = () => {
        this.initialState.authData.isLoading = true;
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('profile_id');
        this.initialState.authData.accessToken = null;
        this.initialState.authData.refreshToken = null;
        this.initialState.authData.isLoading = false;
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default AuthStore;