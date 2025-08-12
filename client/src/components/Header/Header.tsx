import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { useSelector } from 'react-redux';
import { selectIsAppOnManagementMode } from 'store/selectors/appMode.selector';
import { actions } from 'store/store';

interface HeaderProps {
    userName: string;
}

export const Header: React.FC<HeaderProps> = ({ userName }) => {
    const navigate = useNavigate();
    const isManagementMode = useSelector(selectIsAppOnManagementMode);

    const handleManagementClick = () => {
        if (isManagementMode) {
            navigate('/registration');
            actions.isApplicationManagementMode.set(false);
            // navigate('/management');
        } else {
            navigate('/management');
            actions.isApplicationManagementMode.set(true);
            // navigate('/registration');
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <img src="/application-logo.png" alt="logo" className="logoImg" />
            </div>
            <div className="header-actions">
                <button className="management-btn" onClick={handleManagementClick}>
                    {isManagementMode ? 'ממשק משתמש ->' : 'ממשק ניהול ->'}
                </button>

                <div className="userInfo">
                    <span className="userName">{userName}</span>
                    <div className="userIcon">
                        <span role="img" aria-label="user">
                            👤
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};
