import {Navigate, Outlet} from "react-router-dom";
import SideBar from "../../../widgets/SideBar/ui/SideBar.tsx";
import NavBar from "../../../widgets/NavBar/ui/NavBar.tsx";

export const ProtectedWrapperUnauthorized = () => {
    const logged = window.localStorage.getItem("access_token");
    return logged ?
        <>
            <div className="content-page">
                {logged ? <SideBar/> : ""}
                    <Outlet/>
            </div>
            {logged ? <NavBar/> : ""}
        </>
        :
        <Navigate to="/login"/>
};

export const ProtectedWrapperAuthorized = () => {
    const logged = !window.localStorage.getItem("access_token");
    return logged ?
        <>
            <div className="content-page">
                {!logged ? <SideBar/> : ""}
                <Outlet/>
            </div>
            {!logged ? <NavBar/> : ""}
        </>
        :
        <Navigate to="/"/>
};