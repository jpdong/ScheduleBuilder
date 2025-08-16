"use client"
import React, { memo, useMemo } from 'react';
import { Schedule } from '../types';

interface AppleEventCardProps {
  event: Schedule;
  onClick: (event: Schedule) => void;
  className?: string;
}

const AppleEventCard: React.FC<AppleEventCardProps> = memo(({ event, onClick, className }) => {
  // 计算事件持续时间
  const duration = useMemo(() => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    const durationMs = end.getTime() - start.getTime();
    const minutes = Math.round(durationMs / (1000 * 60));
    
    if (minutes < 60) {
      return `${minutes}min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}h`;
      } else {
        return `${hours}h ${remainingMinutes}min`;
      }
    }
  }, [event.startTime, event.endTime]);

  // 格式化时间显示
  const formatTime = useMemo(() => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    
    const formatHour = (date: Date) => {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };
    
    return `${formatHour(start)} - ${formatHour(end)}`;
  }, [event.startTime, event.endTime]);

  // 获取优先级类名
  const getPriorityClass = useMemo(() => {
    if (event.color === '#FF3B30') return 'priority-high';
    if (event.color === '#FF9500') return 'priority-medium';
    if (event.color === '#34C759') return 'priority-low';
    return '';
  }, [event.color]);

  // 解析位置信息
  const locationInfo = useMemo(() => {
    if (!event.description) return null;
    
    // 尝试从描述中提取位置信息
    const locationMatch = event.description.match(/📍\s*(.+?)(?:\s*•|$)/);
    return locationMatch ? locationMatch[1].trim() : null;
  }, [event.description]);

  // 解析参与者信息
  const participantsInfo = useMemo(() => {
    if (!event.description) return null;
    
    // 尝试从描述中提取参与者信息
    const participantsMatch = event.description.match(/👥\s*(.+?)(?:\s*•|$)/);
    return participantsMatch ? participantsMatch[1].trim() : null;
  }, [event.description]);

  // 处理点击事件
  const handleClick = () => {
    onClick(event);
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(event);
    }
  };

  return (
    <div 
      className={`apple-event-card ${getPriorityClass} ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Event: ${event.title}, ${formatTime}, Duration: ${duration}`}
      style={{
        borderLeftColor: event.color || '#007AFF'
      }}
    >
      {/* 事件标题 */}
      <h3 className="apple-event-title">
        {event.title}
      </h3>

      {/* 事件元信息 */}
      <div className="apple-event-meta">
        {/* 时间信息 */}
        <div className="apple-event-meta-item">
          <span>🕒</span>
          <span>{formatTime}</span>
        </div>

        {/* 持续时间 */}
        <div className="apple-event-meta-item">
          <span>({duration})</span>
        </div>
      </div>

      {/* 附加信息 */}
      {(locationInfo || participantsInfo) && (
        <div className="apple-event-meta">
          {/* 位置信息 */}
          {locationInfo && (
            <div className="apple-event-meta-item">
              <span>📍</span>
              <span>{locationInfo}</span>
            </div>
          )}

          {/* 参与者信息 */}
          {participantsInfo && (
            <div className="apple-event-meta-item">
              <span>👥</span>
              <span>{participantsInfo}</span>
            </div>
          )}
        </div>
      )}

      {/* 事件描述 */}
      {event.description && !locationInfo && !participantsInfo && (
        <div className="apple-event-description">
          {event.description.length > 100 
            ? `${event.description.substring(0, 100)}...`
            : event.description
          }
        </div>
      )}

      {/* 提醒指示器 */}
      {event.reminders && event.reminders.length > 0 && (
        <div className="apple-event-meta">
          <div className="apple-event-meta-item">
            <span>🔔</span>
            <span>{event.reminders.length} reminder{event.reminders.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
});

AppleEventCard.displayName = 'AppleEventCard';

export default AppleEventCard;