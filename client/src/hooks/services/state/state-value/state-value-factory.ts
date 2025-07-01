import { createKeys } from '../key-factory';
import { QuickReduxDispatch } from '../state.model';
import { createValueActions } from './state-value-actions';
import { QuickStateValueActionKeys } from './state-value-model';
import { QuickReducerValue } from './value-reducer';

const stateObjectActionKeys: QuickStateValueActionKeys = {
    clear: 'QREDUCER_VALUE_CLEAR',
    set: 'QREDUCER_VALUE_SET'
};

export const createValueState = <T>(
    stateKey: string,
    dispatch: QuickReduxDispatch,
    options: { initialValue?: T; persist?: boolean } = {}
) => {
    const { initialValue, persist = false } = options;

    const keys = createKeys<QuickStateValueActionKeys>(
        stateKey,
        stateObjectActionKeys as any
    );

    return {
        reducer: QuickReducerValue<T>(keys, initialValue),
        actions: createValueActions<T>(keys, dispatch),
        initialValue,
        persist
    };
};
