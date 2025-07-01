import { createKeys } from '../key-factory';
import { QuickReduxDispatch } from '../state.model';
import { QuickReducerObject } from './object-reducer';
import { createObjectActions } from './state-object-actions';
import { QuickStateObjectActionKeys } from './state-object-model';

const stateObjectActionKeys: QuickStateObjectActionKeys = {
    clear: 'QREDUCER_OBJECT_CLEAR',
    set: 'QREDUCER_OBJECT_SET',
    partialUpdate: 'QREDUCER_OBJECT_PARTIAL-UPDATE'
};

export const createObjectState = <T>(
    stateKey: string,
    dispatch: QuickReduxDispatch,
    options: { initialValue?: T; persist?: boolean } = {}
) => {
    const { initialValue = {} as T, persist = false } = options || {};

    const keys = createKeys<QuickStateObjectActionKeys>(
        stateKey,
        stateObjectActionKeys as any
    );

    return {
        reducer: QuickReducerObject<T>(keys, initialValue),
        actions: createObjectActions<T>(keys, dispatch),
        initialValue,
        persist
    };
};
