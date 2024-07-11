import {useStores} from "../../../app/store/root-store.context.ts";

const Music = () => {
    const {initialState: {authData: {accessToken}}} = useStores()
    console.log(accessToken)

    return (
        <div>
            Music
        </div>
    );
};

export default Music;