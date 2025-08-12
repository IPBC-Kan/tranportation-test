import React, { useState } from 'react';
import './ManagementActionsBar.scss';

export const ManagementActionsBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const actions = [
        { key: 'export', label: 'ייצוא לאקסל' },
        { key: 'support', label: 'פנייה לתמיכה' },
        { key: 'broadcast', label: 'שליחת הודעה לכולם' },
        { key: 'addTrip', label: 'הוספת נסיעה' },
        { key: 'editSchedule', label: 'ערוך לוח זמנים' },
    ];

    const handleActionClick = (actionKey: string) => {
        console.log(`Action clicked: ${actionKey}`);
        // TODO: Implement action logic
        setIsMenuOpen(false);
    };

    return (
        <div className="management-actions-bar">
            {/* Desktop view - horizontal actions */}
            <div className="actions-desktop">
                {actions.map((action) => (
                    <button key={action.key} className="action-btn" onClick={() => handleActionClick(action.key)}>
                        {action.label}
                    </button>
                ))}
            </div>

            {/* Mobile view - dropdown menu */}
            <div className="actions-mobile">
                <button className="actions-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    אפשרויות
                    <span className={`menu-arrow ${isMenuOpen ? 'open' : ''}`}>▼</span>
                </button>
                {isMenuOpen && (
                    <div className="actions-dropdown">
                        {actions.map((action) => (
                            <button key={action.key} className="action-btn-mobile" onClick={() => handleActionClick(action.key)}>
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
