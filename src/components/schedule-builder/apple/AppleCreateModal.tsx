"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Schedule, Reminder } from '../types';

interface AppleCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Partial<Schedule>) => void;
  onDelete?: () => void;
  initialDate?: Date;
  initialSchedule?: Schedule;
  isEditing?: boolean;
}

const AppleCreateModal: React.FC<AppleCreateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialDate,
  initialSchedule,
  isEditing = false
}) => {
  // 表单状态
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: new Date(),
    endTime: new Date(),
    color: '#007AFF',
    reminders: [] as Reminder[],
    location: '',
    participants: '',
    notes: ''
  });

  // 表单验证状态
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 预设时间长度选项
  const durationPresets = useMemo(() => [
    { label: '15min', minutes: 15 },
    { label: '30min', minutes: 30 },
    { label: '45min', minutes: 45 },
    { label: '1h', minutes: 60 },
    { label: '1.5h', minutes: 90 },
    { label: '2h', minutes: 120 },
  ], []);

  // 颜色选项
  const colorOptions = useMemo(() => [
    { color: '#007AFF', label: 'Blue' },
    { color: '#34C759', label: 'Green' },
    { color: '#FF9500', label: 'Orange' },
    { color: '#FF3B30', label: 'Red' },
    { color: '#AF52DE', label: 'Purple' },
    { color: '#8E8E93', label: 'Gray' },
  ], []);

  // 提醒预设选项
  const reminderPresets = useMemo(() => [
    { label: '15 min before', minutes: 15 },
    { label: '30 min before', minutes: 30 },
    { label: '1 hour before', minutes: 60 },
    { label: '1 day before', minutes: 1440 },
  ], []);

  // 初始化表单数据
  useEffect(() => {
    if (isOpen) {
      if (initialSchedule) {
        // 编辑模式：使用现有数据
        const startTime = new Date(initialSchedule.startTime);
        const endTime = new Date(initialSchedule.endTime);
        
        // 解析描述中的结构化信息
        const description = initialSchedule.description || '';
        const locationMatch = description.match(/📍\s*(.+?)(?:\s*•|$)/);
        const participantsMatch = description.match(/👥\s*(.+?)(?:\s*•|$)/);
        
        setFormData({
          title: initialSchedule.title,
          description: initialSchedule.description || '',
          startTime,
          endTime,
          color: initialSchedule.color || '#007AFF',
          reminders: initialSchedule.reminders || [],
          location: locationMatch ? locationMatch[1].trim() : '',
          participants: participantsMatch ? participantsMatch[1].trim() : '',
          notes: description.replace(/📍\s*.+?(?:\s*•|$)/g, '').replace(/👥\s*.+?(?:\s*•|$)/g, '').trim()
        });
      } else {
        // 创建模式：使用默认值
        const startTime = initialDate || new Date();
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 默认1小时
        
        setFormData({
          title: '',
          description: '',
          startTime,
          endTime,
          color: '#007AFF',
          reminders: [{ 
            id: Date.now().toString(), 
            time: new Date(startTime.getTime() - 15 * 60 * 1000), 
            triggered: false 
          }],
          location: '',
          participants: '',
          notes: ''
        });
      }
      
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, initialDate, initialSchedule]);

  // 验证表单
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.startTime >= formData.endTime) {
      newErrors.time = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // 处理输入变化
  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 清除相关错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [errors]);

  // 处理时间长度快速设置
  const handleDurationPreset = useCallback((minutes: number) => {
    const newEndTime = new Date(formData.startTime.getTime() + minutes * 60 * 1000);
    handleInputChange('endTime', newEndTime);
  }, [formData.startTime, handleInputChange]);

  // 添加提醒
  const handleAddReminder = useCallback((minutes: number) => {
    const reminderTime = new Date(formData.startTime.getTime() - minutes * 60 * 1000);
    const newReminder: Reminder = {
      id: Date.now().toString(),
      time: reminderTime,
      triggered: false
    };
    
    handleInputChange('reminders', [...formData.reminders, newReminder]);
  }, [formData.startTime, formData.reminders, handleInputChange]);

  // 移除提醒
  const handleRemoveReminder = useCallback((reminderId: string) => {
    const updatedReminders = formData.reminders.filter(r => r.id !== reminderId);
    handleInputChange('reminders', updatedReminders);
  }, [formData.reminders, handleInputChange]);

  // 处理保存
  const handleSave = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 构建描述字符串
      let description = '';
      if (formData.location) {
        description += `📍 ${formData.location}`;
      }
      if (formData.participants) {
        description += (description ? ' • ' : '') + `👥 ${formData.participants}`;
      }
      if (formData.notes) {
        description += (description ? ' • ' : '') + formData.notes;
      }

      const eventData: Partial<Schedule> = {
        title: formData.title.trim(),
        description,
        startTime: formData.startTime,
        endTime: formData.endTime,
        color: formData.color,
        reminders: formData.reminders
      };

      await onSave(eventData);
    } catch (error) {
      console.error('Failed to save event:', error);
      // 这里可以添加错误处理UI
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSave]);

  // 处理删除
  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete?.();
    }
  }, [onDelete]);

  // 格式化时间用于输入
  const formatTimeForInput = useCallback((date: Date) => {
    return date.toISOString().slice(0, 16);
  }, []);

  // 处理时间输入变化
  const handleTimeChange = useCallback((field: 'startTime' | 'endTime', value: string) => {
    const newTime = new Date(value);
    handleInputChange(field, newTime);
  }, [handleInputChange]);

  // ESC键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="apple-modal-overlay" onClick={onClose}>
      <div className="apple-modal" onClick={(e) => e.stopPropagation()}>
        {/* 模态框头部 */}
        <div className="apple-modal-header">
          <button 
            className="apple-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="apple-modal-title">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h2>
          <div style={{ width: 32 }} /> {/* 占位符保持居中 */}
        </div>

        {/* 模态框内容 */}
        <div className="apple-modal-body">
          {/* 事件标题 */}
          <div className="apple-form-group">
            <label className="apple-form-label">Event Title</label>
            <input
              type="text"
              className="apple-form-input"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter event title"
              autoFocus
            />
            {errors.title && (
              <div style={{ color: 'var(--apple-red)', fontSize: '13px', marginTop: '4px' }}>
                {errors.title}
              </div>
            )}
          </div>

          {/* 时间设置 */}
          <div className="apple-form-group">
            <label className="apple-form-label">Date & Time</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--apple-label-secondary)' }}>Start</label>
                <input
                  type="datetime-local"
                  className="apple-form-input"
                  value={formatTimeForInput(formData.startTime)}
                  onChange={(e) => handleTimeChange('startTime', e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--apple-label-secondary)' }}>End</label>
                <input
                  type="datetime-local"
                  className="apple-form-input"
                  value={formatTimeForInput(formData.endTime)}
                  onChange={(e) => handleTimeChange('endTime', e.target.value)}
                />
              </div>
            </div>
            {errors.time && (
              <div style={{ color: 'var(--apple-red)', fontSize: '13px', marginTop: '4px' }}>
                {errors.time}
              </div>
            )}
          </div>

          {/* 时间长度快速设置 */}
          <div className="apple-form-group">
            <label className="apple-form-label">Duration</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {durationPresets.map(({ label, minutes }) => (
                <button
                  key={label}
                  type="button"
                  className="apple-button-secondary"
                  style={{ fontSize: '14px', padding: '6px 12px' }}
                  onClick={() => handleDurationPreset(minutes)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 位置 */}
          <div className="apple-form-group">
            <label className="apple-form-label">Location</label>
            <input
              type="text"
              className="apple-form-input"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Add location"
            />
          </div>

          {/* 参与者 */}
          <div className="apple-form-group">
            <label className="apple-form-label">Participants</label>
            <input
              type="text"
              className="apple-form-input"
              value={formData.participants}
              onChange={(e) => handleInputChange('participants', e.target.value)}
              placeholder="Add participants"
            />
          </div>

          {/* 颜色选择 */}
          <div className="apple-form-group">
            <label className="apple-form-label">Color</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {colorOptions.map(({ color, label }) => (
                <button
                  key={color}
                  type="button"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: formData.color === color ? '3px solid var(--apple-label)' : '2px solid var(--apple-opacity-separator)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleInputChange('color', color)}
                  aria-label={`Select ${label} color`}
                />
              ))}
            </div>
          </div>

          {/* 提醒设置 */}
          <div className="apple-form-group">
            <label className="apple-form-label">Reminders</label>
            
            {/* 现有提醒 */}
            {formData.reminders.map((reminder) => (
              <div 
                key={reminder.id}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: 'var(--apple-background-secondary)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '8px'
                }}
              >
                <span style={{ fontSize: '14px' }}>
                  🔔 {Math.round((formData.startTime.getTime() - reminder.time.getTime()) / (1000 * 60))} min before
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveReminder(reminder.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--apple-red)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}

            {/* 添加提醒按钮 */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {reminderPresets.map(({ label, minutes }) => (
                <button
                  key={label}
                  type="button"
                  className="apple-button-secondary"
                  style={{ fontSize: '13px', padding: '6px 10px' }}
                  onClick={() => handleAddReminder(minutes)}
                >
                  + {label}
                </button>
              ))}
            </div>
          </div>

          {/* 备注 */}
          <div className="apple-form-group">
            <label className="apple-form-label">Notes</label>
            <textarea
              className="apple-form-input apple-form-textarea"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add notes"
              rows={3}
            />
          </div>

          {/* 操作按钮 */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'flex-end',
            paddingTop: '20px',
            borderTop: '1px solid var(--apple-opacity-separator)',
            marginTop: '20px'
          }}>
            {isEditing && onDelete && (
              <button
                type="button"
                className="apple-button-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              className="apple-button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="apple-button"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Event')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleCreateModal;