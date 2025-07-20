import React from 'react';
import './MultipleDayFilterBar.scss';

interface Day {
    key: string;
    label: string;
}

interface Props {
    days: Day[];
    selectedDays: string[];
    onDayToggle: (dayKey: string) => void;
}

const MultipleDayFilterBar: React.FC<Props> = ({ days, selectedDays, onDayToggle }) => (
    <div className="multiple-day-filter-bar">
        <span className="filter-bar-label">בחר ימים:</span>
        <div className="filter-tags">
            {days.map((day) => (
                <span
                    key={day.key}
                    className={`filter-tag${selectedDays.includes(day.key) ? ' selected' : ''}`}
                    onClick={() => onDayToggle(day.key)}
                >
                    {day.label}
                </span>
            ))}
        </div>
    </div>
);

export default MultipleDayFilterBar;
