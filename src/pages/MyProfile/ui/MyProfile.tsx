import { useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";
import {useCookies} from "react-cookie";
import {Avatar} from "@mui/material";
import ava from "../../../shared/assets/SideBarIcons/cat.jpg"
import cls from "./MyProfile.module.scss"
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';

const MyProfile = observer(() => {
    const {
        getProfile,
        initialState: {profileData: {id, name, surname, email, birthday}, authData:{isLoading, error, refreshToken}}
    } = useStores();
    const [refresh, setRefresh] = useCookies(['refresh']);

    useEffect(() => {
        console.log("start")
        try {
            getProfile(refresh);
            if(refreshToken!==null){
                setRefresh('refresh', refreshToken);
            }
        }
        catch (e){
            console.log(e);
        }
    }, [])


if (isLoading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>{error.message}</div>;
}

return (
    <div>
        <div className={cls.backgroundProfileAndAvatar}>
            <Avatar alt="Avatar" src={ava} sx={{width: 144, height: 144}}/>
            <div className={cls.icons}>
                <ShareIcon sx={{ color: "white" }}/>
                <SettingsIcon sx={{ color: "white" }}/>
            </div>
        </div>
        <div className={cls.profile}>
            <h1>{name} {surname}</h1>
            <p>Email: {email}</p>
            <p>Birthday: {birthday}</p>
            <div className={cls.follow}>
                <p>253 Following</p>
                <p>555 Followers</p>
            </div>
        </div>
    </div>
);
    })
;

export default MyProfile