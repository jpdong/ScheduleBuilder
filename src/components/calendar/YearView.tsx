"use client"
import React from 'react';
import { CalendarYear } from './utils/calendarUtils';

interface YearViewProps {
  calendarData: CalendarYear;
  onMonthClick: (month: number) => void;
}

const YearView: React.FC<YearViewProps> = ({ calendarData, onMonthClick }) => {
  return (
    <div className="year-view">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
      }}
      className="year-grid"
      >
        {calendarData.months.map((month, index) => (
          <div
            key={index}
            onClick={() => onMonthClick(index)}
            style={{
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '15px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: '1px solid #e0e0e0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            {/* Month Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '10px',
              paddingBottom: '8px',
              borderBottom: '2px solid #4CAF50'
            }}>
              <h3 style={{
                margin: 0,
                color: '#2c3e50',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}>
                {month.name}
              </h3>
            </div>
            
            {/* Weekday Headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '2px',
              marginBottom: '5px'
            }}>
              {month.weekdays.map((weekday, dayIndex) => (
                <div
                  key={dayIndex}
                  style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#666',
                    padding: '4px 2px'
                  }}
                >
                  {weekday}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '1px'
            }}>
              {month.days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  style={{
                    textAlign: 'center',
                    padding: '4px 2px',
                    fontSize: '0.8rem',
                    minHeight: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '2px',
                    color: day.isCurrentMonth 
                      ? (day.isToday ? '#4CAF50' : (day.isWeekend ? '#666' : '#2c3e50'))
                      : '#ccc',
                    backgroundColor: day.isToday ? '#E8F5E9' : 'transparent',
                    fontWeight: day.isToday ? 'bold' : 'normal'
                  }}
                >
                  {day.date}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Year View Info */}
      <div style={{
        marginTop: '30px',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: 0 }}>
          Click on any month to view detailed calendar
        </p>
      </div>
      

    </div>
  );
};

export default YearView;