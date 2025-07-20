import React, { useState, useRef, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ITrip, ITripChatMessage } from 'shared/interfaces';
import User from 'shared/interfaces/User';
import { tripService } from 'api/trip.service';
import { actions } from 'store/store';
import './TripChatModal.scss';

interface TripChatModalProps {
    open: boolean;
    onClose: () => void;
    trip: ITrip;
    currentUser?: User | null;
}

const TripChatModal: React.FC<TripChatModalProps> = ({ open, onClose, trip, currentUser }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ITripChatMessage[]>(trip.chatMessages || []);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassengerList, setShowPassengerList] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on open or new message
    useEffect(() => {
        if (open && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [open, messages]);

    // Optionally: reload messages from trip when modal opens
    useEffect(() => {
        if (open) setMessages(trip.chatMessages || []);
    }, [open, trip.chatMessages]);

    // Format date and time for header
    const tripDate = new Date(trip.date);
    const headerText = `הודעות לנסיעה ${tripDate.toLocaleDateString('he-IL')} ${tripDate.toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit',
    })}`;

    // Handle send
    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        try {
            const messageData = {
                sender: currentUser,
                message: input,
                timestamp: new Date(),
            };

            // Call backend to persist message
            const updatedTrip = await tripService.createTripChatMessage(trip._id!, messageData);

            // Update local state with the response
            setMessages(updatedTrip.chatMessages || []);
            setInput('');
            actions.trips.updateWhere(updatedTrip, (trip) => trip._id === updatedTrip._id);
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('שגיאה בשליחת הודעה');
        } finally {
            setIsLoading(false);
        }
    };

    // Get unique passengers from registrations
    const getPassengers = () => {
        if (!trip.registrations) return [];

        // Filter out cancelled registrations and extract unique users
        return trip.registrations
            .filter((reg) => !reg.isCancelled)
            .map((reg) => reg.user)
            .filter((user, index, self) => index === self.findIndex((u) => u.id === user.id));
    };

    const passengers = getPassengers();

    // Toggle passenger dropdown
    const togglePassengerList = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowPassengerList(!showPassengerList);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.passenger-dropdown-container') && showPassengerList) {
                setShowPassengerList(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showPassengerList]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="trip-chat-modal">
                {/* Top section */}
                <div className="trip-chat-header">
                    <span className="header-text">{headerText}</span>
                    <button className="close-button" onClick={onClose}>
                        <span className="close-icon">×</span>
                    </button>
                </div>
                {/* Middle section: messages */}
                <div className="trip-chat-messages-container">
                    <div className="messages-header">
                        <div className="passenger-dropdown-container">
                            <button className="passenger-dropdown-button" onClick={togglePassengerList}>
                                <span>נוסעים ({passengers.length})</span>
                            </button>
                            {showPassengerList && (
                                <div className="passenger-dropdown-list">
                                    {passengers.length > 0 ? (
                                        <ul>
                                            {passengers.map((passenger, index) => (
                                                <li key={index}>{passenger.name || 'אנונימי'}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="no-passengers">אין נוסעים רשומים</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {messages.length === 0 && <div className="no-messages">אין הודעות עדיין</div>}
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`trip-chat-message ${msg.sender.id === currentUser?.id ? 'own-message' : 'other-message'}`}
                        >
                            <div className="message-sender">{msg.sender.name || 'אנונימי'}</div>
                            <div className="message-text">{msg.message}</div>
                            <div className="message-timestamp">
                                {msg.timestamp
                                    ? new Date(msg.timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
                                    : ''}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                {/* Bottom section: input */}
                <div className="trip-chat-footer">
                    <TextField
                        className="message-input"
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="כתוב הודעה..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && input.trim() && !isLoading) handleSend();
                        }}
                        inputProps={{ maxLength: 500 }}
                        disabled={isLoading}
                    />
                    <Button
                        className="send-button"
                        variant="contained"
                        color="success"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                    >
                        {isLoading ? '...' : 'שלח'}
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default TripChatModal;
