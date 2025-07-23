/**
 * 日程安排接口
 */
export interface Schedule {
  id: string;           // 唯一标识符
  title: string;        // 日程标题
  description: string;  // 日程描述
  startTime: Date;      // 开始时间
  endTime: Date;        // 结束时间
  reminders: Reminder[]; // 提醒设置
  color?: string;       // 可选的颜色标记
  shared: boolean;      // 是否已分享
  shareSettings?: ShareSettings; // 分享设置
  createdAt: Date;      // 创建时间
  updatedAt: Date;      // 更新时间
}

/**
 * 提醒设置接口
 */
export interface Reminder {
  id: string;           // 唯一标识符
  time: Date;           // 提醒时间
  triggered: boolean;   // 是否已触发
}

/**
 * 分享设置接口
 */
export interface ShareSettings {
  shareId: string;      // 分享链接ID
  permission: 'read' | 'edit'; // 权限级别
  expiresAt?: Date;     // 过期时间（可选）
}

/**
 * 日程视图类型
 */
export type ScheduleView = 'day' | 'week' | 'month';

/**
 * 创建日程表单数据
 */
export interface ScheduleFormData {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  color?: string;
  reminders: {
    time: number; // 提前多少分钟提醒
  }[];
}

/**
 * 日程验证错误
 */
export interface ScheduleValidationError {
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  reminders?: string;
  general?: string;
}