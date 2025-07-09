import React, { useMemo, useState, useRef } from 'react';
import { ITrip, ITripStop } from 'shared/interfaces';
import './RegisteredTripCard.scss';

import User from 'shared/interfaces/User';
import { registrationService } from 'api/registration.service';
import TripChatModal from 'components/TripChatModal/TripChatModal';

interface Props {
    trip: ITrip;
    getDateLabel: (dateStr: string) => string;
    onRegister: (tripId: string, boardingStop: string, dropoffStop: string) => void;
    currentUser?: User | null;
}

const RegisteredTripCard: React.FC<Props> = ({ trip, getDateLabel, onRegister, currentUser }) => {
    // Find the user's registration (should always exist)
    const userRegistration = currentUser ? trip.registrations.find((reg) => reg.user?.id === currentUser.id) : undefined;

    const isCancelled = !!userRegistration?.isCancelled;

    // Base stop and non-base stops
    const baseStop = useMemo(() => trip.stops.find((stop) => stop.isBase), [trip.stops]);
    const nonBaseStops = useMemo(() => trip.stops.filter((stop) => !stop.isBase), [trip.stops]);

    // Local state for inputs, initialized from registration
    const [boarding, setBoarding] = useState(userRegistration?.boardingStop || '');
    const [dropoff, setDropoff] = useState(userRegistration?.dropoffStop || '');

    // To compare previous values for text input blur
    const prevBoarding = useRef(boarding);
    const prevDropoff = useRef(dropoff);

    // Chat modal state
    const [chatOpen, setChatOpen] = useState(false);

    // Helper: update registration with new stops
    const updateRegistration = async (newBoarding: string, newDropoff: string) => {
        if (!userRegistration || !trip._id || !userRegistration._id) return;
        // Only call if changed
        if (newBoarding !== userRegistration.boardingStop || newDropoff !== userRegistration.dropoffStop) {
            try {
                await registrationService.updateRegistration(trip._id, userRegistration._id, {
                    boardingStop: newBoarding,
                    dropoffStop: newDropoff,
                });
            } catch (e) {
                alert('שגיאה בעדכון תחנה');
            }
        }
    };

    // Cancel registration
    const handleCancel = async () => {
        if (!userRegistration || !trip._id || !userRegistration._id) return;
        try {
            await registrationService.cancelRegistration(trip._id, userRegistration._id);
            // Optionally: trigger a reload or state update in parent
            window.location.reload(); // quick solution, replace with better state update if needed
        } catch (e) {
            alert('שגיאה בביטול נסיעה');
        }
    };

    // Redo (restore) registration
    const handleRedo = async () => {
        if (!userRegistration || !trip._id || !userRegistration._id) return;
        try {
            await registrationService.redoRegistration(trip._id, userRegistration._id);
            window.location.reload(); // quick solution, replace with better state update if needed
        } catch (e) {
            alert('שגיאה בשחזור נסיעה');
        }
    };

    // Boarding input (select or text, always editable)
    const renderBoardingInput = () => {
        if (!userRegistration || isCancelled) return null;
        if (trip.lineDirection === 'pickup') {
            if (trip.isSpecial) {
                // Editable text input
                return (
                    <input
                        className="registered-trip-input"
                        value={boarding}
                        onChange={(e) => setBoarding(e.target.value)}
                        onBlur={(e) => {
                            if (prevBoarding.current !== e.target.value) {
                                updateRegistration(e.target.value, dropoff);
                                prevBoarding.current = e.target.value;
                            }
                        }}
                        placeholder="תחנה לבחירה"
                    />
                );
            } else {
                // Editable select
                return (
                    <select
                        className="registered-trip-input"
                        value={boarding}
                        onChange={(e) => {
                            setBoarding(e.target.value);
                            updateRegistration(e.target.value, dropoff);
                        }}
                    >
                        <option value="" disabled hidden>
                            בחר תחנה
                        </option>
                        {nonBaseStops.map((stop) => (
                            <option key={stop._id || stop.name} value={stop.name}>
                                {stop.name}
                            </option>
                        ))}
                        {baseStop && <option value={baseStop.name}>{baseStop.name}</option>}
                    </select>
                );
            }
        } else {
            // Dropoff direction: base stop only, but still editable if that's the user's stop
            return (
                <input
                    className="registered-trip-input"
                    value={boarding}
                    onChange={(e) => setBoarding(e.target.value)}
                    onBlur={(e) => {
                        if (prevBoarding.current !== e.target.value) {
                            updateRegistration(e.target.value, dropoff);
                            prevBoarding.current = e.target.value;
                        }
                    }}
                    placeholder="תחנה לבחירה"
                />
            );
        }
    };

    // Dropoff input (select or text, always editable)
    const renderDropoffInput = () => {
        if (!userRegistration || isCancelled) return null;
        if (trip.lineDirection === 'pickup') {
            // Pickup: dropoff is base stop, but still editable if that's the user's stop
            return (
                <input
                    className="registered-trip-input"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    onBlur={(e) => {
                        if (prevDropoff.current !== e.target.value) {
                            updateRegistration(boarding, e.target.value);
                            prevDropoff.current = e.target.value;
                        }
                    }}
                    placeholder="תחנה לבחירה"
                />
            );
        } else {
            if (trip.isSpecial) {
                // Editable text input
                return (
                    <input
                        className="registered-trip-input"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        onBlur={(e) => {
                            if (prevDropoff.current !== e.target.value) {
                                updateRegistration(boarding, e.target.value);
                                prevDropoff.current = e.target.value;
                            }
                        }}
                        placeholder="תחנה לבחירה"
                    />
                );
            } else {
                // Editable select
                return (
                    <select
                        className="registered-trip-input"
                        value={dropoff}
                        onChange={(e) => {
                            setDropoff(e.target.value);
                            updateRegistration(boarding, e.target.value);
                        }}
                    >
                        <option value="" disabled hidden>
                            בחר תחנה
                        </option>
                        {nonBaseStops.map((stop) => (
                            <option key={stop._id || stop.name} value={stop.name}>
                                {stop.name}
                            </option>
                        ))}
                        {baseStop && <option value={baseStop.name}>{baseStop.name}</option>}
                    </select>
                );
            }
        }
    };

    // Count of chat messages
    const chatMessageCount = trip.chatMessages?.length || 0;

    return (
        <div className={`registered-trip-card${isCancelled ? ' cancelled' : ''}`}>
            <div className="registered-trip-card-top-container">
                <div className="registered-trip-details-container">
                    <div className="registered-trip-line-wrapper">
                        {trip.isSpecial ? (
                            <div
                                className={`registered-trip-icon-special${isCancelled ? ' cancelled' : ''}`}
                                title="נסיעה מיוחדת"
                            >
                                *
                            </div>
                        ) : (
                            <div className={`registered-trip-icon-arrow${isCancelled ? ' cancelled' : ''}`} title="נסיעה רגילה">
                                ←
                            </div>
                        )}
                        <div className="registered-trip-line">{trip.lineName}</div>
                    </div>
                    <div className="registered-trip-date">
                        <span className="icon">
                            <img src="/time-icon.png" alt="" />
                        </span>
                        {getDateLabel(trip.date as any)}
                    </div>
                    <div className="registered-trip-time">
                        <span className="icon">
                            <img src="/date-icon.png" alt="" />
                        </span>
                        {new Date(trip.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
                <div className="register-btn-container">
                    <div className="registered-trip-actions">
                        {!isCancelled ? (
                            <>
                                <div className="registered-trip-action">
                                    <button
                                        className="registered-trip-action-circle cancel"
                                        title="בטל נסיעה"
                                        type="button"
                                        onClick={handleCancel}
                                    >
                                        <span className="registered-trip-action-icon">×</span>
                                    </button>
                                    <div className="registered-trip-action-label cancel">בטל נסיעה</div>
                                </div>
                                <div className="registered-trip-action">
                                    <button
                                        className="registered-trip-action-circle chat"
                                        title="פתח צ'אט"
                                        type="button"
                                        onClick={() => setChatOpen(true)}
                                        style={{ position: 'relative' }}
                                    >
                                        <span className="registered-trip-action-icon">
                                            {/* Simple chat bubble SVG */}
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <ellipse cx="10" cy="9" rx="7" ry="6" fill="white" />
                                                <path
                                                    d="M3 9c0-3.314 3.134-6 7-6s7 2.686 7 6-3.134 6-7 6c-.69 0-1.36-.07-2-.2L3 17v-3.2C3.11 12.6 3 10.8 3 9z"
                                                    fill="#fff"
                                                />
                                                <ellipse cx="7.5" cy="9" rx="1" ry="1" fill="#FFD600" />
                                                <ellipse cx="10" cy="9" rx="1" ry="1" fill="#FFD600" />
                                                <ellipse cx="12.5" cy="9" rx="1" ry="1" fill="#FFD600" />
                                            </svg>
                                        </span>
                                        {chatMessageCount > 0 && (
                                            <span className="registered-trip-chat-badge">{chatMessageCount}</span>
                                        )}
                                    </button>
                                    <div className="registered-trip-action-label chat">פתח צ'אט</div>
                                </div>
                            </>
                        ) : (
                            <div className="registered-trip-action">
                                <button
                                    className="registered-trip-action-circle redo"
                                    title="שחזר רישום"
                                    type="button"
                                    onClick={handleRedo}
                                >
                                    <span className="registered-trip-action-icon" style={{ color: '#43a047' }}>
                                        ↻
                                    </span>
                                </button>
                                <div className="registered-trip-action-label redo" style={{ color: '#43a047' }}>
                                    שחזר רישום
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {!isCancelled ? (
                <div className="stops-container">
                    <div className="registered-trip-input-group">
                        <div className="registered-trip-input-label">תחנת עלייה</div>
                        {renderBoardingInput()}
                    </div>
                    <span className="stops-arrow" title="אל">
                        ←
                    </span>
                    <div className="registered-trip-input-group">
                        <div className="registered-trip-input-label">תחנת ירידה</div>
                        {renderDropoffInput()}
                    </div>
                </div>
            ) : (
                <div className="cancelled-notification-container">
                    ביטלת את רישומך לנסיעה זו. אם ברצונך לשחזר, לחץ על הכפתור למעלה
                </div>
            )}
            <TripChatModal open={chatOpen} onClose={() => setChatOpen(false)} trip={trip} currentUser={currentUser} />
        </div>
    );
};

export default RegisteredTripCard;
