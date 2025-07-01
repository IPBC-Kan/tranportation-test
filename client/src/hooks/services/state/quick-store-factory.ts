import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';

// localStorage in the browser (will probably need to make it more generic if we'll need to use rn or something)
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { QuickReduxAction } from './state.model';

export const createQuickStore = <
    TState extends {
        [key: string]: {
            initialValue: any;
            actions: any;
            reducer: any;
            persist?: boolean;
        };
    }
>(
    stateFactory: (dispatch: (action: QuickReduxAction) => void) => TState,
    history: History
) => {
    const configStore = configureStore<StateValues>;

    // const store: ReturnType<typeof configStore>;

    const dispatch = (action: QuickReduxAction) => {
        // This function is meant to monitor dispatches without the need to
        // follow the actions trail, just add a console.log or breakpoint
        store.dispatch(action as any);
    };

    const stateProviders = stateFactory(dispatch);

    type StateActions = {
        [T in keyof TState]: TState[T]['actions'];
    };

    type StateValues = {
        [T in keyof TState]: TState[T]['initialValue'];
    };

    const stateEntries = Object.entries(stateProviders);

    const actionsContainer = stateEntries.reduce((prev, [key, value]) => {
        (prev as any)[key] = value.actions;

        return prev;
    }, {} as StateActions);

    const stateReducers = stateEntries.reduce((prev, [key, value]) => {
        (prev as any)[key] = value.reducer;

        return prev;
    }, {} as { [key: string]: any });

    const stateInitialValues = stateEntries.reduce((prev, [key, value]) => {
        (prev as any)[key] = value.initialValue;

        return prev;
    }, {} as { [key: string]: any });

    const reducers = combineReducers({
        ...stateReducers,
        router: connectRouter(history),
    });

    const persistedReducers = stateEntries.filter((se) => se[1].persist).map((se) => se[0]);

    const persistedReducer = persistReducer(
        {
            key: 'root',
            storage,
            whitelist: persistedReducers,
        },
        reducers
    );

    const routerMiddlewareInstance = routerMiddleware(history);

    const store = configureStore<StateValues>({
        reducer: persistedReducer as any,
        preloadedState: stateInitialValues as any,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultmiddleware) =>
            getDefaultmiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                        'QREDUCER_ARRAY_PUSH_dialogs',
                        'QREDUCER_ARRAY_REMOVE_dialogs',
                        'QREDUCER_OBJECT_SET_quickMessageBox',
                        'QREDUCER_OBJECT_CLEAR_quickMessageBox',
                        'QREDUCER_OBJECT_PARTIAL-UPDATE_quickMessageBox',
                    ],
                    // TEMP SOLUTION: In order to avoid redux's error regarding saving
                    // unserialized data. We'll need to move all the unserialized data to a
                    // context
                    ignoredPaths: ['dialogs.0', 'dialogs.1', 'dialogs.2', 'dialogs.3', 'dialogs.4', 'quickMessageBox'],
                },
            }).concat([routerMiddlewareInstance]) as any,
    });

    const persistor = persistStore(store);

    return { store, actions: actionsContainer, persistor };
};
