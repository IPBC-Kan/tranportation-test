import React from 'react';
import { ILineSchedule } from 'shared/interfaces';
import { formatTime } from 'shared/utils/generalUtils';
import './ScheduleCard.scss';

interface Props {
    schedule: ILineSchedule;
    lineName: string;
    lineDirection: string;
    onClick: (schedule: ILineSchedule) => void;
}

const ScheduleCard: React.FC<Props> = ({ schedule, lineName, lineDirection, onClick }) => {
    const handleClick = () => {
        onClick(schedule);
    };

    return (
        <div className="schedule-card" onClick={handleClick}>
            <div className="schedule-line-wrapper">
                {schedule.isSpacial && <div className="schedule-icon-special">*</div>}
                <div className={`schedule-line ${schedule.isSpacial ? 'special' : 'regular'}`}>{lineName}</div>
            </div>

            <div className="schedule-time">
                <img src="/time-icon.png" alt="שעה" className="schedule-time-icon" />
                <span className="schedule-time-text">{formatTime(schedule.hour, schedule.minute)}</span>
            </div>

            <div className="schedule-direction">
                <img src="/direction-icon.png" alt="כיוון" className="schedule-direction-icon" />
                <span className="schedule-direction-text">{lineDirection === 'pickup' ? 'איסוף' : 'פיזור'}</span>
            </div>
        </div>
    );
};

export default ScheduleCard;
