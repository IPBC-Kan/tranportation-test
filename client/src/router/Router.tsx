import { lazy, Suspense } from 'react';

import { useSelector } from 'react-redux';

// This API is currently prefixed as unstable_ because you may unintentionally add two versions of
// the history library to your app, the one you have added to your package.json and whatever version
// React Router uses internally. If it is allowed by your tooling, it's recommended to not add
// history as a direct dependency and instead rely on the nested dependency from the react-router package.
// Once we have a mechanism to detect mis-matched versions, this API will remove its unstable_ prefix.
import { NoAccess, NotFound } from 'pages/Errors';
import { IRoute, RoleEnum } from 'shared';
// import { historyInstance } from './history';
import { getIsUserAuthenticated } from 'store/selectors';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout, MainLayout } from 'layout';
import { applicationRoutes } from './Routes';
import { useAppInitialization } from 'hooks/useAppInitialization.hook';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import MyTripsPage from 'pages/MyTripsPage/MyTripsPage';
import InfoPage from 'pages/InfoPage/InfoPage';

const importModule = (moduleName: string) => lazy(() => import(`pages/${moduleName}`));

export const AppRouter = () => {
    const isAuthenticated = useSelector(getIsUserAuthenticated);

    useAppInitialization();

    const isAuthorized = (authorizedRoles: RoleEnum[]): boolean => {
        return isAuthenticated && (!authorizedRoles || authorizedRoles.includes('Admin' as RoleEnum));
    };

    const addRoute = (needToBeAuthenticated: boolean, [route, info]: [string, IRoute]) => {
        const getRouteContent = () => {
            if (needToBeAuthenticated && !isAuthorized(info.authRoles)) {
                return NoAccess;
            }

            if ((info.renderSource as { moduleToLoad: string }).moduleToLoad) {
                return importModule((info.renderSource as any).moduleToLoad);
            }

            if ((info.renderSource as { componentToRender: () => JSX.Element }).componentToRender) {
                return (info.renderSource as any).componentToRender;
            }

            throw new Error(`Cannot add route: route doesn't have renderSource, route: ${route}`);
        };

        const ComponentToRender = getRouteContent();

        return <Route path={`/${route}`} key={route} element={<ComponentToRender />} />;
    };
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/auth" element={<AuthLayout />}>
                        {Object.entries(applicationRoutes.auth).map((route) => addRoute(false, route))}
                        <Route path="*" element={<Navigate to="/auth/login" replace />} />
                    </Route>
                    <Route path="/" element={<MainLayout />}>
                        {Object.entries(applicationRoutes.main).map((route) => addRoute(!!route[1].authRoles, route))}
                        <Route path="/" element={<Navigate to="/main" replace />} />
                        <Route path="*" element={<NotFound />} />

                        <Route path="/registration" element={<RegistrationPage />} />
                        <Route path="/my-trips" element={<MyTripsPage />} />
                        <Route path="/info" element={<InfoPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
