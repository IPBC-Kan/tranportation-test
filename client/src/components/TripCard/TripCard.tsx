import React, { useMemo, useState } from 'react';
import { ITrip } from 'shared/interfaces';
import './TripCard.scss';

import User from 'shared/interfaces/User';
import { useNavigate } from 'react-router-dom';

interface Props {
    trip: ITrip;
    getDateLabel: (dateStr: string) => string;
    onRegister: (tripId: string, boardingStop: string, dropoffStop: string) => void;
    currentUser?: User | null;
}

const TripCard: React.FC<Props> = ({ trip, getDateLabel, onRegister, currentUser }) => {
    const navigate = useNavigate();
    // בדוק אם המשתמש הנוכחי רשום לנסיעה זו
    const userRegistration = currentUser
        ? trip.registrations.find((reg) => reg.user?.id === currentUser.id && !reg.isCancelled)
        : undefined;
    // State מקומי לתחנות עלייה וירידה
    const [boarding, setBoarding] = useState('');
    const [dropoff, setDropoff] = useState('');

    // מוצאים את תחנת הבסיס
    const baseStop = useMemo(() => {
        return trip.stops.find((stop) => stop.isBase);
    }, [trip.stops]);

    // מסננים את כל התחנות למעט תחנת הבסיס
    const nonBaseStops = useMemo(() => {
        return trip.stops.filter((stop) => !stop.isBase);
    }, [trip.stops]);

    // רנדור של אינפוט תחנת העלייה
    const renderBoardingInput = () => {
        if (trip.lineDirection === 'pickup') {
            if (trip.isSpecial) {
                // נסיעת איסוף ספיישל - אינפוט טקסט
                return (
                    <input
                        className="trip-input"
                        value={boarding}
                        onChange={(e) => setBoarding(e.target.value)}
                        placeholder="תחנה לבחירה"
                    />
                );
            } else {
                // נסיעת איסוף רגילה - דרופדאון של תחנות
                return (
                    <select className="trip-input" value={boarding} onChange={(e) => setBoarding(e.target.value)}>
                        <option value="" disabled selected hidden>
                            בחר תחנה
                        </option>
                        {nonBaseStops.length > 0 ? (
                            nonBaseStops.map((stop) => (
                                <option key={stop._id || stop.name} value={stop.name}>
                                    {stop.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                אין תחנות זמינות
                            </option>
                        )}
                    </select>
                );
            }
        } else {
            // נסיעת פיזור - תחנת הבסיס
            return <input className="trip-input" value={baseStop?.name || ''} readOnly disabled />;
        }
    };

    // רנדור של אינפוט תחנת הירידה
    const renderDropoffInput = () => {
        if (trip.lineDirection === 'pickup') {
            // נסיעת איסוף - תחנת הבסיס
            return <input className="trip-input" value={baseStop?.name || ''} readOnly disabled />;
        } else {
            if (trip.isSpecial) {
                // נסיעת פיזור ספיישל - אינפוט טקסט (לא דרופדאון כי אין תחנות קבועות)
                return (
                    <input
                        className="trip-input"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        placeholder="תחנה לבחירה"
                    />
                );
            } else {
                // נסיעת פיזור רגילה - דרופדאון של תחנות
                return (
                    <select className="trip-input" value={dropoff} onChange={(e) => setDropoff(e.target.value)}>
                        <option value="" disabled selected hidden>
                            בחר תחנה
                        </option>
                        {nonBaseStops.length > 0 ? (
                            nonBaseStops.map((stop) => (
                                <option key={stop._id || stop.name} value={stop.name}>
                                    {stop.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                אין תחנות זמינות
                            </option>
                        )}
                    </select>
                );
            }
        }
    };

    // קבלת הערך הסופי של תחנת העלייה (כולל תחנת בסיס אם רלוונטי)
    const getBoardingValue = () => {
        if (trip.lineDirection === 'dropoff') {
            return baseStop?.name || '';
        }
        return boarding;
    };

    // קבלת הערך הסופי של תחנת הירידה (כולל תחנת בסיס אם רלוונטי)
    const getDropoffValue = () => {
        if (trip.lineDirection === 'pickup') {
            return baseStop?.name || '';
        }
        return dropoff;
    };

    // טיפול בהרשמה - שליחת הנסיעה ותחנות העלייה והירידה
    const handleRegister = () => {
        const boardingValue = getBoardingValue();
        const dropoffValue = getDropoffValue();

        // בדיקת תקינות הקלט
        if (trip.lineDirection === 'pickup' && !boarding && !trip.isSpecial) {
            alert('נא לבחור תחנת עלייה');
            return;
        }

        if (trip.lineDirection === 'pickup' && !boarding && trip.isSpecial) {
            alert('נא להכניס תחנת עלייה');
            return;
        }

        if (trip.lineDirection === 'dropoff' && !dropoff && !trip.isSpecial) {
            alert('נא לבחור תחנת ירידה');
            return;
        }

        if (trip.lineDirection === 'dropoff' && !dropoff && trip.isSpecial) {
            alert('נא להכניס תחנת ירידה');
            return;
        }

        onRegister(trip._id || '', boardingValue, dropoffValue);
    };

    return (
        <div className="trip-card">
            <div className="trip-card-top-container">
                <div className="trip-details-container">
                    {/* <div className="trip-line-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}> */}
                    <div className="trip-line-wrapper">
                        {trip.isSpecial ? (
                            <div className="trip-icon-special" title="נסיעה מיוחדת">
                                *
                            </div>
                        ) : (
                            <div className="trip-icon-arrow" title="נסיעה רגילה">
                                ←
                            </div>
                        )}
                        <div className="trip-line">{trip.lineName}</div>
                    </div>
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
                    {userRegistration ? (
                        <div
                            style={{
                                background: 'rgb(80, 187, 130)',
                                color: 'white',
                                borderRadius: '12px',
                                padding: '8px 16px',
                                fontWeight: 'bold',
                                fontSize: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate('/my-trips')}
                            tabIndex={0}
                            role="button"
                            aria-label="עבור לנסיעות שלי"
                        >
                            הנך רשום כבר לנסיעה זו. לחץ כדי לעבור לנסיעות שלי{' '}
                        </div>
                    ) : (
                        <button className="register-btn" onClick={handleRegister}>
                            +
                        </button>
                    )}
                </div>
            </div>
            <div className="stops-container">
                <div className="trip-input-group">
                    <div className="trip-input-label">תחנת עלייה</div>
                    {userRegistration ? (
                        <input
                            className="trip-input"
                            value={userRegistration.boardingStop || ''}
                            readOnly
                            tabIndex={-1}
                            aria-readonly="true"
                            id={`boarding-stop-${trip._id}`}
                            name={`boarding-stop-${trip._id}`}
                            style={{ background: '#e0f7ef', color: '#222', fontWeight: 'bold' }}
                        />
                    ) : (
                        renderBoardingInput()
                    )}
                </div>
                <span className="stops-arrow" title="אל">
                    ←
                </span>
                <div className="trip-input-group">
                    <div className="trip-input-label">תחנת ירידה</div>
                    {userRegistration ? (
                        <input
                            className="trip-input"
                            value={userRegistration.dropoffStop || ''}
                            readOnly
                            tabIndex={-1}
                            aria-readonly="true"
                            id={`dropoff-stop-${trip._id}`}
                            name={`dropoff-stop-${trip._id}`}
                            style={{ background: '#e0f7ef', color: '#222', fontWeight: 'bold' }}
                        />
                    ) : (
                        renderDropoffInput()
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripCard;
