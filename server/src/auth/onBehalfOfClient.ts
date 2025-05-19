import { LogLevel, ConfidentialClientApplication } from '@azure/msal-node';
import { OnBehalfOfRequest } from '@azure/msal-node/dist/request/OnBehalfOfRequest';
import { authConfig } from './authConfig';

const msalConfig = {
	auth: {
		clientId: authConfig.credentials.clientID,
		authority: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}`,
		clientSecret: authConfig.credentials.clientSecret,
		clientCapabilities: ['CP1'],
	},
	system: {
		loggerOptions: {
			loggerCallback(
				loglevel: LogLevel,
				message: string,
				containsPii: boolean
			) {
				console.log(message);
			},
			piiLoggingEnabled: false,
			logLevel: LogLevel.Info,
		},
	},
};

const cca = new ConfidentialClientApplication(msalConfig);

export const getOboToken = async (oboAssertion: string) => {
	const oboRequest: OnBehalfOfRequest = {
		oboAssertion: oboAssertion,
		scopes: ['User.Read'],
	};

	try {
		const response = await cca.acquireTokenOnBehalfOf(oboRequest);
		return response?.accessToken;
	} catch (error) {
		throw error;
	}
};

export const getIsAdmin = async (oboAssertion: string) => {
	const oboRequest: OnBehalfOfRequest = {
		oboAssertion: oboAssertion,
		scopes: ['User.Read'],
	};

	try {
		const response = await cca.acquireTokenOnBehalfOf(oboRequest);

		if (!response?.account?.idTokenClaims?.groups) return false;

		return authConfig.accessMatrix.groups.some((group) =>
			(response?.account?.idTokenClaims?.groups as string[]).includes(group)
		);
	} catch (error) {
		throw error;
	}
};
