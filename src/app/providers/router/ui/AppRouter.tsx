import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import cls from './AppRouter.module.scss';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { ProtectedWrapperAuthorized, ProtectedWrapperUnauthorized } from '@/entities/Wrapper';
import { CamelCase } from '@/shared/utils/CamelCase.ts';
import { privateConfig, publicConfig } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useMediaPredicate } from 'react-media-hook';
import { Avatar } from '@mui/material';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';

const AppRouter = () => {
    const [refresh] = useCookies(['refresh']);
    const navigate = useNavigate();
    const location = useLocation();
    const lessThan720 = useMediaPredicate('(max-width: 720px)');
    useEffect(() => {
        if (Cookies.get('refresh') === undefined) {
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
                                        <Link to="/profile">
                                            <Avatar src={ava} />
                                        </Link>
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
