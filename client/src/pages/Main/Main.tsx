import { useSelector } from 'react-redux';
import { getCurrentUser } from 'store/selectors/user.selector';
import { ComponentGuard } from 'Auth/ComponentGuard';
import { groups } from 'Auth/authConfig';

const MainPage = () => {
	const currentUser = useSelector(getCurrentUser);
	return (
		<div>
			{currentUser ? (
				<ComponentGuard requriedGroups={[groups.groupAdmin]}>
					<div>Main</div>
				</ComponentGuard>
			) : (
				<div>Not Admin</div>
			)}
		</div>
	);
};

export default MainPage;
