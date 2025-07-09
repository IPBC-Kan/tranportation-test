import { Line } from '../models/Line.model';
import { Trip } from '../models/Trip.model';
import { ITrip } from '../interfaces/Trip';
import { getDayNumber } from '../enums';
import { ILine, ILineSchedule } from '../interfaces';
import { getHolidayTypeByDate } from '../utils/generalUtils';

// deployByScheduleId(scheduleId: string) uses CreateTrip(line: ILine, schedule: ILineSchedule, date: Date) to create trips for the next 8 days
// deployByDate(date: Date) uses one of three functions: deployForDayOfWeek(date: Date), deployForFriday(date: Date), deployForSaturday(date: Date, deployAllAsSpecial: boolean) to create trips for the given date
// each of these functions uses CreateTrip(line: ILine, schedule: ILineSchedule, date: Date, deployAllAsSpecial?: boolean) to create trips for the given date

export interface IDeploymentResponse {
    tripsCreated: boolean;
    message: string;
    newTrips?: ITrip[];
}

export const deployByScheduleId = async (scheduleId: string) => {
    const line = await findLineByScheduleId(scheduleId);
    if (!line) {
        throw new Error('Line not found for the given schedule ID');
    }
    const schedule = line.schedule.find((s) => s._id?.toString() === scheduleId);
    if (!schedule) {
        throw new Error('Schedule not found for the given schedule ID');
    }

    // Find the relevant dates in the next 8 days
    const today = new Date();
    const dates = Array.from({ length: 8 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date;
    })
        .filter((date) => date.getDay() === getDayNumber(schedule.weekday))
        .map((date) => {
            date.setHours(schedule.hour, schedule.minute, 0, 0);
            return date;
        });

    if (dates.length === 0) {
        throw new Error('No valid dates found for the given schedule weekday');
    }

    // Deploy trips for each date
    let deployedTrips: ITrip[] = [];
    for (const date of dates) {
        const trip = await createTrip(line, schedule, date);
        if (!trip) {
            throw new Error('Failed to create trip from line schedule');
        }
        deployedTrips.push(trip);
    }
    return deployedTrips;
};

export const deployByDate = async (date: Date) => {
    //Check if the date is a holiday
    const holidayTypeNumber = await getHolidayTypeByDate(date); // 0: Manual Deployment Required, 1: Holiday Eve, 2: Holiday, null: Not a holiday
    // If not, deploy all line schedules for that day of week in this date
    if (holidayTypeNumber === null) {
        console.log(`No holiday for ${date.toDateString()}, deploying for day of week.`);

        return deployForDayOfWeek(date);
    }
    console.log(`Holiday type ${holidayTypeNumber} for ${date.toDateString()}, handling deployment accordingly.`);
    // If it is a holiday, depends on the holiday type:
    // 0: Manual Deployment Required - throw an error
    if (holidayTypeNumber === 0) {
        const response: IDeploymentResponse = {
            tripsCreated: false,
            message: 'The trips for this date should be manually deployed by transportation manager.',
        };
        return response;
    }
    // 1: Holiday Eve - depends on day of week:
    // sun to fri - deploy all line schedules for friday
    // sat - deploy all line schedules for saturday, but with special deployment
    if (holidayTypeNumber === 1) {
        const dayNumber = date.getDay();
        if (dayNumber === 5) {
            // Friday
            return deployForFriday(date);
        } else if (dayNumber === 6) {
            // Saturday
            return deployForSaturday(date, true); // Special deployment for Saturday
        } else {
            return deployForFriday(date); // Deploy for Friday if it's any other day
        }
    }
    // 2: Holiday - depends on next day - If Its type 2 or sat:
    //If yes, deploy all line schedules for saturday, but with special deployment
    // If no, deploy all line schedules for saturday, regularly
    if (holidayTypeNumber === 2) {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        const nextHolidayTypeNumber = await getHolidayTypeByDate(nextDay);
        if (nextHolidayTypeNumber === 2 || nextDay.getDay() === 6) {
            // If next day is a holiday or Saturday
            return deployForSaturday(date, true); // Special deployment for Saturday
        } else {
            return deployForSaturday(date); // Regular deployment for Saturday
        }
    }
};

// helpers

const deployForDayOfWeek = async (date: Date) => {
    const dayNumber = date.getDay();
    console.log(`Deploying trips for ${date.toDateString()} (day number ${dayNumber}).`);
    const lines = await Line.find();
    console.log(`Found ${lines.length} lines for deployment.`);

    const deployedTrips: ITrip[] = [];
    for (const line of lines) {
        console.log(`Checking line ${line.name} for weekday ${dayNumber} deployment.`);

        const schedule = line.schedule.find((schedule) => getDayNumber(schedule.weekday) === dayNumber);
        if (schedule) {
            console.log(`Found schedule for line ${line.name} on ${schedule.weekday}. Creating trip.`);

            const trip = await createTrip(line, schedule, date);
            if (trip) {
                console.log(`Trip created for line ${line.name} on ${date.toDateString()}.`);
                deployedTrips.push(trip);
            }
        }
    }
    const response: IDeploymentResponse = {
        tripsCreated: deployedTrips.length > 0,
        message:
            deployedTrips.length > 0
                ? `Deployed ${deployedTrips.length} trip(s) for ${date.toDateString()} (weekday)`
                : `No trips deployed for ${date.toDateString()} (weekday)`,
        newTrips: deployedTrips,
    };
    return response;
};

const deployForFriday = async (date: Date) => {
    const lines = await Line.find();
    const deployedTrips: ITrip[] = [];
    for (const line of lines) {
        const schedule = line.schedule.find((schedule) => getDayNumber(schedule.weekday) === 5); // 5 is Friday
        if (schedule) {
            const trip = await createTrip(line, schedule, date);
            if (trip) {
                deployedTrips.push(trip);
            }
        }
    }
    const response: IDeploymentResponse = {
        tripsCreated: deployedTrips.length > 0,
        message:
            deployedTrips.length > 0
                ? `Deployed ${deployedTrips.length} trip(s) for ${date.toDateString()} (Friday)`
                : `No trips deployed for ${date.toDateString()} (Friday)`,
        newTrips: deployedTrips,
    };
    return response;
};

const deployForSaturday = async (date: Date, deployAllAsSpecial = false) => {
    const lines = await Line.find();
    const deployedTrips: ITrip[] = [];
    for (const line of lines) {
        const schedule = line.schedule.find((schedule) => getDayNumber(schedule.weekday) === 6); // 6 is Saturday
        if (schedule) {
            const trip = await createTrip(line, schedule, date, deployAllAsSpecial);
            if (trip) {
                deployedTrips.push(trip);
            }
        }
    }
    const response: IDeploymentResponse = {
        tripsCreated: deployedTrips.length > 0,
        message:
            deployedTrips.length > 0
                ? `Deployed ${deployedTrips.length} trip(s) for ${date.toDateString()} (Saturday${
                      deployAllAsSpecial ? ', special' : ''
                  })`
                : `No trips deployed for ${date.toDateString()} (Saturday${deployAllAsSpecial ? ', special' : ''})`,
        newTrips: deployedTrips,
    };
    return response;
};

const createTrip = async (
    line: ILine,
    schedule: ILineSchedule,
    date: Date,
    deployAllAsSpecial = false
): Promise<ITrip | null> => {
    // Determine lineDirection and isSpecial
    const lineDirection = line.direction || 'pickup'; // fallback if not present
    const isSpecial = !!(schedule.isSpacial || deployAllAsSpecial);

    // Create the trip document
    const tripDoc = await Trip.create({
        lineName: line.name,
        lineDirection,
        date: date,
        isSpecial,
        stops: [],
        registrations: [],
        chatMessages: [],
        isActive: true,
    });

    // Add stops according to schedule type
    if (schedule.isSpacial || deployAllAsSpecial) {
        // Only base stop
        const baseStop = line.stops.find((stop) => stop.isBase);
        if (!baseStop) throw new Error('No base stop found for the line');
        const tripStop = {
            name: baseStop.name,
            estimatedArrivalTime: new Date(tripDoc.date.getTime() + baseStop.estimatedArrivalTime * 60000),
            isBase: true,
        };
        await Trip.findByIdAndUpdate(tripDoc._id, { $push: { stops: tripStop } }, { new: true });
    } else {
        // All stops
        const tripStops = line.stops.map((stop) => ({
            name: stop.name,
            estimatedArrivalTime: new Date(tripDoc.date.getTime() + stop.estimatedArrivalTime * 60000),
            isBase: stop.isBase,
            ...(stop.index && stop.index > 0 ? { index: stop.index } : {}),
        }));
        await Trip.findByIdAndUpdate(tripDoc._id, { $push: { stops: { $each: tripStops } } }, { new: true });
    }

    // Return the updated trip
    return await Trip.findById(tripDoc._id);
};

const findLineByScheduleId = async (scheduleId: string) => {
    const lines = await Line.find();
    for (const line of lines) {
        const schedule = line.schedule.find((schedule) => schedule._id?.toString() === scheduleId);
        if (schedule) {
            return line;
        }
    }
};
