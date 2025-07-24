import CalendarIndexPage from '../../src/pages/CalendarIndexPage';

export const metadata = {
    title: 'Calendar - Browse Calendars by Year',
    description: 'Browse our collection of yearly calendars. View complete calendars with month and year views, export functionality, and print support for planning and scheduling.',
};

export default function CalendarPage() {
    // Define available years - you can expand this list as needed
    const availableYears = [2024, 2025, 2026, 2027, 2028];

    return <CalendarIndexPage availableYears={availableYears} />;
}