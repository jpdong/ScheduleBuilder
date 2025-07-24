import CalendarPage from '../../../src/pages/CalendarPage';

export const metadata = {
  title: '2026 Calendar - Full Year Calendar with Month Views',
  description: 'View the complete 2026 calendar with month and year views. Print or export calendar images for planning and scheduling. Free online calendar tool.',
  keywords: '2026 calendar, yearly calendar, monthly calendar, printable calendar, calendar export, online calendar, free calendar',
  openGraph: {
    title: '2026 Calendar - Full Year Calendar with Month Views',
    description: 'View the complete 2026 calendar with month and year views. Print or export calendar images for planning and scheduling.',
    type: 'website',
    url: '/calendar/2026',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 Calendar - Full Year Calendar with Month Views',
    description: 'View the complete 2026 calendar with month and year views. Print or export calendar images for planning and scheduling.',
  },
  alternates: {
    canonical: '/calendar/2026',
  },
};

export default function Calendar2026Page() {
  return <CalendarPage year={2026} />;
}