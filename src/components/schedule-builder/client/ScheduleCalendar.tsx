"use client"
import React, { useMemo } from 'react';
import { Schedule, ScheduleView } from '../types';
import {
  getWeekStart,
  getMonthStart,
  getMonthEnd,
  formatDate,
  formatTime
} from '../utils/dateUtils';
import EmptyState from './EmptyState';
import html2canvas from 'html2canvas';

interface ScheduleCalendarProps {
  schedules: Schedule[];
  view: ScheduleView;
  date: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: ScheduleView) => void;
  onScheduleClick: (id: string) => void;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  schedules,
  view,
  date,
  onDateChange,
  onViewChange,
  onScheduleClick
}) => {
  // 根据视图和日期获取要显示的日程
  const visibleSchedules = useMemo(() => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    if (view === 'day') {
      // 日视图：显示选定日期的日程
      return schedules.filter(schedule => {
        return (
          (schedule.startTime >= startOfDay && schedule.startTime <= endOfDay) ||
          (schedule.endTime >= startOfDay && schedule.endTime <= endOfDay) ||
          (schedule.startTime <= startOfDay && schedule.endTime >= endOfDay)
        );
      });
    } else if (view === 'week') {
      // 周视图：显示选定周的日程
      const weekStart = getWeekStart(date);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      return schedules.filter(schedule => {
        return (
          (schedule.startTime >= weekStart && schedule.startTime <= weekEnd) ||
          (schedule.endTime >= weekStart && schedule.endTime <= weekEnd) ||
          (schedule.startTime <= weekStart && schedule.endTime >= weekEnd)
        );
      });
    } else {
      // 月视图：显示选定月的日程
      const monthStart = getMonthStart(date);
      const monthEnd = getMonthEnd(date);

      return schedules.filter(schedule => {
        return (
          (schedule.startTime >= monthStart && schedule.startTime <= monthEnd) ||
          (schedule.endTime >= monthStart && schedule.endTime <= monthEnd) ||
          (schedule.startTime <= monthStart && schedule.endTime >= monthEnd)
        );
      });
    }
  }, [schedules, view, date]);

  // 生成日视图
  const renderDayView = () => {
    // 按小时分组
    const hourGroups: { [hour: string]: Schedule[] } = {};

    // 初始化小时组
    for (let i = 0; i < 24; i++) {
      hourGroups[i] = [];
    }

    // 将日程分配到对应的小时组
    visibleSchedules.forEach(schedule => {
      const startHour = schedule.startTime.getHours();
      hourGroups[startHour].push(schedule);
    });

    return (
      <div className="day-view" style={{ marginTop: '20px' }}>
        {visibleSchedules.length === 0 ? (
          <EmptyState
            title="No Events Today"
            description="There are no scheduled events for this day. Click 'Create New Event' button to add an event."
            icon="📅"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} style={{ display: 'flex' }}>
                {/* 小时标签 */}
                <div style={{
                  width: '60px',
                  padding: '10px',
                  textAlign: 'right',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  {hour}:00
                </div>

                {/* 日程容器 */}
                <div style={{
                  flex: '1',
                  minHeight: '60px',
                  borderTop: '1px solid #eee',
                  padding: '5px 0'
                }}>
                  {hourGroups[hour].map(schedule => (
                    <div
                      key={schedule.id}
                      onClick={() => onScheduleClick(schedule.id)}
                      style={{
                        background: schedule.color || '#4CAF50',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        marginBottom: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{schedule.title}</div>
                      <div style={{ fontSize: '0.8rem' }}>
                        {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 生成周视图
  const renderWeekView = () => {
    const weekStart = getWeekStart(date);
    const days = Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + i);
      return day;
    });

    // 按日期分组
    const dayGroups: { [dateStr: string]: Schedule[] } = {};

    // 初始化日期组
    days.forEach(day => {
      dayGroups[formatDate(day)] = [];
    });

    // 将日程分配到对应的日期组
    visibleSchedules.forEach(schedule => {
      const startDate = formatDate(schedule.startTime);
      if (dayGroups[startDate]) {
        dayGroups[startDate].push(schedule);
      }
    });

    return (
      <div className="week-view" style={{ marginTop: '20px' }}>
        {/* 星期标题 */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #ddd',
          marginBottom: '10px'
        }}>
          <div style={{ width: '60px' }}></div>
          {days.map((day, index) => (
            <div
              key={index}
              style={{
                flex: '1',
                textAlign: 'center',
                padding: '10px',
                fontWeight: 'bold',
                color: day.toDateString() === new Date().toDateString() ? '#4CAF50' : '#2c3e50'
              }}
            >
              <div>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day.getDay()]}</div>
              <div>{day.getDate()}</div>
            </div>
          ))}
        </div>

        {/* 日程内容 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Array.from({ length: 12 }).map((_, hour) => (
            <div key={hour} style={{ display: 'flex' }}>
              {/* 小时标签 */}
              <div style={{
                width: '60px',
                padding: '10px',
                textAlign: 'right',
                color: '#666',
                fontSize: '0.9rem'
              }}>
                {hour + 8}:00
              </div>

              {/* 每天的日程 */}
              {days.map((day, dayIndex) => {
                const dayStr = formatDate(day);
                const hourSchedules = dayGroups[dayStr].filter(
                  s => s.startTime.getHours() === hour + 8
                );

                return (
                  <div
                    key={dayIndex}
                    style={{
                      flex: '1',
                      minHeight: '60px',
                      borderTop: '1px solid #eee',
                      padding: '5px',
                      background: day.toDateString() === new Date().toDateString() ? '#f9f9f9' : 'transparent'
                    }}
                  >
                    {hourSchedules.map(schedule => (
                      <div
                        key={schedule.id}
                        onClick={() => onScheduleClick(schedule.id)}
                        style={{
                          background: schedule.color || '#4CAF50',
                          color: 'white',
                          padding: '5px 8px',
                          borderRadius: '4px',
                          marginBottom: '5px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        <div style={{ fontWeight: 'bold' }}>{schedule.title}</div>
                        <div style={{ fontSize: '0.8rem' }}>
                          {formatTime(schedule.startTime)}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 生成月视图
  const renderMonthView = () => {
    const monthStart = getMonthStart(date);
    const monthEnd = getMonthEnd(date);

    // 获取月视图的起始日期（包括上个月的部分日期）
    const firstDay = new Date(monthStart);
    const startDay = new Date(firstDay);
    startDay.setDate(firstDay.getDate() - firstDay.getDay());

    // 获取月视图的结束日期（包括下个月的部分日期）
    const lastDay = new Date(monthEnd);
    const endDay = new Date(lastDay);
    endDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    // 计算总天数
    const totalDays = Math.round((endDay.getTime() - startDay.getTime()) / (24 * 60 * 60 * 1000)) + 1;

    // 计算总周数
    const totalWeeks = Math.ceil(totalDays / 7);

    // 生成日期数组
    const days = Array.from({ length: totalDays }).map((_, i) => {
      const day = new Date(startDay);
      day.setDate(day.getDate() + i);
      return day;
    });

    // 按日期分组
    const dayGroups: { [dateStr: string]: Schedule[] } = {};

    // 初始化日期组
    days.forEach(day => {
      dayGroups[formatDate(day)] = [];
    });

    // 将日程分配到对应的日期组
    visibleSchedules.forEach(schedule => {
      const startDate = formatDate(schedule.startTime);
      if (dayGroups[startDate]) {
        dayGroups[startDate].push(schedule);
      }
    });

    return (
      <div className="month-view" style={{ marginTop: '20px' }}>
        {/* 星期标题 */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #ddd',
          marginBottom: '10px'
        }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div
              key={index}
              style={{
                flex: '1',
                textAlign: 'center',
                padding: '10px',
                fontWeight: 'bold',
                color: '#2c3e50'
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 日期网格 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {Array.from({ length: totalWeeks }).map((_, weekIndex) => (
            <div key={weekIndex} style={{ display: 'flex', height: '120px', gap: '5px' }}>
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const dayNumber = weekIndex * 7 + dayIndex;
                // 确保 dayNumber 在 days 数组范围内
                if (dayNumber >= days.length) {
                  // 如果超出范围，返回一个空单元格
                  return (
                    <div
                      key={dayIndex}
                      style={{
                        flex: '1',
                        border: '1px solid #eee',
                        borderRadius: '4px',
                        padding: '5px',
                        background: '#f9f9f9'
                      }}
                    ></div>
                  );
                }

                const currentDay = days[dayNumber];
                const isCurrentMonth = currentDay && currentDay.getMonth() === date.getMonth();
                const isToday = currentDay && currentDay.toDateString() === new Date().toDateString();
                const dayStr = currentDay ? formatDate(currentDay) : '';
                const daySchedules = dayStr ? (dayGroups[dayStr] || []) : [];

                return (
                  <div
                    key={dayIndex}
                    style={{
                      flex: '1',
                      border: '1px solid #eee',
                      borderRadius: '4px',
                      padding: '5px',
                      background: isToday ? '#E8F5E9' : isCurrentMonth ? 'white' : '#f9f9f9',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* 日期标签 */}
                    <div style={{
                      textAlign: 'right',
                      fontWeight: isToday ? 'bold' : 'normal',
                      color: isCurrentMonth ? (isToday ? '#4CAF50' : '#2c3e50') : '#bbb',
                      marginBottom: '5px'
                    }}>
                      {currentDay ? currentDay.getDate() : ''}
                    </div>

                    {/* 日程列表 */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      overflow: 'hidden',
                      maxHeight: '80px'
                    }}>
                      {daySchedules.slice(0, 3).map(schedule => (
                        <div
                          key={schedule.id}
                          onClick={() => onScheduleClick(schedule.id)}
                          style={{
                            background: schedule.color || '#4CAF50',
                            color: 'white',
                            padding: '2px 5px',
                            borderRadius: '2px',
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            cursor: 'pointer'
                          }}
                        >
                          {formatTime(schedule.startTime)} {schedule.title}
                        </div>
                      ))}

                      {/* 显示更多 */}
                      {daySchedules.length > 3 && (
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#666',
                          textAlign: 'center'
                        }}>
                          +{daySchedules.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 导航到上一个时间段
  const navigatePrevious = () => {
    const newDate = new Date(date);

    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }

    onDateChange(newDate);
  };

  // 导航到下一个时间段
  const navigateNext = () => {
    const newDate = new Date(date);

    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    onDateChange(newDate);
  };

  // 导航到今天
  const navigateToday = () => {
    onDateChange(new Date());
  };

  // Get current view title
  const getViewTitle = () => {
    if (view === 'day') {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } else if (view === 'week') {
      const weekStart = getWeekStart(date);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const startMonth = weekStart.toLocaleDateString('en-US', { month: 'short' });
      const endMonth = weekEnd.toLocaleDateString('en-US', { month: 'short' });
      
      if (startMonth === endMonth) {
        return `${startMonth} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      } else {
        return `${startMonth} ${weekStart.getDate()} - ${endMonth} ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      }
    } else {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };
  
  // Export calendar as image
  const exportAsImage = () => {
    console.log("Exporting calendar as image")
    const calendarElement = document.querySelector('.calendar-content');
    if (!calendarElement) return;
    
    // Create a modal container
    const modalContainer = document.createElement('div');
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.zIndex = '9999';
    modalContainer.style.padding = '20px';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.padding = '20px';
    modalContent.style.maxWidth = '90%';
    modalContent.style.maxHeight = '90%';
    modalContent.style.overflow = 'auto';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';
    modalContent.style.gap = '15px';
    
    // Create loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Generating image...';
    loadingIndicator.style.padding = '20px';
    modalContent.appendChild(loadingIndicator);
    
    // Add modal to document
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    
    // Close modal when clicking outside
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        document.body.removeChild(modalContainer);
      }
    });
    
    // Use html2canvas to generate image
    try {
      console.log("Using html2canvas to generate image");
      if (html2canvas) {
        html2canvas(calendarElement as HTMLElement).then((canvas: HTMLCanvasElement) => {
          // Remove loading indicator
          modalContent.removeChild(loadingIndicator);
          
          // Convert canvas to image data URL
          const dataUrl = canvas.toDataURL('image/png');
          
          // Create title
          const title = document.createElement('h3');
          title.textContent = `Schedule - ${getViewTitle()}`;
          title.style.margin = '0 0 10px 0';
          modalContent.appendChild(title);
          
          // Create image element
          const img = document.createElement('img');
          img.src = dataUrl;
          img.style.maxWidth = '100%';
          img.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
          modalContent.appendChild(img);
          
          // Create download button
          const downloadBtn = document.createElement('button');
          downloadBtn.textContent = 'Download Image';
          downloadBtn.style.padding = '10px 20px';
          downloadBtn.style.backgroundColor = '#4CAF50';
          downloadBtn.style.color = 'white';
          downloadBtn.style.border = 'none';
          downloadBtn.style.borderRadius = '4px';
          downloadBtn.style.cursor = 'pointer';
          downloadBtn.style.marginTop = '10px';
          
          downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = `schedule-${view}-${formatDate(date).replace(/-/g, '')}.png`;
            link.href = dataUrl;
            link.click();
          });
          
          modalContent.appendChild(downloadBtn);
          
          // Create close button
          const closeBtn = document.createElement('button');
          closeBtn.textContent = 'Close';
          closeBtn.style.padding = '10px 20px';
          closeBtn.style.backgroundColor = '#f1f1f1';
          closeBtn.style.color = '#333';
          closeBtn.style.border = '1px solid #ddd';
          closeBtn.style.borderRadius = '4px';
          closeBtn.style.cursor = 'pointer';
          closeBtn.style.marginTop = '5px';
          
          closeBtn.addEventListener('click', () => {
            document.body.removeChild(modalContainer);
          });
          
          modalContent.appendChild(closeBtn);
        }).catch((error: Error) => {
          console.error('Error exporting calendar as image:', error);
          modalContent.innerHTML = '<p style="color: #D32F2F;">Failed to generate image. Please try again.</p>';
          
          // Add close button
          const closeBtn = document.createElement('button');
          closeBtn.textContent = 'Close';
          closeBtn.style.padding = '10px 20px';
          closeBtn.style.backgroundColor = '#f1f1f1';
          closeBtn.style.color = '#333';
          closeBtn.style.border = '1px solid #ddd';
          closeBtn.style.borderRadius = '4px';
          closeBtn.style.cursor = 'pointer';
          closeBtn.style.marginTop = '10px';
          
          closeBtn.addEventListener('click', () => {
            document.body.removeChild(modalContainer);
          });
          
          modalContent.appendChild(closeBtn);
        });
      } else {
        modalContent.innerHTML = '<p style="color: #D32F2F;">Export functionality is not available. Please try again later.</p>';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.padding = '10px 20px';
        closeBtn.style.backgroundColor = '#f1f1f1';
        closeBtn.style.color = '#333';
        closeBtn.style.border = '1px solid #ddd';
        closeBtn.style.borderRadius = '4px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.marginTop = '10px';
        
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(modalContainer);
        });
        
        modalContent.appendChild(closeBtn);
      }
    } catch (error) {
      console.error('Error in export function:', error);
      modalContent.innerHTML = '<p style="color: #D32F2F;">An unexpected error occurred. Please try again.</p>';
      
      // Add close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close';
      closeBtn.style.padding = '10px 20px';
      closeBtn.style.backgroundColor = '#f1f1f1';
      closeBtn.style.color = '#333';
      closeBtn.style.border = '1px solid #ddd';
      closeBtn.style.borderRadius = '4px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.marginTop = '10px';
      
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
      });
      
      modalContent.appendChild(closeBtn);
    }
  };
  
  // Print calendar
  const printCalendar = () => {
    const printContent = document.querySelector('.calendar-content');
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print the calendar.');
      return;
    }
    
    const title = getViewTitle();
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Schedule - ${title}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .print-header { text-align: center; margin-bottom: 20px; }
            .print-content { margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Schedule - ${title}</h1>
          </div>
          <div class="print-content">
            ${printContent.outerHTML}
          </div>
          <script>
            window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 500); }
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  return (
    <div className="schedule-calendar">
      {/* 日历头部 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* 导航按钮 */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={navigatePrevious}
            style={{
              background: 'white',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Previous {view === 'day' ? 'Day' : view === 'week' ? 'Week' : 'Month'}
          </button>
          <button
            onClick={navigateToday}
            style={{
              background: '#E8F5E9',
              border: '1px solid #4CAF50',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#4CAF50'
            }}
          >
            Today
          </button>
          <button
            onClick={navigateNext}
            style={{
              background: 'white',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Next {view === 'day' ? 'Day' : view === 'week' ? 'Week' : 'Month'}
          </button>
        </div>

        {/* 当前视图标题 */}
        <h2 style={{ margin: 0, color: '#2c3e50' }}>
          {getViewTitle()}
        </h2>

        {/* View switching and export options */}
        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={() => onViewChange('day')}
            style={{
              background: view === 'day' ? '#E8F5E9' : 'white',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: view === 'day' ? 'bold' : 'normal',
              color: view === 'day' ? '#4CAF50' : '#666'
            }}
          >
            Day
          </button>
          <button
            onClick={() => onViewChange('week')}
            style={{
              background: view === 'week' ? '#E8F5E9' : 'white',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: view === 'week' ? 'bold' : 'normal',
              color: view === 'week' ? '#4CAF50' : '#666'
            }}
          >
            Week
          </button>
          <button
            onClick={() => onViewChange('month')}
            style={{
              background: view === 'month' ? '#E8F5E9' : 'white',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: view === 'month' ? 'bold' : 'normal',
              color: view === 'month' ? '#4CAF50' : '#666'
            }}
          >
            Month
          </button>
          <button
            onClick={exportAsImage}
            title="Export as Image"
            style={{
              background: 'white',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span role="img" aria-label="Export">📷</span>
            Export
          </button>
          <button
            onClick={printCalendar}
            title="Print Calendar"
            style={{
              background: 'white',
              border: '1px solid #ddd',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span role="img" aria-label="Print">🖨️</span>
            Print
          </button>
        </div>
      </div>

      {/* 日历内容 */}
      <div className="calendar-content">
        {view === 'day' && renderDayView()}
        {view === 'week' && renderWeekView()}
        {view === 'month' && renderMonthView()}
      </div>
    </div>
  );
};

export default ScheduleCalendar;