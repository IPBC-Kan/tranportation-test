import { ITrip } from 'shared/interfaces';
import { RootState } from 'store/state';

export const selectAllTrips = (state: RootState): ITrip[] => state.trips;

export const selectRegisteredTrips = (state: RootState): ITrip[] => state.registeredTrips;
