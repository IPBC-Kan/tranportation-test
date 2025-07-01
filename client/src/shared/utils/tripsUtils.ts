import { ITrip } from '../interfaces/Trip';
import { IRegistration } from '../interfaces/Registration';
// import { useSelector } from 'react-redux';
// import { getCurrentUser } from 'store/selectors/user.selector';

// const currentUser = useSelector(getCurrentUser)
export const getRegisteredTrips = (trips: ITrip[], currentUserId: string): ITrip[] => {
    return trips.filter((trip) =>
        // trip.registrations?.some((reg: IRegistration) => reg.user.id === currentUserId && !reg.isCancelled)
        trip.registrations?.some((reg: IRegistration) => reg.user.id === currentUserId)
    );
};
