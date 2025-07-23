"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Schedule, ScheduleView } from '../types';
import { generateId } from '../utils/idUtils';
import { getWeekStart, getWeekEnd, getMonthStart, getMonthEnd } from '../utils/dateUtils';
import { detectScheduleConflict } from '../utils/validation';
import { saveSchedulesToStorage, loadSchedulesFromStorage, isStorageAvailable } from '../utils/storage';

// 上下文接口
interface ScheduleContextType {
  // 日程数据
  schedules: Schedule[];
  selectedDate: Date;
  currentView: ScheduleView;
  isLoading: boolean;
  error: Error | null;
  
  // 日程操作
  addSchedule: (schedule: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt' | 'shared'>) => Promise<Schedule>;
  updateSchedule: (id: string, schedule: Partial<Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<Schedule>;
  deleteSchedule: (id: string) => Promise<void>;
  getScheduleById: (id: string) => Schedule | undefined;
  
  // 视图操作
  setSelectedDate: (date: Date) => void;
  setCurrentView: (view: ScheduleView) => void;
  
  // 筛选方法
  getSchedulesForDay: (date: Date) => Schedule[];
  getSchedulesForWeek: (date: Date) => Schedule[];
  getSchedulesForMonth: (date: Date) => Schedule[];
  getSchedulesForCurrentView: () => Schedule[];
  
  // 冲突检测
  checkConflict: (schedule: Pick<Schedule, 'id' | 'startTime' | 'endTime'>) => boolean;
  
  // 导入导出
  exportSchedules: () => void;
  importSchedules: (schedules: Schedule[]) => void;
}

// 创建上下文
const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

// 上下文提供者组件
interface ScheduleProviderProps {
  children: ReactNode;
}

export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({ children }) => {
  // 状态
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<ScheduleView>('week');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isStorageReady, setIsStorageReady] = useState(false);

  // 检查存储是否可用
  useEffect(() => {
    const storageAvailable = isStorageAvailable();
    setIsStorageReady(storageAvailable);
    
    if (!storageAvailable) {
      setError(new Error('Local storage is not available. Your schedules will not be saved.'));
    }
    
    setIsLoading(false);
  }, []);

  // 从本地存储加载数据
  useEffect(() => {
    if (!isStorageReady) return;
    
    setIsLoading(true);
    try {
      const loadedSchedules = loadSchedulesFromStorage();
      if (loadedSchedules) {
        setSchedules(loadedSchedules);
      }
    } catch (err) {
      console.error('Failed to load schedules:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [isStorageReady]);

  // 保存数据到本地存储
  useEffect(() => {
    if (!isStorageReady || isLoading) return;
    
    try {
      saveSchedulesToStorage(schedules);
    } catch (err) {
      console.error('Failed to save schedules:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [schedules, isStorageReady, isLoading]);

  // 添加日程
  const addSchedule = async (
    scheduleData: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt' | 'shared'>
  ): Promise<Schedule> => {
    const now = new Date();
    const newSchedule: Schedule = {
      ...scheduleData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
      shared: false
    };

    setSchedules(prev => [...prev, newSchedule]);
    return newSchedule;
  };

  // 更新日程
  const updateSchedule = async (
    id: string,
    scheduleData: Partial<Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Schedule> => {
    const updatedSchedules = schedules.map(schedule => {
      if (schedule.id === id) {
        return {
          ...schedule,
          ...scheduleData,
          updatedAt: new Date()
        };
      }
      return schedule;
    });

    setSchedules(updatedSchedules);
    const updatedSchedule = updatedSchedules.find(s => s.id === id);
    if (!updatedSchedule) {
      throw new Error(`Schedule with id ${id} not found`);
    }
    return updatedSchedule;
  };

  // 删除日程
  const deleteSchedule = async (id: string): Promise<void> => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  // 根据 ID 获取日程
  const getScheduleById = (id: string): Schedule | undefined => {
    return schedules.find(schedule => schedule.id === id);
  };

  // 获取指定日期的日程
  const getSchedulesForDay = (date: Date): Schedule[] => {
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    return schedules.filter(schedule => {
      return (
        (schedule.startTime >= dayStart && schedule.startTime <= dayEnd) ||
        (schedule.endTime >= dayStart && schedule.endTime <= dayEnd) ||
        (schedule.startTime <= dayStart && schedule.endTime >= dayEnd)
      );
    });
  };

  // 获取指定周的日程
  const getSchedulesForWeek = (date: Date): Schedule[] => {
    const weekStart = getWeekStart(date);
    const weekEnd = getWeekEnd(date);

    return schedules.filter(schedule => {
      return (
        (schedule.startTime >= weekStart && schedule.startTime <= weekEnd) ||
        (schedule.endTime >= weekStart && schedule.endTime <= weekEnd) ||
        (schedule.startTime <= weekStart && schedule.endTime >= weekEnd)
      );
    });
  };

  // 获取指定月的日程
  const getSchedulesForMonth = (date: Date): Schedule[] => {
    const monthStart = getMonthStart(date);
    const monthEnd = getMonthEnd(date);

    return schedules.filter(schedule => {
      return (
        (schedule.startTime >= monthStart && schedule.startTime <= monthEnd) ||
        (schedule.endTime >= monthStart && schedule.endTime <= monthEnd) ||
        (schedule.startTime <= monthStart && schedule.endTime >= monthEnd)
      );
    });
  };

  // 获取当前视图的日程
  const getSchedulesForCurrentView = (): Schedule[] => {
    switch (currentView) {
      case 'day':
        return getSchedulesForDay(selectedDate);
      case 'week':
        return getSchedulesForWeek(selectedDate);
      case 'month':
        return getSchedulesForMonth(selectedDate);
      default:
        return schedules;
    }
  };

  // 检查日程冲突
  const checkConflict = (
    schedule: Pick<Schedule, 'id' | 'startTime' | 'endTime'>
  ): boolean => {
    return detectScheduleConflict(schedule, schedules);
  };

  // 导出日程
  const exportSchedules = () => {
    try {
      const dataStr = JSON.stringify(schedules, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `schedule-builder-export-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (err) {
      console.error('Failed to export schedules:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  // 导入日程
  const importSchedules = (importedSchedules: Schedule[]) => {
    try {
      setSchedules(prev => [...prev, ...importedSchedules]);
    } catch (err) {
      console.error('Failed to import schedules:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  // 上下文值
  const contextValue: ScheduleContextType = {
    schedules,
    selectedDate,
    currentView,
    isLoading,
    error,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    getScheduleById,
    setSelectedDate,
    setCurrentView,
    getSchedulesForDay,
    getSchedulesForWeek,
    getSchedulesForMonth,
    getSchedulesForCurrentView,
    checkConflict,
    exportSchedules,
    importSchedules
  };

  return (
    <ScheduleContext.Provider value={contextValue}>
      {children}
    </ScheduleContext.Provider>
  );
};

// 自定义钩子，用于访问上下文
export const useSchedule = (): ScheduleContextType => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};