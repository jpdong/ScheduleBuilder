"use client"
import React, { useState, useEffect } from 'react';

interface NotificationPermissionProps {
  onPermissionChange?: (permission: NotificationPermission) => void;
}

const NotificationPermission: React.FC<NotificationPermissionProps> = ({ 
  onPermissionChange 
}) => {
  // Notification permission state
  const [permission, setPermission] = useState<NotificationPermission>('default');
  
  // Check notification permission
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);
  
  // Request notification permission
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
  
  // If browser doesn't support notifications
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return (
      <div style={{ 
        padding: '10px', 
        background: '#FFEBEE', 
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <p style={{ margin: 0, color: '#D32F2F' }}>
          Your browser doesn't support notifications. Reminders will not work properly.
        </p>
      </div>
    );
  }
  
  // If permission is granted
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
          Notification permission granted. You will receive schedule reminders.
        </p>
      </div>
    );
  }
  
  // If permission is denied
  if (permission === 'denied') {
    return (
      <div style={{ 
        padding: '10px', 
        background: '#FFEBEE', 
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <p style={{ margin: 0, color: '#D32F2F' }}>
          Notification permission denied. You will not receive schedule reminders. Please enable notification permission in your browser settings.
        </p>
      </div>
    );
  }
  
  // If permission is default/undecided
  return (
    <div style={{ 
      padding: '15px', 
      background: '#FFF3E0', 
      borderRadius: '4px',
      marginBottom: '15px'
    }}>
      <p style={{ marginTop: 0, marginBottom: '10px', color: '#E65100' }}>
        To receive schedule reminders, you need to authorize notification permissions.
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
        Allow Notifications
      </button>
    </div>
  );
};

export default NotificationPermission;