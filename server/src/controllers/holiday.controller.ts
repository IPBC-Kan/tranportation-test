import { Request, Response } from 'express';
import * as holidayService from '../services/holidayService';

export const getAllHolidays = async (req: Request, res: Response) => {
    try {
        const holidays = await holidayService.getAllHolidays();
        res.json(holidays);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

export const getHolidayByDate = async (req: Request, res: Response) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ error: 'date query param is required' });
        }
        const holiday = await holidayService.getHolidayByDate(new Date(date as string));
        if (!holiday) {
            return res.status(404).json({ error: 'Holiday not found' });
        }
        res.json(holiday);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};
