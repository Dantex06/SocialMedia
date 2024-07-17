import { userGetProfile } from '@/shared/api/auth';
import { makeAutoObservable } from 'mobx';


export interface IUsersState {
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
    initialState: IUsersState = {
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

    getUserData = (id: number): Promise<void> => {
        this.initialState.userData.error = null;
        this.initialState.userData.loading = true;

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
            .catch((error) => {
                    this.initialState.userData.error = error.response.statusText;
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
