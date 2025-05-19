import { historyInstance } from './history';

export const appNavigator = {
	navigate(pageName: any, params?: any) {
		historyInstance.push(pageName, params);
		window.location.reload();
	},
	goBack() {
		historyInstance.back();
	},

	replace(pageName: any, params?: any) {
		historyInstance.replace(pageName, params);
	},
};
