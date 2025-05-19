import { useEffect } from 'react';
import { InteractionStatus } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useAuth } from 'hooks';
import { appNavigator } from 'router/appNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { getIsUserAuthenticated } from 'store/selectors';
import { getCurrentUser } from 'store/selectors/user.selector';
import { setAccessToken, setUser } from 'store/slices/authSlice';

export const LoginPage = () => {
	const { inProgress, instance } = useMsal();
	const { loginUser, getToken } = useAuth();
	const isAuthenticated = useSelector(getIsUserAuthenticated);
	const currentUser = useSelector(getCurrentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('onLoad: ', isAuthenticated);
		const onLoad = async () => {
			if (inProgress === InteractionStatus.None) {
				if (!currentUser || !instance.getActiveAccount())
					await loginUser().then((account: any) => {
						dispatch(setUser(account));
					});
				if (!isAuthenticated) {
					await getToken().then((token: any) => {
						dispatch(setAccessToken(token));
					});
				} else {
					appNavigator.navigate('/', null);
				}
			}
		};
		onLoad();
	}, [
		loginUser,
		getToken,
		currentUser,
		isAuthenticated,
		inProgress,
		dispatch,
		instance,
	]);
	// }, []);

	return (
		<div style={{ color: 'black', margin: 'auto' }}>
			<h1>מבצע התחברות...</h1>
		</div>
	);
};
