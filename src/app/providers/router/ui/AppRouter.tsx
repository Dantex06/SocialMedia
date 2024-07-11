import {Route, Routes} from "react-router-dom";
import {routeConfig} from "../../../../shared/config/routeConfig/routeConfig.tsx";
import cls from "./AppRouter.module.scss"
import {CamelCase} from "../../../../shared/utils/CamelCase.ts";


const AppRouter = () => {
    return (
        <Routes>
            {Object.entries(routeConfig).map(([key, {element, path}]) => (
                <Route key={path} element={
                    <div>
                        <p className={cls.title}>{CamelCase(key)}</p>
                        <div className={cls.page}>
                            {element}
                        </div>
                    </div>
                } path={path}/>
            ))}
        </Routes>
    );
};

export default AppRouter;