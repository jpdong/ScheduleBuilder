import CalendarPage from '../../../src/pages/CalendarPage';

export const metadata = {
  title: '2025 Calendar - Full Year Calendar with Month Views',
  description: 'View the complete 2025 calendar with month and year views. Print or export calendar images for planning and scheduling. Free online calendar tool.',
  keywords: '2025 calendar, yearly calendar, monthly calendar, printable calendar, calendar export, online calendar, free calendar',
  openGraph: {
    title: '2025 Calendar - Full Year Calendar with Month Views',
    description: 'View the complete 2025 calendar with month and year views. Print or export calendar images for planning and scheduling.',
    type: 'website',
    url: '/calendar/2025',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 Calendar - Full Year Calendar with Month Views',
    description: 'View the complete 2025 calendar with month and year views. Print or export calendar images for planning and scheduling.',
  },
  alternates: {
    canonical: '/calendar/2025',
  },
};

export default function Calendar2025Page() {
  return <CalendarPage year={2025} />;
}