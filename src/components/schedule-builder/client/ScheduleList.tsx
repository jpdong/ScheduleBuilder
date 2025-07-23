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
  // 排序和筛选状态
  const [sortBy, setSortBy] = useState<'startTime' | 'title'>('startTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 处理排序变化
  const handleSortChange = (field: 'startTime' | 'title') => {
    if (sortBy === field) {
      // 如果已经按此字段排序，则切换排序顺序
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // 否则，切换排序字段，并设置为升序
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // 处理搜索变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // 筛选和排序日程
  const filteredAndSortedSchedules = useMemo(() => {
    // 筛选
    let result = schedules;
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(schedule => 
        schedule.title.toLowerCase().includes(lowerSearchTerm) ||
        schedule.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // 排序
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
  
  // 确认删除
  const confirmDelete = (id: string, title: string) => {
    if (window.confirm(`确定要删除日程 "${title}" 吗？`)) {
      onDelete(id);
    }
  };
  
  return (
    <div className="schedule-list">
      {/* 搜索和排序控件 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* 搜索框 */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="搜索日程..."
            style={{ 
              width: '100%',
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        
        {/* 排序控件 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span>排序：</span>
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
            时间
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
            标题
            {sortBy === 'title' && (
              <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
        </div>
      </div>
      
      {/* 日程列表 */}
      {filteredAndSortedSchedules.length === 0 ? (
        <EmptyState
          title={searchTerm ? '没有找到匹配的日程' : '暂无日程安排'}
          description={searchTerm 
            ? '尝试使用不同的搜索词，或清除搜索以查看所有日程。' 
            : '点击"创建新日程"按钮开始添加您的第一个日程安排。'}
          actionText={searchTerm ? '清除搜索' : undefined}
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
                  查看
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
                  编辑
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
                  删除
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