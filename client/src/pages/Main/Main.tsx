import { useSelector } from 'react-redux';
import { getCurrentUser } from 'store/selectors/user.selector';
import { ComponentGuard } from 'Auth/ComponentGuard';
import { groups } from 'Auth/authConfig';
import { Header } from 'components/Header/Header';
import { NavBar } from 'components/Navbar/Navbar';
import './Main.scss'; // Assuming you have a MainPage.scss for styles

const MainPage = () => {
    const currentUser = useSelector(getCurrentUser);
    return (
        <div>
            {currentUser ? (
                <ComponentGuard requriedGroups={[groups.groupAdmin]}>
                    <div className="main-layout">
                        <Header userName={currentUser?.name || ''} />
                        {/* <div className="main-wrapper" style={{ height: '100%', width: '100%' }}> */}
                        <div className="main-wrapper">
                            <div className="main-content"></div>
                            <NavBar />
                        </div>
                    </div>
                </ComponentGuard>
            ) : (
                <div>Not Admin</div>
            )}
        </div>
    );
};

export default MainPage;
