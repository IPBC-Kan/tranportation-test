import { Request, RequestHandler } from 'express';
import User from './User';
import * as core from 'express-serve-static-core';

export interface AuthenticatedRequest<
	P = core.ParamsDictionary,
	ResBody = any,
	ReqBody = any,
	ReqQuery = core.Query,
	Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
	req: {};
	user: User;
	isAdmin: Boolean;
	authInfo: {
		oid: string;
		groups: string[];
	};
}

export interface AuthenticatedRequestHandler<
	P = core.ParamsDictionary,
	ResBody = any,
	ReqBody = any,
	ReqQuery = core.Query,
	Locals extends Record<string, any> = Record<string, any>
> extends RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {
	user: User;
	isAdmin: Boolean;
	authInfo: {
		oid: string;
		groups: string[];
	};
}
