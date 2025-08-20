import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdaptiveEventDisplay from '../AdaptiveEventDisplay';
import { Schedule } from '../../types';

const mockSchedules: Schedule[] = [
  {
    id: '1',
    title: 'Short Event',
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
    title: 'Very Long Event Title That Should Be Truncated',
    description: 'Test Description 2',
    startTime: new Date('2024-01-15T14:00:00'),
    endTime: new Date('2024-01-15T15:00:00'),
    reminders: [],
    color: '#34C759',
    shared: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Another Event',
    description: 'Test Description 3',
    startTime: new Date('2024-01-15T16:00:00'),
    endTime: new Date('2024-01-15T17:00:00'),
    reminders: [],
    color: '#FF9500',
    shared: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const defaultProps = {
  events: mockSchedules,
  availableHeight: 100,
  maxVisibleEvents: 2,
  onEventClick: jest.fn(),
  cellHeight: 100,
};

describe('AdaptiveEventDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render events within maxVisibleEvents limit', () => {
    render(<AdaptiveEventDisplay {...defaultProps} />);
    
    expect(screen.getByText('Short Event')).toBeInTheDocument();
    expect(screen.getByText(/Very Long Event/)).toBeInTheDocument();
    expect(screen.queryByText('Another Event')).not.toBeInTheDocument();
  });

  it('should show "more events" indicator when events exceed limit', () => {
    render(<AdaptiveEventDisplay {...defaultProps} />);
    
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('should truncate long event titles based on cell height', () => {
    render(<AdaptiveEventDisplay {...defaultProps} cellHeight={80} />);
    
    const truncatedTitle = screen.getByText(/Very Long Event/);
    expect(truncatedTitle.textContent).toContain('...');
  });

  it('should hide event times in compact mode', () => {
    render(<AdaptiveEventDisplay {...defaultProps} cellHeight={70} />);
    
    // Times should not be visible in compact mode
    expect(screen.queryByText('10:00 AM')).not.toBeInTheDocument();
  });

  it('should show event times in normal mode', () => {
    render(<AdaptiveEventDisplay {...defaultProps} cellHeight={100} />);
    
    // Times should be visible in normal mode
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('2:00 PM')).toBeInTheDocument();
  });

  it('should apply compact styling for small cell heights', () => {
    const { container } = render(
      <AdaptiveEventDisplay {...defaultProps} cellHeight={70} />
    );
    
    const compactEvents = container.querySelectorAll('.apple-month-event.compact');
    expect(compactEvents.length).toBeGreaterThan(0);
  });

  it('should call onEventClick when event is clicked', () => {
    render(<AdaptiveEventDisplay {...defaultProps} />);
    
    const eventElement = screen.getByText('Short Event');
    fireEvent.click(eventElement);
    
    expect(defaultProps.onEventClick).toHaveBeenCalledWith(mockSchedules[0]);
  });

  it('should handle empty events array', () => {
    render(<AdaptiveEventDisplay {...defaultProps} events={[]} />);
    
    expect(screen.queryByText('Short Event')).not.toBeInTheDocument();
    expect(screen.queryByText('+1 more')).not.toBeInTheDocument();
  });

  it('should adjust title length based on cell height', () => {
    const { rerender } = render(
      <AdaptiveEventDisplay {...defaultProps} cellHeight={60} />
    );
    
    // Small cell height should result in shorter titles
    let titleElement = screen.getByText(/Very Long Event/);
    const shortTitle = titleElement.textContent;
    
    rerender(<AdaptiveEventDisplay {...defaultProps} cellHeight={140} />);
    
    // Larger cell height should allow longer titles
    titleElement = screen.getByText(/Very Long Event/);
    const longTitle = titleElement.textContent;
    
    expect(longTitle!.length).toBeGreaterThanOrEqual(shortTitle!.length);
  });

  it('should show all events when maxVisibleEvents is greater than events length', () => {
    render(<AdaptiveEventDisplay {...defaultProps} maxVisibleEvents={5} />);
    
    expect(screen.getByText('Short Event')).toBeInTheDocument();
    expect(screen.getByText(/Very Long Event/)).toBeInTheDocument();
    expect(screen.getByText('Another Event')).toBeInTheDocument();
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
  });

  it('should handle single event correctly', () => {
    render(
      <AdaptiveEventDisplay 
        {...defaultProps} 
        events={[mockSchedules[0]]} 
        maxVisibleEvents={1} 
      />
    );
    
    expect(screen.getByText('Short Event')).toBeInTheDocument();
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
  });
});