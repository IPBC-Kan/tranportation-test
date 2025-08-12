import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { actions } from 'store/store';

const navItems = [
    {
        key: 'register',
        label: 'הרשמה לנסיעה',
        route: '/registration',
        focusedImg: '/register-to-trip.png',
        img: '/register-to-trip-press.png',
    },
    { key: 'myTrips', label: 'הנסיעות שלי', route: '/my-trips', focusedImg: '/my-trips.png', img: '/my-trips-press.png' },
    { key: 'info', label: 'מידע על נסיעה', route: '/info', focusedImg: '/trips-info.png', img: '/trips-info-press.png' },
    { key: 'help', label: 'עזרה', route: '/help', focusedImg: '/contact-us.png', img: '/contact-us-press.png' },
    { key: 'messages', label: 'הודעות', route: '/messages', focusedImg: '/messages.png', img: '/messages-press.png' },
];

export const NavBar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 600px)').matches);
    const [hovered, setHovered] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // קובע את הכפתור הפעיל לפי ה-URL
    const [activeKey, setActiveKey] = useState<string>(() => {
        const found = navItems.find((item) => location.pathname.startsWith(item.route));
        return found ? found.key : navItems[0].key;
    });

    useEffect(() => {
        const found = navItems.find((item) => location.pathname.startsWith(item.route));
        setActiveKey(found ? found.key : navItems[0].key);
    }, [location.pathname]);

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
                        className={`circle${hovered === item.key ? ' hovered' : ''}${activeKey === item.key ? ' active' : ''}`}
                        onMouseEnter={() => setHovered(item.key)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                            setActiveKey(item.key);
                            navigate(item.route);
                        }}
                    >
                        <img
                            src={hovered === item.key || activeKey === item.key ? item.focusedImg : item.img}
                            alt={item.label}
                            className="circleImg"
                        />
                    </div>
                    <div className={`label${activeKey === item.key ? ' active' : ''}`}>{item.label}</div>
                </div>
            ))}
            {/* <div className="navItem" key="management">
                <div
                    className={`management-circle${hovered === 'management' ? ' hovered' : ''}`}
                    onMouseEnter={() => setHovered('management')}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => {
                        actions.isApplicationManagementMode.set(true);
                    }}
                >
                    <img
                        src={hovered === 'management' ? '/management-white.png' : '/management-green.png'}
                        alt="ניהול"
                        className="circleImg"
                    />
                </div>
                <div className="label">ניהול</div>
            </div> */}
        </nav>
    );
};
