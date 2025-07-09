import { appApiProvider } from './axiosApiProvider';
import { QuickApiServiceBase, QuickConsoleLogger } from 'hooks/services';
import { ITrip } from 'shared/interfaces';

class TripService extends QuickApiServiceBase {
    constructor() {
        super(new QuickConsoleLogger('TripService'), appApiProvider, 'trip', 'Trip');
    }

    // TRIP CRUD
    public async getAllTrips(): Promise<ITrip[]> {
        return this.getOrThrow({ url: '/' });
    }
    public async getTripById(tripId: string): Promise<ITrip> {
        return this.getOrThrow({ url: `/${tripId}` });
    }
    public async getTripsByDayOfWeek(weekday: string): Promise<ITrip[]> {
        return this.getOrThrow({ url: `/weekday/${weekday}` });
    }
    public async getTodayTrips(): Promise<ITrip[]> {
        return this.getOrThrow({ url: '/today' });
    }
    public async getTripsBetweenDates(start: string, end: string): Promise<ITrip[]> {
        return this.getOrThrow({ url: `/between?start=${start}&end=${end}` });
    }
    public async createTrip(data: Partial<ITrip>): Promise<ITrip> {
        return this.postOrThrow({ url: '/', data });
    }
    public async updateTrip(tripId: string, data: Partial<ITrip>): Promise<ITrip> {
        return this.putOrThrow({ url: `/${tripId}`, data });
    }
    public async deleteTrip(tripId: string): Promise<void> {
        return this.deleteOrThrow({ url: `/${tripId}` });
    }
    public async enableTrip(tripId: string): Promise<ITrip> {
        return this.postOrThrow({ url: `/${tripId}/enable` });
    }
    public async disableTrip(tripId: string): Promise<ITrip> {
        return this.postOrThrow({ url: `/${tripId}/disable` });
    }

    // TRIP STOP CRUD
    public async getAllTripStops(tripId: string) {
        return this.getOrThrow({ url: `/${tripId}/stops` });
    }
    public async createTripStop(tripId: string, data: any) {
        return this.postOrThrow({ url: `/${tripId}/stops`, data });
    }
    public async updateTripStop(tripId: string, stopId: string, data: any) {
        return this.putOrThrow({ url: `/${tripId}/stops/${stopId}`, data });
    }
    public async deleteTripStop(tripId: string, stopId: string) {
        return this.deleteOrThrow({ url: `/${tripId}/stops/${stopId}` });
    }

    // TRIP CHAT MESSAGE
    public async getAllTripChatMessages(tripId: string) {
        return this.getOrThrow({ url: `/${tripId}/chatMessages` });
    }
    public async createTripChatMessage(tripId: string, data: any): Promise<ITrip> {
        return this.postOrThrow(data, { url: `/${tripId}/chatMessages` });
    }
}

export const tripService = new TripService();
