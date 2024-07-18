import { postsGet } from '@/shared/api/auth';
import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

interface IPostData {
    id: number;
    author: {
        id: number;
        name: string;
        surname: string;
    };
    content: string;
    images_url: null;
    published_at: string;
    updated_at: null;
}

export interface PostsState {
    first: number;
    current: number;
    last: number;
    posts: IPostData[];
}

class PostsStore {
    public loading: boolean = false;
    private _error: null | AxiosError = null;

    private _postsData: PostsState = {
        first: 1,
        current: 1,
        last: 52,
        posts: [],
    };

    get error(): AxiosError | null {
        return this._error;
    }

    get posts(): PostsState {
        return this._postsData;
    }

    getPosts = (): Promise<void> => {
        this.loading = true;
        this._error = null;
        return postsGet()
            .then((response) => {
                if (response.data) {
                    const { current, first, last, posts } = response.data;
                    this._postsData = {
                        current,
                        first,
                        last,
                        posts,
                    };
                    this._error = null;
                    this.loading = false;
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

export default PostsStore;
