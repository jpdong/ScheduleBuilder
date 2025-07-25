"use client"
import React, { useState, useEffect } from 'react';
import { Schedule, ScheduleFormData, ScheduleValidationError } from '../types';
import { useSchedule } from '../context/ScheduleContext';
import { validateScheduleForm } from '../utils/validation';
import { formatDate, formatTime } from '../utils/dateUtils';
import { generateId } from '../utils/idUtils';
import ConflictWarning from './ConflictWarning';
import { suggestAlternativeTime } from '../utils/conflictResolver';
import ReminderSettings from './ReminderSettings';
import NotificationPermission from './NotificationPermission';

interface ScheduleCreatorProps {
  schedule?: Schedule;
  initialData?: Schedule;
  onSave: (schedule: Schedule) => void;
  onCancel: () => void;
  initialDate?: Date;
  isEditing?: boolean;
}

const ScheduleCreator: React.FC<ScheduleCreatorProps> = ({ 
  schedule, 
  initialData, 
  onSave, 
  onCancel, 
  initialDate,
  isEditing = false 
}) => {
  // Use schedule prop if provided, otherwise use initialData
  const scheduleData = schedule || initialData;
  const { addSchedule, updateSchedule, checkConflict } = useSchedule();
  
  // Form state
  const [formData, setFormData] = useState<ScheduleFormData>({
    title: scheduleData?.title || '',
    description: scheduleData?.description || '',
    startTime: scheduleData?.startTime || initialDate || new Date(),
    endTime: scheduleData?.endTime || new Date((initialDate || new Date()).getTime() + 60 * 60 * 1000), // Default 1 hour later
    color: scheduleData?.color || '#4CAF50',
    reminders: scheduleData?.reminders.map(r => ({
      time: Math.round((r.time.getTime() - scheduleData.startTime.getTime()) / (60 * 1000) * -1)
    })) || [{ time: 15 }] // Default 15 minutes before
  });
  
  // Error state
  const [errors, setErrors] = useState<ScheduleValidationError>({});
  const [showConflictWarning, setShowConflictWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Date and time string states (for form inputs)
  const [startDate, setStartDate] = useState(formatDate(formData.startTime));
  const [startTime, setStartTime] = useState(formatTime(formData.startTime));
  const [endDate, setEndDate] = useState(formatDate(formData.endTime));
  const [endTime, setEndTime] = useState(formatTime(formData.endTime));
  
  // When date or time strings change, update date objects in form data
  useEffect(() => {
    const newStartTime = new Date(`${startDate}T${startTime}`);
    const newEndTime = new Date(`${endDate}T${endTime}`);
    
    if (!isNaN(newStartTime.getTime()) && !isNaN(newEndTime.getTime())) {
      setFormData(prev => ({
        ...prev,
        startTime: newStartTime,
        endTime: newEndTime
      }));
    }
  }, [startDate, startTime, endDate, endTime]);
  
  // Conflict detection state
  const [conflictingSchedules, setConflictingSchedules] = useState<Schedule[]>([]);
  const { schedules } = useSchedule();
  
  // Check conflicts
  useEffect(() => {
    const scheduleToCheck = {
      id: scheduleData?.id || 'new',
      startTime: formData.startTime,
      endTime: formData.endTime
    };
    
    // 导入冲突检测函数
    import('../utils/validation').then(({ getConflictingSchedules }) => {
      const conflicts = getConflictingSchedules(scheduleToCheck, schedules);
      setConflictingSchedules(conflicts);
      setShowConflictWarning(conflicts.length > 0);
    });
  }, [formData.startTime, formData.endTime, initialData, schedules]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear related errors
    if (errors[name as keyof ScheduleValidationError]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Handle date changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };
  
  // Handle time changes
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'startTime') {
      setStartTime(value);
    } else if (name === 'endTime') {
      setEndTime(value);
    }
  };
  
  // Handle color changes
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, color: e.target.value }));
  };
  
  // Notification permission state
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  
  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    const validationErrors = validateScheduleForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Create reminder objects
      const reminders = formData.reminders.map(r => ({
        id: generateId(),
        time: new Date(formData.startTime.getTime() - r.time * 60 * 1000),
        triggered: false
      }));
      
      let savedSchedule: Schedule;
      
      if (scheduleData) {
        // Update existing schedule
        savedSchedule = await updateSchedule(scheduleData.id, {
          title: formData.title,
          description: formData.description,
          startTime: formData.startTime,
          endTime: formData.endTime,
          color: formData.color,
          reminders
        });
      } else {
        // Create new schedule
        savedSchedule = await addSchedule({
          title: formData.title,
          description: formData.description,
          startTime: formData.startTime,
          endTime: formData.endTime,
          color: formData.color,
          reminders,
          shareSettings: undefined
        });
      }
      
      onSave(savedSchedule);
    } catch (error) {
      console.error('Failed to save schedule:', error);
      setErrors({ general: 'Error saving schedule. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle notification permission changes
  const handlePermissionChange = (permission: NotificationPermission) => {
    setNotificationPermission(permission);
  };
  
  return (
    <div className="schedule-creator">
      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
          {scheduleData ? 'Edit Schedule' : 'Create New Schedule'}
        </h2>
        
        {errors.general && (
          <div style={{ 
            padding: '10px', 
            marginBottom: '15px', 
            background: '#FFEBEE', 
            color: '#D32F2F',
            borderRadius: '4px'
          }}>
            {errors.general}
          </div>
        )}
        
        {showConflictWarning && conflictingSchedules.length > 0 && (
          <ConflictWarning 
            conflictingSchedules={conflictingSchedules}
            onIgnore={() => setShowConflictWarning(false)}
            onAdjust={() => {
              // 计算当前日程的持续时间
              const duration = formData.endTime.getTime() - formData.startTime.getTime();
              
              // 获取建议的替代时间
              const suggestion = suggestAlternativeTime(
                { startTime: formData.startTime, endTime: formData.endTime },
                schedules
              );
              
              // 更新表单数据
              setFormData(prev => ({
                ...prev,
                startTime: suggestion.startTime,
                endTime: suggestion.endTime
              }));
              
              // 更新日期和时间字符串
              setStartDate(formatDate(suggestion.startTime));
              setStartTime(formatTime(suggestion.startTime));
              setEndDate(formatDate(suggestion.endTime));
              setEndTime(formatTime(suggestion.endTime));
            }}
          />
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={{ 
                width: '100%', 
                padding: '8px 12px',
                borderRadius: '4px',
                border: errors.title ? '1px solid #D32F2F' : '1px solid #ddd'
              }}
              placeholder="Enter schedule title"
            />
            {errors.title && (
              <div style={{ color: '#D32F2F', fontSize: '0.8rem', marginTop: '5px' }}>
                {errors.title}
              </div>
            )}
          </div>
          
          {/* Description */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ 
                width: '100%', 
                padding: '8px 12px',
                borderRadius: '4px',
                border: errors.description ? '1px solid #D32F2F' : '1px solid #ddd',
                minHeight: '100px'
              }}
              placeholder="Enter schedule description (optional)"
            />
            {errors.description && (
              <div style={{ color: '#D32F2F', fontSize: '0.8rem', marginTop: '5px' }}>
                {errors.description}
              </div>
            )}
          </div>
          
          {/* Start time */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Start Time *
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={handleDateChange}
                style={{ 
                  flex: '1',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: errors.startTime ? '1px solid #D32F2F' : '1px solid #ddd'
                }}
              />
              <input
                type="time"
                name="startTime"
                value={startTime}
                onChange={handleTimeChange}
                style={{ 
                  width: '120px',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: errors.startTime ? '1px solid #D32F2F' : '1px solid #ddd'
                }}
              />
            </div>
            {errors.startTime && (
              <div style={{ color: '#D32F2F', fontSize: '0.8rem', marginTop: '5px' }}>
                {errors.startTime}
              </div>
            )}
          </div>
          
          {/* End time */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              End Time *
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleDateChange}
                style={{ 
                  flex: '1',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: errors.endTime ? '1px solid #D32F2F' : '1px solid #ddd'
                }}
              />
              <input
                type="time"
                name="endTime"
                value={endTime}
                onChange={handleTimeChange}
                style={{ 
                  width: '120px',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: errors.endTime ? '1px solid #D32F2F' : '1px solid #ddd'
                }}
              />
            </div>
            {errors.endTime && (
              <div style={{ color: '#D32F2F', fontSize: '0.8rem', marginTop: '5px' }}>
                {errors.endTime}
              </div>
            )}
          </div>
          
          {/* Color */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Color
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="color"
                value={formData.color}
                onChange={handleColorChange}
                style={{ 
                  width: '40px',
                  height: '40px',
                  padding: '0',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
              <div style={{ 
                width: '100px', 
                height: '30px', 
                background: formData.color,
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}></div>
            </div>
          </div>
          
          {/* 通知权限 */}
          <NotificationPermission onPermissionChange={handlePermissionChange} />
          
          {/* 提醒设置 */}
          <ReminderSettings 
            reminders={formData.reminders}
            onChange={(newReminders) => {
              setFormData(prev => ({ ...prev, reminders: newReminders }));
              
              // 清除相关错误
              if (errors.reminders) {
                setErrors(prev => ({ ...prev, reminders: undefined }));
              }
            }}
            error={errors.reminders}
          />
          
          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{ 
                background: 'none',
                border: '1px solid #ddd',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ 
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (scheduleData ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCreator;