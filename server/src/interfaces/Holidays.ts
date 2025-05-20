import { HolidayType } from '../enums/Holidays';

export interface IHoliday {
    name: string;
    date: Date;
    type: HolidayType;
}
