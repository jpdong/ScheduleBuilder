"use client"
import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  onCreateSchedule?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No schedules yet",
  description = "Create your first schedule to get started",
  actionText,
  onAction,
  onCreateSchedule,
  icon = "📅"
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      background: '#f9f9f9',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      {icon && (
        <div style={{ marginBottom: '20px', fontSize: '3rem', color: '#9e9e9e' }}>
          {icon}
        </div>
      )}
      
      <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
        {title}
      </h3>
      
      <p style={{ margin: '0 0 20px 0', color: '#666', maxWidth: '400px' }}>
        {description}
      </p>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {actionText && onAction && (
          <button
            onClick={onAction}
            style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {actionText}
          </button>
        )}
        
        {onCreateSchedule && (
          <button
            onClick={onCreateSchedule}
            style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            + Create Schedule
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;