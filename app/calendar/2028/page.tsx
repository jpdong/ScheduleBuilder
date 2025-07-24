import CalendarPage from '../../../src/pages/CalendarPage';

export const metadata = {
  title: '2028 Calendar - Full Year Calendar with Month Views',
  description: 'View the complete 2028 calendar with month and year views. Print or export calendar images for planning and scheduling. Free online calendar tool.',
  keywords: '2028 calendar, yearly calendar, monthly calendar, printable calendar, calendar export, online calendar, free calendar',
  openGraph: {
    title: '2028 Calendar - Full Year Calendar with Month Views',
    description: 'View the complete 2028 calendar with month and year views. Print or export calendar images for planning and scheduling.',
    type: 'website',
    url: '/calendar/2028',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2028 Calendar - Full Year Calendar with Month Views',
    description: 'View the complete 2028 calendar with month and year views. Print or export calendar images for planning and scheduling.',
  },
  alternates: {
    canonical: '/calendar/2028',
  },
};

export default function Calendar2028Page() {
  return <CalendarPage year={2028} />;
}