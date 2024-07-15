import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { AuthStoreContext } from './app/store/root-store.context.ts';
import AuthStore from './app/store/auth-store.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthStoreContext.Provider value={new AuthStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthStoreContext.Provider>,
);
