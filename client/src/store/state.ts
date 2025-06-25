import { User } from 'shared';
import { ILine, ITrip } from 'shared/interfaces';

export interface AuthState {
    token: string;
    user: User;
}

export interface RootState {
    auth: AuthState;
    lines: ILine[]; // Assuming ILine is defined in your interfaces
    trips: ITrip[]; // Assuming ITrip is defined in your interfaces
    registeredTrips: ITrip[]; // Assuming ITrip is defined in your interfaces
    // Add other state slices here
}

export const initialAuthState: AuthState = {
    token: null,
    user: null,
};

// Define the initial state of your application
export const initialState: RootState = {
    auth: initialAuthState,
    lines: [], // Add initial state for lines
    trips: [], // Add initial state for trips
    registeredTrips: [], // Add initial state for registered trips
    // Add initial states for other slices
};
