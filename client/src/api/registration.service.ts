// import { GeneralError } from './dto/generalError';
import { appApiProvider } from './axiosApiProvider';
import { QuickApiServiceBase, QuickConsoleLogger } from 'hooks/services';
import { ITrip, IRegistration } from 'shared/interfaces';

class RegistrationService extends QuickApiServiceBase {
    constructor() {
        super(new QuickConsoleLogger('RegistrationService'), appApiProvider, 'registration', 'Registration');
    }

    // Register a user to a trip
    public async registerToTrip(tripId: string, data: IRegistration): Promise<ITrip> {
        return this.postOrThrow(data, { url: `/tripId/${tripId}` });
    }

    // Cancel a registration by registrationId
    public async cancelRegistration(tripId: string, registrationId: string, isLateCancellation?: boolean): Promise<ITrip> {
        return this.putOrThrow(
            { isLateCancellation },
            {
                url: `/tripId/${tripId}/registrationId/${registrationId}/cancel`,
            }
        );
    }

    // Redo (restore) a cancelled registration by registrationId
    public async redoRegistration(tripId: string, registrationId: string): Promise<ITrip> {
        return this.putOrThrow(
            {},
            {
                url: `/tripId/${tripId}/registrationId/${registrationId}/reregister`,
            }
        );
    }

    async updateRegistration(tripId: string, registrationId: string, data: { boardingStop: string; dropoffStop: string }) {
        return this.putOrThrow(data, {
            url: `/tripId/${tripId}/registrationId/${registrationId}`,
        });
    }
}

export const registrationService = new RegistrationService();
