import { ProtectedWrapperAuthorized, ProtectedWrapperUnauthorized } from 'src/entities/wrapper';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CamelCase } from '@/shared/utils/CamelCase.ts';
import { DropDownMenu } from '@/widgets/DropDownMenu';
import { useMediaPredicate } from 'react-media-hook';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import cls from './AppRouter.module.scss';
import { privateConfig, publicConfig } from '@/shared/config/routeConfig/RouteConfig.tsx';

const AppRouter = () => {
    const [refresh] = useCookies(['refresh']);
    const navigate = useNavigate();
    const location = useLocation();
    const lessThan720 = useMediaPredicate('(max-width: 720px)');
    useEffect(() => {
        if (Cookies.get('refresh') === undefined) {
         console.log('not refresh')
            navigate('/login');
        }
        if (Cookies.get('refresh') && (location.pathname === '/login' || location.pathname === '/register')) {
            navigate('/');
        }
    }, [refresh]);
    return (
        <Routes>
            <Route element={<ProtectedWrapperUnauthorized />}>
                {Object.entries(publicConfig).map(([, { element, path }]) => (
                    <Route
                        key={path}
                        element={
                            <div>
                                <div className={cls.page}>{element}</div>
                            </div>
                        }
                        path={path}
                    />
                ))}
            </Route>

            <Route element={<ProtectedWrapperAuthorized />}>
                {Object.entries(privateConfig).map(([key, { element, path }]) => (
                    <Route
                        key={path}
                        element={
                            <div>
                                <div className={cls.header}>
                                    <p className={cls.title}>{CamelCase(key)} </p>
                                    {lessThan720 && (
                                       <DropDownMenu/>
                                    )}
                                </div>
                                <div className={cls.page}>{element}</div>
                            </div>
                        }
                        path={path}
                    />
                ))}
            </Route>
        </Routes>
    );
};

export default AppRouter;
