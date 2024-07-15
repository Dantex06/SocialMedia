import './styles/index.css';
import './styles/reset.css';
import { AppRouter } from '@/app/providers/router';

const App = () => {
    return (
        <div className="app">
            <AppRouter />
        </div>
    );
};

export default App;
