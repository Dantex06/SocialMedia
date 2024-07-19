import { AuthStoreContext } from './app/store/root-store.context.ts';
import { RootStore } from '@/app/store/root-store.ts';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import ReactDOM from 'react-dom/client';
import { ThemeContext } from '@/app/store/background-store.context.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthStoreContext.Provider value={new RootStore()}>
     <ThemeContext.Provider value={'1'}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
     </ThemeContext.Provider>
    </AuthStoreContext.Provider>,
);
