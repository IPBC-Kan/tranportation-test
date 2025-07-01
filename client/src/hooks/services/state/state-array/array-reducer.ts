import cloneDeep from 'lodash/cloneDeep';
import { QuickArrayActionKeys } from './state-array-factory';
import { QuickReducerArrayAction } from './state-array-model';

export const QuickReducerArr = <T>(reducerKeys: QuickArrayActionKeys) => {
    return (state: T[] = [], action: QuickReducerArrayAction<T> = { type: '' }): T[] => {
        switch (action?.type) {
            case reducerKeys.push:
                return [...state, action.payload.data];

            case reducerKeys.remove:
                return state.filter(item => item !== action.payload.data);

            case reducerKeys.removeWhere:
                return state.filter(item => !action.payload.condition(item));

            case reducerKeys.removeByIndex: {
                const nextState = [...state];
                nextState.splice(action.index, 1);
                return nextState;
            }

            case reducerKeys.set:
                return action.payload.data as any;

            case reducerKeys.setItem: {
                const { payload, index } = action;

                if (index == null) {
                    throw new Error(
                        `Cannot set an item in ReducerArray: index is not set`
                    );
                }

                if (index > state.length) {
                    throw new Error(
                        `Cannot set an item in ReducerArray: index (${index}) is out of range (current state length: ${state.length})`
                    );
                }

                const newState = [...state];

                newState[action.index] = payload.data;

                return newState;
            }

            case reducerKeys.updateWhere: {
                if (!action.payload.condition) {
                    throw new Error(
                        `Cannot set a value in ReducerArray: condition is required`
                    );
                }

                return cloneDeep(state).map(item =>
                    action.payload.condition(item) ? action.payload.data : item
                );
            }

            case reducerKeys.partialUpdateWhere: {
                if (!action.payload.condition) {
                    throw new Error(
                        `Cannot set a value in ReducerArray: condition is required`
                    );
                }

                return cloneDeep(state).map(item =>
                    action.payload.condition(item)
                        ? {
                              ...item,
                              ...action.payload.data
                          }
                        : item
                );
            }
            case reducerKeys.upsert: {
                if (!action.payload?.condition) {
                    throw new Error(
                        `Cannot set a value in ReducerArray: condition is required`
                    );
                }

                const clonedState = cloneDeep(state);
                const itemIndex = clonedState.findIndex(item =>
                    action.payload.condition(item)
                );

                if (itemIndex === -1) {
                    clonedState.push(action.payload.data);
                } else {
                    clonedState[itemIndex] = {
                        ...clonedState[itemIndex],
                        ...action.payload.data
                    };
                }

                return clonedState;
            }

            case reducerKeys.clear:
            default:
                return state;
        }
    };
};
