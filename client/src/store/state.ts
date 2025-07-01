import { createArrayState, createObjectState, createValueState, QuickReduxDispatch } from 'hooks/services/state';
import { User } from 'shared';
import { ILine, ITrip } from 'shared/interfaces';

export interface AuthState {
    token: string;
    user: User;
}

export interface RootState {
    auth: AuthState;
    isApplicationManagementMode: boolean;
    lines: ILine[];
    trips: ITrip[];
    registeredTrips: ITrip[];
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
    isApplicationManagementMode: false, // Default mode
    // Add initial states for other slices
};

export const createStates = (dispatch: QuickReduxDispatch) => {
    return {
        user: createObjectState<User>('user', dispatch, {
            persist: true,
        }),
        accessToken: createValueState<string>('accessToken', dispatch, {
            persist: false,
        }),
        isApplicationManagementMode: createValueState<boolean>('isApplicationManagementMode', dispatch, { persist: true }),

        lines: createArrayState<ILine>('lines', dispatch, {
            initialValue: [],
        }),
        trips: createArrayState<ITrip>('trips', dispatch, {
            initialValue: [],
        }),
        registeredTrips: createArrayState<ITrip>('registeredTrips', dispatch, {
            initialValue: [],
        }),
    };
};
