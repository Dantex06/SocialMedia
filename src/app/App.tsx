import { AppRouter } from '@/app/providers/router';
import './styles/index.css';
import './styles/reset.css';


const App = () => {
    return (
        <div className="app">
            <AppRouter />
        </div>
    );
};

export default App;
