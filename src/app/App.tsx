import './styles/index.css';
import "./styles/reset.css";
import AppRouter from "./providers/router/ui/AppRouter.tsx";
import NavBar from "../widgets/NavBar/ui/NavBar.tsx";
import SideBar from "../widgets/SideBar/ui/SideBar.tsx";

function App() {

  return (
    <div className="app">
        <div className="content-page">
          <SideBar/>
          <AppRouter/>
        </div>
      <NavBar/>
    </div>
  )
}

export default App
