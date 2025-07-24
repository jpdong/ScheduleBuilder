import {
  getMonthNames,
  getWeekdayNames,
  isToday,
  isWeekend,
  getDaysInMonth,
  generateCalendarMonth,
  generateCalendarYear,
  formatMonthYear
} from '../utils/calendarUtils';

describe('Calendar Utils', () => {
  describe('getMonthNames', () => {
    it('should return 12 month names in English', () => {
      const months = getMonthNames();
      expect(months).toHaveLength(12);
      expect(months[0]).toBe('January');
      expect(months[11]).toBe('December');
    });
  });

  describe('getWeekdayNames', () => {
    it('should return 7 weekday names in English', () => {
      const weekdays = getWeekdayNames();
      expect(weekdays).toHaveLength(7);
      expect(weekdays[0]).toBe('Sunday');
      expect(weekdays[6]).toBe('Saturday');
    });
  });

  describe('isToday', () => {
    it('should return true for today\'s date', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('isWeekend', () => {
    it('should return true for Saturday', () => {
      // Create a Saturday (day 6)
      const saturday = new Date(2026, 0, 4); // January 4, 2026 is a Saturday
      expect(isWeekend(saturday)).toBe(true);
    });

    it('should return true for Sunday', () => {
      // Create a Sunday (day 0)
      const sunday = new Date(2026, 0, 5); // January 5, 2026 is a Sunday
      expect(isWeekend(sunday)).toBe(true);
    });

    it('should return false for Monday', () => {
      // Create a Monday (day 1)
      const monday = new Date(2026, 0, 6); // January 6, 2026 is a Monday
      expect(isWeekend(monday)).toBe(false);
    });
  });

  describe('getDaysInMonth', () => {
    it('should return correct days for January', () => {
      expect(getDaysInMonth(2026, 0)).toBe(31);
    });

    it('should return correct days for February in non-leap year', () => {
      expect(getDaysInMonth(2026, 1)).toBe(28);
    });

    it('should return correct days for February in leap year', () => {
      expect(getDaysInMonth(2024, 1)).toBe(29);
    });

    it('should return correct days for April', () => {
      expect(getDaysInMonth(2026, 3)).toBe(30);
    });
  });

  describe('generateCalendarMonth', () => {
    it('should generate correct month data for January 2026', () => {
      const month = generateCalendarMonth(2026, 0);
      
      expect(month.name).toBe('January');
      expect(month.number).toBe(0);
      expect(month.year).toBe(2026);
      expect(month.days).toHaveLength(42); // 6 weeks * 7 days
      expect(month.weekdays).toHaveLength(7);
    });

    it('should include days from previous and next months', () => {
      const month = generateCalendarMonth(2026, 0);
      
      // Should have some days that are not current month
      const nonCurrentMonthDays = month.days.filter(day => !day.isCurrentMonth);
      expect(nonCurrentMonthDays.length).toBeGreaterThan(0);
    });
  });

  describe('generateCalendarYear', () => {
    it('should generate 12 months for 2026', () => {
      const year = generateCalendarYear(2026);
      
      expect(year.year).toBe(2026);
      expect(year.months).toHaveLength(12);
      expect(year.months[0].name).toBe('January');
      expect(year.months[11].name).toBe('December');
    });
  });

  describe('formatMonthYear', () => {
    it('should format month and year correctly', () => {
      expect(formatMonthYear(2026, 0)).toBe('January 2026');
      expect(formatMonthYear(2026, 11)).toBe('December 2026');
    });
  });
});