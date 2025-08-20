import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppleMonthView from '../AppleMonthView';
import { Schedule } from '../../types';

// Mock hooks
jest.mock('../hooks/useContainerHeight', () => ({
  __esModule: true,
  default: () => ({
    containerRef: { current: null },
    availableHeight: 500,
    cellHeight: 83,
    isResizing: false,
    hasError: false,
    error: undefined,
  }),
}));

jest.mock('../hooks/useViewportHeight', () => ({
  __esModule: true,
  default: () => ({
    viewportHeight: 768,
    isLandscape: false,
    isMobile: false,
  }),
}));

const mockSchedules: Schedule[] = [
  {
    id: '1',
    title: 'Test Event 1',
    description: 'Test Description',
    startTime: new Date('2024-01-15T10:00:00'),
    endTime: new Date('2024-01-15T11:00:00'),
    reminders: [],
    color: '#007AFF',
    shared: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Test Event 2',
    description: 'Test Description 2',
    startTime: new Date('2024-01-15T14:00:00'),
    endTime: new Date('2024-01-15T15:00:00'),
    reminders: [],
    color: '#34C759',
    shared: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const defaultProps = {
  schedules: mockSchedules,
  selectedDate: new Date('2024-01-15'),
  onDateChange: jest.fn(),
  onScheduleClick: jest.fn(),
  onCreateSchedule: jest.fn(),
};

describe('AppleMonthView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render month view with calendar grid', () => {
    render(<AppleMonthView {...defaultProps} />);
    
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
  });

  it('should display events on correct dates', () => {
    render(<AppleMonthView {...defaultProps} />);
    
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();
  });

  it('should call onDateChange when date is clicked', () => {
    render(<AppleMonthView {...defaultProps} />);
    
    const dateCell = screen.getByText('15');
    fireEvent.click(dateCell.closest('.apple-month-date')!);
    
    expect(defaultProps.onDateChange).toHaveBeenCalled();
  });

  it('should call onScheduleClick when event is clicked', () => {
    render(<AppleMonthView {...defaultProps} />);
    
    const eventElement = screen.getByText('Test Event 1');
    fireEvent.click(eventElement);
    
    expect(defaultProps.onScheduleClick).toHaveBeenCalledWith(mockSchedules[0]);
  });

  it('should handle empty schedules array', () => {
    render(<AppleMonthView {...defaultProps} schedules={[]} />);
    
    expect(screen.queryByText('Test Event 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Event 2')).not.toBeInTheDocument();
  });

  it('should highlight today\'s date', () => {
    const today = new Date();
    render(<AppleMonthView {...defaultProps} selectedDate={today} />);
    
    const todayElement = screen.getByText(today.getDate().toString());
    expect(todayElement.closest('.apple-month-date')).toHaveClass('today');
  });

  it('should show selected date', () => {
    render(<AppleMonthView {...defaultProps} />);
    
    const selectedElement = screen.getByText('15');
    expect(selectedElement.closest('.apple-month-date')).toHaveClass('selected');
  });

  it('should handle month navigation correctly', () => {
    const { rerender } = render(<AppleMonthView {...defaultProps} />);
    
    // Change to different month
    const nextMonth = new Date('2024-02-15');
    rerender(<AppleMonthView {...defaultProps} selectedDate={nextMonth} />);
    
    // Should show February dates
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('should display weekend dates with different styling', () => {
    render(<AppleMonthView {...defaultProps} />);
    
    // Find weekend dates (assuming Sunday is first day)
    const weekendDates = screen.getAllByText(/^\d+$/).filter(element => {
      const dateCell = element.closest('.apple-month-date');
      return dateCell?.classList.contains('weekend');
    });
    
    expect(weekendDates.length).toBeGreaterThan(0);
  });

  it('should show "more events" indicator when there are many events', () => {
    const manyEvents: Schedule[] = Array.from({ length: 10 }, (_, i) => ({
      id: `event-${i}`,
      title: `Event ${i}`,
      description: 'Test Description',
      startTime: new Date('2024-01-15T10:00:00'),
      endTime: new Date('2024-01-15T11:00:00'),
      reminders: [],
      color: '#007AFF',
      shared: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    render(<AppleMonthView {...defaultProps} schedules={manyEvents} />);
    
    expect(screen.getByText(/\+\d+ more/)).toBeInTheDocument();
  });

  it('should handle responsive cell height changes', () => {
    const { container } = render(<AppleMonthView {...defaultProps} />);
    
    const monthView = container.querySelector('.apple-month-view');
    expect(monthView).toHaveStyle({
      '--calculated-cell-height': '83px',
    });
  });
});