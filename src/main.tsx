import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { AuthStoreContext } from './app/store/root-store.context.ts';
import { BrowserRouter } from 'react-router-dom';
import { RootStore } from '@/app/store/root-store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthStoreContext.Provider value={new RootStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthStoreContext.Provider>,
);
