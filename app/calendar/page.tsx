import CalendarIndexPage from '../../src/pages/CalendarIndexPage';

export const metadata = {
    title: 'Calendar Archive - Browse Calendars by Year',
    description: 'Browse our collection of yearly calendars. View complete calendars with month and year views, export functionality, and print support for planning and scheduling.',
    keywords: 'calendar archive, yearly calendars, calendar collection, printable calendars, calendar browser, online calendars',
    openGraph: {
        title: 'Calendar Archive - Browse Calendars by Year',
        description: 'Browse our collection of yearly calendars with full functionality including export and print support.',
        type: 'website',
        url: '/calendar',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Calendar Archive - Browse Calendars by Year',
        description: 'Browse our collection of yearly calendars with full functionality including export and print support.',
    },
    alternates: {
        canonical: '/calendar',
    },
};

export default function CalendarPage() {
    // Define available years - you can expand this list as needed
    const availableYears = [2024, 2025, 2026, 2027, 2028];

    return <CalendarIndexPage availableYears={availableYears} />;
}