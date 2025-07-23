"use client"
import { useState, useEffect, useCallback } from 'react';
import { Schedule, Reminder } from '../types';
import { useSchedule } from '../context/ScheduleContext';

interface CustomNotificationOptions {
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  requireInteraction?: boolean;
  silent?: boolean;
  renotify?: boolean;
}

/**
 * 通知管理钩子
 * @returns 通知相关函数和状态
 */
export const useNotification = () => {
  // 通知权限状态
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const { updateSchedule } = useSchedule();
  
  // 检查通知支持和权限
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);
  
  // 请求通知权限
  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      return 'denied';
    }
    
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return 'denied';
    }
  };
  
  // 发送通知
  const sendNotification = useCallback((
    title: string,
    options: CustomNotificationOptions
  ): Notification | null => {
    if (!isSupported || permission !== 'granted') {
      return null;
    }
    
    try {
      const notification = new Notification(title, options);
      
      // 添加点击事件处理
      if (options.data) {
        notification.onclick = () => {
          // 如果有日程ID，则打开日程详情
          if (options.data.scheduleId) {
            window.focus();
            // 在实际应用中，这里应该导航到日程详情页面
            window.location.href = `/schedule-builder?scheduleId=${options.data.scheduleId}`;
          }
        };
      }
      
      return notification;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return null;
    }
  }, [isSupported, permission]);
  
  // 发送日程提醒通知
  const sendScheduleReminder = useCallback((
    schedule: Schedule,
    reminder: Reminder
  ): Notification | null => {
    if (!isSupported || permission !== 'granted') {
      return null;
    }
    
    const title = `Reminder: ${schedule.title}`;
    const startTime = schedule.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const body = `Your event "${schedule.title}" will start at ${startTime}.`;
    
    const options: CustomNotificationOptions = {
      body,
      icon: '/logo.png',
      badge: '/logo.png',
      tag: `schedule-${schedule.id}-${reminder.id}`,
      data: { scheduleId: schedule.id, reminderId: reminder.id },
      requireInteraction: true
    };
    
    const notification = sendNotification(title, options);
    
    // 标记提醒为已触发
    if (notification) {
      updateSchedule(schedule.id, {
        reminders: schedule.reminders.map(r => 
          r.id === reminder.id ? { ...r, triggered: true } : r
        )
      }).catch(error => {
        console.error('Failed to update reminder status:', error);
      });
    }
    
    return notification;
  }, [isSupported, permission, sendNotification, updateSchedule]);
  
  // 检查并触发到期提醒
  const checkReminders = useCallback((schedules: Schedule[]): void => {
    if (!isSupported || permission !== 'granted') {
      return;
    }
    
    const now = new Date();
    
    schedules.forEach(schedule => {
      schedule.reminders.forEach(reminder => {
        if (!reminder.triggered && reminder.time <= now && reminder.time >= new Date(now.getTime() - 60000)) {
          // 如果提醒时间在当前时间的前后1分钟内，且未触发过，则发送通知
          sendScheduleReminder(schedule, reminder);
        }
      });
    });
  }, [isSupported, permission, sendScheduleReminder]);
  
  // 取消所有通知
  const cancelAllNotifications = useCallback((): void => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.getNotifications().then(notifications => {
          notifications.forEach(notification => notification.close());
        });
      });
    }
  }, []);
  
  // 取消特定日程的通知
  const cancelScheduleNotifications = useCallback((scheduleId: string): void => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.getNotifications().then(notifications => {
          notifications.forEach(notification => {
            const data = notification.data;
            if (data && data.scheduleId === scheduleId) {
              notification.close();
            }
          });
        });
      });
    }
  }, []);
  
  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    sendScheduleReminder,
    checkReminders,
    cancelAllNotifications,
    cancelScheduleNotifications
  };
}
