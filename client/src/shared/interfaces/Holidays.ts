// import { HolidayType } from '../enums/Holidays';

export interface IHoliday {
    _id: { $oid: string };
    name: string;
    hebrewName: string;
    date: { $date: string };
    typeNumber: 0 | 1 | 2; // 0: Manual Deployment Required, 1: Holiday Eve, 2: Holiday
}
