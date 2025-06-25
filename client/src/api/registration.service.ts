// import { GeneralError } from './dto/generalError';
import { appApiProvider } from './axiosApiProvider';
import { QuickApiServiceBase, QuickConsoleLogger } from 'hooks/services';
import { ITrip, IRegistration } from 'shared/interfaces';

class RegistrationService extends QuickApiServiceBase {
    constructor() {
        super(new QuickConsoleLogger('RegistrationService'), appApiProvider, 'registration', 'Registration');
    }

    // Register a user to a trip
    public async registerToTrip(tripId: string, data: Partial<IRegistration>): Promise<ITrip> {
        return this.postOrThrow({ url: `/tripId/${tripId}`, data });
    }

    // Cancel a registration by registrationId
    public async cancelRegistration(tripId: string, registrationId: string, isLateCancellation?: boolean): Promise<ITrip> {
        return this.postOrThrow({
            url: `/tripId/${tripId}/registrationId/${registrationId}/cancel`,
            data: { isLateCancellation },
        });
    }

    // Redo (restore) a cancelled registration by registrationId
    public async redoRegistration(tripId: string, registrationId: string): Promise<ITrip> {
        return this.postOrThrow({
            url: `/tripId/${tripId}/registrationId/${registrationId}/reregister`,
        });
    }
}

export const registrationService = new RegistrationService();
