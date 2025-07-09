import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllLines } from 'store/selectors/line.selector';
import { RootState } from 'store/state';
// import { ITrip, ILine } from 'shared/interfaces';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.scss';
import LineFilterBar from 'components/LineFilterBar/LineFilterBar';
import DayFilterBar from 'components/DayFilterBar/DayFilterBar';
import TripCard from 'components/TripCard/TripCard';
import { registrationService } from 'api/registration.service';
import { getCurrentUser } from 'store/selectors/user.selector';
import { IRegistration } from 'shared/interfaces';
import { actions } from 'store/store';
import { getRegisteredTrips } from 'shared/utils/tripsUtils';

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
    const user = useSelector(getCurrentUser);
    const [selectedLine, setSelectedLine] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    // const [boarding, setBoarding] = useState('');
    // const [dropoff, setDropoff] = useState('');
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

    // הרשמה לנסיעה
    const handleRegister = async (tripId: string, boardingStop: string, dropoffStop: string) => {
        try {
            if (!user) {
                alert('יש להתחבר כדי להירשם לנסיעה');
                return;
            }

            // שליחת בקשת רישום לשרת עם user כאובייקט מלא
            const registrationData: IRegistration = {
                user,
                isCancelled: false,
                registrationDate: new Date(),
                boardingStop,
                dropoffStop,
            };
            console.log(tripId, registrationData);

            const updatedTrip = await registrationService.registerToTrip(tripId, registrationData);
            console.log('Registration successful, updatedTrip:', updatedTrip);

            actions.trips.updateWhere(updatedTrip, (trip) => trip._id === updatedTrip._id);

            // Get updated trips after the state update
            const currentTripsState = trips.map((trip) => (trip._id === updatedTrip._id ? updatedTrip : trip));
            actions.registeredTrips.set(getRegisteredTrips(currentTripsState, user.id));

            alert('נרשמת בהצלחה!');
            navigate('/main');
        } catch (err: any) {
            console.error('Registration error:', err);
            console.error('Error response:', err?.response);
            console.error('Error data:', err?.response?.data);

            // טיפול בשגיאות מהשרת
            if (err?.response?.data?.message) {
                alert(err.response.data.message);
            } else if (err?.response?.data?.error) {
                alert(err.response.data.error);
            } else {
                alert('אירעה שגיאה בעת הרישום לנסיעה');
            }
        }
    };

    return (
        <div className="registration-page">
            <div className="filters-container">
                <LineFilterBar lines={lines} selectedLine={selectedLine} onLineClick={setSelectedLine} />
                <DayFilterBar days={daysOfWeek} selectedDay={selectedDay} onDayClick={setSelectedDay} />
            </div>
            <div className="trips-container">
                <div className="trips-list">
                    {filteredTrips.map((trip) => (
                        <TripCard
                            key={trip._id}
                            trip={trip}
                            getDateLabel={getDateLabel}
                            onRegister={handleRegister}
                            currentUser={user}
                        />
                    ))}
                    {filteredTrips.length === 0 && <div className="no-trips">לא נמצאו נסיעות מתאימות</div>}
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
