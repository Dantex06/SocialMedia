import SideBar from "../../../widgets/SideBar/ui/SideBar.tsx";
import AppRouter from "../../../app/providers/router/ui/AppRouter.tsx";
import NavBar from "../../../widgets/NavBar/ui/NavBar.tsx";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const Wrapper = () => {
    const navigate = useNavigate();
    const path = useLocation();
    const [status, setStatus] = useState(window.localStorage.getItem('access_token'));

    useEffect(() => {
        setStatus(window.localStorage.getItem('access_token'));
        if (!status && path.pathname !== '/register') {
            // console.log('unlogged!')
            navigate('/login');
        }
        if (status && (path.pathname === '/register' || path.pathname === '/login')) {
            // console.log('logged!')
            navigate('/');
        }
    }, [path.pathname, status]);

    return (
        <>
            <div className="content-page">
                {status ? <SideBar/>: ""}
                <AppRouter/>
            </div>
            {status ? <NavBar/>: ""}
        </>
    );
};

export default Wrapper;