import { createKeys } from '../key-factory';
import { QuickReduxDispatch } from '../state.model';
import { QuickReducerArr } from './array-reducer';
import { createArrayActions } from './state-array-actions';

export const stateArrayKeys = {
    set: 'QREDUCER_ARRAY_SET',
    clear: 'QREDUCER_ARRAY_CLEAR',
    push: 'QREDUCER_ARRAY_PUSH',
    remove: 'QREDUCER_ARRAY_REMOVE',
    setItem: 'QREDUCER_ARRAY_SETITEM',
    removeByIndex: 'QREDUCER_ARRAY_REMOVE_BY_INDEX',
    removeWhere: 'QREDUCER_ARRAY_REMOVE_WHERE',
    updateWhere: 'QREDUCER_ARRAY_UPDATE_WHERE',
    partialUpdateWhere: 'QREDUCER_ARRAY_PARTIAL_UPDATE_WHERE',
    upsert: 'QREDUCER_ARRAY_UPSERT_BY_CONDITION'
};

export type QuickArrayActionKeys = typeof stateArrayKeys;

export const createArrayState = <T>(
    stateKey: string,
    dispatch: QuickReduxDispatch,
    options: { initialValue?: T[]; persist?: boolean } = {}
) => {
    const { initialValue = [], persist = false } = options;

    const keys = createKeys<typeof stateArrayKeys>(stateKey, stateArrayKeys);

    return {
        reducer: QuickReducerArr<T>(keys),
        actions: createArrayActions<T>(keys, dispatch),
        initialValue,
        persist
    };
};
