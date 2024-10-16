const Endpoints = {
    AUTH: {
        REGISTER: 'api/auth/register',
        LOGIN: 'api/auth/sign-in',
        LOGOUT: 'api/auth/logout',
        REFRESH: 'api/auth/refresh',
    },
    PROFILE: {
        MY_PROFILE: 'api/private/me',
        POST_SEND: 'api/private/me/feed',
    },
    USERS: {
        PROFILE_GET: 'api/private/profiles/',
    },
    POSTS: {
        POST_GET: 'api/private/feed',
        POST_GET_MORE: (page: number) => `api/private/feed?page=${page}`,
        PROFILE_GET_POSTS: (id: number) => `api/private/profiles/${id}/feed`,
    },
    LIKES: {
        LIKE: (id: number) => `api/private/posts/${id}/like`,
        DELETE_LIKE: (id: number) => `api/private/posts/${id}/like`,
        WHO_LIKED: (id: number) => `api/private/posts/${id}/likes`,
    },
};

export default Endpoints