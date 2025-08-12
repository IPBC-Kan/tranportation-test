import React from 'react';
import './TimePeriodFilter.scss';

interface Props {
    selectedPeriod: string | null;
    onPeriodChange: (period: string | null) => void;
}

const TimePeriodFilter: React.FC<Props> = ({ selectedPeriod, onPeriodChange }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onPeriodChange(value === '' ? null : value);
    };

    return (
        <div className="time-period-filter">
            <label htmlFor="period-select" className="filter-bar-label">
                תקופה:
            </label>
            <select
                id="period-select"
                value={selectedPeriod || 'upcoming'}
                onChange={handleSelectChange}
                className="period-dropdown"
            >
                <option value="upcoming">נסיעות לשבוע הקרוב</option>
                <option value="past">הצג נסיעות עבר</option>
            </select>
        </div>
    );
};

export default TimePeriodFilter;
