import React from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { ILineSchedule, ILine } from 'shared/interfaces';
import { formatTime, generateRegistrationTimeText, getHebrewDayName } from 'shared/utils/generalUtils';
import './ScheduleInfoModal.scss';

interface Props {
    open: boolean;
    onClose: () => void;
    schedule: ILineSchedule | null;
    line: ILine | null;
}

const ScheduleInfoModal: React.FC<Props> = ({ open, onClose, schedule, line }) => {
    if (!schedule || !line) return null;

    const hebrewDay = getHebrewDayName(schedule.weekday);
    const timeString = formatTime(schedule.hour, schedule.minute);
    const registrationText = generateRegistrationTimeText(schedule.cancellationTimeAllowed);
    const directionText = line.direction === 'pickup' ? 'איסוף' : 'פיזור';

    // Get non-base stops
    const nonBaseStops = line.stops.filter((stop) => !stop.isBase);

    // Direction explanations
    const directionExplanation =
        line.direction === 'pickup'
            ? "קו המגיע למקום העבודה המרכזי, ב'בית הדפוס', ואוסף את הנוסעים מתחנות לפי בקשה / מתחנות קבועות"
            : "קו היוצא ממקום העבודה המרכזי, ב'בית הדפוס', ומפזר את הנוסעים בתחנות לפי בקשה / בתחנות קבועות";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    maxHeight: '90vh',
                    direction: 'rtl',
                },
            }}
        >
            <DialogContent className="schedule-info-modal">
                <div className="modal-header">
                    <IconButton className="close-button" onClick={onClose} sx={{ position: 'absolute', top: 8, left: 8 }}>
                        ×
                    </IconButton>
                </div>

                <div className="modal-content">
                    {/* Basic Info Grid */}
                    <div className="info-grid">
                        <div className="info-item">
                            <div className="line-info-wrapper">
                                {schedule.isSpacial && <div className="modal-line-icon-special">*</div>}
                                <span className={`modal-line-name ${schedule.isSpacial ? 'special' : 'regular'}`}>
                                    {line.name}
                                </span>
                            </div>
                        </div>

                        <div className="info-item">
                            <img src="/time-icon.png" alt="שעה" className="info-icon" />
                            <span className="info-text">{timeString}</span>
                        </div>

                        <div className="info-item">
                            <img src="/date-icon.png" alt="יום" className="info-icon" />
                            <span className="info-text">{hebrewDay}</span>
                        </div>

                        <div className="info-item">
                            <img src="/change-driver.png" alt="נהג" className="info-icon" />
                            <span className="info-text">{schedule.driver?.name || 'שם הנהג'}</span>
                        </div>
                    </div>

                    {/* Direction Section */}
                    <div className="direction-section">
                        <h3 className="section-title">{directionText}</h3>
                        <p className="direction-explanation">{directionExplanation}</p>
                    </div>

                    {/* Registration Time Section */}
                    <div className="registration-section">
                        <p className="registration-text">{registrationText}</p>
                    </div>

                    {/* Special/Regular Schedule Section */}
                    {schedule.isSpacial ? (
                        <div className="special-section">
                            <div className="special-tag">
                                <span className="asterisk-icon">*</span>
                                <span className="special-text">נסיעת קצה</span>
                            </div>
                            <p className="special-explanation">
                                נסיעת קצה היא נסיעה בשעות שאין בהן תחבורה ציבורית. לנסיעה זו אין תחנות קבועות, והתחנות נקבעות לפי
                                התחנות אותן הזינו הנוסעים בעת ההרשמה.
                            </p>
                        </div>
                    ) : (
                        <div className="stops-section">
                            <h3 className="section-title">{line.direction === 'pickup' ? 'תחנות עלייה' : 'תחנות ירידה'}</h3>
                            <div className="stops-list">
                                {nonBaseStops.map((stop, index) => (
                                    <div key={stop._id || index} className="stop-item">
                                        {stop.name}
                                    </div>
                                ))}
                                {nonBaseStops.length === 0 && <div className="no-stops">אין תחנות מוגדרות</div>}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleInfoModal;
