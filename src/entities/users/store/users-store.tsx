import { makeAutoObservable } from 'mobx';
import { userGetProfile } from '@/shared/api/auth';
import AuthStore from '@/entities/auth/store/auth-store.tsx';
import ProfileStore from '@/entities/profile/store/profile-store.tsx';

export interface UsersState {
    userData: {
        loading: boolean;
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
    };
}

class UsersStore {
    initialState: UsersState = {
        userData: {
            loading: false,
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
        },
    };

    getUserData = (id: number, refreshToken: string, check = false): Promise<void> => {
        this.initialState.userData.error = null;
        this.initialState.userData.loading = true;
        const authStore = new AuthStore();
        const profile = new ProfileStore();
        return userGetProfile(id)
            .then((response) => {
                if (response.data) {
                    const { id, name, surname, email, birthday } = response.data;
                    this.initialState.userData = {
                        country: { alpha2: 'EE', alpha3: 'EST', id: 70, name: 'Estonia', region: 'Europe' },
                        error: null,
                        image: null,
                        is_public: true,
                        loading: false,
                        id,
                        name,
                        surname,
                        email,
                        birthday
                    };
                }
            })
            .then(() => {
                if (profile.initialState.profileData.id === null) {
                    return profile.getProfile(refreshToken, true);
                }
            })
            .catch((error) => {
                if (error.response.statusText === 'Unauthorized' && !check) {
                    return authStore.updateToken(refreshToken).then(() => {
                        return this.getUserData(id, refreshToken, true).then(() => {
                            if (profile.initialState.profileData.id === null) {
                                return profile.getProfile(refreshToken, true);
                            }
                        });
                    });
                } else {
                    this.initialState.userData.error = error.response.statusText;
                }
            })
            .finally(() => {
                this.initialState.userData.loading = false;
            });
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default UsersStore;
