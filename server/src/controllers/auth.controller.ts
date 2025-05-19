import { ResponseType } from '@microsoft/microsoft-graph-client';
import { Response } from 'express';
import getGraphClient from '../auth/grpahClient';
import { GraphData } from '../interfaces/graphData';
import { getOboToken } from '../auth/onBehalfOfClient';
import { AuthenticatedRequest } from '../interfaces/Auth';

export default class AuthController {
	private getGraphData = async (token: string): Promise<GraphData> => {
		try {
			const accessToken = await getOboToken(token);
			const graphResponse = await getGraphClient(accessToken)
				.api('/me')
				.select(
					'displayName,givenName,surname,department,jobtitle,mail,businessPhones,id,userPrincipalName'
				)
				.responseType(ResponseType.JSON)
				.get();

			return {
				fullName: graphResponse.displayName || '',
				firstName:
					graphResponse.givenName ||
					(graphResponse.displayName as string).split(' ')[0] ||
					'',
				lastName:
					graphResponse.surname ||
					(graphResponse.displayName as string).split(' ')[1] ||
					'',
				department: graphResponse.department || '',
				title: graphResponse.jobTitle || '',
				emailAddress:
					graphResponse.mail || graphResponse.userPrincipalName || '',
				phoneNumber: graphResponse.businessPhones[0] || '',
				id: graphResponse.oid,
			};
		} catch (err) {
			console.log(err);

			throw err;
		}
	};

	public async signIn(req: AuthenticatedRequest, res: Response) {
		const tokenValue = req.headers['authorization']
			? req.headers['authorization'].split(' ')[1]
			: '';
		const graphData = await this.getGraphData(tokenValue).catch(() => {
			res.status(503).send('Graph Api service unvailable');
		});
		const id = req?.user?.id;
		(graphData as GraphData).isAdmin = req.isAdmin || true;

		const user = {
			id: (graphData as GraphData).id,
			fullName: (graphData as GraphData).fullName,
			firstName: (graphData as GraphData).firstName,
			lastName: (graphData as GraphData).lastName,
			emailAddress: (graphData as GraphData).emailAddress,
			title: (graphData as GraphData).title,
			phoneNumber: (graphData as GraphData).phoneNumber,
			department: (graphData as GraphData).department,
		};

		const [firstName, lastName] = user.fullName.split(' ', 2);
		req.user = {
			...user,
			id: Number(user.id),
			displayName: `${firstName} ${lastName}`,
		};

		res.status(200).send({
			id: user.id,
			firstName,
			lastName,
			email: user.emailAddress,
			role: req.isAdmin,
			title: user.title,
			phone: user.phoneNumber,
		});
	}
}
