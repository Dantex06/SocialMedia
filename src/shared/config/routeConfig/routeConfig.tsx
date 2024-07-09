import {RouteProps} from "react-router-dom";
import NewsPage from "../../../pages/NewsPage/ui/NewsPage.tsx";
import MyProfile from "../../../pages/MyProfile/ui/MyProfile.tsx";
import Messages from "../../../pages/Messages/ui/Messages.tsx";
import Music from "../../../pages/Music/ui/Music.tsx";
import NotFoundPage from "../../../pages/NotFoundPage/ui/NotFoundPage.tsx";
import Settings from "../../../pages/Settings/ui/Settings.tsx";
import About from "../../../pages/About/ui/About.tsx";

export enum AppRoutes {
    NEWS = "news",
    MY_PROFILE = "profile",
    MESSAGES = "message",
    MUSIC = "music",
    SETTINGS = "settings",
    ABOUT = "about",
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.NEWS]: '/',
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