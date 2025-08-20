# Design Document

## Overview

The responsive calendar height feature will transform the current fixed-height month calendar into a dynamic, container-aware component that automatically adjusts its cell heights based on available space. This will be achieved through CSS Grid with fractional units, viewport-based calculations, and React hooks for dynamic height detection.

## Architecture

### Component Structure
- **AppleMonthView**: Main month calendar component that will be enhanced with responsive height logic
- **useContainerHeight**: Custom React hook for detecting and tracking container height changes
- **ResponsiveCalendarGrid**: Enhanced grid system that calculates optimal cell heights
- **AdaptiveEventDisplay**: Smart event rendering that adjusts based on available cell space

### Height Calculation Strategy
1. **Container Detection**: Use ResizeObserver API to monitor container height changes
2. **Available Space Calculation**: Calculate usable height after subtracting headers and padding
3. **Grid Cell Sizing**: Distribute available height equally across 6 calendar rows
4. **Event Overflow Handling**: Implement smart truncation and "more" indicators for events

## Components and Interfaces

### useContainerHeight Hook
```typescript
interface ContainerHeightHook {
  containerRef: RefObject<HTMLDivElement>;
  availableHeight: number;
  cellHeight: number;
  isResizing: boolean;
}

const useContainerHeight = (
  headerHeight: number,
  padding: number,
  rowCount: number = 6
): ContainerHeightHook
```

### ResponsiveCalendarGrid Component
```typescript
interface ResponsiveCalendarGridProps {
  dates: CalendarDate[];
  cellHeight: number;
  onDateClick: (date: Date) => void;
  onCreateEvent: (date: Date) => void;
  events: Schedule[];
}
```

### AdaptiveEventDisplay Component
```typescript
interface AdaptiveEventDisplayProps {
  events: Schedule[];
  availableHeight: number;
  maxVisibleEvents: number;
  onEventClick: (event: Schedule) => void;
}
```

## Data Models

### CalendarDimensions
```typescript
interface CalendarDimensions {
  containerHeight: number;
  headerHeight: number;
  paddingVertical: number;
  availableHeight: number;
  cellHeight: number;
  maxEventsPerCell: number;
}
```

### ResponsiveCalendarConfig
```typescript
interface ResponsiveCalendarConfig {
  minCellHeight: number; // 60px minimum
  maxCellHeight: number; // 150px maximum
  eventHeight: number; // 16px per event
  eventSpacing: number; // 2px between events
  dateNumberHeight: number; // 20px for date number
  reservedSpace: number; // 8px padding within cell
}
```

## Error Handling

### ResizeObserver Compatibility
- Implement fallback using window resize events for older browsers
- Graceful degradation to fixed heights if dynamic calculation fails
- Error boundaries around height calculation logic

### Performance Considerations
- Debounce resize events to prevent excessive recalculations
- Use requestAnimationFrame for smooth height transitions
- Memoize expensive calculations using useMemo and useCallback

### Edge Cases
- Handle very small container heights (mobile landscape)
- Manage containers with zero height during initial render
- Account for dynamic content that might affect header heights

## Testing Strategy

### Unit Tests
- Test useContainerHeight hook with various container sizes
- Verify height calculations with different configurations
- Test event overflow logic with varying numbers of events

### Integration Tests
- Test calendar rendering across different viewport sizes
- Verify smooth transitions during window resizing
- Test interaction between height changes and event display

### Visual Regression Tests
- Screenshot comparisons across different screen sizes
- Verify calendar appearance on mobile and desktop
- Test calendar behavior during orientation changes

### Performance Tests
- Measure resize event handling performance
- Test memory usage during frequent resizing
- Verify smooth animations and transitions

## Implementation Approach

### Phase 1: Core Height Detection
1. Implement useContainerHeight hook with ResizeObserver
2. Add container height tracking to AppleMonthView
3. Calculate and apply dynamic cell heights

### Phase 2: Smart Event Display
1. Implement adaptive event rendering based on available space
2. Add event overflow indicators ("+ N more")
3. Optimize event truncation and display logic

### Phase 3: Performance Optimization
1. Add debouncing and throttling for resize events
2. Implement smooth transitions for height changes
3. Add error handling and fallback mechanisms

### Phase 4: Cross-browser Testing
1. Test across all supported browsers and devices
2. Implement browser-specific fixes if needed
3. Add polyfills for older browser support

## CSS Strategy

### Grid System Enhancement
```css
.apple-month-grid {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr); /* Use fractional units */
  gap: 1px;
  /* Remove fixed min-height */
}

.apple-month-date {
  height: 100%; /* Fill available grid cell space */
  min-height: var(--min-cell-height, 60px);
  max-height: var(--max-cell-height, 150px);
}
```

### Viewport-based Calculations
```css
.apple-month-view {
  height: calc(100vh - var(--header-height) - var(--padding));
  max-height: calc(100vh - 200px); /* Account for navigation */
}
```

### Responsive Event Display
```css
.apple-month-events {
  height: calc(100% - var(--date-number-height) - var(--cell-padding));
  overflow: hidden;
}

.apple-month-event {
  height: var(--event-height, 16px);
  flex-shrink: 0;
}
```