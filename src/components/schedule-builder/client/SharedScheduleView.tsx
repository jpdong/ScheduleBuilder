"use client"
import React, { useState, useEffect } from 'react';
import { Schedule } from '../types';
import { useSchedule } from '../context/ScheduleContext';
import ScheduleDetail from './ScheduleDetail';
import EmptyState from './EmptyState';

interface SharedScheduleViewProps {
  shareId: string;
}

const SharedScheduleView: React.FC<SharedScheduleViewProps> = ({ shareId }) => {
  const { schedules } = useSchedule();
  
  // 状态
  const [sharedSchedule, setSharedSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 查找共享的日程
  useEffect(() => {
    setLoading(true);
    
    try {
      // 查找具有匹配 shareId 的日程
      const foundSchedule = schedules.find(
        s => s.shared && s.shareSettings?.shareId === shareId
      );
      
      if (foundSchedule) {
        // 检查是否过期
        if (foundSchedule.shareSettings?.expiresAt && 
            foundSchedule.shareSettings.expiresAt < new Date()) {
          setError('此分享链接已过期。');
          setSharedSchedule(null);
        } else {
          setSharedSchedule(foundSchedule);
          setError(null);
        }
      } else {
        setError('找不到此分享日程，或者分享已被取消。');
        setSharedSchedule(null);
      }
    } catch (err) {
      console.error('Error finding shared schedule:', err);
      setError('加载分享日程时出错。');
      setSharedSchedule(null);
    } finally {
      setLoading(false);
    }
  }, [shareId, schedules]);
  
  // 处理编辑
  const handleEdit = () => {
    // 检查权限
    if (sharedSchedule?.shareSettings?.permission !== 'edit') {
      alert('您没有编辑此日程的权限。');
      return;
    }
    
    // 在实际应用中，这里应该打开编辑表单
    alert('编辑功能在共享视图中尚未实现。');
  };
  
  // 处理删除（在共享视图中禁用）
  const handleDelete = () => {
    alert('您不能删除共享的日程。');
  };
  
  // 处理分享（在共享视图中禁用）
  const handleShare = () => {
    alert('您不能重新分享此日程。');
  };
  
  // 处理返回
  const handleBack = () => {
    // 在实际应用中，这里应该返回到日程列表
    window.history.back();
  };
  
  // 加载中
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '300px'
      }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
          <div>正在加载分享的日程...</div>
        </div>
      </div>
    );
  }
  
  // 错误
  if (error) {
    return (
      <EmptyState
        title="无法访问分享的日程"
        description={error}
        icon="❌"
      />
    );
  }
  
  // 显示日程详情
  if (sharedSchedule) {
    return (
      <div className="shared-schedule-view">
        <div style={{ 
          background: '#E8F5E9', 
          padding: '10px 15px', 
          borderRadius: '4px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ fontSize: '1.2rem' }}>🔗</div>
          <div>
            <div style={{ fontWeight: 'bold' }}>
              您正在查看分享的日程
            </div>
            <div style={{ fontSize: '0.9rem', color: '#2E7D32' }}>
              权限：{sharedSchedule.shareSettings?.permission === 'read' ? '只读' : '可编辑'}
              {sharedSchedule.shareSettings?.expiresAt && 
                ` · 过期时间：${sharedSchedule.shareSettings.expiresAt.toLocaleString()}`}
            </div>
          </div>
        </div>
        
        <ScheduleDetail
          schedule={sharedSchedule}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShare={handleShare}
          onBack={handleBack}
        />
      </div>
    );
  }
  
  // 默认情况（不应该到达这里）
  return (
    <EmptyState
      title="出现了问题"
      description="无法加载分享的日程。请检查链接是否正确。"
      icon="❓"
    />
  );
};

export default SharedScheduleView;