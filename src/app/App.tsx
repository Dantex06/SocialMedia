import './styles/index.css';
import "./styles/reset.css";
import AppRouter from "./providers/router/ui/AppRouter.tsx";
import NavBar from "../widgets/NavBar/ui/NavBar.tsx";
import SideBar from "../widgets/SideBar/ui/SideBar.tsx";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useStores} from "./store/root-store.context.ts";

// import Login from "../pages/Login/ui/Login.tsx";

const App = observer(()=> {
    const navigate = useNavigate();
    const path = useLocation();
    const {initialState: {authData: {accessToken}}} = useStores()
    const [status, setStatus] = useState(window.localStorage.getItem('access_token'));
    useEffect(() => {
        setStatus(window.localStorage.getItem('access_token'));
        if (!status && path.pathname !== '/register') {
            console.log('unlogged!')
            navigate('/login');
        }
        if (status && (path.pathname === '/register' || path.pathname === '/login')) {
            console.log('logged!')
            navigate('/');
        }
    }, [accessToken, navigate, path.pathname, status]);



    return (
        <div className="app">
            <div className="content-page">
                {status ? <SideBar/>: ""}
                <AppRouter auth={status}/>
            </div>
            {status ? <NavBar/>: ""}
        </div>

    )
})

export default App
