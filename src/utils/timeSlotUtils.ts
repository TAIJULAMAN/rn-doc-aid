import { format, parse, isBefore, isToday, getDay } from 'date-fns';
import { TimeSlot, DayOfWeek } from '../types';

const DAY_NAMES: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Get the day name from a date
 */
export const getDayName = (date: Date): DayOfWeek => {
    const dayIndex = getDay(date);
    return DAY_NAMES[dayIndex];
};

/**
 * Generate time slots for a specific date based on doctor's availability
 * Disables past time slots if the date is today
 */
export const generateTimeSlots = (
    date: Date,
    availability: Record<string, string[]>
): TimeSlot[] => {
    const dayName = getDayName(date);
    const availableTimes = availability[dayName] || [];

    const now = new Date();
    const isSelectedDateToday = isToday(date);

    return availableTimes.map((time) => {
        let disabled = false;

        // If the selected date is today, check if the time has passed
        if (isSelectedDateToday) {
            const [hours, minutes] = time.split(':').map(Number);
            const slotDateTime = new Date(date);
            slotDateTime.setHours(hours, minutes, 0, 0);

            disabled = isBefore(slotDateTime, now);
        }

        return {
            time,
            available: true,
            disabled,
        };
    });
};

/**
 * Categorize time slots into Morning, Afternoon, and Evening
 */
export const categorizeTimeSlots = (slots: TimeSlot[]) => {
    const morning: TimeSlot[] = [];
    const afternoon: TimeSlot[] = [];
    const evening: TimeSlot[] = [];

    slots.forEach((slot) => {
        const [hours] = slot.time.split(':').map(Number);

        if (hours < 12) {
            morning.push(slot);
        } else if (hours < 17) {
            afternoon.push(slot);
        } else {
            evening.push(slot);
        }
    });

    return { morning, afternoon, evening };
};

/**
 * Format time to 12-hour format with AM/PM
 */
export const formatTime12Hour = (time: string): string => {
    const parsedTime = parse(time, 'HH:mm', new Date());
    return format(parsedTime, 'h:mm a');
};

/**
 * Check if a doctor has availability on a specific date
 */
export const hasAvailability = (
    date: Date,
    availability: Record<string, string[]>
): boolean => {
    const dayName = getDayName(date);
    const availableTimes = availability[dayName] || [];
    return availableTimes.length > 0;
};

/**
 * Get next available slot for a doctor
 */
export const getNextAvailableSlot = (
    availability: Record<string, string[]>
): { date: Date; time: string } | null => {
    const today = new Date();
    const now = new Date();

    // Check next 14 days
    for (let i = 0; i < 14; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() + i);

        const dayName = getDayName(checkDate);
        const availableTimes = availability[dayName] || [];

        for (const time of availableTimes) {
            const [hours, minutes] = time.split(':').map(Number);
            const slotDateTime = new Date(checkDate);
            slotDateTime.setHours(hours, minutes, 0, 0);

            if (isBefore(now, slotDateTime)) {
                return { date: checkDate, time };
            }
        }
    }

    return null;
};
