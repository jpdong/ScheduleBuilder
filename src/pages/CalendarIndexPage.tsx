import React from 'react';
import Head from 'next/head';
import CalendarIndex from '../components/calendar/CalendarIndex';
import NavBar from '../components/elements/NavBar';
import Footer from '../components/elements/Footer';

interface CalendarIndexPageProps {
  availableYears?: number[];
}

const CalendarIndexPage: React.FC<CalendarIndexPageProps> = ({ 
  availableYears = [2024, 2025, 2026, 2027, 2028] 
}) => {
  
  
  return (
    <>
      <main role="main">
        <NavBar/>
        
        {/* Calendar Index Content */}
        <section style={{
          background: '#f8f9fa',
          minHeight: 'calc(100vh - 200px)',
          padding: '40px 0'
        }}>
          <CalendarIndex availableYears={availableYears} />
        </section>
        
        {/* Additional SEO Content */}
        <section style={{
          background: 'white',
          padding: '50px 20px',
          borderTop: '1px solid #e0e0e0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              color: '#2c3e50',
              fontSize: '2rem',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Why Use Our Calendar Collection?
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              marginTop: '40px'
            }}>
              <div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.3rem', marginBottom: '15px' }}>
                  📱 Responsive Design
                </h3>
                <p style={{ color: '#666', lineHeight: '1.7' }}>
                  Our calendars work perfectly on all devices - desktop, tablet, and mobile. 
                  The layout automatically adapts to provide the best viewing experience.
                </p>
              </div>
              
              <div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.3rem', marginBottom: '15px' }}>
                  🎯 Multiple Views
                </h3>
                <p style={{ color: '#666', lineHeight: '1.7' }}>
                  Switch between year view for overview and month view for detailed planning. 
                  Each view is optimized for different use cases and planning needs.
                </p>
              </div>
              
              <div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.3rem', marginBottom: '15px' }}>
                  💾 Export & Print
                </h3>
                <p style={{ color: '#666', lineHeight: '1.7' }}>
                  Download high-quality images of any calendar view or print directly from your browser. 
                  Perfect for offline planning and sharing.
                </p>
              </div>
              
              <div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.3rem', marginBottom: '15px' }}>
                  ♿ Accessible
                </h3>
                <p style={{ color: '#666', lineHeight: '1.7' }}>
                  Built with accessibility in mind, featuring keyboard navigation, 
                  screen reader support, and high contrast colors.
                </p>
              </div>
              
              <div>
                <h3 style={{ color: '#4CAF50', fontSize: '1.3rem', marginBottom: '15px' }}>
                  🚀 Fast Loading
                </h3>
                <p style={{ color: '#666', lineHeight: '1.7' }}>
                  Optimized for performance with efficient rendering and minimal bundle size. 
                  Calendars load quickly even on slower connections.
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

export default CalendarIndexPage;