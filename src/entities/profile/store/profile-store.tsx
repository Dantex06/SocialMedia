import { postSend, profile } from '@/shared/api/auth';
import AuthStore from '@/entities/auth/store/auth-store.tsx';
import { makeAutoObservable } from 'mobx';

export interface ProfileState {
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
    initialState: ProfileState = {
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

    getProfile = (refreshToken: string | undefined, check = false): Promise<void> => {
        if (!window.localStorage.getItem('profile_id')) {
            this.initialState.profileData.loading = true;
            this.initialState.profileData.error = null;
            const authStore = new AuthStore();
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
                    if (error.response.statusText === 'Unauthorized' && !check) {
                        return authStore.updateToken(refreshToken).then(() => {
                            return this.getProfile(refreshToken, true);
                        });
                    } else {
                        this.initialState.profileData.error = error.response.statusText;
                    }
                })
                .finally(() => {
                    this.initialState.profileData.loading = false;
                });
        } else return Promise.resolve(undefined);
    };

    createPost = (
        newpost: {
            images_urls: string[];
            content: string;
        },
        refreshToken: string | undefined,
        check = false,
    ): Promise<void> => {
        this.initialState.profileData.loading = true;
        this.initialState.profileData.error = null;
        const authStore = new AuthStore();
        return postSend(newpost)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.response.statusText === 'Unauthorized' && !check) {
                    console.log('Error cause unauth', error);
                    return authStore.updateToken(refreshToken).then(() => {
                        return this.createPost(newpost, refreshToken, true);
                    });
                } else {
                    console.log('Error real', error);
                    this.initialState.profileData.error = error;
                }
            })
            .finally(() => {
                this.initialState.profileData.loading = false;
            });
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default ProfileStore;
