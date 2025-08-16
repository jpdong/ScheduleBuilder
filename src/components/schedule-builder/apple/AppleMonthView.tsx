"use client"
import React, { useMemo, useCallback } from 'react';
import { Schedule } from '../types';

interface AppleMonthViewProps {
  schedules: Schedule[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onScheduleClick: (schedule: Schedule) => void;
  onCreateSchedule: (dateTime: Date) => void;
}

const AppleMonthView: React.FC<AppleMonthViewProps> = ({
  schedules,
  selectedDate,
  onDateChange,
  onScheduleClick,
  onCreateSchedule
}) => {
  // 获取月份的所有日期（包括上月末和下月初的日期以填满6x7网格）
  const monthDates = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    // 当月第一天
    const firstDay = new Date(year, month, 1);
    // 当月最后一天
    const lastDay = new Date(year, month + 1, 0);
    
    // 日历网格的开始日期（上月的日期填充）
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    // 生成42天的日期（6周 x 7天）
    const dates = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  }, [selectedDate]);

  // 获取指定日期的事件
  const getEventsForDate = useCallback((date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return schedules.filter(schedule => {
      const scheduleStart = new Date(schedule.startTime);
      const scheduleEnd = new Date(schedule.endTime);
      
      return (
        (scheduleStart >= startOfDay && scheduleStart <= endOfDay) ||
        (scheduleEnd >= startOfDay && scheduleEnd <= endOfDay) ||
        (scheduleStart <= startOfDay && scheduleEnd >= endOfDay)
      );
    }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [schedules]);

  // 处理日期点击
  const handleDateClick = useCallback((date: Date) => {
    // 如果点击的是其他月份的日期，切换到那个月份
    if (date.getMonth() !== selectedDate.getMonth()) {
      onDateChange(date);
    } else {
      // 如果是当前月份，设置为选中日期
      onDateChange(date);
    }
  }, [selectedDate, onDateChange]);

  // 处理创建事件
  const handleCreateEvent = useCallback((date: Date) => {
    // 默认在上午9点创建事件
    const eventTime = new Date(date);
    eventTime.setHours(9, 0, 0, 0);
    onCreateSchedule(eventTime);
  }, [onCreateSchedule]);

  // 检查日期状态
  const getDateStatus = useCallback((date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    return {
      isToday,
      isSelected,
      isCurrentMonth,
      isWeekend
    };
  }, [selectedDate]);

  // 格式化事件显示
  const formatEventForMonth = useCallback((event: Schedule) => {
    const startTime = new Date(event.startTime);
    const timeStr = startTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return {
      ...event,
      displayTime: timeStr,
      displayTitle: event.title.length > 12 ? event.title.substring(0, 12) + '...' : event.title
    };
  }, []);

  // 周标题
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="apple-month-view">
      {/* 月视图头部 - 星期标题 */}
      <div className="apple-month-header">
        {weekDays.map((day, index) => (
          <div key={day} className={`apple-month-weekday ${index === 0 || index === 6 ? 'weekend' : ''}`}>
            {day}
          </div>
        ))}
      </div>

      {/* 月视图网格 */}
      <div className="apple-month-grid">
        {monthDates.map((date, index) => {
          const events = getEventsForDate(date);
          const { isToday, isSelected, isCurrentMonth, isWeekend } = getDateStatus(date);
          
          return (
            <div
              key={index}
              className={`apple-month-date ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isCurrentMonth ? 'current-month' : 'other-month'} ${isWeekend ? 'weekend' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              {/* 日期数字 */}
              <div className="apple-month-date-number">
                {date.getDate()}
              </div>

              {/* 事件列表 */}
              <div className="apple-month-events">
                {events.slice(0, 3).map((event) => {
                  const formattedEvent = formatEventForMonth(event);
                  return (
                    <div
                      key={event.id}
                      className="apple-month-event"
                      style={{ backgroundColor: event.color || '#007AFF' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onScheduleClick(event);
                      }}
                      title={`${event.title} - ${formattedEvent.displayTime}`}
                    >
                      <span className="apple-month-event-time">
                        {formattedEvent.displayTime}
                      </span>
                      <span className="apple-month-event-title">
                        {formattedEvent.displayTitle}
                      </span>
                    </div>
                  );
                })}
                
                {/* 显示更多事件指示器 */}
                {events.length > 3 && (
                  <div className="apple-month-more-events">
                    +{events.length - 3} more
                  </div>
                )}
              </div>

              {/* 空状态点击区域 - 总是显示以便点击创建事件 */}
              {isCurrentMonth && (
                <div 
                  className="apple-month-empty-area"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreateEvent(date);
                  }}
                >
                  {/* 悬浮时显示添加图标 */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppleMonthView;