import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Button } from '@mui/material';
import { useStores } from '@/app/store/root-store.context.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';
import cls from './UserPage.module.scss';
import Cookies from 'js-cookie';



export const UserPage = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        usersStore: {
            getUserData,
            initialState: {
                userData: { name, surname, email, birthday, error, loading },
            },
        },
    } = useStores();
    const id = Number(location.pathname.split('/')[2]);
    const refresh = Cookies.get('refresh');
    const storedProfile = window.localStorage.getItem('profile_id');
    const userData = storedProfile ? JSON.parse(storedProfile) : null;
    const lessThan720 = useMediaPredicate('(max-width: 720px)');
    useEffect(() => {
        if (id === userData.id) {
            navigate('/profile');
        }
        if (refresh) {
            getUserData(id).catch((err) => console.log(err));
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
                <Avatar alt="Avatar" src={ava} sx={lessThan720?{width: 78, height: 78}:{ width: 144, height: 144 }} />
                <div className={cls.icons}>
                    <Button style={{ marginRight: '2vh' }} variant="contained">
                        Подписаться
                    </Button>
                    <ShareIcon style={{marginBottom: '0.5vh' }} sx={{ color: 'white' }} />
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