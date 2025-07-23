"use client"
import React, { useEffect, useState } from 'react';
import { Schedule } from '../types';
import { useNotification } from '../hooks/useNotification';
import { registerNotificationWorker, isServiceWorkerRegistered } from '../utils/serviceWorkerRegistration';

interface NotificationManagerProps {
  schedules: Schedule[];
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ schedules }) => {
  // 通知钩子
  const { 
    isSupported, 
    permission, 
    requestPermission, 
    checkReminders 
  } = useNotification();
  
  // 状态
  const [showBanner, setShowBanner] = useState(false);
  
  // 检查通知权限和服务工作器
  useEffect(() => {
    const checkPermissionAndWorker = async () => {
      if (isSupported) {
        if (permission === 'default') {
          setShowBanner(true);
        } else if (permission === 'granted') {
          // 检查服务工作器是否已注册
          const isRegistered = await isServiceWorkerRegistered();
          if (!isRegistered) {
            // 注册服务工作器
            await registerNotificationWorker();
          }
          setShowBanner(false);
        } else {
          setShowBanner(false);
        }
      }
    };
    
    checkPermissionAndWorker();
  }, [isSupported, permission]);
  
  // 定期检查提醒
  useEffect(() => {
    if (isSupported && permission === 'granted') {
      // 立即检查一次
      checkReminders(schedules);
      
      // 设置定时器，每分钟检查一次
      const intervalId = setInterval(() => {
        checkReminders(schedules);
      }, 60000);
      
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isSupported, permission, schedules, checkReminders]);
  
  // 请求通知权限
  const handleRequestPermission = async () => {
    const result = await requestPermission();
    if (result === 'granted') {
      // 注册服务工作器
      await registerNotificationWorker();
      setShowBanner(false);
    }
  };
  
  // 关闭横幅
  const handleCloseBanner = () => {
    setShowBanner(false);
  };
  
  // 如果不支持通知或不显示横幅，则不渲染任何内容
  if (!isSupported || !showBanner) {
    return null;
  }
  
  return (
    <div style={{ 
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      maxWidth: '400px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      padding: '15px',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        <h3 style={{ margin: 0, color: '#2c3e50' }}>
          启用通知
        </h3>
        <button
          onClick={handleCloseBanner}
          style={{ 
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: '#666'
          }}
          aria-label="关闭"
        >
          ×
        </button>
      </div>
      
      <p style={{ margin: '0 0 15px 0', color: '#666' }}>
        启用通知以接收日程提醒，确保您不会错过重要的活动或会议。
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleRequestPermission}
          style={{ 
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          启用通知
        </button>
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationManager;