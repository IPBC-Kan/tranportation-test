import { QuickReduxDispatch } from '../state.model';
import {
    QuickStateValueAction,
    QuickStateValueActions,
    QuickStateValueActionKeys
} from './state-value-model';

export const createValueActions = <T>(
    actions: QuickStateValueActionKeys,
    dispatch: QuickReduxDispatch
): QuickStateValueActions<T> => {
    const set = (item: T) => {
        const action: QuickStateValueAction<T> = {
            type: actions.set,
            payload: item
        };

        dispatch(action);
    };

    const clear = () => {
        const action: QuickStateValueAction<T> = {
            type: actions.clear
        };

        dispatch(action);
    };

    return {
        set,
        clear
    };
};
