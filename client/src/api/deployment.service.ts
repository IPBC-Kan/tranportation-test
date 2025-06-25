// import { GeneralError } from './dto/generalError';
import { appApiProvider } from './axiosApiProvider';
import { QuickApiServiceBase, QuickConsoleLogger } from 'hooks/services';
import { ITrip } from 'shared/interfaces';

class DeploymentService extends QuickApiServiceBase {
    constructor() {
        super(new QuickConsoleLogger('DeploymentService'), appApiProvider, 'deployment', 'Deployment');
    }

    // Deploy trips by schedule ID
    public async deployByScheduleId(scheduleId: string): Promise<{ tripsCreated: boolean; newTrips: ITrip[] }> {
        return this.postOrThrow({ url: `/schedule/${scheduleId}` });
    }

    // Deploy trips by date (expects date as YYYY-MM-DD or ISO string)
    public async deployByDate(date: string): Promise<{ tripsCreated: boolean; newTrips: ITrip[] }> {
        return this.postOrThrow({ url: `/by-date?date=${encodeURIComponent(date)}` });
    }
}

export const deploymentService = new DeploymentService();
