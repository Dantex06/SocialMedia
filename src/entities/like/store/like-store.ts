import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';
import { delLike, like, whoLiked } from '@/shared/api/auth';

interface LikedUser {
    "user": {
        "id": number,
        "name": string,
        "surname": string,
        "image": string
    },
    "liked_at": string
}

interface IWhoLike {
    first: number;
    current: number;
    last: number;
    count: number;
    likes: LikedUser[];
}

class LikeStore {
    public loading: boolean = false;
    private _error: null | AxiosError = null;
    private _LikeUsersPost: null | IWhoLike = null;

    set usersLikePost({ count, current, first, last, likes }:IWhoLike) {
        this._LikeUsersPost = {
            count,
            current,
            first,
            last,
            likes,
        };
    }

    set error(err: AxiosError) {
        this._error = err;
    }

    get likeUsers() {
        return this._LikeUsersPost;
    }

    get error(): AxiosError | null {
        return this._error;
    }

    clearLikeUsers = () => {
        this._LikeUsersPost = null;
    };

    likePost = (id: number): Promise<void> => {
        return like(id)
            .then((response) => {
                return response.data;
            })
            .catch((e) => {
                this.error = e;
            })
            .finally(() => (this.loading = false));
    };

    whoLiked = (id: number): Promise<void> => {
        return whoLiked(id)
            .then((response) => {
                if (response.status === 200) {
                    const { count, current, first, last, likes } = response.data;
                    this.usersLikePost = { count, current, first, last, likes };
                }
            })
            .catch((e) => {
                this.error = e;
            })
            .finally(() => (this.loading = false));
    };

    deleteLikePost = (id: number): Promise<void> => {
        return delLike(id)
            .then((response) => {
                return response.data;
            })
            .catch((e) => {
                this.error = e;
            })
            .finally(() => (this.loading = false));
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default LikeStore;
