import { Request, Response } from 'express';
import * as lineService from '../services/lineService';

// LINE CRUD
export const getAllLines = async (req: Request, res: Response) => {
    const lines = await lineService.getAllLines();
    res.json(lines);
};

export const createLine = async (req: Request, res: Response) => {
    const line = await lineService.createLine(req.body);
    res.status(201).json(line);
};

export const updateLine = async (req: Request, res: Response) => {
    const line = await lineService.updateLine(req.params.lineId, req.body);
    res.json(line);
};

export const deleteLine = async (req: Request, res: Response) => {
    await lineService.deleteLine(req.params.lineId);
    res.sendStatus(204);
};

export const enableLine = async (req: Request, res: Response) => {
    const line = await lineService.enableLine(req.params.lineId);
    res.json(line);
};

export const disableLine = async (req: Request, res: Response) => {
    const line = await lineService.disableLine(req.params.lineId);
    res.json(line);
};

// LINE SCHEDULE CRUD
export const getAllLineSchedules = async (req: Request, res: Response) => {
    const schedules = await lineService.getAllLineSchedules(req.params.lineId);
    res.json(schedules);
};

export const createLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.createLineSchedule(req.params.lineId, req.body);
    res.status(201).json(line);
};

export const updateLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.updateLineSchedule(req.params.lineId, req.params.scheduleId, req.body);
    res.json(line);
};

export const deleteLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.deleteLineSchedule(req.params.lineId, req.params.scheduleId);
    res.json(line);
};

export const enableLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.enableLineSchedule(req.params.lineId, req.params.scheduleId);
    res.json(line);
};

export const disableLineSchedule = async (req: Request, res: Response) => {
    const line = await lineService.disableLineSchedule(req.params.lineId, req.params.scheduleId);
    res.json(line);
};

// LINE STOP CRUD
export const getAllLineStops = async (req: Request, res: Response) => {
    const stops = await lineService.getAllLineStops(req.params.lineId);
    res.json(stops);
};

export const createLineStop = async (req: Request, res: Response) => {
    const line = await lineService.createLineStop(req.params.lineId, req.body);
    res.status(201).json(line);
};

export const updateLineStop = async (req: Request, res: Response) => {
    const line = await lineService.updateLineStop(req.params.lineId, req.params.stopId, req.body);
    res.json(line);
};

export const deleteLineStop = async (req: Request, res: Response) => {
    const line = await lineService.deleteLineStop(req.params.lineId, req.params.stopId);
    res.json(line);
};
