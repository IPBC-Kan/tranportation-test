import React, { useEffect, useState } from 'react';
import './Navbar.scss';

const navItems = [
    { key: 'register', label: 'הרשמה לנסיעה' },
    { key: 'myTrips', label: 'הנסיעות שלי' },
    { key: 'info', label: 'מידע על נסיעה' },
    { key: 'help', label: 'עזרה' },
    { key: 'messages', label: 'הודעות' },
];

export const NavBar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 600px)').matches);

    useEffect(() => {
        const handler = () => setIsMobile(window.matchMedia('(max-width: 600px)').matches);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    const items = isMobile ? navItems : navItems.slice(0, 4);

    return (
        <nav className={isMobile ? 'navBarMobile' : 'navBarSide'}>
            {items.map((item) => (
                <div className="navItem" key={item.key}>
                    <div className="circle"></div>
                    <div className="label">{item.label}</div>
                </div>
            ))}
        </nav>
    );
};
