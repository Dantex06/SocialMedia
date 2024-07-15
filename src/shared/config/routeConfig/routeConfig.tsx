import { RouteProps } from 'react-router-dom';
import { NewsPage } from '@/pages/NewsPage';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Registration';
import { MyProfile } from '@/pages/MyProfile';
import { UserPage } from '@/pages/UserPage';
import { Messages } from '@/pages/Messages';
import { Music } from '@/pages/Music';
import { Settings } from '@/pages/Settings';
import { About } from '@/pages/About';
import { NotFoundPage } from '@/pages/NotFoundPage';


export enum AppRoutes {
    NEWS = 'news',
    LOGIN = 'login',
    REGISTER = 'register',
    MY_PROFILE = 'profile',
    USER_PAGE = 'user_page',
    MESSAGES = 'message',
    MUSIC = 'music',
    SETTINGS = 'settings',
    ABOUT = 'about',
    NOT_FOUND = 'not_found',
}

export enum PublicRoutes {
    LOGIN = 'login',
    REGISTER = 'register',
}

export enum PrivateRoutes {
    NEWS = 'news',
    MY_PROFILE = 'profile',
    USER_PAGE = 'user_page',
    MESSAGES = 'message',
    MUSIC = 'music',
    SETTINGS = 'settings',
    ABOUT = 'about',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.NEWS]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.MY_PROFILE]: '/profile',
    [AppRoutes.USER_PAGE]: '/profile/:id',
    [AppRoutes.MESSAGES]: '/message',
    [AppRoutes.MUSIC]: '/music',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.NOT_FOUND]: '*',
};

export const PublicPath: Record<PublicRoutes, string> = {
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
};

export const PrivatePath: Record<PrivateRoutes, string> = {
    [AppRoutes.NEWS]: '/',
    [AppRoutes.MY_PROFILE]: '/profile',
    [AppRoutes.USER_PAGE]: '/profile/:id',
    [AppRoutes.MESSAGES]: '/message',
    [AppRoutes.MUSIC]: '/music',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.NEWS]: {
        path: RoutePath.news,
        element: <NewsPage />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <Login />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <Register />,
    },
    [AppRoutes.MY_PROFILE]: {
        path: RoutePath.profile,
        element: <MyProfile />,
    },
    [AppRoutes.USER_PAGE]: {
        path: RoutePath.user_page,
        element: <UserPage />,
    },
    [AppRoutes.MESSAGES]: {
        path: RoutePath.message,
        element: <Messages />,
    },
    [AppRoutes.MUSIC]: {
        path: RoutePath.music,
        element: <Music />,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        element: <Settings />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <About />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};

export const publicConfig: Record<PublicRoutes, RouteProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <Login />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <Register />,
    },
};

export const privateConfig: Record<PrivateRoutes, RouteProps> = {
    [AppRoutes.NEWS]: {
        path: RoutePath.news,
        element: <NewsPage />,
    },

    [AppRoutes.MY_PROFILE]: {
        path: RoutePath.profile,
        element: <MyProfile />,
    },
    [AppRoutes.USER_PAGE]: {
        path: RoutePath.user_page,
        element: <UserPage />,
    },
    [AppRoutes.MESSAGES]: {
        path: RoutePath.message,
        element: <Messages />,
    },
    [AppRoutes.MUSIC]: {
        path: RoutePath.music,
        element: <Music />,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        element: <Settings />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <About />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
