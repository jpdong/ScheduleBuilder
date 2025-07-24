"use client"
import React from 'react';
import { ViewMode } from './CalendarView';

interface CalendarControlsProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  onExport: () => void;
  onPrint: () => void;
}

const CalendarControls: React.FC<CalendarControlsProps> = ({
  viewMode,
  onViewChange,
  onExport,
  onPrint
}) => {
  return (
    <div className="calendar-controls" style={{
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      {/* View Toggle Buttons */}
      <div style={{
        display: 'flex',
        gap: '2px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => onViewChange('year')}
          style={{
            background: viewMode === 'year' ? '#4CAF50' : 'white',
            color: viewMode === 'year' ? 'white' : '#2c3e50',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: viewMode === 'year' ? 'bold' : 'normal',
            transition: 'all 0.2s ease'
          }}
        >
          Year View
        </button>
        <button
          onClick={() => onViewChange('month')}
          style={{
            background: viewMode === 'month' ? '#4CAF50' : 'white',
            color: viewMode === 'month' ? 'white' : '#2c3e50',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: viewMode === 'month' ? 'bold' : 'normal',
            transition: 'all 0.2s ease'
          }}
        >
          Month View
        </button>
      </div>
      
      {/* Export and Print Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={onExport}
          title="Export calendar as image"
          style={{
            background: 'white',
            border: '1px solid #ddd',
            color: '#2c3e50',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.borderColor = '#4CAF50';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#ddd';
          }}
        >
          <span role="img" aria-label="Export" style={{ fontSize: '16px' }}>📷</span>
          Export
        </button>
        
        <button
          onClick={onPrint}
          title="Print calendar"
          style={{
            background: 'white',
            border: '1px solid #ddd',
            color: '#2c3e50',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.borderColor = '#4CAF50';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#ddd';
          }}
        >
          <span role="img" aria-label="Print" style={{ fontSize: '16px' }}>🖨️</span>
          Print
        </button>
      </div>
      

    </div>
  );
};

export default CalendarControls;