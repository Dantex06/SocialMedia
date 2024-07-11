import {makeAutoObservable} from "mobx";
import {login, register} from "../../shared/api/auth";

export interface AuthState {
    authData: {
        accessToken: string | null,
        isLoading: boolean,
        error: string | null,
    }

}



class AuthStore {

    initialState: AuthState = {
        authData: {
            accessToken: null,
            isLoading: false,
            error: null,
        },

    }

    login = (data: any) => {
        console.log("start login")
        this.initialState.authData.error = null;
        this.initialState.authData.isLoading = true;
        login(data).then(response => {
            window.localStorage.setItem('access_token', response.data.access);
            this.initialState.authData.accessToken = response.data.access;
        })
            .catch(err => {
                this.initialState.authData.error = err;
            })
            .finally(() => {
                this.initialState.authData.isLoading = false;
            });}

    registration = (data: any) => {
        console.log("start register")
        try {
            this.initialState.authData.isLoading = true;
            this.initialState.authData.accessToken = register(data);
            this.initialState.authData.isLoading = false;
        } catch (e: any) {
            this.initialState.authData.error = e;
        }
    }

    logout = () => {
        try {
            this.initialState.authData.isLoading = true;
            window.localStorage.removeItem('access_token');
            this.initialState.authData.accessToken = null;
            this.initialState.authData.isLoading = false;
        } catch (e) {
            this.initialState.authData.error = e;
        }

    }

    constructor() {
        makeAutoObservable(this)
    }

}

export default AuthStore;