"use client"
import React, { useState, useEffect } from 'react';
import { Schedule, ScheduleView } from '../types';
import { useSchedule } from '../context/ScheduleContext';
import ScheduleList from './ScheduleList';
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleCreator from './ScheduleCreator';
import ScheduleDetail from './ScheduleDetail';
import ScheduleShare from './ScheduleShare';
import NotificationManager from './NotificationManager';
import EmptyState from './EmptyState';

const ScheduleBuilderApp: React.FC = () => {
  // 使用日程上下文
  const { 
    schedules, 
    selectedDate, 
    currentView, 
    setSelectedDate, 
    setCurrentView,
    getSchedulesForCurrentView,
    deleteSchedule
  } = useSchedule();
  
  // 状态
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('calendar');
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // 从 URL 参数中获取日程 ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const scheduleId = urlParams.get('scheduleId');
      
      if (scheduleId) {
        const schedule = schedules.find(s => s.id === scheduleId);
        if (schedule) {
          setSelectedSchedule(schedule);
        }
      }
    }
  }, [schedules]);
  
  // 处理创建日程
  const handleCreateSchedule = () => {
    setIsCreating(true);
    setSelectedSchedule(null);
    setIsEditing(false);
    setIsSharing(false);
  };
  
  // 处理保存日程
  const handleSaveSchedule = (schedule: Schedule) => {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedSchedule(schedule);
  };
  
  // 处理取消创建/编辑
  const handleCancelCreate = () => {
    setIsCreating(false);
    setIsEditing(false);
  };
  
  // 处理编辑日程
  const handleEditSchedule = (id: string) => {
    const schedule = schedules.find(s => s.id === id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsEditing(true);
      setIsCreating(false);
      setIsSharing(false);
    }
  };
  
  // 处理删除日程
  const handleDeleteSchedule = async (id: string) => {
    try {
      await deleteSchedule(id);
      if (selectedSchedule && selectedSchedule.id === id) {
        setSelectedSchedule(null);
      }
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      alert('删除日程失败，请重试。');
    }
  };
  
  // 处理查看日程详情
  const handleViewSchedule = (id: string) => {
    const schedule = schedules.find(s => s.id === id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsEditing(false);
      setIsCreating(false);
      setIsSharing(false);
      
      // 更新 URL 参数
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('scheduleId', id);
        window.history.pushState({}, '', url);
      }
    }
  };
  
  // 处理返回列表/日历
  const handleBackToList = () => {
    setSelectedSchedule(null);
    setIsEditing(false);
    setIsCreating(false);
    setIsSharing(false);
    
    // 清除 URL 参数
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('scheduleId');
      window.history.pushState({}, '', url);
    }
  };
  
  // 处理分享日程
  const handleShareSchedule = () => {
    if (selectedSchedule) {
      setIsSharing(true);
      setIsEditing(false);
      setIsCreating(false);
    }
  };
  
  // 处理取消分享
  const handleCancelShare = () => {
    setIsSharing(false);
  };
  
  // 获取当前视图的日程
  const visibleSchedules = getSchedulesForCurrentView();
  
  // 渲染内容
  const renderContent = () => {
    // 创建新日程
    if (isCreating) {
      return (
        <ScheduleCreator
          onSave={handleSaveSchedule}
          onCancel={handleCancelCreate}
        />
      );
    }
    
    // 编辑日程
    if (isEditing && selectedSchedule) {
      return (
        <ScheduleCreator
          initialData={selectedSchedule}
          onSave={handleSaveSchedule}
          onCancel={handleCancelCreate}
        />
      );
    }
    
    // 分享日程
    if (isSharing && selectedSchedule) {
      return (
        <ScheduleShare
          schedule={selectedSchedule}
          onClose={handleCancelShare}
        />
      );
    }
    
    // 查看日程详情
    if (selectedSchedule) {
      return (
        <ScheduleDetail
          schedule={selectedSchedule}
          onEdit={() => setIsEditing(true)}
          onDelete={() => handleDeleteSchedule(selectedSchedule.id)}
          onShare={handleShareSchedule}
          onBack={handleBackToList}
        />
      );
    }
    
    // 日程列表或日历视图
    return (
      <>
        {/* 视图切换和创建按钮 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveView('calendar')}
              style={{ 
                background: activeView === 'calendar' ? '#E8F5E9' : 'white',
                border: '1px solid #ddd',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: activeView === 'calendar' ? 'bold' : 'normal',
                color: activeView === 'calendar' ? '#4CAF50' : '#666'
              }}
            >
              日历视图
            </button>
            <button
              onClick={() => setActiveView('list')}
              style={{ 
                background: activeView === 'list' ? '#E8F5E9' : 'white',
                border: '1px solid #ddd',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: activeView === 'list' ? 'bold' : 'normal',
                color: activeView === 'list' ? '#4CAF50' : '#666'
              }}
            >
              列表视图
            </button>
          </div>
          
          <button
            onClick={handleCreateSchedule}
            style={{ 
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>+</span> 创建新日程
          </button>
        </div>
        
        {/* 日程内容 */}
        {schedules.length === 0 ? (
          <EmptyState
            title="欢迎使用日程安排构建器"
            description="您还没有创建任何日程。点击'创建新日程'按钮开始添加您的第一个日程安排。"
            actionText="创建新日程"
            onAction={handleCreateSchedule}
            icon="📅"
          />
        ) : activeView === 'calendar' ? (
          <ScheduleCalendar
            schedules={schedules}
            view={currentView}
            date={selectedDate}
            onDateChange={setSelectedDate}
            onViewChange={setCurrentView}
            onScheduleClick={handleViewSchedule}
          />
        ) : (
          <ScheduleList
            schedules={visibleSchedules}
            onEdit={handleEditSchedule}
            onDelete={handleDeleteSchedule}
            onView={handleViewSchedule}
          />
        )}
      </>
    );
  };
  
  return (
    <div className="schedule-builder-app">
      {/* 主内容 */}
      {renderContent()}
      
      {/* 通知管理器 */}
      <NotificationManager schedules={schedules} />
    </div>
  );
};

export default ScheduleBuilderApp;