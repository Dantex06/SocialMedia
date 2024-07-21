import { ProfileStore } from '@/entities/profile';
import { PostsStore } from '@/entities/posts';
import { UsersStore } from '@/entities/users';
import { AuthStore } from '@/entities/auth';
import { LikeStore } from '@/entities/like';


export class RootStore {
    authStore: AuthStore;
    profileStore: ProfileStore;
    postsStore: PostsStore;
    usersStore: UsersStore;
    likeStore: LikeStore;

    constructor() {
        this.authStore = new AuthStore();
        this.profileStore = new ProfileStore();
        this.postsStore = new PostsStore();
        this.usersStore = new UsersStore();
        this.likeStore = new LikeStore();
    }
}
