import { postSend, profile } from '@/shared/api/auth';
import { makeAutoObservable } from 'mobx';

export interface IProfileState {
    profileData: {
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
        error: string | null;
        loading: boolean;
    };
}

class ProfileStore {
    initialState: IProfileState = {
        profileData: {
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
            error: null,
            loading: false,
        },
    };

    getProfile = (): Promise<void> => {
        if (!window.localStorage.getItem('profile_id')) {
            this.initialState.profileData.loading = true;
            this.initialState.profileData.error = null;
            return profile()
                .then((response) => {
                    if (response.data) {
                        const { id, name, surname, email, birthday } = response.data;
                        this.initialState.profileData = {
                            country: { alpha2: 'EE', alpha3: 'EST', id: 70, name: 'Estonia', region: 'Europe' },
                            image: null,
                            is_public: true,
                            id,
                            name,
                            surname,
                            email,
                            birthday,
                            loading: false,
                            error: null
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
                        this.initialState.profileData.error = error.response.statusText;}
                )
                .finally(() => {
                    this.initialState.profileData.loading = false;
                });
        } else return Promise.resolve(undefined);
    };

    createPost = (
        newpost: {
            images_urls: string[];
            content: string;
        }
    ): Promise<void> => {
        this.initialState.profileData.loading = true;
        this.initialState.profileData.error = null;
        return postSend(newpost)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                    this.initialState.profileData.error = error;
                }
            )
            .finally(() => {
                this.initialState.profileData.loading = false;
            });
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default ProfileStore;
