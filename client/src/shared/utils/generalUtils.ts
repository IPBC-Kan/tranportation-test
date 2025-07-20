export const isEmptyObj = (obj: object): boolean => {
    return obj == null || Object.keys(obj).length === 0;
};

export const generateRegistrationTimeText = (cancellationTimeAllowed: number): string => {
    if (cancellationTimeAllowed >= 60) {
        const hours = Math.floor(cancellationTimeAllowed / 60);
        const minutes = cancellationTimeAllowed % 60;
        if (minutes === 0) {
            return `יש להירשם לנסיעה זאת עד ${hours} שעות לפני הנסיעה`;
        } else {
            return `יש להירשם לנסיעה זאת עד ${hours} שעות ו${minutes} דקות לפני הנסיעה`;
        }
    } else {
        return `יש להירשם לנסיעה זאת עד ${cancellationTimeAllowed} דקות לפני הנסיעה`;
    }
};

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

export const formatTime = (hour: number, minute: number): string => {
    const h = hour.toString().padStart(2, '0');
    const m = minute.toString().padStart(2, '0');
    return `${h}:${m}`;
};
