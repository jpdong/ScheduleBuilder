"use client"
import React, { useState, useMemo } from 'react';
import { Schedule } from '../types';
import { formatDateTime } from '../utils/dateUtils';
import EmptyState from './EmptyState';

interface ScheduleListProps {
  schedules: Schedule[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ 
  schedules, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  // Sort and filter state
  const [sortBy, setSortBy] = useState<'startTime' | 'title'>('startTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handle sort change
  const handleSortChange = (field: 'startTime' | 'title') => {
    if (sortBy === field) {
      // If already sorting by this field, toggle sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Otherwise, switch sort field and set to ascending
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter and sort schedules
  const filteredAndSortedSchedules = useMemo(() => {
    // Filter
    let result = schedules;
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(schedule => 
        schedule.title.toLowerCase().includes(lowerSearchTerm) ||
        schedule.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'startTime') {
        return sortOrder === 'asc' 
          ? a.startTime.getTime() - b.startTime.getTime()
          : b.startTime.getTime() - a.startTime.getTime();
      } else {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });
    
    return result;
  }, [schedules, searchTerm, sortBy, sortOrder]);
  
  // Confirm delete
  const confirmDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete schedule "${title}"?`)) {
      onDelete(id);
    }
  };
  
  return (
    <div className="schedule-list">
      {/* Search and sort controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* Search box */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search schedules..."
            style={{ 
              width: '100%',
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        
        {/* Sort controls */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span>Sort by:</span>
          <button
            onClick={() => handleSortChange('startTime')}
            style={{ 
              background: sortBy === 'startTime' ? '#E8F5E9' : 'white',
              border: '1px solid #ddd',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            Time
            {sortBy === 'startTime' && (
              <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
          <button
            onClick={() => handleSortChange('title')}
            style={{ 
              background: sortBy === 'title' ? '#E8F5E9' : 'white',
              border: '1px solid #ddd',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            Title
            {sortBy === 'title' && (
              <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
        </div>
      </div>
      
      {/* Schedule list */}
      {filteredAndSortedSchedules.length === 0 ? (
        <EmptyState
          title={searchTerm ? 'No matching schedules found' : 'No schedules yet'}
          description={searchTerm 
            ? 'Try using different search terms, or clear the search to see all schedules.' 
            : 'Click the "Create New Schedule" button to add your first schedule.'}
          actionText={searchTerm ? 'Clear Search' : undefined}
          onAction={searchTerm ? () => setSearchTerm('') : undefined}
          icon={searchTerm ? '🔍' : '📅'}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredAndSortedSchedules.map(schedule => (
            <div 
              key={schedule.id}
              style={{ 
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* 颜色标记 */}
              <div style={{ 
                height: '6px', 
                background: schedule.color || '#4CAF50' 
              }} />
              
              {/* 内容区域 */}
              <div style={{ 
                padding: '15px',
                cursor: 'pointer'
              }}
              onClick={() => onView(schedule.id)}
              >
                <h3 style={{ 
                  margin: '0 0 10px 0',
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  {schedule.title}
                </h3>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: '#666',
                  fontSize: '0.9rem',
                  marginBottom: '10px'
                }}>
                  <span style={{ marginRight: '5px' }}>⏱️</span>
                  <span>
                    {formatDateTime(schedule.startTime)} - {formatDateTime(schedule.endTime)}
                  </span>
                </div>
                
                {schedule.description && (
                  <p style={{ 
                    margin: '0',
                    color: '#666',
                    fontSize: '0.9rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {schedule.description}
                  </p>
                )}
              </div>
              
              {/* 操作按钮 */}
              <div style={{ 
                display: 'flex',
                borderTop: '1px solid #eee',
                padding: '10px 15px'
              }}>
                <button
                  onClick={() => onView(schedule.id)}
                  style={{ 
                    flex: '1',
                    background: 'none',
                    border: 'none',
                    padding: '5px',
                    cursor: 'pointer',
                    color: '#2196F3'
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(schedule.id)}
                  style={{ 
                    flex: '1',
                    background: 'none',
                    border: 'none',
                    padding: '5px',
                    cursor: 'pointer',
                    color: '#4CAF50'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(schedule.id, schedule.title)}
                  style={{ 
                    flex: '1',
                    background: 'none',
                    border: 'none',
                    padding: '5px',
                    cursor: 'pointer',
                    color: '#F44336'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;