import {makeAutoObservable} from "mobx";
import {login, profile, register} from "../../shared/api/auth";
import {ILoginRequest, ILoginResponse, IRegisterRequest} from "../../shared/api/auth/types.ts";

enum accessState {
    "join",
    "exit"
}


export interface AuthState {
    authData: {
        accessToken: accessState | null,
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
        console.log("start login")
        this.initialState.authData.error = null;
        this.initialState.authData.isLoading = true;
        login(data).then(response => {
            window.localStorage.setItem('access_token', response.data.access);
            this.initialState.authData.accessToken = accessState.join;
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
    registration = (data: IRegisterRequest): Promise<IRegisterRequest> => {
        console.log("start login")
        this.initialState.authData.error = null;
        this.initialState.authData.isLoading = true;
        register(data).then(response => {
            window.localStorage.setItem('access_token', response.data.access);
            this.initialState.authData.accessToken = accessState.join;
        })
            .catch(err => {
                this.initialState.authData.error = err;
            })
            .finally(() => {
                this.initialState.authData.isLoading = false;
            });
    }

    getProfile = async () => {
        await profile().then(response => {
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
            this.initialState.profileData.error = error
        });
    }


    logout = () => {
        this.initialState.authData.isLoading = true;
        window.localStorage.removeItem('access_token');
        this.initialState.authData.accessToken = accessState.exit;
        this.initialState.authData.isLoading = false;
    }

    constructor() {
        makeAutoObservable(this)
    }

}

export default AuthStore;