import {Navigate, Outlet} from "react-router-dom";
import SideBar from "../../../widgets/SideBar/ui/SideBar.tsx";
import NavBar from "../../../widgets/NavBar/ui/NavBar.tsx";
import Cookies from "js-cookie";

export const ProtectedWrapperUnauthorized = () => {
    const logged = Cookies.get('refresh')
    console.log('bobob')
    return (
        <div className="content-page">
            {logged ? <SideBar/> : ""}
            <Outlet/>
        </div>
)

};

export const ProtectedWrapperAuthorized = () => {
    const logged = Cookies.get('refresh')
    return (
        <div>
            <div className="content-page">
                {logged ? <SideBar/> : ""}
                <Outlet/>
            </div>
            {logged ? <NavBar/> : ""}
        </div>
    )

};