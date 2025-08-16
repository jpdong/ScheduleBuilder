"use client"
import React from 'react';
import { ScheduleProvider } from '../context/ScheduleContext';
import AppleScheduleBuilder from './AppleScheduleBuilder';

interface AppleScheduleBuilderAppProps {
  className?: string;
}

const AppleScheduleBuilderApp: React.FC<AppleScheduleBuilderAppProps> = ({ className }) => {
  return (
    <ScheduleProvider>
      <AppleScheduleBuilder className={className} />
    </ScheduleProvider>
  );
};

export default AppleScheduleBuilderApp;

// 导出所有组件以便独立使用
export { default as AppleScheduleBuilder } from './AppleScheduleBuilder';
export { default as AppleEventCard } from './AppleEventCard';
export { default as AppleCreateModal } from './AppleCreateModal';
export { default as AppleQuickActions } from './AppleQuickActions';
export { default as AppleWeekView } from './AppleWeekView';
export { default as AppleMonthView } from './AppleMonthView';