"use client"
import React, { useEffect, useState } from 'react';
import { Schedule } from '../types';
import { useNotification } from '../hooks/useNotification';
import { registerNotificationWorker, isServiceWorkerRegistered } from '../utils/serviceWorkerRegistration';

interface NotificationManagerProps {
  schedules: Schedule[];
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ schedules }) => {
  // Notification hook
  const { 
    isSupported, 
    permission, 
    requestPermission, 
    checkReminders 
  } = useNotification();
  
  // State
  const [showBanner, setShowBanner] = useState(false);
  
  // Check notification permission and service worker
  useEffect(() => {
    const checkPermissionAndWorker = async () => {
      if (isSupported) {
        if (permission === 'default') {
          setShowBanner(true);
        } else if (permission === 'granted') {
          // Check if service worker is already registered
          const isRegistered = await isServiceWorkerRegistered();
          if (!isRegistered) {
            // Register service worker
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
  
  // Periodically check reminders
  useEffect(() => {
    if (isSupported && permission === 'granted') {
      // Check immediately
      checkReminders(schedules);
      
      // Set timer to check every minute
      const intervalId = setInterval(() => {
        checkReminders(schedules);
      }, 60000);
      
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isSupported, permission, schedules, checkReminders]);
  
  // Request notification permission
  const handleRequestPermission = async () => {
    const result = await requestPermission();
    if (result === 'granted') {
      // Register service worker
      await registerNotificationWorker();
      setShowBanner(false);
    }
  };
  
  // Close banner
  const handleCloseBanner = () => {
    setShowBanner(false);
  };
  
  // Don't render anything if notifications aren't supported or banner shouldn't be shown
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
          Enable Notifications
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
          aria-label="Close"
        >
          ×
        </button>
      </div>
      
      <p style={{ margin: '0 0 15px 0', color: '#666' }}>
        Enable notifications to receive schedule reminders and ensure you don't miss important events or meetings.
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
          Enable Notifications
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