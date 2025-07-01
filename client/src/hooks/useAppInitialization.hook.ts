import { lineService } from 'api/line.service';
import { tripService } from 'api/trip.service';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILine, ITrip } from 'shared/interfaces';
import { getRegisteredTrips } from 'shared/utils/tripsUtils';
import { getIsUserAuthenticated } from 'store/selectors';
// import { selectAllTrips } from 'store/selectors/trip.selector';
import { getCurrentUser } from 'store/selectors/user.selector';
import { actions } from 'store/store';

export const useAppInitialization = () => {
    const isAuthenticated = useSelector(getIsUserAuthenticated);
    const currentUser = useSelector(getCurrentUser);
    // const trips = useSelector(selectAllTrips);
    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            console.log('starting app initialization');

            actions.isApplicationManagementMode.set(false);

            try {
                const lines: ILine[] = await lineService.getAllLines();
                actions.lines.set(lines);
            } catch (error) {
                actions.lines.set([]);
            }

            try {
                const trips: ITrip[] = await tripService.getAllTrips();
                actions.trips.set(trips);
                actions.registeredTrips.set(getRegisteredTrips(trips, currentUser.id));
            } catch (error) {
                actions.trips.set([]);
            }
        };

        if (isAuthenticated && currentUser) {
            init();
        }
    }, [currentUser, isAuthenticated, dispatch]);

    // useEffect(() => {
    // }, [trips]);
};
