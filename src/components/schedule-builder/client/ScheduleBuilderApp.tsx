"use client"
import React, { useState, useEffect } from 'react';
import { Schedule } from '../types';
import { useSchedule } from '../context/ScheduleContext';
import ScheduleList from './ScheduleList';
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleCreator from './ScheduleCreator';
import ScheduleDetail from './ScheduleDetail';
import NotificationManager from './NotificationManager';
import EmptyState from './EmptyState';
import Modal from './Modal';

const ScheduleBuilderApp: React.FC = () => {
  // Use schedule context
  const {
    schedules,
    selectedDate,
    currentView,
    setSelectedDate,
    setCurrentView,
    getSchedulesForCurrentView,
    deleteSchedule
  } = useSchedule();

  // State
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('calendar');
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Get schedule ID from URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const scheduleId = urlParams.get('scheduleId');

      if (scheduleId) {
        const schedule = schedules.find(s => s.id === scheduleId);
        if (schedule) {
          setSelectedSchedule(schedule);
          setIsDetailModalOpen(true);
        }
      }
    }
  }, [schedules]);

  // Handle create schedule
  const handleCreateSchedule = () => {
    setSelectedSchedule(null);
    setIsCreateModalOpen(true);
  };

  // Handle save schedule
  const handleSaveSchedule = (schedule: Schedule) => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    // Optionally show the created/updated schedule in detail modal
    setSelectedSchedule(schedule);
    setIsDetailModalOpen(true);
  };

  // Handle cancel create/edit
  const handleCancelCreate = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedSchedule(null);
  };

  // Handle edit schedule
  const handleEditSchedule = (id: string) => {
    const schedule = schedules.find(s => s.id === id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsDetailModalOpen(false);
      setIsEditModalOpen(true);
    }
  };

  // Handle delete schedule
  const handleDeleteSchedule = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await deleteSchedule(id);
        setIsDetailModalOpen(false);
        setSelectedSchedule(null);
      } catch (error) {
        console.error('Failed to delete schedule:', error);
        alert('Failed to delete schedule. Please try again.');
      }
    }
  };

  // Handle view schedule details
  const handleViewSchedule = (id: string) => {
    const schedule = schedules.find(s => s.id === id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsDetailModalOpen(true);

      // Update URL parameters
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('scheduleId', id);
        window.history.pushState({}, '', url);
      }
    }
  };

  // Handle close detail modal
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedSchedule(null);

    // Clear URL parameters
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('scheduleId');
      window.history.pushState({}, '', url);
    }
  };

  // Handle edit from detail modal
  const handleEditFromDetail = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  // Handle share schedule
  const handleShareSchedule = () => {
    // Share functionality can be implemented here
    console.log('Share schedule:', selectedSchedule);
  };


  // Get schedules for current view
  const visibleSchedules = getSchedulesForCurrentView();

  // Render main content
  const renderContent = () => {
    return (
      <div style={{ padding: '20px' }}>
        {/* Header with view toggle and create button */}
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
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: activeView === 'calendar' ? '#007bff' : 'white',
                color: activeView === 'calendar' ? 'white' : '#333',
                cursor: 'pointer'
              }}
            >
              Calendar View
            </button>
            <button
              onClick={() => setActiveView('list')}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: activeView === 'list' ? '#007bff' : 'white',
                color: activeView === 'list' ? 'white' : '#333',
                cursor: 'pointer'
              }}
            >
              List View
            </button>
          </div>

          <button
            onClick={handleCreateSchedule}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            + Create Schedule
          </button>
        </div>

        {/* Main content area */}
        {schedules.length === 0 ? (
          <EmptyState onCreateSchedule={handleCreateSchedule} />
        ) : (
          <div>
            {activeView === 'calendar' ? (
              <ScheduleCalendar
                schedules={visibleSchedules}
                view={currentView}
                date={selectedDate}
                onDateChange={setSelectedDate}
                onScheduleClick={handleViewSchedule}
                onViewChange={setCurrentView}
              />
            ) : (
              <ScheduleList
                schedules={visibleSchedules}
                onScheduleClick={handleViewSchedule}
                onEditSchedule={handleEditSchedule}
                onDeleteSchedule={handleDeleteSchedule}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="schedule-builder-app">
      {/* 主内容 */}
      {renderContent()}

      {/* Create Schedule Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCancelCreate}
        title="Create New Schedule"
        size="large"
      >
        <ScheduleCreator
          onSave={handleSaveSchedule}
          onCancel={handleCancelCreate}
          initialDate={selectedDate}
        />
      </Modal>

      {/* Edit Schedule Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCancelCreate}
        title="Edit Schedule"
        size="large"
      >
        {selectedSchedule && (
          <ScheduleCreator
            schedule={selectedSchedule}
            onSave={handleSaveSchedule}
            onCancel={handleCancelCreate}
            isEditing={true}
          />
        )}
      </Modal>

      {/* Schedule Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        title="Schedule Details"
        size="medium"
      >
        {selectedSchedule && (
          <ScheduleDetail
            schedule={selectedSchedule}
            onEdit={handleEditFromDetail}
            onDelete={() => handleDeleteSchedule(selectedSchedule.id)}
            onShare={handleShareSchedule}
            onClose={handleCloseDetailModal}
          />
        )}
      </Modal>

      {/* 通知管理器 */}
      <NotificationManager schedules={schedules} />
    </div>
  );
};

export default ScheduleBuilderApp;