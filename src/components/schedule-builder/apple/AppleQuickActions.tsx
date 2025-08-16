"use client"
import React, { useEffect, useRef, useCallback } from 'react';

interface QuickAction {
  id: string;
  icon: string;
  label: string;
  color?: string;
}

interface AppleQuickActionsProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onAction: (actionType: string) => void;
}

const AppleQuickActions: React.FC<AppleQuickActionsProps> = ({
  isOpen,
  position,
  onClose,
  onAction
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // 快速操作定义
  const quickActions: QuickAction[] = [
    {
      id: 'meeting',
      icon: '📅',
      label: 'Meeting',
      color: '#007AFF'
    },
    {
      id: 'call',
      icon: '📞',
      label: 'Call',
      color: '#34C759'
    },
    {
      id: 'break',
      icon: '☕',
      label: 'Break',
      color: '#FF9500'
    },
    {
      id: 'travel',
      icon: '✈️',
      label: 'Travel',
      color: '#FF3B30'
    },
    {
      id: 'focus',
      icon: '🎯',
      label: 'Focus',
      color: '#AF52DE'
    },
    {
      id: 'personal',
      icon: '🏠',
      label: 'Personal',
      color: '#8E8E93'
    }
  ];

  // 处理动作点击
  const handleActionClick = useCallback((actionType: string) => {
    onAction(actionType);
    onClose();
  }, [onAction, onClose]);

  // 处理自定义事件
  const handleCustomEvent = useCallback(() => {
    onAction('custom');
    onClose();
  }, [onAction, onClose]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // ESC键关闭
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  // 计算面板位置
  const getPanelStyle = useCallback(() => {
    if (!isOpen) return { display: 'none' };

    const panelWidth = 260; // 估计的面板宽度
    const panelHeight = 200; // 估计的面板高度
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = position.x - panelWidth / 2;
    let top = position.y - panelHeight - 20; // 向上偏移20px

    // 边界检查和调整
    if (left < 20) {
      left = 20;
    } else if (left + panelWidth > viewportWidth - 20) {
      left = viewportWidth - panelWidth - 20;
    }

    if (top < 20) {
      top = position.y + 20; // 如果上方空间不够，显示在下方
    }

    return {
      position: 'fixed' as const,
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 1000
    };
  }, [isOpen, position]);

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: 999
        }}
        onClick={onClose}
      />

      {/* 快速操作面板 */}
      <div
        ref={panelRef}
        className="apple-quick-actions"
        style={getPanelStyle()}
        role="dialog"
        aria-label="Quick actions menu"
      >
        {/* 快速操作按钮网格 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '12px',
          marginBottom: '16px'
        }}>
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="apple-quick-action-button"
              onClick={() => handleActionClick(action.id)}
              style={{
                borderColor: action.color ? `${action.color}20` : undefined
              }}
              aria-label={`Create ${action.label.toLowerCase()} event`}
            >
              <div className="apple-quick-action-icon">
                {action.icon}
              </div>
              <div className="apple-quick-action-label">
                {action.label}
              </div>
            </button>
          ))}
        </div>

        {/* 分隔线 */}
        <div style={{
          height: '1px',
          backgroundColor: 'var(--apple-opacity-separator)',
          margin: '12px 0'
        }} />

        {/* 自定义事件按钮 */}
        <button
          className="apple-button"
          onClick={handleCustomEvent}
          style={{
            width: '100%',
            fontSize: '15px',
            marginBottom: '8px'
          }}
        >
          ➕ Custom Event
        </button>

        {/* 取消按钮 */}
        <button
          className="apple-button-secondary"
          onClick={onClose}
          style={{
            width: '100%',
            fontSize: '15px'
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default AppleQuickActions;