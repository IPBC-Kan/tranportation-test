import { ILine } from 'shared/interfaces';
import { RootState } from 'store/state';

export const selectAllLines = (state: RootState): ILine[] => state.lines;
