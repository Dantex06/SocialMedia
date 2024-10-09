import { PostsGet, PostsGetMore, UserPosts } from '@/shared/api/auth';
import { action, computed, makeObservable, observable } from 'mobx';
import { AxiosError } from 'axios';

export interface IPostData {
    id: number;
    author: {
        id: number;
        name: string;
        surname: string;
    };
    content: string;
    images_url: null;
    is_liked: boolean;
    likes_count: number;
    published_at: string;
    updated_at: null;
}

export interface PostUserState {
    first: number | null;
    current: number | null;
    last: number | null;
    posts: IPostData[];
}

export interface PostsState {
    first: number;
    current: number;
    last: number;
    posts: IPostData[];
}

class PostsCounter {
    private _pagePosts: number = 1;
    private _errorPosts: null | AxiosError = null;

    get error(): AxiosError | null {
        return this._errorPosts;
    }

    set setCountPage(countPage: number) {
        this._pagePosts = countPage;
    }

    get countPage() {
        return this._pagePosts;
    }

    updatePage = () => {
        this._pagePosts += 1;
    };
}

class PostsStore extends PostsCounter {
    public loading: boolean = false;
    private _error: null | AxiosError = null;

    private _postsUserData: PostUserState = {
        first: 1,
        current: 1,
        last: 52,
        posts: [],
    };

    private _postsData: PostsState = {
        first: 1,
        current: 1,
        last: 52,
        posts: [],
    };

    set updatePosts({ current, first, last, posts }: PostsState) {
        this._postsData.first = first;
        this._postsData.last = last;
        this._postsData.current = current;
        this._postsData.posts.push(...posts);
    }

    get error(): AxiosError | null {
        return this._error;
    }

    get userPosts(): PostUserState {
        return this._postsUserData;
    }

    get posts(): PostsState {
        return this._postsData;
    }

    getUserPosts = (id: number): Promise<void> => {
        this._error = null;
        this.loading = true;
        return UserPosts(id)
            .then((response) => {
                if (response.data) {
                    const { current, first, last, posts } = response.data;
                    this._postsUserData = {
                        current,
                        first,
                        last,
                        posts,
                    };
                }
            })
            .catch((error) => {
                this._error = error;
            })
            .finally(() => {
                this.loading = false;
            });
    };

    getPostsMore = (): Promise<void>  => {
        this._error = null;
        return PostsGetMore(super.countPage)
            .then((response) => {
                if (response.data) {
                    const { current, first, last, posts } = response.data;
                    this.updatePosts = { first, current, last, posts };
                    this.updatePage();
                }
            })
            .catch((error) => {
                this._error = error.response.statusText;
            });
    };

    getPosts = (): Promise<void> => {
        this.loading = true;
        this._error = null;
        this._postsData.posts = [];
        super.setCountPage = 1;
        return PostsGet()
            .then((response) => {
                if (response.data) {
                    const { current, first, last, posts } = response.data;
                    this.updatePosts = { current, first, last, posts };
                    this.updatePage();
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
        super();
        makeObservable<PostsStore, "_postsData" | "_postsUserData">(this, {
            loading: observable,
            error: computed,
            _postsData: observable,
            _postsUserData: observable,
            getUserPosts: action,
            getPostsMore: action,
            getPosts: action,
        });
    }
}

export default PostsStore;
