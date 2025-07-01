import { QuickStateObjectAction, QuickStateObjectActionKeys } from './state-object-model';
import { clone } from 'lodash';

export const QuickReducerObject = <T>(
    reducerKeys: QuickStateObjectActionKeys,
    initialValue: T
) => {
    return (
        state: T = clone(initialValue),
        action: QuickStateObjectAction<T> = { type: '' }
    ): T => {
        switch (action?.type) {
            case reducerKeys.clear:
                return clone(initialValue);

            case reducerKeys.set:
                return action.payload;

            case reducerKeys.partialUpdate:
                return { ...state, ...action.payload };

            default:
                return state;
        }
    };
};
