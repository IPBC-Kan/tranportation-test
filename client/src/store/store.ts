import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { appApiProvider } from 'api/axiosApiProvider';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'persist/PERSIST',
					'persist/REHYDRATE',
					'persist/PAUSE',
					'persist/PURGE',
					'persist/FLUSH',
					'persist/REGISTER',
				],
			},
		}),
});

const persistor = persistStore(store);

persistor.subscribe(() => {
	const { auth } = store.getState();

	appApiProvider.updateJwtToken(auth.token);
});

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
