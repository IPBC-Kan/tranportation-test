import { BearerStrategy } from 'passport-azure-ad';
import { config } from 'dotenv';

config();

export const authConfig = {
	credentials: {
		clientID: `${process.env.CLIENT_ID}`,
		tenantID: `${process.env.TENANT_ID}`,
		clientSecret: `${process.env.CLIENT_SECRET}`,
	},
	metadata: {
		authority: 'login.microsoftonline.com',
		discovery: '.well-known/openid-configuration',
		version: 'v2.0',
	},
	settings: {
		validateIssuer: true,
		passReqToCallback: true,
		cacheTTL: 3600,
	},
	accessMatrix: {
		routes: {},
		groups: ['60d7f843-f705-4e8e-83b4-ccda39a739b2'],
	},
};

export const bearerStrategy = new BearerStrategy(
	{
		identityMetadata: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
		issuer: `https://sts.windows.net/${authConfig.credentials.tenantID}/`,
		clientID: authConfig.credentials.clientID,
		audience: authConfig.credentials.clientID,
		validateIssuer: authConfig.settings.validateIssuer,
		passReqToCallback: authConfig.settings.passReqToCallback,
		loggingLevel: 'error',
		loggingNoPII: false,
	},
	(req, token, done) => {
		const myAllowedClientsList = [authConfig.credentials.clientID];
		if (!myAllowedClientsList.includes(token.aud ?? '')) {
			return done(new Error('Unauthorized'), {}, 'Client not allowed');
		}

		if (!token.hasOwnProperty('scp') && !token.hasOwnProperty('roles')) {
			return done(
				new Error('Unauthorized'),
				null,
				'No delegated or app permission claims found'
			);
		}
		return done(null, {}, token);
	}
);
