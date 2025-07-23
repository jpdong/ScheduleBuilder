"use client"
import React from 'react';
import { getReminderOptions } from '../utils/dateUtils';

interface ReminderSettingsProps {
  reminders: { time: number }[];
  onChange: (reminders: { time: number }[]) => void;
  error?: string;
}

const ReminderSettings: React.FC<ReminderSettingsProps> = ({ 
  reminders, 
  onChange,
  error
}) => {
  // 提醒选项
  const reminderOptions = getReminderOptions();
  
  // 处理提醒变化
  const handleReminderChange = (index: number, value: number) => {
    const newReminders = [...reminders];
    newReminders[index] = { time: value };
    onChange(newReminders);
  };
  
  // 添加提醒
  const handleAddReminder = () => {
    onChange([...reminders, { time: 15 }]);
  };
  
  // 删除提醒
  const handleRemoveReminder = (index: number) => {
    const newReminders = reminders.filter((_, i) => i !== index);
    onChange(newReminders);
  };
  
  return (
    <div className="reminder-settings">
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          提醒设置
        </label>
        
        {reminders.map((reminder, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            marginBottom: '10px' 
          }}>
            <select
              value={reminder.time}
              onChange={(e) => handleReminderChange(index, parseInt(e.target.value))}
              style={{ 
                flex: '1',
                padding: '8px 12px',
                borderRadius: '4px',
                border: error ? '1px solid #D32F2F' : '1px solid #ddd'
              }}
            >
              {reminderOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <button
              type="button"
              onClick={() => handleRemoveReminder(index)}
              style={{ 
                background: 'none',
                border: 'none',
                color: '#D32F2F',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0 10px'
              }}
              aria-label="删除提醒"
            >
              ×
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={handleAddReminder}
          style={{ 
            background: 'none',
            border: '1px dashed #4CAF50',
            color: '#4CAF50',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>+</span> 添加提醒
        </button>
        
        {error && (
          <div style={{ color: '#D32F2F', fontSize: '0.8rem', marginTop: '5px' }}>
            {error}
          </div>
        )}
      </div>
      
      <div style={{ 
        padding: '10px', 
        background: '#E8F5E9', 
        borderRadius: '4px',
        fontSize: '0.9rem',
        color: '#2E7D32',
        marginBottom: '15px'
      }}>
        <p style={{ margin: 0 }}>
          <strong>提示：</strong> 提醒将在日程开始前的指定时间通过浏览器通知发送。
          请确保您已授权浏览器通知权限。
        </p>
      </div>
    </div>
  );
};

export default ReminderSettings;