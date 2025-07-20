import { ILineSchedule } from 'shared/interfaces';

// Generate registration text based on schedule
export const generateRegistrationText = (schedule: ILineSchedule): string => {
    const { cancellationTimeAllowed } = schedule;

    if (cancellationTimeAllowed >= 60) {
        const hours = Math.floor(cancellationTimeAllowed / 60);
        if (hours === 1) {
            return 'יש להירשם לנסיעה זאת עד שעה לפני הנסיעה';
        }
        return `יש להירשם לנסיעה זאת עד ${hours} שעות לפני הנסיעה`;
    }

    if (cancellationTimeAllowed === 0) {
        return 'יש להירשם לנסיעה זאת עד השעה 20:00 בערב לפני';
    }

    return `יש להירשם לנסיעה זאת עד ${cancellationTimeAllowed} דקות לפני הנסיעה`;
};

// Format time for display
export const formatTime = (hour: number, minute: number): string => {
    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minute.toString().padStart(2, '0');
    return `${hourStr}:${minuteStr}`;
};

// Get Hebrew day name
export const getHebrewDayName = (weekday: string): string => {
    const dayMap: { [key: string]: string } = {
        Sunday: 'ראשון',
        Monday: 'שני',
        Tuesday: 'שלישי',
        Wednesday: 'רביעי',
        Thursday: 'חמישי',
        Friday: 'שישי',
        Saturday: 'שבת',
    };
    return dayMap[weekday] || weekday;
};

// Get day order for sorting
export const getDayOrder = (weekday: string): number => {
    const dayOrder: { [key: string]: number } = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
    };
    return dayOrder[weekday] || 7;
};

// Sort schedules by day and time
export const sortSchedulesByDayAndTime = (schedules: ILineSchedule[]): ILineSchedule[] => {
    return schedules.sort((a, b) => {
        const dayDiff = getDayOrder(a.weekday) - getDayOrder(b.weekday);
        if (dayDiff !== 0) return dayDiff;

        const timeDiff = a.hour * 60 + a.minute - (b.hour * 60 + b.minute);
        return timeDiff;
    });
};

// Group schedules by day
export const groupSchedulesByDay = (schedules: ILineSchedule[]): { [key: string]: ILineSchedule[] } => {
    const grouped: { [key: string]: ILineSchedule[] } = {};

    schedules.forEach((schedule) => {
        const dayName = getHebrewDayName(schedule.weekday);
        if (!grouped[dayName]) {
            grouped[dayName] = [];
        }
        grouped[dayName].push(schedule);
    });

    return grouped;
};
