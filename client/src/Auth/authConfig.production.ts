import { Configuration, LogLevel, RedirectRequest } from '@azure/msal-browser';

export const msalConfig: Configuration = {
	auth: {
		clientId: process.env.REACT_APP_CLIENT_ID,
		authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
		redirectUri: '/auth/login',
		postLogoutRedirectUri: '/',
		navigateToLoginRequestUrl: true,
	},
	cache: {
		cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
		storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
	},
	system: {
		loggerOptions: {
			loggerCallback: (
				level: LogLevel,
				message: string,
				containsPii: boolean
			) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						break;
					case LogLevel.Info:
						console.info(message);
						break;
					case LogLevel.Verbose:
						console.debug(message);
						break;
					case LogLevel.Warning:
						console.warn(message);
						break;
					default:
						break;
				}
			},
		},
	},
};

export const protectedResources = {
	AuthApi: {
		scopes: [`${msalConfig.auth.clientId}/.default`],
	},
};

//configuration by scope if user exists in the group to get admin access
export const groups = {
	groupAdmin: 'YOUR_GROUP_AZURE_OID',
};

export const loginRequest: RedirectRequest = {
	scopes: [...protectedResources.AuthApi.scopes],
};
