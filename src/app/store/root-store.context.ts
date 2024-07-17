import { createContext, useContext } from 'react';
import { RootStore } from './root-store.ts';

export const AuthStoreContext = createContext<RootStore | null>(null);

export const useStores = () => {
    const context = useContext(AuthStoreContext);
    if (context === null) {
        throw new Error('В провайдер не обернул');
    }
    return context;
};
