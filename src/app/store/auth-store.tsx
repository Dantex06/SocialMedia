import {makeAutoObservable} from "mobx";
import {login, postSend, postsGet, profile, refresh, register, userGetProfile} from "../../shared/api/auth";
import {
    ILoginRequest,
    ILoginResponse,
    IRefreshRequest,
    IRefreshResponse,
    IRegisterRequest, IRegisterResponse
} from "../../shared/api/auth/types.ts";
import { AxiosError } from "axios";


interface IPostData {
    "id": number,
    "author": {
        "id": number,
        "name": string,
        "surname": string
    },
    "content": string,
    "images_url": null,
    "published_at": string,
    "updated_at": null
}

export interface AuthState {

    authData: {
        accessToken: string | null,
        refreshToken: string | null,
        isLoading: boolean,
        error: AxiosError | null,
    },
    postsData: {
        loading: boolean,
        errors: string | null,
        "first": number,
        "current": number,
        "last": number,
        "posts": IPostData[]
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
    },
    userData: {
        "loading": boolean,
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
        postsData: {
            loading: false,
            errors: null,
            "first": 1,
            "current": 1,
            "last": 52,
            "posts": []
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
        },
        userData: {
            loading: false,
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    updateToken = (data: IRefreshRequest): Promise<IRefreshResponse> => {
        this.initialState.authData.error = null;
        this.initialState.authData.isLoading = true;
        console.log(data);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return refresh(data).then(response => {
            window.localStorage.setItem('access_token', response.data.access);
            this.initialState.authData.accessToken = response.data.access
            this.initialState.authData.refreshToken = response.data.refresh
        })
            .catch(err => {
                console.log(err)
                this.initialState.authData.error = err;
            })
            .finally(() => {
                this.initialState.authData.isLoading = false;
            });
    }

    createPost = (newpost: never, refresh: IRefreshRequest, check = false): Promise<void> => {
        this.initialState.authData.isLoading = true;
        this.initialState.authData.error = null;
        return postSend(newpost).then(response => {
            console.log(response);
        }).catch(error => {
            if (error.response.statusText === 'Unauthorized' && check !== true) {
                console.log('Error cause unauth', error)
                return this.updateToken(refresh).then(() => {
                    return this.createPost(newpost, refresh, true);
                });
            } else {
                console.log("Error real", error);
                this.initialState.authData.error = error;
            }
        }).finally(() => {
            this.initialState.authData.isLoading = false;
        });
    }

    getPosts = (refresh: IRefreshRequest, check = false): Promise<void> => {
        this.initialState.postsData.loading = true;
        this.initialState.postsData.errors = null;
        return postsGet().then(response => {
            if (response.data) {
                const {current, first, last, posts,} = response.data;
                console.log(response.data.posts)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.initialState.postsData = {
                    current,
                    first,
                    last,
                    posts
                };
            }
        }).catch(error => {
            if (error.response.statusText === 'Unauthorized' && check !== true) {
                console.log('unauthhh', refresh)
                return this.updateToken(refresh).then(() => {
                    return this.getPosts(refresh, true);
                });
            } else {
                console.log("Yesssss", error);
                this.initialState.postsData.errors = error.response.statusText;
            }
        }).finally(() => {
            console.log('final')
            this.initialState.postsData.loading = false;
        });
    }

    getProfile = (refresh: IRefreshRequest, check = false): Promise<void> => {
        this.initialState.authData.isLoading = true;
        this.initialState.authData.error = null;
        return profile().then(response => {
            if (response.data) {
                const {id, name, surname, email, birthday} = response.data;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.initialState.profileData = {
                    id,
                    name,
                    surname,
                    email,
                    birthday
                };
            }
        }).catch(error => {
            if (error.response.statusText === 'Unauthorized' && check !== true) {
                return this.updateToken(refresh).then(() => {
                    return this.getProfile(refresh, true);
                });
            } else {
                this.initialState.profileData.error = error.response.statusText;
            }
        }).finally(() => {
            this.initialState.authData.isLoading = false;
        });
    }

    getUserData = (id: number, refresh: IRefreshRequest, check = false): Promise<void> => {
        this.initialState.userData.error = null;
        this.initialState.userData.loading = true;
        return userGetProfile(id).then(response => {
            if (response.data) {
                const {id, name, surname, email, birthday} = response.data;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.initialState.userData = {
                    id,
                    name,
                    surname,
                    email,
                    birthday
                };
            }
        }).then(() => {
            if (this.initialState.profileData.id === null) {
                return this.getProfile(refresh, true);
            }
        }).catch(error => {
            if (error.response.statusText === 'Unauthorized' && check !== true) {
                // Возвращаем промис, чтобы гарантировать выполнение обновления токенов до повторного запроса пользователей
                return this.updateToken(refresh).then(() => {
                    // Повторный запрос пользователей после успешного обновления токенов
                    return this.getUserData(id, refresh, true).then(() => {
                        if (this.initialState.profileData.id === null) {
                            return this.getProfile(refresh, true);
                        }
                    });
                });
            } else {
                this.initialState.userData.error = error.response.statusText;
            }
        }).finally(() => {
            this.initialState.userData.loading = false;
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