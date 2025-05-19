import { RoleEnum } from 'shared';

//Add the route string
export enum GeneralNavRoutes {
	Main = '',
	Login = 'auth/login',
	Logout = 'auth/logout',
}
export interface SideMenuRoute {
	authRoles: RoleEnum[];
	path: string;
	icon: JSX.Element;
	translationKey: string;
}

export interface IRoute {
	authRoles?: RoleEnum[];
	layout?: 'main' | 'auth';
	renderSource:
		| { moduleToLoad: string }
		| { componentToRender: () => JSX.Element };
}

interface AppRoute extends IRoute {
	sideMenuProps?: Omit<SideMenuRoute, 'authRoles' | 'path'>;
}

export type GeneralRoutes = {
	[key in GeneralNavRoutes]: AppRoute;
};

//set params for navigation
export interface AppNavParams {
	[GeneralNavRoutes.Login]: void;
	[GeneralNavRoutes.Logout]: void;
	[GeneralNavRoutes.Main]: void;
}
