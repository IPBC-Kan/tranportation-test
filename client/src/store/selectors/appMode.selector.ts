import { RootState } from 'store/state';

export const selectIsAppOnManagementMode = (state: RootState): Boolean => state.isApplicationManagementMode;
