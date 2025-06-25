import { getHolidayByDate } from '../services/holidayService';

export const getHolidayTypeByDate = async (date: Date): Promise<number | null> => {
    const holiday = await getHolidayByDate(date);
    return holiday ? holiday.typeNumber : null;
};
