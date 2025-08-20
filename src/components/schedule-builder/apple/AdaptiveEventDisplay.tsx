"use client"
import React, { useMemo, memo } from 'react';
import { Schedule } from '../types';

interface AdaptiveEventDisplayProps {
  events: Schedule[];
  availableHeight: number;
  maxVisibleEvents: number;
  onEventClick: (event: Schedule) => void;
  cellHeight: number;
}

const AdaptiveEventDisplay: React.FC<AdaptiveEventDisplayProps> = ({
  events,
  availableHeight,
  maxVisibleEvents,
  onEventClick,
  cellHeight
}) => {
  // Format events for display based on available space
  const formattedEvents = useMemo(() => {
    return events.map(event => {
      const startTime = new Date(event.startTime);
      const timeStr = startTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      // Adjust title length based on cell height
      const maxTitleLength = cellHeight < 80 ? 8 : cellHeight < 120 ? 12 : 16;
      const displayTitle = event.title.length > maxTitleLength
        ? event.title.substring(0, maxTitleLength) + '...'
        : event.title;

      return {
        ...event,
        displayTime: timeStr,
        displayTitle,
        showTime: cellHeight >= 70 // Only show time if cell is tall enough
      };
    });
  }, [events, cellHeight]);

  // Determine which events to show
  const visibleEvents = formattedEvents.slice(0, maxVisibleEvents);
  const hiddenEventsCount = Math.max(0, events.length - maxVisibleEvents);

  // Determine if we should show compact mode
  const isCompactMode = cellHeight < 80;

  return (
    <div className="apple-month-events">
      {visibleEvents.map((event) => (
        <div
          key={event.id}
          className={`apple-month-event ${isCompactMode ? 'compact' : ''}`}
          style={{
            backgroundColor: event.color || '#007AFF',
            height: isCompactMode ? '12px' : '16px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onEventClick(event);
          }}
          title={`${event.title} - ${event.displayTime}`}
        >
          {event.showTime && !isCompactMode && (
            <span className="apple-month-event-time">
              {event.displayTime}
            </span>
          )}
          <span className="apple-month-event-title">
            {event.displayTitle}
          </span>
        </div>
      ))}

      {/* Show "more" indicator if there are hidden events */}
      {hiddenEventsCount > 0 && (
        <div
          className={`apple-month-more-events ${isCompactMode ? 'compact' : ''}`}
          style={{ height: isCompactMode ? '10px' : '12px' }}
        >
          +{hiddenEventsCount} more
        </div>
      )}
    </div>
  );
};

// 使用 memo 优化重渲染性能
export default memo(AdaptiveEventDisplay, (prevProps, nextProps) => {
  return (
    prevProps.events.length === nextProps.events.length &&
    prevProps.availableHeight === nextProps.availableHeight &&
    prevProps.maxVisibleEvents === nextProps.maxVisibleEvents &&
    prevProps.cellHeight === nextProps.cellHeight &&
    prevProps.events.every((event, index) =>
      event.id === nextProps.events[index]?.id &&
      event.title === nextProps.events[index]?.title &&
      event.startTime === nextProps.events[index]?.startTime
    )
  );
});