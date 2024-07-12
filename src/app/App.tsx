import './styles/index.css';
import "./styles/reset.css";

import AppRouter from "./providers/router/ui/AppRouter.tsx";


const App = ()=> {
    return (
        <div className="app">
            <AppRouter/>
        </div>

    )
}

export default App
