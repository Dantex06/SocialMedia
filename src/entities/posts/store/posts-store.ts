import { postsGet } from '@/shared/api/auth';
import { makeAutoObservable } from 'mobx';

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
    postsData: {
        loading: boolean;
        errors: string | null;
        first: number;
        current: number;
        last: number;
        posts: IPostData[];
    };
}

class PostsStore {
    initialState: PostsState = {
        postsData: {
            loading: false,
            errors: null,
            first: 1,
            current: 1,
            last: 52,
            posts: [],
        },
    };

    getPosts = (): Promise<void> => {
        this.initialState.postsData.loading = true;
        this.initialState.postsData.errors = null;
        // const authStore = new AuthStore();
        // const profile = new ProfileStore();
        return postsGet()
            .then((response) => {
                if (response.data) {
                    const { current, first, last, posts } = response.data;
                    this.initialState.postsData = {
                        current,
                        first,
                        last,
                        posts,
                        loading: false,
                        errors: null,
                    };
                }
            })
            .catch((error) => {
                this.initialState.postsData.errors = error.response.statusText;

            })
            .finally(() => {
                this.initialState.postsData.loading = false;
            });
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default PostsStore;