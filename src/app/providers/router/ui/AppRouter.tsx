import {Route, Routes, useNavigate} from "react-router-dom";
import cls from "./AppRouter.module.scss"
import {ProtectedWrapperAuthorized, ProtectedWrapperUnauthorized}
from "../../../../entities/Wrapper/ui/ProtectedWrapper.tsx";
import {CamelCase} from "../../../../shared/utils/CamelCase.ts";
import {privateConfig, publicConfig} from "../../../../shared/config/routeConfig/routeConfig.tsx";
import {useEffect} from "react";
import {useCookies} from "react-cookie";
import Cookies from 'js-cookie'

const AppRouter = () => {
    const [refresh] = useCookies(['refresh']);
    const navigate = useNavigate()
    useEffect(() => {
        console.log(Cookies.get('refresh'))
        if(Cookies.get('refresh') === undefined){
            console.log('navigate')
            navigate('/login')
        }
    }, [refresh])
    return (
        <Routes>
            <Route element={<ProtectedWrapperUnauthorized/>}>
                {Object.entries(publicConfig).map(([, {element, path}]) => (
                    <Route key={path} element={
                        <div>
                            <div className={cls.page}>
                                {element}
                            </div>
                        </div>
                    } path={path}/>
                ))}
            </Route>

            <Route element={<ProtectedWrapperAuthorized/>}>
                {Object.entries(privateConfig).map(([key, {element, path}]) => (
                    <Route key={path} element={
                        <div>
                            <p className={cls.title}>{CamelCase(key)}</p>
                            <div className={cls.page}>
                                {element}
                            </div>
                        </div>
                    } path={path}/>
                ))}
            </Route>

        </Routes>
    );
};

export default AppRouter;