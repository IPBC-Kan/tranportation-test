import { QuickReduxDispatch } from '../state.model';
import { QuickArrayActionKeys } from './state-array-factory';
import { QuickReducerArrayAction, QuickStateArrayActions } from './state-array-model';

export const createArrayActions = <T>(
    actions: QuickArrayActionKeys,
    dispatch: QuickReduxDispatch
): QuickStateArrayActions<T> => {
    const push = (item: T) => {
        const action: QuickReducerArrayAction<T> = {
            type: actions.push,
            payload: { data: item }
        };

        dispatch(action);
    };

    const clear = () => {
        const action: QuickReducerArrayAction<T> = {
            type: actions.clear
        };

        dispatch(action);
    };

    const set = (items: T[]) => {
        const action: QuickReducerArrayAction<T[]> = {
            type: actions.set,
            payload: { data: items }
        };

        dispatch(action);
    };

    const setItem = (item: T, index: number) => {
        const action: QuickReducerArrayAction<T> = {
            type: actions.setItem,
            index,
            payload: { data: item }
        };

        dispatch(action);
    };

    const removeByIndex = (index: number) => {
        const action: QuickReducerArrayAction<T> = {
            type: actions.removeByIndex,
            index,
            payload: null
        };

        dispatch(action);
    };

    const remove = (item: T) => {
        const action: QuickReducerArrayAction<T> = {
            type: actions.remove,
            payload: { data: item }
        };

        dispatch(action);
    };

    const updateWhere = (item: T, condition: (item: T) => boolean) => {
        const action: QuickReducerArrayAction<T> = {
            type: actions.updateWhere,
            payload: {
                data: item,
                condition
            }
        };

        dispatch(action);
    };

    const removeWhere = (condition: (item: T) => boolean) => {
        const action: QuickReducerArrayAction<T> = {
            type: actions.removeWhere,
            payload: {
                data: undefined,
                condition
            }
        };

        dispatch(action);
    };

    const partialUpdateWhere = (item: any, condition: (item: T) => boolean) => {
        const action: QuickReducerArrayAction<T> = {
            type: actions.partialUpdateWhere,
            payload: {
                data: item,
                condition
            }
        };

        dispatch(action);
    };

    const upsert = (item: any, condition: (item: T) => boolean) => {
        const action: QuickReducerArrayAction<T> = {
            type: actions.upsert,
            payload: {
                data: item,
                condition
            }
        };

        dispatch(action);
    };

    return {
        push,
        clear,
        set,
        remove,
        setItem,
        removeWhere,
        removeByIndex,
        updateWhere,
        partialUpdateWhere,
        upsert
    };
};
