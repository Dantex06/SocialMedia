import { postSend, profile } from '@/shared/api/auth';
import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

export const Backgrounds = {
 '1': "@/shared/assets/backgrounds/backgroundimage1.png",
 '2': "@/shared/assets/backgrounds/backgroundimage2.png",
 '3': "@/shared/assets/backgrounds/backgroundimage3.png",
}


export interface IProfileState {
        id: number | null;
        name: string | null;
        surname: string | null;
        email: string | null;
        country: {
            id: 70;
            name: 'Estonia';
            alpha2: 'EE';
            alpha3: 'EST';
            region: 'Europe';
        };
        is_public: true;
        image: string | null;
        birthday: string | null;
}

class ProfileStore {
    public loading: boolean = false
    private _error: null | AxiosError = null

    private _profileData: IProfileState = {
            id: null,
            name: null,
            surname: null,
            email: null,
            country: {
                id: 70,
                name: 'Estonia',
                alpha2: 'EE',
                alpha3: 'EST',
                region: 'Europe',
            },
            is_public: true,
            image: null,
            birthday: null,
        }

    get error(): AxiosError | null {
        return this._error;
    }

    get profile(): IProfileState {
        return this._profileData;
    }

    getProfile = (): Promise<void> => {
        if (!window.localStorage.getItem('profile_id')) {
            this.loading = true;
            this._error = null;
            return profile()
                .then((response) => {
                    if (response.data) {
                        const { id, name, surname, email, birthday } = response.data;
                        this._profileData = {
                            country: { alpha2: 'EE', alpha3: 'EST', id: 70, name: 'Estonia', region: 'Europe' },
                            image: null,
                            is_public: true,
                            id,
                            name,
                            surname,
                            email,
                            birthday
                        };

                        window.localStorage.setItem(
                            'profile_id',
                            JSON.stringify({
                                id,
                                name,
                                surname,
                                email,
                                birthday,
                            }),
                        );

                    }
                })
                .catch((error) => {
                    this._error = error.response.statusText;
                })
                .finally(() => {
                    this.loading = false;
                });
        } else return Promise.resolve(undefined);
    };

    createPost = (newpost: { images_urls: string[]; content: string }): Promise<void> => {
        this.loading = true;
        this._error = null;
        return postSend(newpost)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                this._error = error;
            })
            .finally(() => {
                this.loading = false;
            });
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default ProfileStore;
