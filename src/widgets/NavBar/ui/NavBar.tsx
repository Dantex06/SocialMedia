import {Link} from "react-router-dom";
import cls from "./NavBar.module.scss";
import React from "react";
import HomeIconNoActive from '../../../shared/assets/navIcons/HomeNoActive.svg'
import HomeIconActive from '../../../shared/assets/navIcons/HomeActive.svg'
import MessageIconNoActive from '../../../shared/assets/navIcons/MessageNoActive.svg'
import MessageIconActive from '../../../shared/assets/navIcons/MessageActive.svg'
import MusicIconNoActive from '../../../shared/assets/navIcons/MusicNoActive.svg'
import MusicIconActive from '../../../shared/assets/navIcons/MusicActive.svg'
import SettingsIconNoActive from '../../../shared/assets/navIcons/SettingsNoActive.svg'
import SettingsIconActive from '../../../shared/assets/navIcons/SettingsActive.svg'
const NavBar = () => {
    const [route, setRoute] = React.useState('/')
    return (
        <div className={cls.Navbar}>
            <Link to="/" onClick={()=>setRoute("/")}>
                {route === "/" ? <HomeIconActive/> : <HomeIconNoActive/>}
            </Link>
            <Link to="/message" onClick={()=>setRoute("/message")}>
                {route === "/message" ? <MessageIconActive/> : <MessageIconNoActive/>}
            </Link>
            <Link to="/music" onClick={()=>setRoute("/music")}>
                {route === "/music" ? <MusicIconActive/> : <MusicIconNoActive/>}
            </Link>
            <Link to="/settings" onClick={()=>setRoute("/settings")}>
                {route === "/settings" ? <SettingsIconActive/> : <SettingsIconNoActive/>}
            </Link>
        </div>
    );
};

export default NavBar;