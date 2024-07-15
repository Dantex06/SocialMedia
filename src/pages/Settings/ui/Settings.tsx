import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/app/store/root-store.context.ts';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Settings = observer(() => {
    const { logout } = useStores();
    const navigate = useNavigate();

    const handleQuit = () => {
        logout();
        navigate('/login');
        Cookies.remove('refresh');
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() => handleQuit()}>
                Выйти из аккаунта
            </Button>
        </div>
    );
});

export default Settings;
