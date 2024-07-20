const Endpoints = {
    AUTH: {
        REGISTER: 'api/auth/register',
        LOGIN: 'api/auth/sign-in',
        LOGOUT: 'api/auth/logout',
        REFRESH: 'api/auth/refresh',
        PROFILE: 'api/private/me',
        PROFILE_GET: 'api/private/profiles/',
        PROFILE_GET_POSTS: (id:number) => `/api/private/profiles/${id}/feed`,
        POST_SEND: 'api/private/me/feed',
        POST_GET: 'api/private/feed',
    },
};

export default Endpoints