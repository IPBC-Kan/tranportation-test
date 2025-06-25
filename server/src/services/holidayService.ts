import { IHoliday } from '../interfaces';
import { Holiday } from '../models/Holiday.model';

export const getAllHolidays = async () => {
    return Holiday.find().sort({ date: 1 });
};

export const getHolidayByDate = async (date: Date): Promise<IHoliday | null> => {
    // Normalize date to midnight for comparison
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return Holiday.findOne({ date: { $gte: start, $lte: end } });
};
