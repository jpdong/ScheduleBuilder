"use client"
import React, { useMemo, useCallback, memo } from 'react';
import { Schedule } from '../types';
import useContainerHeight from '../hooks/useContainerHeight';
import AdaptiveEventDisplay from './AdaptiveEventDisplay';
import CalendarErrorBoundary from './CalendarErrorBoundary';

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
  // Use container height hook for responsive sizing
  const { containerRef, availableHeight, cellHeight, isResizing, hasError, error } = useContainerHeight({
    headerHeight: 60, // Height of weekday headers
    padding: 0, // No extra padding - let the container fill completely
    rowCount: 6, // 6 weeks in calendar grid
    minCellHeight: 60,
    maxCellHeight: 150,
    debounceMs: 100
  });

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

  // 获取指定日期的事件 - 使用 useMemo 优化性能
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

  // 预计算所有日期的事件以提高性能
  const eventsMap = useMemo(() => {
    const map = new Map<string, Schedule[]>();
    monthDates.forEach(date => {
      const dateKey = date.toDateString();
      map.set(dateKey, getEventsForDate(date));
    });
    return map;
  }, [monthDates, getEventsForDate]);

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

  // Calculate maximum events per cell based on available height
  const maxEventsPerCell = useMemo(() => {
    const eventHeight = 16; // Height of each event item
    const eventSpacing = 2; // Spacing between events
    const dateNumberHeight = 20; // Height reserved for date number
    const cellPadding = 8; // Internal cell padding
    
    const availableEventSpace = cellHeight - dateNumberHeight - cellPadding;
    const maxEvents = Math.floor(availableEventSpace / (eventHeight + eventSpacing));
    
    return Math.max(1, maxEvents); // Always show at least 1 event
  }, [cellHeight]);

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

  // Show error state if height calculation failed
  if (hasError) {
    console.error('AppleMonthView height calculation error:', error);
    return (
      <div className="apple-month-view-error">
        <p>Unable to calculate calendar dimensions. Using fallback layout.</p>
      </div>
    );
  }

  return (
    <CalendarErrorBoundary>
      <div 
        ref={containerRef}
        className={`apple-month-view ${isResizing ? 'resizing' : ''}`}
        style={{
          '--calculated-cell-height': `${cellHeight}px`,
          '--max-events-per-cell': maxEventsPerCell
        } as React.CSSProperties}
      >
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
          const events = eventsMap.get(date.toDateString()) || [];
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

              {/* 自适应事件显示 */}
              <AdaptiveEventDisplay
                events={events}
                availableHeight={cellHeight - 28} // Subtract date number and padding
                maxVisibleEvents={maxEventsPerCell}
                onEventClick={onScheduleClick}
                cellHeight={cellHeight}
              />

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
    </CalendarErrorBoundary>
  );
};

// 使用 memo 优化组件性能
export default memo(AppleMonthView, (prevProps, nextProps) => {
  return (
    prevProps.selectedDate.getTime() === nextProps.selectedDate.getTime() &&
    prevProps.schedules.length === nextProps.schedules.length &&
    prevProps.schedules.every((schedule, index) => 
      schedule.id === nextProps.schedules[index]?.id &&
      schedule.updatedAt === nextProps.schedules[index]?.updatedAt
    )
  );
});