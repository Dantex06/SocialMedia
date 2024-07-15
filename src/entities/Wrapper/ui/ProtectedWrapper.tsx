import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SideBar } from '@/widgets/SideBar';
import { NavBar } from '@/widgets/NavBar';

export const ProtectedWrapperUnauthorized = () => {
    const logged = Cookies.get('refresh');
    return (
        <div className="content-page">
            {logged ? <SideBar /> : ''}
            <Outlet />
        </div>
    );
};

export const ProtectedWrapperAuthorized = () => {
    const logged = Cookies.get('refresh');
    return (
        <div>
            <div className="content-page">
                {logged ? <SideBar /> : ''}
                <Outlet />
            </div>
            {logged ? <NavBar /> : ''}
        </div>
    );
};
