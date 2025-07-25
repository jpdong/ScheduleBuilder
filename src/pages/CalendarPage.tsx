import React from 'react';
import Head from 'next/head';
import CalendarView from '../components/calendar/CalendarView';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';
import YearLink from '../components/calendar/YearLink';

interface CalendarPageProps {
  year?: number;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ year = 2026 }) => {
  const nextYear = year + 1;
  const prevYear = year - 1;

  return (
    <>
      <main role="main">
        <NavBar />
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

        {/* How to Use Section */}
        <section style={{
          background: 'white',
          padding: '40px 20px',
          borderTop: '1px solid #e0e0e0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              color: '#2c3e50',
              fontSize: '1.8rem',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              How to Use Calendar {year}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{
                padding: '20px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#4CAF50',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '1.5rem',
                  color: 'white'
                }}>
                  1
                </div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.2rem', marginBottom: '10px' }}>
                  View Calendar {year}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Browse the complete Calendar {year} with all 12 months displayed in a clear, organized layout.
                  Each month shows all dates for {year}.
                </p>
              </div>

              <div style={{
                padding: '20px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#4CAF50',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '1.5rem',
                  color: 'white'
                }}>
                  2
                </div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.2rem', marginBottom: '10px' }}>
                  Navigate Months
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Click on any month in Calendar {year} to view detailed monthly calendar.
                  Use navigation controls to switch between year and month views.
                </p>
              </div>

              <div style={{
                padding: '20px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#4CAF50',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '1.5rem',
                  color: 'white'
                }}>
                  3
                </div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.2rem', marginBottom: '10px' }}>
                  Export & Print
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Export your Calendar {year} as high-quality images or print directly.
                  Perfect for offline planning and wall calendars.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          background: '#f8f9fa',
          padding: '40px 20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              color: '#2c3e50',
              fontSize: '1.8rem',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Calendar {year} Features
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '25px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📅</div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.1rem', marginBottom: '8px' }}>
                  Complete Year View
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Full Calendar {year} overview with all 12 months in one view
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🖨️</div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.1rem', marginBottom: '8px' }}>
                  Print Ready
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Print Calendar {year} in high quality for offline use
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📱</div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.1rem', marginBottom: '8px' }}>
                  Mobile Friendly
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Access Calendar {year} on any device, anywhere
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💾</div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.1rem', marginBottom: '8px' }}>
                  Export Images
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Save Calendar {year} as PNG images for sharing
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🆓</div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.1rem', marginBottom: '8px' }}>
                  Completely Free
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Use Calendar {year} without any cost or registration
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚡</div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.1rem', marginBottom: '8px' }}>
                  Fast Loading
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Quick access to Calendar {year} with instant loading
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{
          background: 'white',
          padding: '40px 20px'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              color: '#2c3e50',
              fontSize: '1.8rem',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Frequently Asked Questions - Calendar {year}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <details style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <summary style={{
                  fontWeight: 'bold',
                  color: '#4CAF50',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}>
                  How can I print Calendar {year}?
                </summary>
                <p style={{ color: '#666', marginTop: '10px', lineHeight: '1.6' }}>
                  To print Calendar {year}, click the "Print" button in the calendar view.
                  Your browser will open the print dialog where you can select your printer settings.
                  The Calendar {year} is optimized for standard paper sizes.
                </p>
              </details>

              <details style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <summary style={{
                  fontWeight: 'bold',
                  color: '#4CAF50',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}>
                  Can I export Calendar {year} as an image?
                </summary>
                <p style={{ color: '#666', marginTop: '10px', lineHeight: '1.6' }}>
                  Yes! You can export Calendar {year} as a high-quality PNG image.
                  Click the "Export as Image" button to download Calendar {year} to your device.
                  This is perfect for sharing or using as a desktop wallpaper.
                </p>
              </details>

              <details style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <summary style={{
                  fontWeight: 'bold',
                  color: '#4CAF50',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}>
                  Is Calendar {year} free to use?
                </summary>
                <p style={{ color: '#666', marginTop: '10px', lineHeight: '1.6' }}>
                  Absolutely! Calendar {year} is completely free to use.
                  You can view, print, and export Calendar {year} without any cost or registration required.
                </p>
              </details>

              <details style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <summary style={{
                  fontWeight: 'bold',
                  color: '#4CAF50',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}>
                  Does Calendar {year} work on mobile devices?
                </summary>
                <p style={{ color: '#666', marginTop: '10px', lineHeight: '1.6' }}>
                  Yes, Calendar {year} is fully responsive and works perfectly on smartphones, tablets, and desktop computers.
                  The layout automatically adjusts to provide the best viewing experience on your device.
                </p>
              </details>

              <details style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <summary style={{
                  fontWeight: 'bold',
                  color: '#4CAF50',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}>
                  Can I view other years besides Calendar {year}?
                </summary>
                <p style={{ color: '#666', marginTop: '10px', lineHeight: '1.6' }}>
                  Yes! We provide calendars for multiple years. You can access Calendar {prevYear}, Calendar {nextYear},
                  and other years through our calendar index page. Each year has its own dedicated calendar view.
                </p>
              </details>

              <details style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <summary style={{
                  fontWeight: 'bold',
                  color: '#4CAF50',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}>
                  What makes this Calendar {year} special?
                </summary>
                <p style={{ color: '#666', marginTop: '10px', lineHeight: '1.6' }}>
                  Our Calendar {year} offers both year and month views, high-quality printing,
                  image export functionality, and mobile-friendly design. It's fast, free, and requires no registration.
                  Perfect for planning your {year} activities and events.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Years Section */}
        <section style={{
          background: '#f8f9fa',
          padding: '40px 20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              color: '#2c3e50',
              fontSize: '1.8rem',
              marginBottom: '30px'
            }}>
              Other Calendar Years
            </h2>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
              Explore calendars for other years with the same great features as Calendar {year}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              {[2024, 2025, 2026, 2027, 2028].filter(y => y !== year).map(y => (
                <YearLink
                  key={y}
                  year={y}
                  href={`/calendar/${y}`}
                >
                  Calendar {y}
                </YearLink>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default CalendarPage;