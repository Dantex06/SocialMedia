import {Button} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";


const Settings = observer(() => {
    const {logout} = useStores();
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['refresh']);

    const handleQuit = () => {
        logout()
        navigate('/login')
        removeCookie('refresh')
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={()=>handleQuit()}>Выйти из аккаунта</Button>
        </div>
    );
});

export default Settings;