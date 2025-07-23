import type { Metadata } from 'next'
import './globals.css'
import './tailwind.css'
import GoogleAnalytics from '../src/components/analytics/GoogleAnalytics'
import CookieConsent from '../src/components/analytics/CookieConsent'

export const metadata: Metadata = {
  title: 'Schedule Builder - Free Online Calendar',
  description: 'Create, manage, and share your schedules with our free online Schedule Builder. Multiple calendar views, reminders. ',
  icons: {
    icon: '/logo.png',
  },

  alternates: {
      canonical: `https://schedule-builder.net/`,
    },
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