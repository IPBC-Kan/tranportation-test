import { AuthenticationResult } from '@azure/msal-browser';
import { authService } from 'api/authentication.service';
import { loginRequest } from 'Auth/authConfig';
import { msalInstance } from 'index';
import { actions } from 'store/store';

export const useAuth = () => {
    const getToken = async (): Promise<AuthenticationResult> => {
        try {
            await msalInstance.initialize();
            return msalInstance.acquireTokenSilent({ ...loginRequest });
        } catch (error) {
            console.log(error);
        }
    };

    const loginUser = async (): Promise<string> => {
        await msalInstance.handleRedirectPromise();
        const account = await msalInstance.getActiveAccount();
        if (!account) {
            await msalInstance.loginRedirect({
                ...loginRequest,
            });
        }

        const userData = await authService.login();
        actions.user.set(userData.user);
        // store.dispatch(setUser(userData as User));
        return null;
    };

    const logoutUser = async (): Promise<string> => {
        if (msalInstance.getActiveAccount()) {
            await msalInstance.logoutRedirect();
        }
        actions.user.clear();

        actions.accessToken.clear();
        // store.dispatch(setUser(null));
        // store.dispatch(deleteToken());

        return null;
    };

    return {
        loginUser,
        getToken,
        logoutUser,
    };
};
