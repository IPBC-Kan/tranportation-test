import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllLines } from 'store/selectors/line.selector';
import { RootState } from 'store/state';
import { ITrip, ILine } from 'shared/interfaces';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.scss';

const daysOfWeek = [
    { key: 'sunday', label: 'ראשון' },
    { key: 'monday', label: 'שני' },
    { key: 'tuesday', label: 'שלישי' },
    { key: 'wednesday', label: 'רביעי' },
    { key: 'thursday', label: 'חמישי' },
    { key: 'friday', label: 'שישי' },
    { key: 'saturday', label: 'שבת' },
];

export const RegistrationPage: React.FC = () => {
    const lines = useSelector(selectAllLines);
    const trips = useSelector((state: RootState) => state.trips);
    const [selectedLine, setSelectedLine] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [boarding, setBoarding] = useState('');
    const [dropoff, setDropoff] = useState('');
    const navigate = useNavigate();

    // סינון נסיעות לפי קו ויום
    const filteredTrips = trips.filter((trip) => {
        const tripDate = new Date(trip.date);
        const dayKey = daysOfWeek[tripDate.getDay()].key;
        const lineMatch = !selectedLine || trip.lineName === selectedLine;
        const dayMatch = !selectedDay || dayKey === selectedDay;
        return lineMatch && dayMatch;
    });

    // תצוגת תאריך
    const getDateLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return 'היום';
        }
        return date.toLocaleDateString('he-IL');
    };

    // סינון קו
    const handleLineClick = (lineName: string) => {
        setSelectedLine(selectedLine === lineName ? null : lineName);
    };

    // סינון יום
    const handleDayClick = (dayKey: string) => {
        setSelectedDay(selectedDay === dayKey ? null : dayKey);
    };

    // הרשמה לנסיעה
    const handleRegister = (tripId: string) => {
        alert(`נרשמת לנסיעה ${tripId}`);
        navigate('/main');
    };

    return (
        <div className="registration-page">
            <div className="filters-container">
                <div className="filter-bar lines">
                    <span className="filter-bar-label">בחר קו:</span>
                    {lines.map((line: ILine) => (
                        <span
                            key={line.name}
                            className={`filter-tag${selectedLine === line.name ? ' selected' : ''}`}
                            onClick={() => handleLineClick(line.name)}
                        >
                            {line.name}
                        </span>
                    ))}
                </div>
                <div className="filter-bar days">
                    <span className="filter-bar-label">בחר יום:</span>
                    {daysOfWeek.map((day) => (
                        <span
                            key={day.key}
                            className={`filter-tag${selectedDay === day.key ? ' selected' : ''}`}
                            onClick={() => handleDayClick(day.key)}
                        >
                            {day.label}
                        </span>
                    ))}
                </div>
            </div>
            <div className="trips-container">
                <div className="trips-list">
                    {filteredTrips.map((trip) => (
                        <div className="trip-card" key={trip._id}>
                            <div className="trip-card-top-container">
                                <div className="trip-details-container">
                                    <div className="trip-line">{trip.lineName}</div>
                                    <div className="trip-date">
                                        <span className="icon">
                                            <img src="/time-icon.png" alt="" />
                                        </span>
                                        {getDateLabel(trip.date as any)}
                                    </div>
                                    <div className="trip-time">
                                        <span className="icon">
                                            <img src="/date-icon.png" alt="" />
                                        </span>
                                        {new Date(trip.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div className="register-btn-container">
                                    <button className="register-btn" onClick={() => handleRegister(trip._id || '')}>
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="stops-container">
                                <input
                                    className="trip-input"
                                    placeholder="תחנת ירידה"
                                    value={dropoff}
                                    onChange={(e) => setDropoff(e.target.value)}
                                />
                                <span className="stops-arrow" title="אל">
                                    {/* אפשר להחליף ל־SVG אם תרצה */}←
                                </span>
                                <input
                                    className="trip-input"
                                    placeholder="תחנת עלייה"
                                    value={boarding}
                                    onChange={(e) => setBoarding(e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                    {filteredTrips.length === 0 && <div className="no-trips">לא נמצאו נסיעות מתאימות</div>}
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
