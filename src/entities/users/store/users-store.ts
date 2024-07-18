import { userGetProfile } from '@/shared/api/auth';
import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';


export interface IUsersState {
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
        birthday: string | null
}

class UsersStore {

    public loading: boolean = false
    private _error: null | AxiosError = null

    private _userData: IUsersState = {
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

    get profile(): IUsersState {
        return this._userData;
    }

    getUserData = (id: number): Promise<void> => {
        this._error = null;
        this.loading = true;

        return userGetProfile(id)
            .then((response) => {
                if (response.data) {
                    const { id, name, surname, email, birthday } = response.data;
                    this._userData = {
                        country: { alpha2: 'EE', alpha3: 'EST', id: 70, name: 'Estonia', region: 'Europe' },
                        image: null,
                        is_public: true,
                        id,
                        name,
                        surname,
                        email,
                        birthday
                    };
                    this.loading = false
                }
            })
            .catch((error) => {
                    this._error = error.response.statusText;
                })
            .finally(() => {
                this.loading = false;
            });
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default UsersStore;
