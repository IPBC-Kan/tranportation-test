// import { GeneralError, AppErrorCode } from './dto/generalError';
import { GeneralError } from './dto/generalError';
import { appApiProvider } from './axiosApiProvider';
import { QuickApiServiceBase, QuickConsoleLogger } from 'hooks/services';
import { User } from 'shared/models';

class AuthenticationService extends QuickApiServiceBase {
    constructor() {
        super(new QuickConsoleLogger('AuthenticationService'), appApiProvider, 'auth', 'Authentication');
    }

    public async login(): Promise<{
        errorTranslationKey?: string;
        user?: User;
    }> {
        try {
            const { data } = await this.get<User | GeneralError>({ url: '/login' });
            console.log('---data', data);

            return { user: data as User };
        } catch (err) {
            console.log(err);
        }
    }
}

export const authService = new AuthenticationService();
