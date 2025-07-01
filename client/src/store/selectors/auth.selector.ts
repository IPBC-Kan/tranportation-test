// import { createSelector } from 'reselect';
// import { RootState } from 'store/state';

// export const getToken = (state: RootState) => state.auth.token;

// export const getIsUserAuthenticated = createSelector([getToken], (token) => Boolean(token));

import { createSelector } from 'reselect';
import { AppState } from '../store';

export const getToken = (state: AppState) => state.accessToken;

export const getIsUserAuthenticated = createSelector([getToken], (token) => Boolean(token));
