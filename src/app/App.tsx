import './styles/index.css';
import "./styles/reset.css";
import AppRouter from "./providers/router/ui/AppRouter.tsx";
import NavBar from "../widgets/NavBar/ui/NavBar.tsx";
import SideBar from "../widgets/SideBar/ui/SideBar.tsx";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
// import Login from "../pages/Login/ui/Login.tsx";

function App() {
    const navigate = useNavigate();
    const path = useLocation();
    const status = false;

    useEffect(() => {
        if (!status && path.pathname !== '/register') {
            navigate('/login');
        }
        if (status && (path.pathname !== '/register' || path.pathname !== '/login')) {
            navigate('/');
        }
    }, []);



    return (

        <div className="app">
            <div className="content-page">
                {status ? <SideBar/>: ""}
                <AppRouter auth={status}/>
            </div>
            {status ? <NavBar/>: ""}
        </div>

    )
}

export default App
