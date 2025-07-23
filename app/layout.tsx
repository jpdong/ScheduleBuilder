import type { Metadata } from 'next'
import './globals.css'
import './tailwind.css'
import GoogleAnalytics from '../src/components/analytics/GoogleAnalytics'
import CookieConsent from '../src/components/analytics/CookieConsent'

export const metadata: Metadata = {
  title: 'Schedule Builder - Free Online Calendar & Event Management Tool',
  description: 'Create, manage, and share your schedules with our free online Schedule Builder. Multiple calendar views, reminders, and easy sharing. Perfect for personal, business, and team planning.',
  icons: {
    icon: '/logo.png',
  },
  
  alternates: {
      canonical: `https://schedule-builder.net/`,
    },
  keywords: 'schedule builder, calendar tool, event management, online scheduler, meeting planner, time management, schedule sharing, free calendar'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}