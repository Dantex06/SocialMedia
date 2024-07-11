import {Button} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";

const Settings = observer(() => {
    const {logout} = useStores();

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={()=>logout()}>Выйти из аккаунта</Button>
        </div>
    );
});

export default Settings;