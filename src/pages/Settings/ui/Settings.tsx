import { Button } from '@mui/material';
import { useStores } from '@/app/store/root-store.context.ts';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Cookies from 'js-cookie';

export const Settings = observer(() => {
    const { authStore: {logout} } = useStores();
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
