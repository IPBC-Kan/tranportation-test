import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	AuthenticationResult,
	EventMessage,
	EventType,
	PublicClientApplication,
} from '@azure/msal-browser';
import { loginRequest, msalConfig } from 'Auth/authConfig';
import { MsalProvider } from '@azure/msal-react';
import { Provider } from 'react-redux';
import { persistor, store } from 'store/store';
import { setAccessToken } from 'store/slices/authSlice';
import { appApiProvider } from 'api/axiosApiProvider';
import { AppRouter } from 'router/Router';
import { createTheme, ThemeProvider } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from 'layout';

export const msalInstance = new PublicClientApplication(msalConfig);

if (msalInstance.getAllAccounts().length > 0) {
	msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
	if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
		const payload = event.payload as AuthenticationResult;
		const account = { ...payload.account };
		msalInstance.setActiveAccount(account);
		msalInstance.acquireTokenSilent({ ...loginRequest });
	}
});

msalInstance.addEventCallback((event: EventMessage) => {
	if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS && event.payload) {
		const payload = event.payload as AuthenticationResult;
		const token = payload.accessToken;
		store.dispatch(setAccessToken(token));

		appApiProvider.updateJwtToken(token);
	}
});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={createTheme(theme)}>
			<MsalProvider instance={msalInstance}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<AppRouter />
					</PersistGate>
				</Provider>
			</MsalProvider>
		</ThemeProvider>
	</React.StrictMode>
);
