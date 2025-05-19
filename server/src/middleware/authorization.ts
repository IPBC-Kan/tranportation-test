import passport from 'passport';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/Auth';
import { authConfig } from '../auth/authConfig';
import { getIsAdmin } from '../auth/onBehalfOfClient';

//middleware function to authenticate call to api using passport-ad
export function authenticate(req: Request, res: Response, next: NextFunction) {
	passport.authenticate(
		'oauth-bearer',
		{ session: false },
		(err: any, user: any, info: any) => {
			// console.log(user, info, err);
			if (err) {
				return res.status(400).json(err.message);
			}
			if (!user) {
				return res.status(401).json({ error: 'Unauthorized access' });
			}
			if (info) {
				req.authInfo = info;
				return next();
			}
		}
	)(req, res, next);
}

//function to get the userID and check if Admin
export async function getUser(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	const isAdmin = authConfig.accessMatrix.groups.some((group) =>
		req.authInfo.groups?.includes(group)
	);
	// req.user = user;
	req.isAdmin = isAdmin;

	return next();
}

//function to be used before Admin-Only routes
export function routeGuard() {
	return async (req: any | Request, res: Response, next: NextFunction) => {
		const tokenValue = req.headers['authorization'].split(' ')[1];
		const isAdmin = await getIsAdmin(tokenValue);
		if (!isAdmin) res.status(401).send({ error: 'Unathorized' });

		next();
	};
}
