import {RouteProps} from "react-router-dom";
import NewsPage from "../../../pages/NewsPage/ui/NewsPage.tsx";
import MyProfile from "../../../pages/MyProfile/ui/MyProfile.tsx";
import Messages from "../../../pages/Messages/ui/Messages.tsx";
import Music from "../../../pages/Music/ui/Music.tsx";
import NotFoundPage from "../../../pages/NotFoundPage/ui/NotFoundPage.tsx";
import Settings from "../../../pages/Settings/ui/Settings.tsx";
import About from "../../../pages/About/ui/About.tsx";
import Login from "../../../pages/Login/ui/Login.tsx";
import Register from "../../../pages/Registration/ui/Register.tsx";
import CreatePost from "../../../pages/CreatePost/ui/CreatePost.tsx";

export enum AppRoutes {
    NEWS = "news",
    CREATE_POST = "create_post",
    LOGIN = "login",
    REGISTER = "register",
    MY_PROFILE = "profile",
    MESSAGES = "message",
    MUSIC = "music",
    SETTINGS = "settings",
    ABOUT = "about",
    NOT_FOUND = "not_found",
}

export enum PublicRoutes {
    LOGIN = "login",
    REGISTER = "register",
}

export enum PrivateRoutes {
    NEWS = "news",
    CREATE_POST = "create_post",
    MY_PROFILE = "profile",
    MESSAGES = "message",
    MUSIC = "music",
    SETTINGS = "settings",
    ABOUT = "about",
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.NEWS]: '/',
    [AppRoutes.CREATE_POST]: '/create',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: "/register",
    [AppRoutes.MY_PROFILE]: '/profile',
    [AppRoutes.MESSAGES]: '/message',
    [AppRoutes.MUSIC]: '/music',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.NOT_FOUND]: '*'
}

export const PublicPath: Record<PublicRoutes, string> = {
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: "/register",
}

export const PrivatePath: Record<PrivateRoutes, string> = {
    [AppRoutes.NEWS]: '/',
    [AppRoutes.CREATE_POST]: '/create',
    [AppRoutes.MY_PROFILE]: '/profile',
    [AppRoutes.MESSAGES]: '/message',
    [AppRoutes.MUSIC]: '/music',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.NOT_FOUND]: '*'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.NEWS]: {
        path: RoutePath.news,
        element: <NewsPage/>
    },
    [AppRoutes.CREATE_POST]: {
        path: RoutePath.create_post,
        element: <CreatePost/>
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <Login/>
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <Register/>
    },
    [AppRoutes.MY_PROFILE]: {
        path: RoutePath.profile,
        element: <MyProfile/>
    },
    [AppRoutes.MESSAGES]: {
        path: RoutePath.message,
        element: <Messages/>
    },
    [AppRoutes.MUSIC]: {
        path: RoutePath.music,
        element: <Music/>
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        element: <Settings/>
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <About/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage/>
    }
}

export const publicConfig: Record<PublicRoutes, RouteProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <Login/>
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <Register/>
    }
}

export const privateConfig: Record<PrivateRoutes, RouteProps> = {
    [AppRoutes.NEWS]: {
        path: RoutePath.news,
        element: <NewsPage/>
    },
    [AppRoutes.CREATE_POST]: {
        path: RoutePath.create_post,
        element: <CreatePost/>
    },
    [AppRoutes.MY_PROFILE]: {
        path: RoutePath.profile,
        element: <MyProfile/>
    },
    [AppRoutes.MESSAGES]: {
        path: RoutePath.message,
        element: <Messages/>
    },
    [AppRoutes.MUSIC]: {
        path: RoutePath.music,
        element: <Music/>
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        element: <Settings/>
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <About/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage/>
    }
}