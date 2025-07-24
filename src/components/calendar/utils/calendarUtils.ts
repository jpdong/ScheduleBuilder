/**
 * Calendar utility functions for generating calendar data
 */

export interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isWeekend: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  fullDate: Date;
}

export interface CalendarMonth {
  name: string;
  number: number;
  year: number;
  days: CalendarDay[];
  weekdays: string[];
}

export interface CalendarYear {
  year: number;
  months: CalendarMonth[];
}

/**
 * Get month names in English
 */
export const getMonthNames = (): string[] => [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Get weekday names in English
 */
export const getWeekdayNames = (): string[] => [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

/**
 * Get short weekday names in English
 */
export const getShortWeekdayNames = (): string[] => [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

/**
 * Check if a date is a weekend (Saturday or Sunday)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

/**
 * Get the first day of the month
 */
export const getFirstDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 1);
};

/**
 * Get the last day of the month
 */
export const getLastDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month + 1, 0);
};

/**
 * Get the number of days in a month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return getLastDayOfMonth(year, month).getDate();
};

/**
 * Generate calendar days for a specific month
 */
export const generateMonthDays = (year: number, month: number): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const firstDay = getFirstDayOfMonth(year, month);
  const lastDay = getLastDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  
  // Get the first day of the week (0 = Sunday)
  const firstDayOfWeek = firstDay.getDay();
  
  // Add days from previous month to fill the first week
  if (firstDayOfWeek > 0) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      const fullDate = new Date(prevYear, prevMonth, date);
      days.push({
        date,
        month: prevMonth,
        year: prevYear,
        isWeekend: isWeekend(fullDate),
        isToday: isToday(fullDate),
        isCurrentMonth: false,
        fullDate
      });
    }
  }
  
  // Add days of current month
  for (let date = 1; date <= daysInMonth; date++) {
    const fullDate = new Date(year, month, date);
    days.push({
      date,
      month,
      year,
      isWeekend: isWeekend(fullDate),
      isToday: isToday(fullDate),
      isCurrentMonth: true,
      fullDate
    });
  }
  
  // Add days from next month to fill the last week
  const totalDays = days.length;
  const remainingDays = 42 - totalDays; // 6 weeks * 7 days = 42
  
  if (remainingDays > 0) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    
    for (let date = 1; date <= remainingDays; date++) {
      const fullDate = new Date(nextYear, nextMonth, date);
      days.push({
        date,
        month: nextMonth,
        year: nextYear,
        isWeekend: isWeekend(fullDate),
        isToday: isToday(fullDate),
        isCurrentMonth: false,
        fullDate
      });
    }
  }
  
  return days;
};

/**
 * Generate calendar data for a specific month
 */
export const generateCalendarMonth = (year: number, month: number): CalendarMonth => {
  const monthNames = getMonthNames();
  const weekdays = getShortWeekdayNames();
  const days = generateMonthDays(year, month);
  
  return {
    name: monthNames[month],
    number: month,
    year,
    days,
    weekdays
  };
};

/**
 * Generate calendar data for a full year
 */
export const generateCalendarYear = (year: number): CalendarYear => {
  const months: CalendarMonth[] = [];
  
  for (let month = 0; month < 12; month++) {
    months.push(generateCalendarMonth(year, month));
  }
  
  return {
    year,
    months
  };
};

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format month and year for display
 */
export const formatMonthYear = (year: number, month: number): string => {
  const monthNames = getMonthNames();
  return `${monthNames[month]} ${year}`;
};

/**
 * Get navigation info for month navigation
 */
export const getMonthNavigation = (year: number, month: number) => {
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  
  return {
    prev: {
      month: prevMonth,
      year: prevYear,
      name: formatMonthYear(prevYear, prevMonth)
    },
    next: {
      month: nextMonth,
      year: nextYear,
      name: formatMonthYear(nextYear, nextMonth)
    }
  };
};