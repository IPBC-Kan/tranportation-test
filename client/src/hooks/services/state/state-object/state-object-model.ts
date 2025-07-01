import { QuickReduxAction } from '../state.model';

export interface QuickStateObjectActionKeys {
    clear: string;
    set: string;
    partialUpdate: string;
}

export type QuickStateObjectAction<T> = QuickReduxAction<string, T>;
