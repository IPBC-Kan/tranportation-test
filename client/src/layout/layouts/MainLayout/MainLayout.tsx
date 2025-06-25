import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { GeneralNavRoutes } from 'shared';
import { useAuth } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { InteractionStatus } from '@azure/msal-browser';
// import styles from './mainLayout.module.scss';
import './mainLayout.scss';
import { getIsUserAuthenticated } from 'store/selectors';
import { getCurrentUser } from 'store/selectors/user.selector';
import { appNavigator } from 'router/appNavigator';
import { authService } from 'api/authentication.service';
import { setUser } from 'store/slices/authSlice';
import { Header } from 'components/Header/Header';
import { NavBar } from 'components/Navbar/Navbar';

export const MainLayout: React.FC = () => {
    const isAuthenticated = useSelector(getIsUserAuthenticated);
    const currentUser = useSelector(getCurrentUser);
    const { instance, inProgress } = useMsal();
    const { getToken } = useAuth();

    const dispatch = useDispatch();

    // no active account in storage, go to sign-in page
    useEffect(() => {
        const onLoad = async () => {
            if (!instance.getActiveAccount() && inProgress === InteractionStatus.None) {
                appNavigator.navigate(GeneralNavRoutes.Login);
            }
        };
        onLoad();
    }, [instance, inProgress]);

    // no access token, get access token
    useEffect(() => {
        (async () => {
            if (!isAuthenticated) {
                await getToken();
            }
        })();
    }, [isAuthenticated, getToken]);

    // have token but no User, sign in with BE
    useEffect(() => {
        (async () => {
            if (!currentUser && isAuthenticated) {
                const { user, errorTranslationKey } = await authService.login();
                console.log(user);

                if (errorTranslationKey) {
                    appNavigator.navigate(GeneralNavRoutes.Login);
                } else {
                    dispatch(setUser(user));
                }
            }
        })();
    }, [currentUser, isAuthenticated]);

    return (
        <div>
            {isAuthenticated && (
                <Box component="main">
                    {/* <Header userName={currentUser?.name || ''} />
                    <div className="main-wrapper">
                        <NavBar />
                        <div className="main-content"></div>
                    </div> */}

                    <Outlet />
                </Box>
            )}
        </div>
    );
};
