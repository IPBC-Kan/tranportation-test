import { Request, Response } from 'express';
import * as lineService from '../services/lineService';

// LINE CRUD
export const getAllLines = async (req: Request, res: Response) => {
    const lines = await lineService.getAllLines();
    res.status(200).send(lines);
};

export const createLine = async (req: Request, res: Response) => {
    const line = await lineService.createLine(req.body);
    res.status(200).send(line);
};

export const updateLine = async (req: Request, res: Response) => {
    const line = await lineService.updateLine(req.params.lineId, req.body);
    res.status(200).send(line);
};

export const deleteLine = async (req: Request, res: Response) => {
    await lineService.deleteLine(req.params.lineId);
    res.status(200).send({ message: 'Line deleted successfully' });
};

export const enableLine = async (req: Request, res: Response) => {
    const line = await lineService.enableLine(req.params.lineId);
    res.status(200).send(line);
};

export const disableLine = async (req: Request, res: Response) => {
    const line = await lineService.disableLine(req.params.lineId);
    res.status(200).send(line);
};

// LINE SCHEDULE CRUD
export const getAllLineSchedules = async (req: Request, res: Response) => {
    const schedules = await lineService.getAllLineSchedules(req.params.lineId);
    res.status(200).send(schedules);
};

export const createLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.createLineSchedule(req.params.lineId, req.body);
    res.status(200).send(line);
};

export const updateLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.updateLineSchedule(req.params.lineId, req.params.scheduleId, req.body);
    res.status(200).send(line);
};

export const deleteLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.deleteLineSchedule(req.params.lineId, req.params.scheduleId);
    res.status(200).send(line);
};

export const enableLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.enableLineSchedule(req.params.lineId, req.params.scheduleId);
    res.status(200).send(line);
};

export const disableLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.disableLineSchedule(req.params.lineId, req.params.scheduleId);
    res.status(200).send(line);
};

// LINE STOP CRUD
export const getAllLineStops = async (req: Request, res: Response) => {
    const stops = await lineService.getAllLineStops(req.params.lineId);
    res.status(200).send(stops);
};

export const createLineStop = async (req: Request, res: Response) => {
    const line = await lineService.createLineStop(req.params.lineId, req.body);
    res.status(200).send(line);
};

export const updateLineStop = async (req: Request, res: Response) => {
    const line = await lineService.updateLineStop(req.params.lineId, req.params.stopId, req.body);
    res.status(200).send(line);
};

export const deleteLineStop = async (req: Request, res: Response) => {
    const line = await lineService.deleteLineStop(req.params.lineId, req.params.stopId);
    res.status(200).send(line);
};
