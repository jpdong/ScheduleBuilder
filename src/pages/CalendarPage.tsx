import React from 'react';
import Head from 'next/head';
import CalendarView from '../components/calendar/CalendarView';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';
interface CalendarPageProps {
  year?: number;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ year = 2026 }) => {
  const pageTitle = `${year} Calendar - Full Year Calendar with Month Views`;
  const pageDescription = `View the complete ${year} calendar with month and year views. Print or export calendar images for planning and scheduling. Free online calendar tool.`;
  const pageKeywords = `${year} calendar, yearly calendar, monthly calendar, printable calendar, calendar export, online calendar, free calendar`;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "datePublished": `${year}-01-01`,
    "inLanguage": "en-US",
    "mainEntity": {
      "@type": "Calendar",
      "name": `${year} Calendar`,
      "description": `Complete ${year} calendar with all months and dates`,
      "startDate": `${year}-01-01`,
      "endDate": `${year}-12-31`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Calendar",
          "item": `/calendar/${year}`
        }
      ]
    }
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="Schedule Builder" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`/calendar/${year}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:site_name" content="Schedule Builder" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`/calendar/${year}`} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />

        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="format-detection" content="telephone=no" />

        {/* Canonical URL */}
        <link rel="canonical" href={`/calendar/${year}`} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </Head>

      <main role="main">
        <NavBar/>
        {/* Page Header */}
        <header style={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          color: 'white',
          padding: '40px 20px',
          textAlign: 'center',
          marginBottom: '0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{
              margin: '0 0 10px 0',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              {year} Calendar
            </h1>
            <p style={{
              margin: 0,
              fontSize: '1.1rem',
              opacity: 0.9
            }}>
              Complete year view with detailed monthly calendars. Export and print functionality included.
            </p>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{
          background: '#f8f9fa',
          padding: '10px 20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <ol style={{
              display: 'flex',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '0.9rem'
            }}>
              <li>
                <a href="/" style={{ color: '#4CAF50', textDecoration: 'none' }}>
                  Home
                </a>
              </li>
              <li style={{ margin: '0 8px', color: '#666' }}>
                /
              </li>
              <li style={{ color: '#666' }}>
                Calendar {year}
              </li>
            </ol>
          </div>
        </nav>

        {/* Calendar Content */}
        <section style={{
          background: '#f8f9fa',
          minHeight: 'calc(100vh - 200px)',
          padding: '20px 0'
        }}>
          <CalendarView year={year} />
        </section>

        {/* Additional Information */}
        <section style={{
          background: 'white',
          padding: '40px 20px',
          borderTop: '1px solid #e0e0e0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              color: '#2c3e50',
              fontSize: '1.5rem',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              About This Calendar
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              marginTop: '30px'
            }}>
              <div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.2rem', marginBottom: '10px' }}>
                  Year View
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Get a complete overview of {year} with all 12 months displayed in an easy-to-read grid format.
                  Click on any month to switch to detailed month view.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.2rem', marginBottom: '10px' }}>
                  Month View
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  View individual months in detail with a full calendar grid. Navigate between months
                  and easily return to the year view.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.2rem', marginBottom: '10px' }}>
                  Export & Print
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Export calendar views as high-quality images or print them directly.
                  Perfect for offline planning and sharing.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </main>
    </>
  );
};

export default CalendarPage;