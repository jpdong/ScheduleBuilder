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
  initialData?: Schedule;
  onSave: (schedule: Schedule) => void;
  onCancel: () => void;
}

const ScheduleCreator: React.FC<ScheduleCreatorProps> = ({ initialData, onSave, onCancel }) => {
  const { addSchedule, updateSchedule, checkConflict } = useSchedule();
  
  // 表单状态
  const [formData, setFormData] = useState<ScheduleFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    startTime: initialData?.startTime || new Date(),
    endTime: initialData?.endTime || new Date(Date.now() + 60 * 60 * 1000), // 默认1小时后
    color: initialData?.color || '#4CAF50',
    reminders: initialData?.reminders.map(r => ({
      time: Math.round((r.time.getTime() - initialData.startTime.getTime()) / (60 * 1000) * -1)
    })) || [{ time: 15 }] // 默认提前15分钟
  });
  
  // 错误状态
  const [errors, setErrors] = useState<ScheduleValidationError>({});
  const [showConflictWarning, setShowConflictWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 日期和时间字符串状态（用于表单输入）
  const [startDate, setStartDate] = useState(formatDate(formData.startTime));
  const [startTime, setStartTime] = useState(formatTime(formData.startTime));
  const [endDate, setEndDate] = useState(formatDate(formData.endTime));
  const [endTime, setEndTime] = useState(formatTime(formData.endTime));
  
  // 当日期或时间字符串更改时，更新表单数据中的日期对象
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
  
  // 冲突检测状态
  const [conflictingSchedules, setConflictingSchedules] = useState<Schedule[]>([]);
  const { schedules } = useSchedule();
  
  // 检查冲突
  useEffect(() => {
    const scheduleToCheck = {
      id: initialData?.id || 'new',
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
  
  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除相关错误
    if (errors[name as keyof ScheduleValidationError]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // 处理日期变化
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };
  
  // 处理时间变化
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'startTime') {
      setStartTime(value);
    } else if (name === 'endTime') {
      setEndTime(value);
    }
  };
  
  // 处理颜色变化
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, color: e.target.value }));
  };
  
  // 通知权限状态
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  
  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 验证表单
    const validationErrors = validateScheduleForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // 创建提醒对象
      const reminders = formData.reminders.map(r => ({
        id: generateId(),
        time: new Date(formData.startTime.getTime() - r.time * 60 * 1000),
        triggered: false
      }));
      
      let savedSchedule: Schedule;
      
      if (initialData) {
        // 更新现有日程
        savedSchedule = await updateSchedule(initialData.id, {
          title: formData.title,
          description: formData.description,
          startTime: formData.startTime,
          endTime: formData.endTime,
          color: formData.color,
          reminders
        });
      } else {
        // 创建新日程
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
      setErrors({ general: '保存日程时出错，请重试。' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 处理通知权限变化
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
          {initialData ? '编辑日程' : '创建新日程'}
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
          {/* 标题 */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              标题 *
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
              placeholder="输入日程标题"
            />
            {errors.title && (
              <div style={{ color: '#D32F2F', fontSize: '0.8rem', marginTop: '5px' }}>
                {errors.title}
              </div>
            )}
          </div>
          
          {/* 描述 */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              描述
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
              placeholder="输入日程描述（可选）"
            />
            {errors.description && (
              <div style={{ color: '#D32F2F', fontSize: '0.8rem', marginTop: '5px' }}>
                {errors.description}
              </div>
            )}
          </div>
          
          {/* 开始时间 */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              开始时间 *
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
          
          {/* 结束时间 */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              结束时间 *
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
          
          {/* 颜色 */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              颜色
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
          
          {/* 按钮 */}
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
              取消
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
              {isSubmitting ? '保存中...' : (initialData ? '更新' : '创建')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCreator;