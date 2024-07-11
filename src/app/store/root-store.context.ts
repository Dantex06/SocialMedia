import {createContext, useContext} from "react";
import AuthStore from "./auth-store.tsx";


export const AuthStoreContext = createContext<AuthStore | null>(null);

export const useStores = () => {
    const context = useContext(AuthStoreContext);
    if(context===null){
        throw new Error("В провайдер не обернул")
    }
    return context;
}
