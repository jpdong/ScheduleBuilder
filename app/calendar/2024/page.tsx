import CalendarPage from '../../../src/pages/CalendarPage';

export const metadata = {
  title: '2024 Calendar - Full Year Calendar with Month Views',
  description: 'View the complete 2024 calendar with month and year views. Print or export calendar images for planning and scheduling. Free online calendar tool.',
  keywords: '2024 calendar, yearly calendar, monthly calendar, printable calendar, calendar export, online calendar, free calendar',
  openGraph: {
    title: '2024 Calendar - Full Year Calendar with Month Views',
    description: 'View the complete 2024 calendar with month and year views. Print or export calendar images for planning and scheduling.',
    type: 'website',
    url: '/calendar/2024',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calendar 2024 - Full Year Calendar with Month Views',
    description: 'View the complete calendar 2024 with month and year views. Print or export calendar images for planning and scheduling.',
  },
  alternates: {
    canonical: '/calendar/2024',
  },
};

export default function Calendar2024Page() {
  return <CalendarPage year={2024} />;
}