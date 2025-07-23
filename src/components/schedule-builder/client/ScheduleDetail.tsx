"use client"
import React from 'react';
import { Schedule } from '../types';
import { formatDateTime } from '../utils/dateUtils';

interface ScheduleDetailProps {
  schedule: Schedule;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  onBack: () => void;
}

const ScheduleDetail: React.FC<ScheduleDetailProps> = ({
  schedule,
  onEdit,
  onDelete,
  onShare,
  onBack
}) => {
  // 确认删除
  const confirmDelete = () => {
    if (window.confirm(`确定要删除日程 "${schedule.title}" 吗？`)) {
      onDelete();
    }
  };
  
  // 计算日程持续时间
  const getDuration = () => {
    const durationMs = schedule.endTime.getTime() - schedule.startTime.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) {
      return `${minutes} 分钟`;
    } else if (minutes === 0) {
      return `${hours} 小时`;
    } else {
      return `${hours} 小时 ${minutes} 分钟`;
    }
  };
  
  // 获取提醒文本
  const getReminderText = () => {
    if (schedule.reminders.length === 0) {
      return '无提醒';
    }
    
    return schedule.reminders.map(reminder => {
      const diffMs = schedule.startTime.getTime() - reminder.time.getTime();
      const diffMinutes = Math.round(diffMs / (1000 * 60));
      
      if (diffMinutes === 0) {
        return '准时提醒';
      } else if (diffMinutes < 60) {
        return `提前 ${diffMinutes} 分钟`;
      } else if (diffMinutes === 60) {
        return '提前 1 小时';
      } else if (diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        if (minutes === 0) {
          return `提前 ${hours} 小时`;
        } else {
          return `提前 ${hours} 小时 ${minutes} 分钟`;
        }
      } else {
        const days = Math.floor(diffMinutes / 1440);
        return `提前 ${days} 天`;
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
        {/* 颜色标记 */}
        <div style={{ 
          height: '10px', 
          background: schedule.color || '#4CAF50' 
        }} />
        
        {/* 标题和操作按钮 */}
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
              创建于 {formatDateTime(schedule.createdAt)}
              {schedule.updatedAt > schedule.createdAt && 
                ` · 更新于 ${formatDateTime(schedule.updatedAt)}`}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
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
              返回
            </button>
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
              编辑
            </button>
          </div>
        </div>
        
        {/* 详细信息 */}
        <div style={{ padding: '20px' }}>
          {/* 时间信息 */}
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
                持续时间：{getDuration()}
              </div>
            </div>
          </div>
          
          {/* 描述 */}
          {schedule.description && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                描述
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
          
          {/* 提醒 */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
              提醒
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
          
          {/* 分享状态 */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
              分享状态
            </h3>
            <div style={{ 
              padding: '15px',
              background: '#f9f9f9',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {schedule.shared ? (
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    已分享
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    权限：{schedule.shareSettings?.permission === 'read' ? '只读' : '可编辑'}
                    {schedule.shareSettings?.expiresAt && 
                      ` · 过期时间：${formatDateTime(schedule.shareSettings.expiresAt)}`}
                  </div>
                </div>
              ) : (
                <div style={{ color: '#666' }}>
                  未分享
                </div>
              )}
              
              <button
                onClick={onShare}
                style={{ 
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {schedule.shared ? '管理分享' : '分享'}
              </button>
            </div>
          </div>
          
          {/* 删除按钮 */}
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
              删除日程
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;