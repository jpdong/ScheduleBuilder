"use client"
import React from 'react';
import Link from 'next/link';
import './calendar-index.css';

interface CalendarIndexProps {
  availableYears?: number[];
}

const CalendarIndex: React.FC<CalendarIndexProps> = ({ 
  availableYears = [2024, 2025, 2026, 2027, 2028] 
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="calendar-index">
      {/* Header */}
      <header className="calendar-index-header">
        <h1>Calendar Archive</h1>
        <p>
          Browse calendars by year. View complete yearly calendars with month and year views, 
          export functionality, and print support.
        </p>
      </header>

      {/* Years Grid */}
      <div className="years-grid">
        {availableYears.map((year) => (
          <Link 
            key={year} 
            href={`/calendar/${year}`}
            className={`year-card ${year === currentYear ? 'current' : ''}`}
          >
            {/* Current Year Badge */}
            {year === currentYear && (
              <div className="current-badge">
                Current
              </div>
            )}
            
            {/* Year Display */}
            <div className={`year-display ${year === currentYear ? 'current' : ''}`}>
              {year}
            </div>
            
            {/* Year Info */}
            <div className="year-info">
              Full Year Calendar
            </div>
            
            {/* Features List */}
            <div className="year-features">
              <span>📅 Year View</span>
              <span>📆 Month View</span>
              <span>🖨️ Print</span>
              <span>📷 Export</span>
            </div>
            
            {/* Action Button */}
            <div className={`year-action ${year === currentYear ? 'current' : ''}`}>
              View {year} Calendar →
            </div>
          </Link>
        ))}
      </div>

      {/* Additional Information */}
      <section className="features-section">
        <h2>Calendar Features</h2>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Year Overview</h3>
            <p className="feature-description">
              See all 12 months at a glance with an intuitive grid layout
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">📆</div>
            <h3 className="feature-title">Month Details</h3>
            <p className="feature-description">
              Detailed monthly view with full calendar grid and navigation
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">🖨️</div>
            <h3 className="feature-title">Print Ready</h3>
            <p className="feature-description">
              Optimized layouts for printing on standard paper sizes
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">📷</div>
            <h3 className="feature-title">Export Images</h3>
            <p className="feature-description">
              Download high-quality calendar images for offline use
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default CalendarIndex;