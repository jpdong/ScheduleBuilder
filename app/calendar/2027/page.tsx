import CalendarPage from '../../../src/pages/CalendarPage';

export const metadata = {
  title: '2027 Calendar - Full Year Calendar with Month Views',
  description: 'View the complete 2027 calendar with month and year views. Print or export calendar images for planning and scheduling. Free online calendar tool.',
  keywords: '2027 calendar, yearly calendar, monthly calendar, printable calendar, calendar export, online calendar, free calendar',
  openGraph: {
    title: '2027 Calendar - Full Year Calendar with Month Views',
    description: 'View the complete 2027 calendar with month and year views. Print or export calendar images for planning and scheduling.',
    type: 'website',
    url: '/calendar/2027',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2027 Calendar - Full Year Calendar with Month Views',
    description: 'View the complete 2027 calendar with month and year views. Print or export calendar images for planning and scheduling.',
  },
  alternates: {
    canonical: '/calendar/2027',
  },
};

export default function Calendar2027Page() {
  return <CalendarPage year={2027} />;
}