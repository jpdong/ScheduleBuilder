import CalendarPage from '../../../src/pages/CalendarPage';

export const metadata = {
  title: 'Calendar 2025 - Full Year Calendar with Month Views',
  description: 'View the complete calendar 2025 with month and year views. Print or export calendar images for planning and scheduling. Free online calendar tool.',
  alternates: {
    canonical: `https://schedule-builder.net/calendar/2025`,
  },
};

export default function Calendar2025Page() {
  return <CalendarPage year={2025} />;
}