import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/app/store/root-store.context.ts';
import { Avatar, Button } from '@mui/material';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';
import cls from './UserPage.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

const UserPage = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        getUserData,
        initialState: {
            userData: { name, surname, email, birthday, error, loading },
        },
    } = useStores();
    const id = Number(location.pathname.split('/')[2]);
    const refresh = Cookies.get('refresh');
    const storedProfile = window.localStorage.getItem('profile_id');
    const userData = storedProfile ? JSON.parse(storedProfile) : null;
    useEffect(() => {
        if (id === userData.id) {
            navigate('/profile');
        }
        if (refresh) {
            console.log('start checking profile');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment

            getUserData(id, refresh).catch((err) => console.log(err));
        }
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className={cls.backgroundProfileAndAvatar}>
                <Avatar alt="Avatar" src={ava} sx={{ width: 144, height: 144 }} />
                <div className={cls.icons}>
                    <Button style={{ marginRight: '2vh' }} variant="contained">
                        Подписаться
                    </Button>
                    <ShareIcon style={{ marginRight: '2vh', marginBottom: '0.5vh' }} sx={{ color: 'white' }} />
                    <SettingsIcon style={{ marginBottom: '0.5vh' }} sx={{ color: 'white' }} />
                </div>
            </div>
            <div className={cls.personal}>
                <div className={cls.profile}>
                    <h1>
                        {name} {surname}
                    </h1>
                    <p>Email: {email}</p>
                    <p>Birthday: {birthday}</p>
                    <div className={cls.follow}>
                        <p>253 Following</p>
                        <p>555 Followers</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
export default UserPage;
