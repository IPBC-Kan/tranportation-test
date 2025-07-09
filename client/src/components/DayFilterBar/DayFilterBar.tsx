import React from 'react';
import './DayFilterBar.scss';

interface Day {
    key: string;
    label: string;
}

interface Props {
    days: Day[];
    selectedDay: string | null;
    onDayClick: (dayKey: string) => void;
}

const DayFilterBar: React.FC<Props> = ({ days, selectedDay, onDayClick }) => (
    <div className="filter-bar days">
        <span className="filter-bar-label">בחר יום:</span>
        {days.map((day) => (
            <span
                key={day.key}
                className={`filter-tag${selectedDay === day.key ? ' selected' : ''}`}
                onClick={() => onDayClick(day.key)}
            >
                {day.label}
            </span>
        ))}
    </div>
);

export default DayFilterBar;