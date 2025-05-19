import { LoginPage } from 'pages/Auth';
import { Logout } from 'pages/Auth/Logout';
import MainPage from 'pages/Main/Main';
import { GeneralNavRoutes, GeneralRoutes, IRoute } from 'shared';

//Add to routes pages
const routes: GeneralRoutes = {
	[GeneralNavRoutes.Login]: {
		layout: 'auth',
		renderSource: { componentToRender: LoginPage },
	},
	[GeneralNavRoutes.Logout]: {
		layout: 'auth',
		renderSource: { componentToRender: Logout },
	},
	[GeneralNavRoutes.Main]: {
		//        authRoles: [RoleEnum.Admin],
		renderSource: { componentToRender: MainPage },
	},
};

export const applicationRoutes = Object.entries(routes).reduce(
	(prev, [route, info]) => {
		const appRoute: IRoute = {
			authRoles: info.authRoles,
			layout: info.layout,
			renderSource: info.renderSource,
		};
		if (info.layout === 'auth') {
			prev.auth[route] = appRoute;
		} else {
			prev.main[route] = appRoute;
		}

		return prev;
	},
	{ auth: {}, main: {} } as {
		auth: { [key: string]: IRoute };
		main: { [key: string]: IRoute };
	}
);
