import { createSelector } from 'reselect';
import { AppState } from '../store';
import { isEmptyObj } from 'shared/utils/generalUtils';

export const getUser = (state: AppState) => state.user;

export const getCurrentUser = createSelector(getUser, (user) => (isEmptyObj(user) ? null : user));
