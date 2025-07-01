import React from 'react';
import './ExitManagementButton.scss';
import { actions } from 'store/store';

export const ExitManagementButton: React.FC = () => (
    <button
        className="exit-management-btn"
        onClick={() => actions.isApplicationManagementMode.set(false)}
    >
        צא ממצב ניהול
    </button>
);