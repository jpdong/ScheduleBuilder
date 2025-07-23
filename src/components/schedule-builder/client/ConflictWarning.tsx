"use client"
import React from 'react';
import { Schedule } from '../types';
import { formatDateTime } from '../utils/dateUtils';

interface ConflictWarningProps {
  conflictingSchedules: Schedule[];
  onIgnore: () => void;
  onAdjust: () => void;
}

const ConflictWarning: React.FC<ConflictWarningProps> = ({ 
  conflictingSchedules, 
  onIgnore, 
  onAdjust 
}) => {
  return (
    <div style={{ 
      background: '#FFF3E0', 
      border: '1px solid #FFB74D', 
      borderRadius: '8px', 
      padding: '15px',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: '#E65100', marginTop: 0, marginBottom: '10px' }}>
        时间冲突警告
      </h3>
      
      <p style={{ marginBottom: '15px' }}>
        您创建的日程与以下现有日程时间冲突：
      </p>
      
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0, 
        marginBottom: '15px' 
      }}>
        {conflictingSchedules.map(schedule => (
          <li key={schedule.id} style={{ 
            padding: '8px 12px', 
            background: 'rgba(255, 183, 77, 0.2)', 
            borderRadius: '4px',
            marginBottom: '5px'
          }}>
            <div style={{ fontWeight: 'bold' }}>{schedule.title}</div>
            <div style={{ fontSize: '0.9rem' }}>
              {formatDateTime(schedule.startTime)} - {formatDateTime(schedule.endTime)}
            </div>
          </li>
        ))}
      </ul>
      
      <p style={{ marginBottom: '15px' }}>
        您可以选择调整时间以避免冲突，或者忽略此警告继续创建。
      </p>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button 
          onClick={onIgnore}
          style={{ 
            background: 'none',
            border: '1px solid #FFB74D',
            color: '#E65100',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          忽略并继续
        </button>
        <button 
          onClick={onAdjust}
          style={{ 
            background: '#FFB74D',
            border: 'none',
            color: 'white',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          调整时间
        </button>
      </div>
    </div>
  );
};

export default ConflictWarning;