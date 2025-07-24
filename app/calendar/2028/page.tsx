import CalendarPage from '../../../src/pages/CalendarPage';

export const metadata = {
  title: 'Calendar 2028 - Full Year Calendar with Month Views',
  description: 'View the complete calendar 2028 with month and year views. Print or export calendar images for planning and scheduling. Free online calendar tool.',
  alternates: {
    canonical: `https://schedule-builder.net/calendar/2028`,
  },
};

export default function Calendar2028Page() {
  return <CalendarPage year={2028} />;
}