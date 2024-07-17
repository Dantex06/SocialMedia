import { useMediaPredicate } from "react-media-hook";
import { SideBar } from '@/widgets/SideBar';
import { NavBar } from '@/widgets/NavBar';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';


export const ProtectedWrapperUnauthorized = () => {
 const moreThan720 = useMediaPredicate("(min-width: 720px)");
 const logged = Cookies.get('refresh');
    return (
        <div className="content-page">
         {(logged && moreThan720) ? <SideBar /> : ''}
            <Outlet />
        </div>
    );
};

export const ProtectedWrapperAuthorized = () => {
 const moreThan720 = useMediaPredicate("(min-width: 720px)");
    const logged = Cookies.get('refresh');
    return (
        <div>
            <div className="content-page">
                {(logged && moreThan720) ? <SideBar /> : ''}
                <Outlet />
            </div>
            {(logged && moreThan720) ? <NavBar /> : ''}
        </div>
    );
};
