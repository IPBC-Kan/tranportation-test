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

const DayFilterBar: React.FC<Props> = ({ days, selectedDay, onDayClick }) => {
    // Map Hebrew day labels to alphabetic letters
    const getAlphabeticLabel = (label: string) => {
        const dayMap: { [key: string]: string } = {
            ראשון: 'א',
            שני: 'ב',
            שלישי: 'ג',
            רביעי: 'ד',
            חמישי: 'ה',
            שישי: 'ו',
            שבת: 'ז',
        };
        return dayMap[label] || label;
    };

    return (
        <div className="filter-bar days">
            <span className="filter-bar-label">בחר יום:</span>
            {days.map((day) => (
                <span
                    key={day.key}
                    className={`filter-tag${selectedDay === day.key ? ' selected' : ''}`}
                    onClick={() => onDayClick(day.key)}
                >
                    <span className="day-full-label">{day.label}</span>
                    <span className="day-short-label">{getAlphabeticLabel(day.label)}</span>
                </span>
            ))}
        </div>
    );
};

export default DayFilterBar;
