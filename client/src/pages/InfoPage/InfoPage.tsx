import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllLines } from 'store/selectors/line.selector';
import { ILineSchedule } from 'shared/interfaces';
import { lineService } from 'api/line.service';
import MultipleDayFilterBar from 'components/MultipleDayFilterBar/MultipleDayFilterBar';
import ScheduleCard from 'components/ScheduleCard/ScheduleCard';
import ScheduleInfoModal from 'components/ScheduleInfoModal/ScheduleInfoModal';
import { getHebrewDayName } from 'shared/utils/generalUtils';
import './InfoPage.scss';

const daysOfWeek = [
    { key: 'Sunday', label: 'ראשון' },
    { key: 'Monday', label: 'שני' },
    { key: 'Tuesday', label: 'שלישי' },
    { key: 'Wednesday', label: 'רביעי' },
    { key: 'Thursday', label: 'חמישי' },
    { key: 'Friday', label: 'שישי' },
    { key: 'Saturday', label: 'שבת' },
];

interface ScheduleWithLine extends ILineSchedule {
    lineName: string;
    lineDirection: string;
}

const InfoPage: React.FC = () => {
    const lines = useSelector(selectAllLines);
    const [schedules, setSchedules] = useState<ScheduleWithLine[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<ScheduleWithLine | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSchedules();
    }, []);

    const loadSchedules = async () => {
        try {
            setLoading(true);
            const schedulesData = await lineService.getAllSchedules();
            setSchedules(schedulesData);
        } catch (error) {
            console.error('Failed to load schedules:', error);
            setSchedules([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDaySelection = (dayKey: string) => {
        setSelectedDays((prev) => {
            if (prev.includes(dayKey)) {
                return prev.filter((d) => d !== dayKey);
            } else {
                return [...prev, dayKey];
            }
        });
    };

    const handleScheduleClick = (schedule: ScheduleWithLine) => {
        setSelectedSchedule(schedule);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSchedule(null);
    };

    const sortSchedulesByDayAndTime = (schedules: ScheduleWithLine[]): ScheduleWithLine[] => {
        const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return schedules.sort((a, b) => {
            const dayCompare = dayOrder.indexOf(a.weekday) - dayOrder.indexOf(b.weekday);
            if (dayCompare !== 0) return dayCompare;

            const timeA = a.hour * 60 + a.minute;
            const timeB = b.hour * 60 + b.minute;
            return timeA - timeB;
        });
    };

    const groupSchedulesByDay = (schedules: ScheduleWithLine[]) => {
        const grouped: { [key: string]: ScheduleWithLine[] } = {};

        schedules.forEach((schedule) => {
            if (!grouped[schedule.weekday]) {
                grouped[schedule.weekday] = [];
            }
            grouped[schedule.weekday].push(schedule);
        });

        return grouped;
    };

    // Filter schedules by selected days
    const filteredSchedules =
        selectedDays.length === 0 ? schedules : schedules.filter((schedule) => selectedDays.includes(schedule.weekday));

    const sortedSchedules = sortSchedulesByDayAndTime(filteredSchedules);
    const groupedSchedules = groupSchedulesByDay(sortedSchedules);

    if (loading) {
        return <div className="info-page loading">טוען מידע...</div>;
    }

    return (
        <div className="info-page">
            <div className="filters-container">
                <MultipleDayFilterBar days={daysOfWeek} selectedDays={selectedDays} onDayToggle={handleDaySelection} />
            </div>

            <div className="schedules-container">
                {Object.entries(groupedSchedules).map(([day, daySchedules]) => (
                    <div key={day} className="day-section">
                        <h3 className="day-header">{getHebrewDayName(day)}</h3>
                        <div className="schedules-list">
                            {daySchedules.map((schedule, index) => (
                                <ScheduleCard
                                    key={`${schedule._id}-${index}`}
                                    schedule={schedule}
                                    lineName={schedule.lineName}
                                    lineDirection={schedule.lineDirection}
                                    onClick={() => handleScheduleClick(schedule)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
                {Object.keys(groupedSchedules).length === 0 && <div className="no-schedules">לא נמצאו נסיעות מתאימות</div>}
            </div>

            {selectedSchedule && (
                <ScheduleInfoModal
                    schedule={selectedSchedule}
                    line={lines.find((l) => l.name === selectedSchedule.lineName) || null}
                    open={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default InfoPage;
