"use client"
import { Schedule } from '../types';

// 存储键
const STORAGE_KEY = 'schedule-builder-data';
const STORAGE_VERSION_KEY = 'schedule-builder-version';
const CURRENT_VERSION = '1.0.0';

/**
 * 将日程数据保存到本地存储
 * @param schedules 日程数据数组
 * @returns 是否保存成功
 */
export const saveSchedulesToStorage = (schedules: Schedule[]): boolean => {
  try {
    // 保存版本信息
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
    
    // 保存日程数据
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
    return true;
  } catch (error) {
    console.error('Failed to save schedules to localStorage:', error);
    return false;
  }
};

/**
 * 从本地存储加载日程数据
 * @returns 日程数据数组或 null（如果加载失败）
 */
export const loadSchedulesFromStorage = (): Schedule[] | null => {
  try {
    // 检查版本
    const version = localStorage.getItem(STORAGE_VERSION_KEY);
    if (version !== CURRENT_VERSION) {
      // 如果版本不匹配，可以在这里进行数据迁移
      console.log('Storage version mismatch, migrating data...');
      // migrateData(version, CURRENT_VERSION);
    }
    
    // 加载数据
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return [];
    }
    
    const parsedData = JSON.parse(storedData);
    
    // 将字符串日期转换为 Date 对象
    const processedSchedules = parsedData.map((schedule: any) => ({
      ...schedule,
      startTime: new Date(schedule.startTime),
      endTime: new Date(schedule.endTime),
      createdAt: new Date(schedule.createdAt),
      updatedAt: new Date(schedule.updatedAt),
      reminders: schedule.reminders.map((reminder: any) => ({
        ...reminder,
        time: new Date(reminder.time)
      })),
      shareSettings: schedule.shareSettings ? {
        ...schedule.shareSettings,
        expiresAt: schedule.shareSettings.expiresAt ? new Date(schedule.shareSettings.expiresAt) : undefined
      } : undefined
    }));
    
    return processedSchedules;
  } catch (error) {
    console.error('Failed to load schedules from localStorage:', error);
    return null;
  }
};

/**
 * 清除本地存储中的日程数据
 * @returns 是否清除成功
 */
export const clearSchedulesStorage = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear schedules from localStorage:', error);
    return false;
  }
};

/**
 * 检查本地存储是否可用
 * @returns 本地存储是否可用
 */
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 获取本地存储使用情况
 * @returns 本地存储使用情况（已使用字节数和总容量）
 */
export const getStorageUsage = (): { used: number; total: number } => {
  try {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += key.length + value.length;
        }
      }
    }
    
    // 本地存储总容量约为 5MB
    const totalCapacity = 5 * 1024 * 1024;
    
    return {
      used: totalSize,
      total: totalCapacity
    };
  } catch (error) {
    console.error('Failed to get storage usage:', error);
    return { used: 0, total: 0 };
  }
};

/**
 * 导出日程数据为 JSON 文件
 * @param schedules 日程数据数组
 */
export const exportSchedulesToJson = (schedules: Schedule[]): void => {
  try {
    const dataStr = JSON.stringify(schedules, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `schedule-builder-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } catch (error) {
    console.error('Failed to export schedules:', error);
  }
};

/**
 * 从 JSON 文件导入日程数据
 * @param file JSON 文件
 * @returns Promise，解析为导入的日程数据数组
 */
export const importSchedulesFromJson = (file: File): Promise<Schedule[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target || typeof event.target.result !== 'string') {
          reject(new Error('Failed to read file'));
          return;
        }
        
        const parsedData = JSON.parse(event.target.result);
        
        // 验证导入的数据
        if (!Array.isArray(parsedData)) {
          reject(new Error('Invalid data format: expected an array'));
          return;
        }
        
        // 将字符串日期转换为 Date 对象
        const processedSchedules = parsedData.map((schedule: any) => ({
          ...schedule,
          startTime: new Date(schedule.startTime),
          endTime: new Date(schedule.endTime),
          createdAt: new Date(schedule.createdAt),
          updatedAt: new Date(schedule.updatedAt),
          reminders: schedule.reminders.map((reminder: any) => ({
            ...reminder,
            time: new Date(reminder.time)
          })),
          shareSettings: schedule.shareSettings ? {
            ...schedule.shareSettings,
            expiresAt: schedule.shareSettings.expiresAt ? new Date(schedule.shareSettings.expiresAt) : undefined
          } : undefined
        }));
        
        resolve(processedSchedules);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};