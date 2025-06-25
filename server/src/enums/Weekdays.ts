export enum Weekday {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export const weekdayLabels = {
    [Weekday.Sunday]: 'ראשון',
    [Weekday.Monday]: 'שני',
    [Weekday.Tuesday]: 'שלישי',
    [Weekday.Wednesday]: 'רביעי',
    [Weekday.Thursday]: 'חמישי',
    [Weekday.Friday]: 'שישי',
    [Weekday.Saturday]: 'שבת',
};

export const getDayNumber = (day: string): Weekday | null => {
    const dayLower = day.toLowerCase();
    switch (dayLower) {
        case 'sunday':
        case 'ראשון':
            return Weekday.Sunday;
        case 'monday':
        case 'שני':
            return Weekday.Monday;
        case 'tuesday':
        case 'שלישי':
            return Weekday.Tuesday;
        case 'wednesday':
        case 'רביעי':
            return Weekday.Wednesday;
        case 'thursday':
        case 'חמישי':
            return Weekday.Thursday;
        case 'friday':
        case 'שישי':
            return Weekday.Friday;
        case 'saturday':
        case 'שבת':
            return Weekday.Saturday;
        default:
            return null;
    }
};
