import Controller from '../controllers';
import express, { Request, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/Auth';
import { getUser, routeGuard } from '../middleware/authorization';

const user = new Controller.User();
export const router = express.Router();

router.get('/user', routeGuard, user.getUser);
