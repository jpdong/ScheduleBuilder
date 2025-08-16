"use client"
import React from 'react';
import AppleScheduleBuilderApp from '../../src/components/schedule-builder/apple';

export default function AppleSchedulePage() {
  return (
    <div style={{ 
      height: '100vh', 
      backgroundColor: '#F2F2F7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <AppleScheduleBuilderApp />
    </div>
  );
}