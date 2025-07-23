"use client"

/**
 * 注册通知服务工作器
 * @returns Promise<ServiceWorkerRegistration | null>
 */
export const registerNotificationWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/notification-worker.js');
    console.log('通知服务工作器注册成功:', registration.scope);
    return registration;
  } catch (error) {
    console.error('通知服务工作器注册失败:', error);
    return null;
  }
};

/**
 * 检查服务工作器是否已注册
 * @returns Promise<boolean>
 */
export const isServiceWorkerRegistered = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }
  
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    return registrations.some(registration => 
      registration.active && registration.active.scriptURL.includes('notification-worker.js')
    );
  } catch (error) {
    console.error('检查服务工作器注册状态时出错:', error);
    return false;
  }
};

/**
 * 注销通知服务工作器
 * @returns Promise<boolean>
 */
export const unregisterNotificationWorker = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }
  
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    let unregistered = false;
    
    for (const registration of registrations) {
      if (registration.active && registration.active.scriptURL.includes('notification-worker.js')) {
        await registration.unregister();
        unregistered = true;
      }
    }
    
    return unregistered;
  } catch (error) {
    console.error('注销服务工作器时出错:', error);
    return false;
  }
};