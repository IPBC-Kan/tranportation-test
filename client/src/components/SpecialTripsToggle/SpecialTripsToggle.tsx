import React from 'react';
import './SpecialTripsToggle.scss';

interface Props {
    showSpecialTrips: boolean;
    onToggle: (show: boolean) => void;
}

const SpecialTripsToggle: React.FC<Props> = ({ showSpecialTrips, onToggle }) => {
    return (
        <div className="special-trips-toggle">
            <label className="toggle-container">
                <span className="toggle-label">הצג נסיעות מיוחדות</span>
                <input
                    type="checkbox"
                    checked={showSpecialTrips}
                    onChange={(e) => onToggle(e.target.checked)}
                    className="toggle-checkbox"
                />
                <span className="toggle-slider"></span>
            </label>
        </div>
    );
};

export default SpecialTripsToggle;
