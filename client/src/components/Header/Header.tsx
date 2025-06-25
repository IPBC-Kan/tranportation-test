import React from 'react';
import './Header.scss';

interface HeaderProps {
    userName: string;
}

export const Header: React.FC<HeaderProps> = ({ userName }) => (
    <header className="header">
        <div className="userInfo">
            <div className="userIcon">
                <span role="img" aria-label="user">
                    👤
                </span>
            </div>
            <span className="userName">{userName}</span>
        </div>
        <div className="logo">
            <img src="/application-logo.png" alt="logo" className="logoImg" />
        </div>
    </header>
);
