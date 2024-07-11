import { useState, useEffect } from 'react';
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";

const MyProfile = observer(() => {
    const { getProfile, initialState: { profileData: { id, name, surname, email, birthday, error } } } = useStores();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getProfile();
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div>
            <h1>Name {name}</h1>
            <h2>Surname {surname}</h2>
            <p>Email {email}</p>
            <p>Birthday {birthday}</p>
            <span>id: {id}</span>
        </div>
    );
});

export default MyProfile