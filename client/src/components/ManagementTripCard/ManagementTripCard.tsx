import React from 'react';
import { ITrip } from 'shared/interfaces';
import './ManagementTripCard.scss';
import User from 'shared/interfaces/User';

interface Props {
    trip: ITrip;
    getDateLabel: (dateStr: string) => string;
    currentUser?: User | null;
}

const ManagementTripCard: React.FC<Props> = ({ trip, getDateLabel, currentUser }) => {
    // Action handlers (placeholders for now)
    const handleEdit = () => {
        console.log('Edit trip:', trip._id);
        // TODO: Implement edit logic
    };

    const handleCancel = () => {
        console.log('Cancel trip:', trip._id);
        // TODO: Implement cancel logic
    };

    const handleChat = () => {
        console.log('Open chat for trip:', trip._id);
        // TODO: Implement chat logic
    };

    const handleViewDetails = () => {
        console.log('View details for trip:', trip._id);
        // TODO: Implement view details logic
    };

    // Count of chat messages
    const chatMessageCount = trip.chatMessages?.length || 0;
    const registrationCount = trip.registrations?.length || 0;

    return (
        <div className="management-trip-card">
            <div className="management-trip-card-top-container">
                <div className="management-trip-details-container">
                    <div className="management-trip-line-wrapper">
                        {trip.isSpecial ? (
                            <div className="management-trip-icon-special" title="נסיעה מיוחדת">
                                *
                            </div>
                        ) : (
                            <div className="management-trip-icon-arrow" title="נסיעה רגילה">
                                ←
                            </div>
                        )}
                        <div className="management-trip-line">{trip.lineName}</div>
                    </div>
                    <div className="management-trip-date">
                        <span className="icon">
                            <img src="/time-icon.png" alt="" />
                        </span>
                        {getDateLabel(trip.date as any)}
                    </div>
                    <div className="management-trip-time">
                        <span className="icon">
                            <img src="/date-icon.png" alt="" />
                        </span>
                        {new Date(trip.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="management-trip-registrations">
                        <span className="registrations-count">{registrationCount} רישומים</span>
                    </div>
                </div>
                <div className="management-actions-container">
                    <div className="management-trip-actions">
                        <div className="management-actions-row">
                            <div className="management-trip-action">
                                <button
                                    className="management-trip-action-circle edit"
                                    title="ערוך נסיעה"
                                    type="button"
                                    onClick={handleEdit}
                                >
                                    <span className="management-trip-action-icon">✎</span>
                                </button>
                                <div className="management-trip-action-label">ערוך</div>
                            </div>
                            <div className="management-trip-action">
                                <button
                                    className="management-trip-action-circle cancel"
                                    title="בטל נסיעה"
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    <span className="management-trip-action-icon">×</span>
                                </button>
                                <div className="management-trip-action-label">בטל</div>
                            </div>
                        </div>
                        <div className="management-actions-row">
                            <div className="management-trip-action">
                                <button
                                    className="management-trip-action-circle chat"
                                    title="פתח צ'אט"
                                    type="button"
                                    onClick={handleChat}
                                    style={{ position: 'relative' }}
                                >
                                    <span className="management-trip-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
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
                                        <span className="management-trip-chat-badge">{chatMessageCount}</span>
                                    )}
                                </button>
                                <div className="management-trip-action-label">צ'אט</div>
                            </div>
                            <div className="management-trip-action">
                                <button
                                    className="management-trip-action-circle details"
                                    title="צפה בפרטים"
                                    type="button"
                                    onClick={handleViewDetails}
                                >
                                    <span className="management-trip-action-icon">👁</span>
                                </button>
                                <div className="management-trip-action-label">פרטים</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagementTripCard;
