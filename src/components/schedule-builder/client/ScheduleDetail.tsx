"use client"
import React from 'react';
import { Schedule } from '../types';
import { formatDateTime } from '../utils/dateUtils';

interface ScheduleDetailProps {
  schedule: Schedule;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  onBack?: () => void;
  onClose?: () => void;
}

const ScheduleDetail: React.FC<ScheduleDetailProps> = ({
  schedule,
  onEdit,
  onDelete,
  onShare,
  onBack,
  onClose
}) => {
  // Confirm delete
  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete the schedule "${schedule.title}"?`)) {
      onDelete();
    }
  };

  // Calculate schedule duration
  const getDuration = () => {
    const durationMs = schedule.endTime.getTime() - schedule.startTime.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (minutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${minutes} minutes`;
    }
  };

  // Get reminder text
  const getReminderText = () => {
    if (schedule.reminders.length === 0) {
      return 'No reminders';
    }

    return schedule.reminders.map(reminder => {
      const diffMs = schedule.startTime.getTime() - reminder.time.getTime();
      const diffMinutes = Math.round(diffMs / (1000 * 60));

      if (diffMinutes === 0) {
        return 'At time of event';
      } else if (diffMinutes < 60) {
        return `${diffMinutes} minutes before`;
      } else if (diffMinutes === 60) {
        return '1 hour before';
      } else if (diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        if (minutes === 0) {
          return `${hours} hours before`;
        } else {
          return `${hours} hours ${minutes} minutes before`;
        }
      } else {
        const days = Math.floor(diffMinutes / 1440);
        return `${days} days before`;
      }
    }).join(', ');
  };

  return (
    <div className="schedule-detail">
      <div style={{
        background: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Color marker */}
        <div style={{
          height: '10px',
          background: schedule.color || '#4CAF50'
        }} />

        {/* Title and action buttons */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <h2 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
              {schedule.title}
            </h2>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>
              Created on {formatDateTime(schedule.createdAt)}
              {schedule.updatedAt > schedule.createdAt &&
                ` · Updated on ${formatDateTime(schedule.updatedAt)}`}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {onBack && (
              <button
                onClick={onBack}
                style={{
                  background: 'none',
                  border: '1px solid #ddd',
                  padding: '8px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid #ddd',
                  padding: '8px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            )}
            <button
              onClick={onEdit}
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
          </div>
        </div>

        {/* Detailed information */}
        <div style={{ padding: '20px' }}>
          {/* Time information */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '15px',
            background: '#f9f9f9',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '1.5rem',
              color: '#4CAF50',
              marginRight: '15px'
            }}>
              ⏱️
            </div>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                {formatDateTime(schedule.startTime)} - {formatDateTime(schedule.endTime)}
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                Duration: {getDuration()}
              </div>
            </div>
          </div>

          {/* Description */}
          {schedule.description && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                Description
              </h3>
              <div style={{
                whiteSpace: 'pre-wrap',
                padding: '15px',
                background: '#f9f9f9',
                borderRadius: '8px',
                color: '#666'
              }}>
                {schedule.description}
              </div>
            </div>
          )}

          {/* Reminders */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
              Reminders
            </h3>
            <div style={{
              padding: '15px',
              background: '#f9f9f9',
              borderRadius: '8px',
              color: '#666'
            }}>
              {getReminderText()}
            </div>
          </div>

          {/* Delete button */}
          <div style={{
            borderTop: '1px solid #eee',
            paddingTop: '20px',
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <button
              onClick={confirmDelete}
              style={{
                background: '#FFEBEE',
                color: '#D32F2F',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;