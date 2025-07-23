import type { Metadata } from 'next'
import './globals.css'
import './tailwind.css'
import GoogleAnalytics from '../src/components/analytics/GoogleAnalytics'
import CookieConsent from '../src/components/analytics/CookieConsent'

export const metadata: Metadata = {
  title: 'Random Letter Generator - Free Online Tool',
  description: 'Generate random letters with our free online tool. Customize case, quantity, and excluded letters. Perfect for word games, teaching, and creative projects.',
  icons: {
    icon: '/logo.png',
  },
  
  alternates: {
      canonical: `https://randomletter.net/`,
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