import React, { useEffect, useState } from 'react';
import './Navbar.scss';

const navItems = [
    { key: 'register', label: 'הרשמה לנסיעה', focusedImg: '/register-to-trip.png', img: '/register-to-trip-press.png' },
    { key: 'myTrips', label: 'הנסיעות שלי', focusedImg: '/my-trips.png', img: '/my-trips-press.png' },
    { key: 'info', label: 'מידע על נסיעה', focusedImg: '/trips-info.png', img: '/trips-info-press.png' },
    { key: 'help', label: 'עזרה', focusedImg: '/contact-us.png', img: '/contact-us-press.png' },
    { key: 'messages', label: 'הודעות', focusedImg: '/messages.png', img: '/messages-press.png' },
];

export const NavBar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 600px)').matches);
    const [hovered, setHovered] = useState<string | null>(null);

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
                    <div
                        className={`circle${hovered === item.key ? ' hovered' : ''}`}
                        onMouseEnter={() => setHovered(item.key)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img src={hovered === item.key ? item.focusedImg : item.img} alt={item.label} className="circleImg" />
                    </div>
                    <div className="label">{item.label}</div>
                </div>
            ))}
        </nav>
    );
};
