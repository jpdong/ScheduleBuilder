"use client"
import React, { useState, useEffect } from 'react';

interface NotificationPermissionProps {
  onPermissionChange?: (permission: NotificationPermission) => void;
}

const NotificationPermission: React.FC<NotificationPermissionProps> = ({ 
  onPermissionChange 
}) => {
  // 通知权限状态
  const [permission, setPermission] = useState<NotificationPermission>('default');
  
  // 检查通知权限
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);
  
  // 请求通知权限
  const requestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPermission(result);
        if (onPermissionChange) {
          onPermissionChange(result);
        }
      } catch (error) {
        console.error('Failed to request notification permission:', error);
      }
    }
  };
  
  // 如果浏览器不支持通知
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return (
      <div style={{ 
        padding: '10px', 
        background: '#FFEBEE', 
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <p style={{ margin: 0, color: '#D32F2F' }}>
          您的浏览器不支持通知功能，提醒将无法正常工作。
        </p>
      </div>
    );
  }
  
  // 如果已授权
  if (permission === 'granted') {
    return (
      <div style={{ 
        padding: '10px', 
        background: '#E8F5E9', 
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <p style={{ margin: 0, color: '#2E7D32' }}>
          <span style={{ marginRight: '5px' }}>✓</span>
          通知权限已授权，您将收到日程提醒。
        </p>
      </div>
    );
  }
  
  // 如果被拒绝
  if (permission === 'denied') {
    return (
      <div style={{ 
        padding: '10px', 
        background: '#FFEBEE', 
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <p style={{ margin: 0, color: '#D32F2F' }}>
          通知权限已被拒绝，您将无法收到日程提醒。请在浏览器设置中启用通知权限。
        </p>
      </div>
    );
  }
  
  // 如果未决定
  return (
    <div style={{ 
      padding: '15px', 
      background: '#FFF3E0', 
      borderRadius: '4px',
      marginBottom: '15px'
    }}>
      <p style={{ marginTop: 0, marginBottom: '10px', color: '#E65100' }}>
        要接收日程提醒，您需要授权通知权限。
      </p>
      <button
        onClick={requestPermission}
        style={{ 
          background: '#FF9800',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        授权通知权限
      </button>
    </div>
  );
};

export default NotificationPermission;