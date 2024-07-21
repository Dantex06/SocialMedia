import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';
import { delLike, like } from '@/shared/api/auth';

class LikeStore {
    public loading: boolean = false;
    private _error: null | AxiosError = null;

    get error(): AxiosError | null {
        return this._error;
    }

    likePost = (id: number): Promise<void> => {
        return like(id)
            .then((response) => {
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
                this._error = e;
            })
            .finally(() => (this.loading = false));
    };

    deleteLikePost = (id: number): Promise<void> => {
        return delLike(id)
            .then((response) => {
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
                this._error = e;
            })
            .finally(() => (this.loading = false));
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default LikeStore;
