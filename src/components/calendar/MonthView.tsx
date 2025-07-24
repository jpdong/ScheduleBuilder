"use client"
import React from 'react';
import { CalendarMonth } from './utils/calendarUtils';

interface MonthViewProps {
  monthData: CalendarMonth;
  onNavigate: (direction: 'prev' | 'next') => void;
  onBackToYear: () => void;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}

const MonthView: React.FC<MonthViewProps> = ({
  monthData,
  onNavigate,
  onBackToYear,
  canNavigatePrev,
  canNavigateNext
}) => {
  return (
    <div className="month-view">
      {/* Month Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <button
          onClick={onBackToYear}
          style={{
            background: '#E8F5E9',
            border: '1px solid #4CAF50',
            color: '#4CAF50',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ← Back to Year View
        </button>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => onNavigate('prev')}
            disabled={!canNavigatePrev}
            style={{
              background: canNavigatePrev ? 'white' : '#f5f5f5',
              border: '1px solid #ddd',
              color: canNavigatePrev ? '#2c3e50' : '#ccc',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: canNavigatePrev ? 'pointer' : 'not-allowed',
              fontSize: '14px'
            }}
          >
            ← Previous
          </button>
          
          <button
            onClick={() => onNavigate('next')}
            disabled={!canNavigateNext}
            style={{
              background: canNavigateNext ? 'white' : '#f5f5f5',
              border: '1px solid #ddd',
              color: canNavigateNext ? '#2c3e50' : '#ccc',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: canNavigateNext ? 'pointer' : 'not-allowed',
              fontSize: '14px'
            }}
          >
            Next →
          </button>
        </div>
      </div>
      
      {/* Calendar Container */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '20px',
        border: '1px solid #e0e0e0'
      }}>
        {/* Weekday Headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1px',
          marginBottom: '10px',
          background: '#f8f9fa',
          borderRadius: '4px',
          padding: '10px'
        }}>
          {monthData.weekdays.map((weekday, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#2c3e50',
                fontSize: '0.9rem',
                padding: '8px 4px'
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
          gap: '1px',
          background: '#e0e0e0'
        }}>
          {monthData.days.map((day, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                minHeight: '60px',
                padding: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                position: 'relative',
                color: day.isCurrentMonth 
                  ? (day.isToday ? '#4CAF50' : (day.isWeekend ? '#666' : '#2c3e50'))
                  : '#ccc',
                backgroundColor: day.isToday 
                  ? '#E8F5E9' 
                  : (day.isWeekend && day.isCurrentMonth ? '#fafafa' : 'white'),
                fontWeight: day.isToday ? 'bold' : 'normal',
                fontSize: '1rem'
              }}
            >
              <span style={{
                display: 'inline-block',
                width: '24px',
                height: '24px',
                textAlign: 'center',
                lineHeight: '24px',
                borderRadius: day.isToday ? '50%' : '0',
                backgroundColor: day.isToday ? '#4CAF50' : 'transparent',
                color: day.isToday ? 'white' : 'inherit'
              }}>
                {day.date}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Month Info */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: 0 }}>
          {monthData.name} {monthData.year} - Detailed Month View
        </p>
      </div>
      

    </div>
  );
};

export default MonthView;