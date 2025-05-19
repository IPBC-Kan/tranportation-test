import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/Auth';
import User from '../interfaces/User';

export default class UserController {
	public async getUser(
		req: Request<null, AuthenticatedRequest>,
		res: Response
	) {
		res.status(200).send(req.user);
	}
}
