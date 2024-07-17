import { AuthStoreContext } from './app/store/root-store.context.ts';
import { RootStore } from '@/app/store/root-store.ts';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import ReactDOM from 'react-dom/client';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthStoreContext.Provider value={new RootStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthStoreContext.Provider>,
);
