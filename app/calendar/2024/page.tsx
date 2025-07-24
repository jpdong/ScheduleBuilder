import CalendarPage from '../../../src/pages/CalendarPage';

export const metadata = {
  title: 'Calendar 2024 - Full Year Calendar with Month Views',
  description: 'View the complete calendar 2024 with month and year views. Print or export calendar images for planning and scheduling. Free online calendar tool.',
  alternates: {
    canonical: `https://schedule-builder.net/calendar/2024`,
  },
};

export default function Calendar2024Page() {
  return <CalendarPage year={2024} />;
}