import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '@/shared/api/auth/types.ts';
import { login, register } from '@/shared/api/auth';
import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

class AuthStore {
    public isLoading: boolean = false
    private _error: null | AxiosError = null

    get errorsResponse(){
        return this._error;
    }

    login = (data: ILoginRequest): Promise<ILoginResponse> => {
        this._error = null;
        this.isLoading = true;
        return login(data)
            .then((response) => {
                window.localStorage.setItem('access_token', response.data.access);
                Cookies.set('refresh', response.data.refresh)
                return response.data;
            })
            .catch((err) => {
                this._error = err;
            })
            .finally(() => {
                this.isLoading = false;
            });
    };

    registration = (data: IRegisterRequest): Promise<IRegisterResponse> => {
        this._error = null;
        this.isLoading = true;
        return register(data)
            .then((response) => {
                window.localStorage.setItem('access_token', response.data.access);
                Cookies.set('refresh', response.data.refresh)
                return response.data;
            })
            .catch((err) => {
                this._error = err;
            })
            .finally(() => {
                this.isLoading = false;
            });
    };

    logout = () => {
        this.isLoading = true;
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('profile_id');
        this.isLoading = false;
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default AuthStore;