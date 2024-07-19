import { Button, IconButton } from '@mui/material';
import { useStores } from '@/app/store/root-store.context.ts';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Cookies from 'js-cookie';
import cls from './Settings.module.scss';
import { FastForwardRounded, FastRewindRounded } from '@mui/icons-material';
import { useTheme } from '@/app/store/background-store.context.ts';
import { Backgrounds } from '@/entities/profile/store/profile-store.ts';

export const Settings = observer(() => {
    const { theme, setTheme } = useTheme();
    const {
        authStore: { logout },
    } = useStores();
    const navigate = useNavigate();

    const forwardWallpaper = () => {
        const lengthWalls = Object.keys(Backgrounds).length+1;
        setTheme(Number(theme)+1 === lengthWalls ? '1': (Number(theme)+1).toString())
    }

    const rewindWallpaper = () => {
        const lengthWalls = Object.keys(Backgrounds).length;
        setTheme(Number(theme)-1 === 0 ? lengthWalls.toString(): (Number(theme)-1).toString())
    }

    const handleQuit = () => {
        logout();
        navigate('/login');
        Cookies.remove('refresh');
    };

    return (
        <div className={cls.options}>
            <div>
                <div style={{borderRadius: "4vh"}} className={cls.background}>

                </div>
                <div className={cls.backgroundText}>
                    <IconButton aria-label="previous song" onClick={()=>rewindWallpaper()}>
                        <FastRewindRounded fontSize="large" htmlColor="white" />
                    </IconButton>
                    <p>Сменить обои</p>
                    <IconButton aria-label="previous song" onClick={()=>forwardWallpaper()}>
                        <FastForwardRounded fontSize="large" htmlColor="white" />
                    </IconButton>
                </div>
            </div>
            <Button variant="contained" color="primary" onClick={() => handleQuit()}>
                Выйти из аккаунта
            </Button>
        </div>
    );
});
