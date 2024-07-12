import {Link, useLocation, useNavigate} from "react-router-dom";
import cls from "./NavBar.module.scss";
import HomeIconNoActive from '../../../shared/assets/navIcons/HomeNoActive.svg'
import HomeIconActive from '../../../shared/assets/navIcons/HomeActive.svg'
import MessageIconNoActive from '../../../shared/assets/navIcons/MessageNoActive.svg'
import MessageIconActive from '../../../shared/assets/navIcons/MessageActive.svg'
import MusicIconNoActive from '../../../shared/assets/navIcons/MusicNoActive.svg'
import MusicIconActive from '../../../shared/assets/navIcons/MusicActive.svg'
import SettingsIconNoActive from '../../../shared/assets/navIcons/SettingsNoActive.svg'
import SettingsIconActive from '../../../shared/assets/navIcons/SettingsActive.svg'

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={cls.Navbar}>
            <Link to="/" onClick={() => navigate("/")}>
                {location.pathname === "/" ? <HomeIconActive/> : <HomeIconNoActive/>}
            </Link>
            <Link to="/message" onClick={() => navigate("/message")}>
                {location.pathname === "/message" ? <MessageIconActive/> : <MessageIconNoActive/>}
            </Link>
            <Link to="/music" onClick={() => navigate("/music")}>
                {location.pathname === "/music" ? <MusicIconActive/> : <MusicIconNoActive/>}
            </Link>
            <Link to="/settings" onClick={() => navigate("/settings")}>
                {location.pathname === "/settings" ? <SettingsIconActive/> : <SettingsIconNoActive/>}
            </Link>
        </div>
    );
};

export default NavBar;