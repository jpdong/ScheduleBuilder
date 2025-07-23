import { ScheduleFormData, ScheduleValidationError, Schedule } from '../types';

/**
 * Validate schedule form data
 * @param data Schedule form data
 * @returns Validation error object, returns empty object if no errors
 */
export const validateScheduleForm = (data: ScheduleFormData): ScheduleValidationError => {
  const errors: ScheduleValidationError = {};

  // Validate title
  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title cannot be empty';
  } else if (data.title.length > 100) {
    errors.title = 'Title cannot exceed 100 characters';
  }

  // Validate description
  if (data.description && data.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  // Validate start time
  if (!data.startTime) {
    errors.startTime = 'Start time cannot be empty';
  }

  // Validate end time
  if (!data.endTime) {
    errors.endTime = 'End time cannot be empty';
  } else if (data.startTime && data.endTime < data.startTime) {
    errors.endTime = 'End time must be later than start time';
  }

  // Validate reminder settings
  if (data.reminders && data.reminders.some(r => r.time < 0)) {
    errors.reminders = 'Reminder time must be a positive number';
  }

  return errors;
};

/**
 * Detect schedule time conflicts
 * @param newSchedule New schedule or edited schedule
 * @param existingSchedules List of existing schedules
 * @returns Whether there is a conflict
 */
export const detectScheduleConflict = (
  newSchedule: Pick<Schedule, 'id' | 'startTime' | 'endTime'>, 
  existingSchedules: Pick<Schedule, 'id' | 'startTime' | 'endTime'>[]
): boolean => {
  return existingSchedules.some(schedule => {
    // Skip comparison with itself (edit case)
    if (schedule.id === newSchedule.id) {
      return false;
    }

    // Check for time overlap
    // Case 1: New schedule's start time is within existing schedule's time range
    // Case 2: New schedule's end time is within existing schedule's time range
    // Case 3: New schedule completely contains existing schedule
    return (
      (newSchedule.startTime >= schedule.startTime && newSchedule.startTime < schedule.endTime) ||
      (newSchedule.endTime > schedule.startTime && newSchedule.endTime <= schedule.endTime) ||
      (newSchedule.startTime <= schedule.startTime && newSchedule.endTime >= schedule.endTime)
    );
  });
};

/**
 * Get conflicting schedules
 * @param newSchedule New schedule or edited schedule
 * @param existingSchedules List of existing schedules
 * @returns List of conflicting schedules
 */
export const getConflictingSchedules = (
  newSchedule: Pick<Schedule, 'id' | 'startTime' | 'endTime'>, 
  existingSchedules: Schedule[]
): Schedule[] => {
  return existingSchedules.filter(schedule => {
    // Skip comparison with itself (edit case)
    if (schedule.id === newSchedule.id) {
      return false;
    }

    // Check for time overlap
    return (
      (newSchedule.startTime >= schedule.startTime && newSchedule.startTime < schedule.endTime) ||
      (newSchedule.endTime > schedule.startTime && newSchedule.endTime <= schedule.endTime) ||
      (newSchedule.startTime <= schedule.startTime && newSchedule.endTime >= schedule.endTime)
    );
  });
};