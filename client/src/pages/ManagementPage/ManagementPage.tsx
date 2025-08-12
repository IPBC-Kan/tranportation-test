import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllLines } from 'store/selectors/line.selector';
import { RootState } from 'store/state';
import './ManagementPage.scss';
import LineFilterBar from 'components/LineFilterBar/LineFilterBar';
import DayFilterBar from 'components/DayFilterBar/DayFilterBar';
import TimePeriodFilter from 'components/TimePeriodFilter/TimePeriodFilter';
import SpecialTripsToggle from 'components/SpecialTripsToggle/SpecialTripsToggle';
import ManagementTripCard from 'components/ManagementTripCard/ManagementTripCard';
import { ManagementActionsBar } from 'components/ManagementActionsBar/ManagementActionsBar';
import { getCurrentUser } from 'store/selectors/user.selector';

const daysOfWeek = [
    { key: 'sunday', label: 'ראשון' },
    { key: 'monday', label: 'שני' },
    { key: 'tuesday', label: 'שלישי' },
    { key: 'wednesday', label: 'רביעי' },
    { key: 'thursday', label: 'חמישי' },
    { key: 'friday', label: 'שישי' },
    { key: 'saturday', label: 'שבת' },
];

export const ManagementPage: React.FC = () => {
    const lines = useSelector(selectAllLines);
    const trips = useSelector((state: RootState) => state.trips);
    const user = useSelector(getCurrentUser);

    // Filter states
    const [selectedLine, setSelectedLine] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<string | null>('upcoming');
    const [showSpecialTrips, setShowSpecialTrips] = useState<boolean>(true);

    // Filter trips based on selected filters
    const filteredTrips = trips.filter((trip) => {
        const tripDate = new Date(trip.date);
        const dayKey = daysOfWeek[tripDate.getDay()].key;

        // Line filter
        const lineMatch = !selectedLine || trip.lineName === selectedLine;

        // Day filter
        const dayMatch = !selectedDay || dayKey === selectedDay;

        // Special trips filter
        const specialMatch = showSpecialTrips || !trip.isSpecial;

        // Period filter - for now just return true, logic to be implemented later
        const periodMatch = true; // TODO: Implement period filtering logic

        const now = new Date();
        const isActiveTrip = !trip.cancellationTimestamp || new Date(trip.cancellationTimestamp) > now;

        return lineMatch && dayMatch && specialMatch && periodMatch && isActiveTrip;
    });

    // Date label helper
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
        <div className="management-page">
            <ManagementActionsBar />

            <div className="management-content">
                <div className="filters-container">
                    <LineFilterBar lines={lines} selectedLine={selectedLine} onLineClick={setSelectedLine} />
                    <TimePeriodFilter selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
                    <DayFilterBar days={daysOfWeek} selectedDay={selectedDay} onDayClick={setSelectedDay} />
                    <SpecialTripsToggle showSpecialTrips={showSpecialTrips} onToggle={setShowSpecialTrips} />
                </div>

                <div className="management-trips-container">
                    <div className="management-trips-list">
                        {filteredTrips.map((trip) => (
                            <ManagementTripCard key={trip._id} trip={trip} getDateLabel={getDateLabel} currentUser={user} />
                        ))}
                        {filteredTrips.length === 0 && <div className="no-trips">לא נמצאו נסיעות מתאימות</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagementPage;
