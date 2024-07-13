import {Navigate, Outlet} from "react-router-dom";
import SideBar from "../../../widgets/SideBar/ui/SideBar.tsx";
import NavBar from "../../../widgets/NavBar/ui/NavBar.tsx";
import {useCookies} from "react-cookie";

export const ProtectedWrapperUnauthorized = () => {
    const [logged] = useCookies(['refresh']);
    return logged ?
        <>
            <div className="content-page">
                {!logged ? <SideBar/> : ""}
                    <Outlet/>
            </div>
            {!logged ? <NavBar/> : ""}
        </>
        :
        <Navigate to="/login"/>
};

export const ProtectedWrapperAuthorized = () => {
    const [logged] = useCookies(['refresh']);
    return logged ?
        <div>
            <div className="content-page">
                {logged ? <SideBar/> : ""}
                <Outlet/>
            </div>
            {logged ? <NavBar/> : ""}
        </div>
        :
        <Navigate to="/"/>
};