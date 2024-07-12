import { useEffect, Suspense} from 'react';
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";
import {useCookies} from "react-cookie";

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
    <Suspense fallback="loading..">
        <div>
            <h1>Name {name}</h1>
            <h2>Surname {surname}</h2>
            <p>Email {email}</p>
            <p>Birthday {birthday}</p>
            <span>id: {id}</span>
        </div>
    </Suspense>
);
})
;

export default MyProfile