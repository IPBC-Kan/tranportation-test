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
        const tripType = trip.isSpecial ? 'Special' : 'Regular';
        console.log(`${tripType} trip deployed for ${date.toLocaleDateString()} ${date.toLocaleTimeString()}.`);
        deployedTrips.push(trip);
    }
    console.log(`Deployment complete: ${deployedTrips.length} trip(s) deployed.`);
    return deployedTrips;
};

export const deployByDate = async (date: Date) => {
    // Check if the date is a holiday
    const holidayTypeNumber = await getHolidayTypeByDate(date); // 0: Manual Deployment Required, 1: Holiday Eve, 2: Holiday, null: Not a holiday
    // If not, deploy all line schedules for that day of week in this date
    if (holidayTypeNumber === null) {
        console.log(`No holiday for ${date.toDateString()}, deploying for day of week.`);
        const response = await deployForDayOfWeek(date);
        console.log(`Deployment complete: ${response.newTrips?.length || 0} trip(s) deployed.`);
        return response;
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
            const response = await deployForFriday(date);
            console.log(`Deployment complete: ${response.newTrips?.length || 0} trip(s) deployed.`);
            return response;
        } else if (dayNumber === 6) {
            // Saturday
            const response = await deployForSaturday(date, true); // Special deployment for Saturday
            console.log(`Deployment complete: ${response.newTrips?.length || 0} trip(s) deployed.`);
            return response;
        } else {
            const response = await deployForFriday(date); // Deploy for Friday if it's any other day
            console.log(`Deployment complete: ${response.newTrips?.length || 0} trip(s) deployed.`);
            return response;
        }
    }
    // 2: Holiday - depends on next day - If Its type 2 or sat:
    // If yes, deploy all line schedules for saturday, but with special deployment
    // If no, deploy all line schedules for saturday, regularly
    if (holidayTypeNumber === 2) {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        const nextHolidayTypeNumber = await getHolidayTypeByDate(nextDay);
        if (nextHolidayTypeNumber === 2 || nextDay.getDay() === 6) {
            // If next day is a holiday or Saturday
            const response = await deployForSaturday(date, true); // Special deployment for Saturday
            console.log(`Deployment complete: ${response.newTrips?.length || 0} trip(s) deployed.`);
            return response;
        } else {
            const response = await deployForSaturday(date); // Regular deployment for Saturday
            console.log(`Deployment complete: ${response.newTrips?.length || 0} trip(s) deployed.`);
            return response;
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

        // Find all schedules for the given day
        const schedules = line.schedule.filter((schedule) => getDayNumber(schedule.weekday) === dayNumber);
        if (schedules.length > 0) {
            for (const schedule of schedules) {
                console.log(`Found schedule for line ${line.name} on ${schedule.weekday}. Creating trip.`);

                // Set the correct time for the trip based on the schedule
                const tripDate = new Date(date);
                tripDate.setHours(schedule.hour, schedule.minute, 0, 0);

                const trip = await createTrip(line, schedule, tripDate);
                if (trip) {
                    console.log(
                        `Trip created for line ${line.name} on ${tripDate.toDateString()} at ${tripDate.toLocaleTimeString()}.`
                    );
                    deployedTrips.push(trip);
                }
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

    // Calculate cancellation timestamp (trip date minus cancellation time allowed in minutes)
    const cancellationTimestamp = new Date(date.getTime() - schedule.cancellationTimeAllowed * 60000);

    // Create the trip document
    const tripDoc = await Trip.create({
        lineName: line.name,
        lineDirection,
        date: date,
        isSpecial,
        cancellationTimestamp,
        passengersNumberAllowed: schedule.passengersNumberAllowed,
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
