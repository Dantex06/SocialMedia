import { AuthStore } from '@/entities/auth';
import { ProfileStore } from '@/entities/profile';
import { PostsStore } from '@/entities/posts';
import { UsersStore } from '@/entities/users';

export class RootStore {
    authStore: AuthStore;
    profileStore: ProfileStore;
    postsStore: PostsStore;
    usersStore: UsersStore;

    constructor() {
        this.authStore = new AuthStore();
        this.profileStore = new ProfileStore();
        this.postsStore = new PostsStore();
        this.usersStore = new UsersStore();
    }
}
