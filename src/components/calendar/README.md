# Calendar Component

A comprehensive calendar component for displaying yearly and monthly calendar views with export and print functionality.

## Features

- **Year View**: Display all 12 months of a year in a grid layout
- **Month View**: Detailed view of individual months with full calendar grid
- **Export**: Generate high-quality PNG images of calendar views
- **Print**: Print-optimized layouts for both year and month views
- **Responsive**: Mobile-friendly design that adapts to different screen sizes
- **SEO Optimized**: Proper meta tags and structured data for search engines
- **Accessibility**: Keyboard navigation and screen reader support

## Components

### CalendarView
Main component that manages the calendar state and view switching.

```tsx
<CalendarView 
  year={2026} 
  initialView="year" 
  initialMonth={0} 
/>
```

### YearView
Displays all 12 months in a grid layout.

```tsx
<YearView 
  calendarData={calendarData} 
  onMonthClick={handleMonthClick} 
/>
```

### MonthView
Shows detailed view of a single month.

```tsx
<MonthView 
  monthData={monthData}
  onNavigate={handleNavigate}
  onBackToYear={handleBackToYear}
  canNavigatePrev={true}
  canNavigateNext={true}
/>
```

### CalendarControls
Provides view switching and export/print controls.

```tsx
<CalendarControls
  viewMode="year"
  onViewChange={handleViewChange}
  onExport={handleExport}
  onPrint={handlePrint}
/>
```

## Usage

### Basic Usage

```tsx
import CalendarPage from './src/pages/CalendarPage';

function App() {
  return <CalendarPage year={2026} />;
}
```

### Next.js Page

```tsx
// app/calendar/2026/page.tsx
import CalendarPage from '../../../src/pages/CalendarPage';

export default function Calendar2026Page() {
  return <CalendarPage year={2026} />;
}
```

## Utilities

### Calendar Utils

The `calendarUtils.ts` file provides utility functions for:

- Generating calendar data for any year
- Date calculations and formatting
- Weekend and today detection
- Month navigation helpers

Key functions:
- `generateCalendarYear(year)`: Generate full year calendar data
- `generateCalendarMonth(year, month)`: Generate single month data
- `isToday(date)`: Check if date is today
- `isWeekend(date)`: Check if date is weekend
- `formatMonthYear(year, month)`: Format month and year for display

## Styling

The component uses CSS-in-JS for styling with responsive breakpoints:

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: 767px and below

Custom CSS classes are available in `calendar.css` for additional styling.

## SEO Features

- Proper meta tags for title, description, and keywords
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for search engines
- Semantic HTML structure
- Breadcrumb navigation
- Canonical URLs

## Export Features

### Image Export
- Uses html2canvas library
- Generates high-quality PNG images
- Modal preview with download option
- Proper filename generation

### Print Support
- Print-optimized CSS styles
- Handles different paper sizes
- Includes title and date information
- Cross-browser compatibility

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color scheme
- Proper focus management

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- React 18+
- html2canvas (for image export)
- Next.js (for SSR and routing)

## Testing

Run tests with:

```bash
npm test src/components/calendar
```

Test coverage includes:
- Calendar utility functions
- Date calculations
- Component rendering
- Export functionality

## Performance

- Optimized for large calendar grids
- Efficient re-rendering with React.memo
- Lazy loading for month data
- Minimal bundle size impact

## Future Enhancements

- Multiple year support
- Event integration
- Custom themes
- Internationalization
- Holiday highlighting
- Week number display