import {makeAutoObservable} from "mobx";
import {login, profile, refresh, register} from "../../shared/api/auth";
import {
    ILoginRequest,
    ILoginResponse,
    IRefreshRequest,
    IRefreshResponse,
    IRegisterRequest, IRegisterResponse
} from "../../shared/api/auth/types.ts";
// import Cookies from "universal-cookie"
// import jwt from "jwt-decode"

// enum accessState {
//     "join",
//     "exit"
// }


export interface AuthState {
    authData: {
        accessToken: string | null,
        refreshToken: string | null,
        isLoading: boolean,
        error: string | null,
    },
    profileData: {
        "id": number | null,
        "name": string | null,
        "surname": string | null,
        "email": string | null,
        "country": {
            "id": 70,
            "name": "Estonia",
            "alpha2": "EE",
            "alpha3": "EST",
            "region": "Europe"
        },
        "is_public": true,
        "image": string | null,
        "birthday": string | null
        "error": string | null
    }
}


class AuthStore {

    initialState: AuthState = {
        authData: {
            accessToken: null,
            refreshToken: null,
            isLoading: false,
            error: null,
        },
        profileData: {
            id: null,
            name: null,
            surname: null,
            email: null,
            "country": {
                "id": 70,
                "name": "Estonia",
                "alpha2": "EE",
                "alpha3": "EST",
                "region": "Europe"
            },
            "is_public": true,
            image: null,
            birthday: null,
            error: null
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    login = (data: ILoginRequest): Promise<ILoginResponse> => {
        this.initialState.authData.error = null;
        this.initialState.authData.isLoading = true;
        login(data).then(response => {
            window.localStorage.setItem('access_token', response.data.access);
            this.initialState.authData.accessToken = response.data.access;
            this.initialState.authData.refreshToken = response.data.refresh
        })
            .catch(err => {
                this.initialState.authData.error = err;
            })
            .finally(() => {
                this.initialState.authData.isLoading = false;

            });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    registration = (data: IRegisterRequest): Promise<IRegisterResponse> => {
        this.initialState.authData.error = null;
        this.initialState.authData.isLoading = true;
        register(data).then(response => {
            window.localStorage.setItem('access_token', response.data.access);
            this.initialState.authData.accessToken = response.data.access
            this.initialState.authData.refreshToken = response.data.refresh
        })
            .catch(err => {
                this.initialState.authData.error = err;
            })
            .finally(() => {
                this.initialState.authData.isLoading = false;
            });
    }

    // @ts-ignore
    updateToken = (data: IRefreshRequest): Promise<IRefreshResponse> => {
        this.initialState.authData.error = null;
        this.initialState.authData.isLoading = true;
        refresh(data).then(response=>{
            window.localStorage.setItem('access_token', response.data.access);
            this.initialState.authData.accessToken = response.data.access
            this.initialState.authData.refreshToken = response.data.refresh
        })
            .catch(err => {
                this.initialState.authData.error = err;
            })
            .finally(() => {
                this.initialState.authData.isLoading = false;
            });
    }

    getProfile = (refresh): Promise => {
        this.initialState.authData.isLoading = true;
        this.initialState.authData.error = null;
        profile().then(response => {
            if (response.data) {
                const { id, name, lastname, email, birthday } = response.data;
                this.initialState.profileData = {
                    id,
                    name,
                    surname: lastname,
                    email,
                    birthday
                };
            }
        }).catch(error => {

            if(error.response.statusText === 'Unauthorized'){
                console.log('unauthhh')
                this.updateToken(refresh)
                this.getProfile(refresh)
            }
            else {
                console.log("error", error);
                this.initialState.authData.error = error;
            }
        }).finally(()=>{
            this.initialState.authData.isLoading = false;
        });
    }


    logout = () => {
        this.initialState.authData.isLoading = true;
        window.localStorage.removeItem('access_token');
        this.initialState.authData.accessToken = null;
        this.initialState.authData.refreshToken = null;
        this.initialState.authData.isLoading = false;
    }

    constructor() {
        makeAutoObservable(this)
    }

}

export default AuthStore;