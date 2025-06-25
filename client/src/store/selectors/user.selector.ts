import { createSelector } from 'reselect';
import { RootState } from '../store';

export const getCurrentUser = (state: RootState) => state.auth.user;

// export const getIsAdmin = createSelector([getCurrentUser], (user) => user.role);
