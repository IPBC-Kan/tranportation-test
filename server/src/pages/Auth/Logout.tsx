import { useAuth } from 'hooks';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsUserAuthenticated } from 'store/selectors';
import { getCurrentUser } from 'store/selectors/user.selector';

export const Logout = () => {
	const { instance, inProgress } = useMsal();
	const isAuthenticated = useSelector(getIsUserAuthenticated);
	const currentUser = useSelector(getCurrentUser);
	const { logoutUser } = useAuth();

	useEffect(() => {
		const onLoad = async () => {
			if (currentUser || isAuthenticated) await logoutUser();
		};
		onLoad();
		// eslint-disable-next-line
	}, [instance, inProgress, isAuthenticated]);

	return (
		<div style={{ color: 'black', margin: 'auto' }}>
			<h1>מבצע התנתקות...</h1>
		</div>
	);
};
