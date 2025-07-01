import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { GeneralNavRoutes } from 'shared';
import { useAuth } from 'hooks';
import { useSelector } from 'react-redux';
import { InteractionStatus } from '@azure/msal-browser';
import './mainLayout.scss';
import { getIsUserAuthenticated } from 'store/selectors';
import { getCurrentUser } from 'store/selectors/user.selector';
import { appNavigator } from 'router/appNavigator';
import { authService } from 'api/authentication.service';
import { Header } from 'components/Header/Header';
import { NavBar } from 'components/Navbar/Navbar';
import { actions } from 'store/store';
import { selectIsAppOnManagementMode } from 'store/selectors/appMode.selector';
import { ExitManagementButton } from 'components/ExitManagementButton/ExitManagementButton';

export const MainLayout: React.FC = () => {
    const isAuthenticated = useSelector(getIsUserAuthenticated);
    const currentUser = useSelector(getCurrentUser);
    const isManagerMode = useSelector(selectIsAppOnManagementMode);
    const { instance, inProgress } = useMsal();
    const { getToken } = useAuth();

    // const dispatch = useDispatch();

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
                    actions.user.set(user);
                    // dispatch(setUser(user));
                }
            }
        })();
    }, [currentUser, isAuthenticated]);

    return (
        <div style={{ direction: 'rtl' }}>
            {isAuthenticated && (
                <Box component="main" className="main-layout">
                    <Header userName={currentUser?.name || ''} />
                    <div className="main-wrapper">
                        {!isManagerMode && <NavBar />}
                        <div className="main-content" style={{ position: 'relative' }}>
                            {isManagerMode && <ExitManagementButton />}
                            <Outlet />
                        </div>
                    </div>
                </Box>
            )}
        </div>
    );
};
