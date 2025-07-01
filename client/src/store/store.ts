import { appApiProvider } from 'api/axiosApiProvider';
import { historyInstance } from '../router/history';
import { createStates } from './state';
import { createQuickStore } from 'hooks/services/state/quick-store-factory';

export const { actions, store, persistor } = createQuickStore(createStates, historyInstance);

persistor.subscribe(() => {
    const { accessToken } = store.getState();

    appApiProvider.updateJwtToken(accessToken);
});

export type AppState = ReturnType<typeof store.getState>;
