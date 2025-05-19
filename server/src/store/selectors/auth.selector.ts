import { createSelector } from 'reselect';
import { RootState } from '../store';

export const getToken = (state: RootState) => state.auth.token;

export const getIsUserAuthenticated = createSelector([getToken], (token) =>
	Boolean(token)
);
