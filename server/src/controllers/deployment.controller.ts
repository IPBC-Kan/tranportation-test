import { Request, Response } from 'express';
import * as deploymentService from '../services/deploymentService';

export const deployLineSchedule = async (req: Request, res: Response) => {
    const { scheduleId } = req.params;
    try {
        const result = await deploymentService.deployByScheduleId(scheduleId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

export const deployByDate = async (req: Request, res: Response) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ error: 'date query param is required' });
        }
        const result = await deploymentService.deployByDate(new Date(date as string));
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};
