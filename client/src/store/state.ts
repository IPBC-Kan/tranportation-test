import { User } from 'shared';

export interface AuthState {
	token: string;
	user: User;
}

export interface RootState {
	auth: AuthState;
	// Add other state slices here
}

export const initialAuthState: AuthState = {
	token: null,
	user: null,
};

// Define the initial state of your application
export const initialState: RootState = {
	auth: initialAuthState,
	// Add initial states for other slices
};
