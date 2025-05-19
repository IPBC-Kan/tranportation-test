import { RoleEnum } from 'shared/enums';

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
	phone?: string;
	role?: RoleEnum;
	companyId?: number;
	img?: string;
	title?: string;
}
