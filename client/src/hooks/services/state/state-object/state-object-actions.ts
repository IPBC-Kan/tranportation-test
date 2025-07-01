import { QuickReduxDispatch } from '../state.model';
import { QuickStateObjectAction, QuickStateObjectActionKeys } from './state-object-model';

export interface QuickStateObjectActions<T = any> {
    set: (item: T) => void;

    clear: () => void;

    partialUpdate: (item: Partial<T>) => void;
}

export const createObjectActions = <T>(
    actions: QuickStateObjectActionKeys,
    dispatch: QuickReduxDispatch
): QuickStateObjectActions<T> => {
    const set = (item: T) => {
        const action: QuickStateObjectAction<T> = {
            type: actions.set,
            payload: item
        };

        dispatch(action);
    };

    const clear = () => {
        const action: QuickStateObjectAction<T> = {
            type: actions.clear
        };

        dispatch(action);
    };

    const partialUpdate = (item: Partial<T>) => {
        const action: QuickStateObjectAction<Partial<T>> = {
            type: actions.partialUpdate,
            payload: item
        };

        dispatch(action);
    };

    return {
        set,
        clear,
        partialUpdate
    };
};
