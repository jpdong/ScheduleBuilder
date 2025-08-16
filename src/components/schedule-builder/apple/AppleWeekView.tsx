"use client"
import React, { useMemo, useCallback } from 'react';
import { Schedule } from '../types';
import AppleEventCard from './AppleEventCard';

interface AppleWeekViewProps {
  schedules: Schedule[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onScheduleClick: (schedule: Schedule) => void;
  onCreateSchedule: (dateTime: Date) => void;
}

const AppleWeekView: React.FC<AppleWeekViewProps> = ({
  schedules,
  selectedDate,
  onDateChange,
  onScheduleClick,
  onCreateSchedule
}) => {
  // 获取周的开始日期（星期日）
  const getWeekStart = useCallback((date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  }, []);

  // 生成一周的日期
  const weekDates = useMemo(() => {
    const weekStart = getWeekStart(selectedDate);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });
  }, [selectedDate, getWeekStart]);

  // 生成时间段（6:00 - 23:00）
  const timeSlots = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => i + 6);
  }, []);

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

  // 获取指定日期和小时的事件
  const getEventsForDateAndHour = useCallback((date: Date, hour: number) => {
    const dayEvents = getEventsForDate(date);
    return dayEvents.filter(event => {
      const eventHour = new Date(event.startTime).getHours();
      return eventHour === hour;
    });
  }, [getEventsForDate]);

  // 处理时间槽点击
  const handleTimeSlotClick = useCallback((date: Date, hour: number) => {
    const clickDateTime = new Date(date);
    clickDateTime.setHours(hour, 0, 0, 0);
    onCreateSchedule(clickDateTime);
  }, [onCreateSchedule]);

  // 格式化日期显示
  const formatDateHeader = useCallback((date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    return {
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.getDate(),
      isToday
    };
  }, []);

  // 检查是否是当前选中的日期
  const isSelectedDate = useCallback((date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  }, [selectedDate]);

  return (
    <div className="apple-week-view">
      {/* 周视图头部 */}
      <div className="apple-week-header">
        {/* 时间列占位 */}
        <div className="apple-week-time-column-header"></div>
        
        {/* 日期列标题 */}
        {weekDates.map((date, index) => {
          const { dayName, dayNumber, isToday } = formatDateHeader(date);
          const isSelected = isSelectedDate(date);
          
          return (
            <div
              key={index}
              className={`apple-week-date-header ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => onDateChange(date)}
            >
              <div className="apple-week-day-name">{dayName}</div>
              <div className="apple-week-day-number">{dayNumber}</div>
            </div>
          );
        })}
      </div>

      {/* 周视图内容 */}
      <div className="apple-week-content">
        <div className="apple-week-scroll-container">
          {timeSlots.map(hour => (
            <div key={hour} className="apple-week-time-row">
              {/* 时间标签 */}
              <div className="apple-week-time-label">
                {hour.toString().padStart(2, '0')}:00
              </div>

              {/* 每天的时间槽 */}
              {weekDates.map((date, dayIndex) => {
                const events = getEventsForDateAndHour(date, hour);
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = isSelectedDate(date);

                return (
                  <div
                    key={`${hour}-${dayIndex}`}
                    className={`apple-week-time-slot ${events.length > 0 ? 'has-events' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleTimeSlotClick(date, hour)}
                  >
                    {events.length > 0 ? (
                      <div className="apple-week-events">
                        {events.map(event => (
                          <div
                            key={event.id}
                            className="apple-week-event"
                            style={{ backgroundColor: event.color || '#007AFF' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onScheduleClick(event);
                            }}
                          >
                            <div className="apple-week-event-title">
                              {event.title}
                            </div>
                            <div className="apple-week-event-time">
                              {new Date(event.startTime).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="apple-week-empty-slot">
                        {/* 空状态，悬浮时显示"+" */}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppleWeekView;