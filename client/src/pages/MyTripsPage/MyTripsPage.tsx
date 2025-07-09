import React from 'react';
import { useSelector } from 'react-redux';
import TripCard from 'components/TripCard/TripCard';
import { getCurrentUser } from 'store/selectors/user.selector';
import { RootState } from 'store/state';
import { getRegisteredTrips } from 'shared/utils/tripsUtils';
import './MyTripsPage.scss';
import RegisteredTripCard from 'components/RegisteredTripCard/RegisteredTripCard';

const MyTripsPage = () => {
    const user = useSelector(getCurrentUser);
    const trips = useSelector((state: RootState) => state.trips);
    const registeredTrips = user ? getRegisteredTrips(trips, user.id) : [];

    // Date label helper (copied from RegistrationPage)
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

    return (
        <div className="my-trips-page">
            <div className="registered-trips-container">
                <div className="registered-trips-list-wrapper">
                    <div className="registered-trips-list">
                        {registeredTrips.map((trip) => (
                            <RegisteredTripCard
                                key={trip._id}
                                trip={trip}
                                getDateLabel={getDateLabel}
                                onRegister={() => {}}
                                currentUser={user}
                            />
                        ))}
                        {registeredTrips.length === 0 && <div className="no-trips">לא נמצאו נסיעות שנרשמת אליהן</div>}
                    </div>
                </div>
            </div>
            <div className="messages-container">
                <div className="trips-messages-container"></div>
                <div className="system-messages-container"></div>
            </div>
        </div>
    );
};

export default MyTripsPage;
