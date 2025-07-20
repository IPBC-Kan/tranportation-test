import { appApiProvider } from './axiosApiProvider';
import { QuickApiServiceBase, QuickConsoleLogger } from 'hooks/services';
import { ILine, ILineSchedule, ILineStop } from 'shared/interfaces';

class LineService extends QuickApiServiceBase {
    constructor() {
        super(new QuickConsoleLogger('LineService'), appApiProvider, 'line', 'Line');
    }

    // LINE CRUD
    public async getAllLines(): Promise<ILine[]> {
        return this.getOrThrow({ url: '/' });
    }
    public async createLine(data: Partial<ILine>): Promise<ILine> {
        return this.postOrThrow({ url: '/', data });
    }
    public async updateLine(lineId: string, data: Partial<ILine>): Promise<ILine> {
        return this.putOrThrow({ url: `/${lineId}`, data });
    }
    public async deleteLine(lineId: string): Promise<void> {
        return this.deleteOrThrow({ url: `/${lineId}` });
    }
    public async enableLine(lineId: string): Promise<ILine> {
        return this.postOrThrow({ url: `/${lineId}/enable` });
    }
    public async disableLine(lineId: string): Promise<ILine> {
        return this.postOrThrow({ url: `/${lineId}/disable` });
    }

    // LINE SCHEDULE CRUD
    public async getAllLineSchedules(lineId: string): Promise<ILineSchedule[]> {
        return this.getOrThrow({ url: `/${lineId}/schedules` });
    }
    public async createLineSchedule(lineId: string, data: Partial<ILineSchedule>): Promise<ILineSchedule> {
        return this.postOrThrow({ url: `/${lineId}/schedules`, data });
    }
    public async updateLineSchedule(lineId: string, scheduleId: string, data: Partial<ILineSchedule>): Promise<ILineSchedule> {
        return this.putOrThrow({ url: `/${lineId}/schedules/${scheduleId}`, data });
    }
    public async deleteLineSchedule(lineId: string, scheduleId: string): Promise<void> {
        return this.deleteOrThrow({ url: `/${lineId}/schedules/${scheduleId}` });
    }
    public async enableLineSchedule(lineId: string, scheduleId: string): Promise<ILineSchedule> {
        return this.postOrThrow({ url: `/${lineId}/schedules/${scheduleId}/enable` });
    }
    public async disableLineSchedule(lineId: string, scheduleId: string): Promise<ILineSchedule> {
        return this.postOrThrow({ url: `/${lineId}/schedules/${scheduleId}/disable` });
    }

    // LINE STOP CRUD
    public async getAllLineStops(lineId: string): Promise<ILineStop[]> {
        return this.getOrThrow({ url: `/${lineId}/stops` });
    }
    public async createLineStop(lineId: string, data: Partial<ILineStop>): Promise<ILineStop> {
        return this.postOrThrow({ url: `/${lineId}/stops`, data });
    }
    public async updateLineStop(lineId: string, stopId: string, data: Partial<ILineStop>): Promise<ILineStop> {
        return this.putOrThrow({ url: `/${lineId}/stops/${stopId}`, data });
    }
    public async deleteLineStop(lineId: string, stopId: string): Promise<void> {
        return this.deleteOrThrow({ url: `/${lineId}/stops/${stopId}` });
    }

    // Get all schedules from all lines
    public async getAllSchedules(): Promise<Array<ILineSchedule & { lineName: string; lineDirection: string }>> {
        return this.getOrThrow({ url: '/schedules' });
    }
}

export const lineService = new LineService();
