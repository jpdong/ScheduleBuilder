"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Schedule } from '../types';
import { useSchedule } from '../context/ScheduleContext';
import AppleEventCard from './AppleEventCard';
import AppleCreateModal from './AppleCreateModal';
import AppleQuickActions from './AppleQuickActions';
import AppleWeekView from './AppleWeekView';
import AppleMonthView from './AppleMonthView';
import './apple-styles.css';

interface AppleScheduleBuilderProps {
  className?: string;
}

const AppleScheduleBuilder: React.FC<AppleScheduleBuilderProps> = ({ className }) => {
  const {
    schedules,
    selectedDate,
    setSelectedDate,
    addSchedule,
    updateSchedule,
    deleteSchedule,
  } = useSchedule();

  // 组件状态
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [quickActionPosition, setQuickActionPosition] = useState({ x: 0, y: 0 });
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);

  // 获取当天的日程
  const getTodaySchedules = useCallback(() => {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedDate);
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
  }, [schedules, selectedDate]);

  // 生成时间段
  const generateTimeSlots = useCallback(() => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      slots.push({
        hour,
        time: `${hour.toString().padStart(2, '0')}:00`,
        events: getTodaySchedules().filter(schedule => {
          const scheduleHour = new Date(schedule.startTime).getHours();
          return scheduleHour === hour;
        })
      });
    }
    return slots;
  }, [getTodaySchedules]);

  // 处理时间段点击
  const handleTimeSlotClick = useCallback((hour: number, event: React.MouseEvent) => {
    console.log('=== Day View Time Slot Click ===');
    console.log('Current selectedDate:', selectedDate);
    console.log('Clicked hour:', hour);
    
    const clickDateTime = new Date(selectedDate);
    clickDateTime.setHours(hour, 0, 0, 0);
    
    console.log('Generated clickDateTime:', clickDateTime);
    console.log('clickDateTime.toString():', clickDateTime.toString());
    console.log('clickDateTime.toISOString():', clickDateTime.toISOString());
    
    setSelectedTimeSlot(clickDateTime);
    console.log('Set selectedTimeSlot to:', clickDateTime);
    setIsCreateModalOpen(true);
  }, [selectedDate]);

  // 处理长按
  const handleLongPressStart = useCallback((event: React.MouseEvent, hour: number) => {
    const timer = setTimeout(() => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setQuickActionPosition({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
      setShowQuickActions(true);
      setSelectedTimeSlot(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hour));
    }, 500);
    setLongPressTimer(timer);
  }, [selectedDate]);

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  }, [longPressTimer]);

  // 处理创建事件（从其他视图调用）
  const handleCreateSchedule = useCallback((dateTime: Date) => {
    setSelectedTimeSlot(dateTime);
    setSelectedDate(dateTime); // 同时更新选中日期
    setIsCreateModalOpen(true);
  }, [setSelectedDate]);

  // 处理事件创建
  const handleCreateEvent = useCallback(async (eventData: Partial<Schedule>) => {
    try {
      const newSchedule: Schedule = {
        id: Date.now().toString(),
        title: eventData.title || '',
        description: eventData.description || '',
        startTime: eventData.startTime || selectedTimeSlot || new Date(),
        endTime: eventData.endTime || new Date((eventData.startTime || selectedTimeSlot || new Date()).getTime() + 60 * 60 * 1000),
        reminders: eventData.reminders || [],
        color: eventData.color || '#007AFF',
        shared: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addSchedule(newSchedule);
      setIsCreateModalOpen(false);
      setSelectedTimeSlot(null);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  }, [addSchedule, selectedTimeSlot]);

  // 处理事件编辑
  const handleEditEvent = useCallback(async (eventData: Partial<Schedule>) => {
    if (!selectedSchedule) return;

    try {
      await updateSchedule(selectedSchedule.id, eventData);
      setIsEditModalOpen(false);
      setSelectedSchedule(null);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  }, [updateSchedule, selectedSchedule]);

  // 处理事件删除
  const handleDeleteEvent = useCallback(async (scheduleId: string) => {
    try {
      await deleteSchedule(scheduleId);
      setIsEditModalOpen(false);
      setSelectedSchedule(null);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  }, [deleteSchedule]);

  // 处理事件点击
  const handleEventClick = useCallback((schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsEditModalOpen(true);
  }, []);

  // 处理日期导航
  const handleDateNavigation = useCallback((direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(selectedDate);
    
    switch (direction) {
      case 'prev':
        if (currentView === 'day') {
          newDate.setDate(newDate.getDate() - 1);
        } else if (currentView === 'week') {
          newDate.setDate(newDate.getDate() - 7);
        } else if (currentView === 'month') {
          newDate.setMonth(newDate.getMonth() - 1);
        }
        break;
      case 'next':
        if (currentView === 'day') {
          newDate.setDate(newDate.getDate() + 1);
        } else if (currentView === 'week') {
          newDate.setDate(newDate.getDate() + 7);
        } else if (currentView === 'month') {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        break;
      case 'today':
        return setSelectedDate(new Date());
    }
    
    setSelectedDate(newDate);
  }, [selectedDate, setSelectedDate, currentView]);

  // 格式化日期显示
  const formatDateTitle = useCallback((date: Date) => {
    const today = new Date();
    
    if (currentView === 'day') {
      const isToday = date.toDateString() === today.toDateString();
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const isTomorrow = date.toDateString() === tomorrow.toDateString();
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = date.toDateString() === yesterday.toDateString();
      
      if (isToday) return 'Today';
      if (isTomorrow) return 'Tomorrow';
      if (isYesterday) return 'Yesterday';
      
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    } else if (currentView === 'week') {
      // 获取周的开始和结束日期
      const weekStart = new Date(date);
      const day = weekStart.getDay();
      const diff = weekStart.getDate() - day;
      weekStart.setDate(diff);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const startMonth = weekStart.toLocaleDateString('en-US', { month: 'short' });
      const endMonth = weekEnd.toLocaleDateString('en-US', { month: 'short' });
      
      if (startMonth === endMonth) {
        return `${startMonth} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      } else {
        return `${startMonth} ${weekStart.getDate()} - ${endMonth} ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      }
    } else {
      // Month view
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric'
      });
    }
  }, [currentView]);

  // 处理快速操作
  const handleQuickAction = useCallback((type: string) => {
    const baseEvent = {
      startTime: selectedTimeSlot || new Date(),
      endTime: new Date((selectedTimeSlot || new Date()).getTime() + 60 * 60 * 1000),
    };

    switch (type) {
      case 'meeting':
        handleCreateEvent({
          ...baseEvent,
          title: 'Meeting',
          color: '#007AFF',
        });
        break;
      case 'call':
        handleCreateEvent({
          ...baseEvent,
          title: 'Phone Call',
          endTime: new Date((selectedTimeSlot || new Date()).getTime() + 30 * 60 * 1000),
          color: '#34C759',
        });
        break;
      case 'break':
        handleCreateEvent({
          ...baseEvent,
          title: 'Break',
          endTime: new Date((selectedTimeSlot || new Date()).getTime() + 15 * 60 * 1000),
          color: '#FF9500',
        });
        break;
      case 'focus':
        handleCreateEvent({
          ...baseEvent,
          title: 'Focus Time',
          endTime: new Date((selectedTimeSlot || new Date()).getTime() + 2 * 60 * 60 * 1000),
          color: '#AF52DE',
        });
        break;
      default:
        setIsCreateModalOpen(true);
    }
    
    setShowQuickActions(false);
  }, [selectedTimeSlot, handleCreateEvent]);

  // 关闭快速操作面板
  const handleCloseQuickActions = useCallback(() => {
    setShowQuickActions(false);
  }, []);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + N: 新建事件
      if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
        event.preventDefault();
        setIsCreateModalOpen(true);
      }
      
      // Escape: 关闭模态框
      if (event.key === 'Escape') {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setShowQuickActions(false);
      }
      
      // 左右箭头: 日期导航
      if (event.key === 'ArrowLeft') {
        handleDateNavigation('prev');
      }
      if (event.key === 'ArrowRight') {
        handleDateNavigation('next');
      }
      
      // T: 回到今天
      if (event.key === 't' || event.key === 'T') {
        handleDateNavigation('today');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDateNavigation]);

  const timeSlots = generateTimeSlots();

  return (
    <div className={`apple-schedule-builder ${className || ''}`}>
      {/* 导航栏 */}
      <div className="apple-nav-bar">
        <button 
          className="apple-nav-button"
          onClick={() => handleDateNavigation('prev')}
          aria-label="Previous day"
        >
          ‹
        </button>
        <h1 className="apple-nav-title">Schedule</h1>
        <button 
          className="apple-nav-button"
          onClick={() => handleDateNavigation('next')}
          aria-label="Next day"
        >
          ›
        </button>
      </div>

      {/* 主内容区域 */}
      <div className="apple-main-content">
        {/* 头部区域 */}
        <div className="apple-header-section">
          <div className="apple-date-header">
            <h2 className="apple-date-title">
              {formatDateTitle(selectedDate)}
            </h2>
            <button 
              className="apple-add-button"
              onClick={() => setIsCreateModalOpen(true)}
            >
              + New
            </button>
          </div>

          {/* 视图切换标签 */}
          <div className="apple-view-tabs">
            <button 
              className={`apple-tab-button ${currentView === 'day' ? 'active' : ''}`}
              onClick={() => {
                console.log('Day button clicked');
                setCurrentView('day');
              }}
              type="button"
            >
              Day
            </button>
            <button 
              className={`apple-tab-button ${currentView === 'week' ? 'active' : ''}`}
              onClick={() => {
                console.log('Week button clicked');
                setCurrentView('week');
              }}
              type="button"
            >
              Week
            </button>
            <button 
              className={`apple-tab-button ${currentView === 'month' ? 'active' : ''}`}
              onClick={() => {
                console.log('Month button clicked');
                setCurrentView('month');
              }}
              type="button"
            >
              Month
            </button>
          </div>
        </div>

        {/* 视图内容 */}
        <div className="apple-view-container">
          {currentView === 'day' && (
            <div className="apple-timeline-view apple-view-transition">
              <div className="apple-timeline-content">
                {timeSlots.map(({ hour, time, events }) => (
                  <div key={hour} className="apple-time-slot">
                    <div className="apple-time-label">{time}</div>
                    <div 
                      className={`apple-time-content ${events.length > 0 ? 'has-events' : ''}`}
                      onClick={(e) => events.length === 0 && handleTimeSlotClick(hour, e)}
                      onMouseDown={(e) => events.length === 0 && handleLongPressStart(e, hour)}
                      onMouseUp={handleLongPressEnd}
                      onMouseLeave={handleLongPressEnd}
                    >
                      {events.length > 0 ? (
                        events.map(event => (
                          <AppleEventCard
                            key={event.id}
                            event={event}
                            onClick={() => handleEventClick(event)}
                          />
                        ))
                      ) : (
                        <div className="apple-empty-slot">
                          Tap to add
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'week' && (
            <div className="apple-view-transition">
              <AppleWeekView
                schedules={schedules}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onScheduleClick={handleEventClick}
                onCreateSchedule={handleCreateSchedule}
              />
            </div>
          )}

          {currentView === 'month' && (
            <div className="apple-view-transition">
              <AppleMonthView
                schedules={schedules}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onScheduleClick={handleEventClick}
                onCreateSchedule={handleCreateSchedule}
              />
            </div>
          )}
        </div>
      </div>

      {/* 创建事件模态框 */}
      {isCreateModalOpen && (
        <AppleCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setSelectedTimeSlot(null);
          }}
          onSave={handleCreateEvent}
          initialDate={selectedTimeSlot || selectedDate}
        />
      )}

      {/* 编辑事件模态框 */}
      {isEditModalOpen && selectedSchedule && (
        <AppleCreateModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSchedule(null);
          }}
          onSave={handleEditEvent}
          onDelete={() => handleDeleteEvent(selectedSchedule.id)}
          initialSchedule={selectedSchedule}
          isEditing={true}
        />
      )}

      {/* 快速操作面板 */}
      {showQuickActions && (
        <AppleQuickActions
          isOpen={showQuickActions}
          position={quickActionPosition}
          onClose={handleCloseQuickActions}
          onAction={handleQuickAction}
        />
      )}
    </div>
  );
};

export default AppleScheduleBuilder;