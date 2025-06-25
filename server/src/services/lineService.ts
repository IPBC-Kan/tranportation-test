import { Line } from '../models/Line.model';
import { ILine, ILineSchedule, ILineStop } from '../interfaces/Line';

// LINE CRUD
export const getAllLines = async () => {
    return Line.find();
};

export const createLine = async (lineData: ILine) => {
    return Line.create(lineData);
};

export const updateLine = async (lineId: string, updateData: Partial<ILine>) => {
    return Line.findByIdAndUpdate(lineId, updateData, { new: true });
};

export const deleteLine = async (lineId: string) => {
    return Line.findByIdAndDelete(lineId);
};

export const enableLine = async (lineId: string) => {
    return Line.findByIdAndUpdate(lineId, { isActive: true }, { new: true });
};

export const disableLine = async (lineId: string) => {
    return Line.findByIdAndUpdate(lineId, { isActive: false }, { new: true });
};

// LINE SCHEDULE CRUD
export const getAllLineSchedules = async (lineId: string) => {
    const line = await Line.findById(lineId);
    return line?.schedule || [];
};

export const createLineSchedule = async (lineId: string, schedule: ILineSchedule) => {
    // ודא ש-hour ו-minute קיימים ב-schedule
    if (typeof schedule.hour !== 'number' || typeof schedule.minute !== 'number') {
        throw new Error('hour and minute are required for LineSchedule');
    }
    return Line.findByIdAndUpdate(lineId, { $push: { schedule } }, { new: true });
};

export const updateLineSchedule = async (lineId: string, scheduleId: string, updateData: Partial<ILineSchedule>) => {
    const line = await Line.findById(lineId);
    if (!line) return null;
    const scheduleIndex = line.schedule.findIndex((s: any) => s._id?.toString() === scheduleId);
    if (scheduleIndex === -1) return null;
    Object.assign(line.schedule[scheduleIndex], updateData);
    await line.save();
    return line;
};

export const deleteLineSchedule = async (lineId: string, scheduleId: string) => {
    const line = await Line.findById(lineId);
    if (!line) return null;
    const scheduleIndex = line.schedule.findIndex((s: any) => s._id?.toString() === scheduleId);
    if (scheduleIndex === -1) return null;
    line.schedule.splice(scheduleIndex, 1);
    await line.save();
    return line;
};

export const enableLineSchedule = async (lineId: string, scheduleId: string) => {
    return updateLineSchedule(lineId, scheduleId, { isActive: true });
};

export const disableLineSchedule = async (lineId: string, scheduleId: string) => {
    return updateLineSchedule(lineId, scheduleId, { isActive: false });
};

// LINE STOP CRUD
export const getAllLineStops = async (lineId: string) => {
    const line = await Line.findById(lineId);
    return line?.stops || [];
};

export const createLineStop = async (lineId: string, stop: ILineStop) => {
    return Line.findByIdAndUpdate(lineId, { $push: { stops: stop } }, { new: true });
};

export const updateLineStop = async (lineId: string, stopId: string, updateData: Partial<ILineStop>) => {
    const line = await Line.findById(lineId);
    if (!line) return null;
    const stopIndex = line.stops.findIndex((s: any) => s._id?.toString() === stopId);
    if (stopIndex === -1) return null;
    Object.assign(line.stops[stopIndex], updateData);
    await line.save();
    return line;
};

export const deleteLineStop = async (lineId: string, stopId: string) => {
    const line = await Line.findById(lineId);
    if (!line) return null;
    const stopIndex = line.stops.findIndex((s: any) => s._id?.toString() === stopId);
    if (stopIndex === -1) return null;
    line.stops.splice(stopIndex, 1);
    await line.save();
    return line;
};
