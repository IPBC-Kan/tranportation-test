import { QuickStateValueAction, QuickStateValueActionKeys } from './state-value-model';

export const QuickReducerValue = <T>(
    reducerKeys: QuickStateValueActionKeys,
    initialValue: T = null
) => {
    return (state: T = null, action: QuickStateValueAction<T> = { type: '' }): T => {
        switch (action?.type) {
            case reducerKeys.clear:
                return initialValue;

            case reducerKeys.set:
                // Redux throws an exception when pushing undefined
                // so instead of undefined, setting null
                if (action.payload === undefined) {
                    return null;
                }
                return action.payload;

            default:
                return state;
        }
    };
};
