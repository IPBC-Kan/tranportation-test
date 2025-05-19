import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'shared/models';
import { initialAuthState } from 'store/state';

const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		deleteToken: (state) => {
			state.token = null;
		},
	},
});

export const { setAccessToken, deleteToken, setUser } = authSlice.actions;
export default authSlice.reducer;
