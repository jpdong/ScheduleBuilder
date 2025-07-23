"use client"
import React, { useState, useEffect } from 'react';
import { Schedule, ShareSettings } from '../types';
import { formatDateTime } from '../utils/dateUtils';
import { generateShareId } from '../utils/idUtils';
import { useSchedule } from '../context/ScheduleContext';

interface ScheduleShareProps {
  schedule: Schedule;
  onClose: () => void;
}

const ScheduleShare: React.FC<ScheduleShareProps> = ({ schedule, onClose }) => {
  const { updateSchedule } = useSchedule();
  
  // 分享设置状态
  const [shareSettings, setShareSettings] = useState<ShareSettings>({
    shareId: schedule.shareSettings?.shareId || generateShareId(),
    permission: schedule.shareSettings?.permission || 'read',
    expiresAt: schedule.shareSettings?.expiresAt
  });
  
  // 分享链接
  const [shareLink, setShareLink] = useState('');
  
  // 过期时间选项
  const [expiryOption, setExpiryOption] = useState<'never' | '1day' | '1week' | '1month' | 'custom'>(
    schedule.shareSettings?.expiresAt ? 'custom' : 'never'
  );
  
  // 自定义过期日期
  const [customExpiryDate, setCustomExpiryDate] = useState(
    schedule.shareSettings?.expiresAt 
      ? formatDateTime(schedule.shareSettings.expiresAt).split(' ')[0]
      : formatDateTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).split(' ')[0]
  );
  
  // 自定义过期时间
  const [customExpiryTime, setCustomExpiryTime] = useState(
    schedule.shareSettings?.expiresAt 
      ? formatDateTime(schedule.shareSettings.expiresAt).split(' ')[1]
      : '23:59'
  );
  
  // 分享状态
  const [isShared, setIsShared] = useState(schedule.shared);
  
  // 复制状态
  const [copied, setCopied] = useState(false);
  
  // 保存状态
  const [isSaving, setIsSaving] = useState(false);
  
  // 生成分享链接
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      setShareLink(`${baseUrl}/schedule-builder/shared/${shareSettings.shareId}`);
    }
  }, [shareSettings.shareId]);
  
  // 处理过期时间变化
  useEffect(() => {
    let expiresAt: Date | undefined;
    
    switch (expiryOption) {
      case 'never':
        expiresAt = undefined;
        break;
      case '1day':
        expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        break;
      case '1week':
        expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        break;
      case '1month':
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        break;
      case 'custom':
        if (customExpiryDate && customExpiryTime) {
          expiresAt = new Date(`${customExpiryDate}T${customExpiryTime}`);
        }
        break;
    }
    
    setShareSettings(prev => ({ ...prev, expiresAt }));
  }, [expiryOption, customExpiryDate, customExpiryTime]);
  
  // 处理权限变化
  const handlePermissionChange = (permission: 'read' | 'edit') => {
    setShareSettings(prev => ({ ...prev, permission }));
  };
  
  // 复制链接
  const copyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // 保存分享设置
  const saveShareSettings = async () => {
    setIsSaving(true);
    
    try {
      await updateSchedule(schedule.id, {
        shared: isShared,
        shareSettings: isShared ? shareSettings : undefined
      });
      
      onClose();
    } catch (error) {
      console.error('Failed to save share settings:', error);
      alert('保存分享设置失败，请重试。');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="schedule-share">
      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
          分享日程
        </h2>
        
        {/* 分享开关 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          padding: '15px',
          background: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              分享状态
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>
              {isShared ? '已启用分享，其他人可以通过链接访问此日程。' : '未启用分享，此日程仅您可见。'}
            </div>
          </div>
          
          <label className="switch" style={{ 
            position: 'relative',
            display: 'inline-block',
            width: '60px',
            height: '34px'
          }}>
            <input 
              type="checkbox" 
              checked={isShared}
              onChange={() => setIsShared(!isShared)}
              style={{ 
                opacity: 0,
                width: 0,
                height: 0
              }}
            />
            <span style={{ 
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isShared ? '#4CAF50' : '#ccc',
              transition: '.4s',
              borderRadius: '34px'
            }}>
              <span style={{ 
                position: 'absolute',
                content: '""',
                height: '26px',
                width: '26px',
                left: isShared ? '30px' : '4px',
                bottom: '4px',
                backgroundColor: 'white',
                transition: '.4s',
                borderRadius: '50%'
              }}></span>
            </span>
          </label>
        </div>
        
        {isShared && (
          <>
            {/* 分享链接 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                分享链接
              </label>
              <div style={{ 
                display: 'flex', 
                gap: '10px',
                marginBottom: '5px'
              }}>
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  style={{ 
                    flex: '1',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    backgroundColor: '#f9f9f9'
                  }}
                />
                <button
                  onClick={copyLink}
                  style={{ 
                    background: copied ? '#4CAF50' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    minWidth: '80px'
                  }}
                >
                  {copied ? '已复制' : '复制'}
                </button>
              </div>
              <div style={{ color: '#666', fontSize: '0.8rem' }}>
                分享此链接，其他人可以访问您的日程安排。
              </div>
            </div>
            
            {/* 权限设置 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                权限设置
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handlePermissionChange('read')}
                  style={{ 
                    flex: '1',
                    background: shareSettings.permission === 'read' ? '#E8F5E9' : 'white',
                    border: '1px solid #ddd',
                    padding: '10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    只读
                  </div>
                  <div style={{ color: '#666', fontSize: '0.8rem' }}>
                    他人只能查看此日程，不能编辑。
                  </div>
                </button>
                <button
                  onClick={() => handlePermissionChange('edit')}
                  style={{ 
                    flex: '1',
                    background: shareSettings.permission === 'edit' ? '#E8F5E9' : 'white',
                    border: '1px solid #ddd',
                    padding: '10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    可编辑
                  </div>
                  <div style={{ color: '#666', fontSize: '0.8rem' }}>
                    他人可以查看和编辑此日程。
                  </div>
                </button>
              </div>
            </div>
            
            {/* 过期时间 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                过期时间
              </label>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <button
                  onClick={() => setExpiryOption('never')}
                  style={{ 
                    background: expiryOption === 'never' ? '#E8F5E9' : 'white',
                    border: '1px solid #ddd',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  永不过期
                </button>
                <button
                  onClick={() => setExpiryOption('1day')}
                  style={{ 
                    background: expiryOption === '1day' ? '#E8F5E9' : 'white',
                    border: '1px solid #ddd',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  1天后
                </button>
                <button
                  onClick={() => setExpiryOption('1week')}
                  style={{ 
                    background: expiryOption === '1week' ? '#E8F5E9' : 'white',
                    border: '1px solid #ddd',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  1周后
                </button>
                <button
                  onClick={() => setExpiryOption('1month')}
                  style={{ 
                    background: expiryOption === '1month' ? '#E8F5E9' : 'white',
                    border: '1px solid #ddd',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  1个月后
                </button>
                <button
                  onClick={() => setExpiryOption('custom')}
                  style={{ 
                    background: expiryOption === 'custom' ? '#E8F5E9' : 'white',
                    border: '1px solid #ddd',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  自定义
                </button>
              </div>
              
              {expiryOption === 'custom' && (
                <div style={{ 
                  display: 'flex', 
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  <input
                    type="date"
                    value={customExpiryDate}
                    onChange={(e) => setCustomExpiryDate(e.target.value)}
                    style={{ 
                      flex: '1',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  />
                  <input
                    type="time"
                    value={customExpiryTime}
                    onChange={(e) => setCustomExpiryTime(e.target.value)}
                    style={{ 
                      width: '120px',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}
                  />
                </div>
              )}
              
              <div style={{ color: '#666', fontSize: '0.8rem', marginTop: '5px' }}>
                {expiryOption === 'never' 
                  ? '分享链接将永久有效，直到您手动关闭分享。' 
                  : `分享链接将在 ${shareSettings.expiresAt ? formatDateTime(shareSettings.expiresAt) : '设定的时间'} 后失效。`}
              </div>
            </div>
          </>
        )}
        
        {/* 按钮 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '10px',
          marginTop: '20px',
          borderTop: '1px solid #eee',
          paddingTop: '20px'
        }}>
          <button
            onClick={onClose}
            style={{ 
              background: 'none',
              border: '1px solid #ddd',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            disabled={isSaving}
          >
            取消
          </button>
          <button
            onClick={saveShareSettings}
            style={{ 
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              opacity: isSaving ? 0.7 : 1
            }}
            disabled={isSaving}
          >
            {isSaving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleShare;