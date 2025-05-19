import { Client } from '@microsoft/microsoft-graph-client';
require('isomorphic-fetch');

const getGraphClient = (accessToken: any) => {
	const client = Client.init({
		authProvider: (done) => {
			done(null, accessToken);
		},
	});
	return client;
};

export default getGraphClient;
