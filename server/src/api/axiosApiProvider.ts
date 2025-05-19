import axios from 'axios';
import { appConfig } from 'config';

import { QuickApiProvider, QuickHttpStatusCode } from 'hooks/services';

console.log(
	`Initializing axios API using url: ${appConfig.backendUrl}`,
	process.env
);

const baseUrl = new URL(appConfig.backendUrl).href;

const axiosClient = axios.create({
	baseURL: baseUrl,
	maxBodyLength: Infinity,
	maxContentLength: Infinity,
});

export const appApiProvider: QuickApiProvider = {
	updateJwtToken: (token: string): void => {
		if (token) {
			axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
		} else {
			delete axiosClient.defaults.headers.common.Authorization;
		}
	},

	get: async <T>(
		url: string
	): Promise<{ data: T; httpStatusCode: QuickHttpStatusCode }> => {
		const result = await axiosClient.get(url);

		return { data: result.data, httpStatusCode: result.status };
	},

	post: async <T>(
		url: string,
		body: any
	): Promise<{ data: T; httpStatusCode: QuickHttpStatusCode }> => {
		const result = await axiosClient.post(url, body);

		return { data: result.data, httpStatusCode: result.status };
	},

	put: async <T>(
		url: string,
		body: any
	): Promise<{ data: T; httpStatusCode: QuickHttpStatusCode }> => {
		const result = await axiosClient.put(url, body);
		return { data: result.data, httpStatusCode: result.status };
	},

	delete: async <T>(
		url: string
	): Promise<{ data: T; httpStatusCode: QuickHttpStatusCode }> => {
		const result = await axiosClient.delete(url);

		return { data: result.data, httpStatusCode: result.status };
	},
	saveBlob: (data: Blob, fileName: string) => {
		throw new Error('Function not implemented.');
	},
};
