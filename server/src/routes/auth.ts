import Controller from '../controllers';
import express, { Request, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/Auth';

const auth = new Controller.Auth();
const router = express.Router();

router.get('/login', (req: Request, res: Response) =>
	auth.signIn(req as AuthenticatedRequest, res)
);

export default router;
