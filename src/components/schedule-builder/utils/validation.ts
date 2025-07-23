import { ScheduleFormData, ScheduleValidationError, Schedule } from '../types';

/**
 * 验证日程表单数据
 * @param data 日程表单数据
 * @returns 验证错误对象，如果没有错误则返回空对象
 */
export const validateScheduleForm = (data: ScheduleFormData): ScheduleValidationError => {
  const errors: ScheduleValidationError = {};

  // 验证标题
  if (!data.title || data.title.trim() === '') {
    errors.title = '标题不能为空';
  } else if (data.title.length > 100) {
    errors.title = '标题不能超过100个字符';
  }

  // 验证描述
  if (data.description && data.description.length > 500) {
    errors.description = '描述不能超过500个字符';
  }

  // 验证开始时间
  if (!data.startTime) {
    errors.startTime = '开始时间不能为空';
  }

  // 验证结束时间
  if (!data.endTime) {
    errors.endTime = '结束时间不能为空';
  } else if (data.startTime && data.endTime < data.startTime) {
    errors.endTime = '结束时间必须晚于开始时间';
  }

  // 验证提醒设置
  if (data.reminders && data.reminders.some(r => r.time < 0)) {
    errors.reminders = '提醒时间必须为正数';
  }

  return errors;
};

/**
 * 检测日程时间冲突
 * @param newSchedule 新日程或编辑的日程
 * @param existingSchedules 现有日程列表
 * @returns 是否存在冲突
 */
export const detectScheduleConflict = (
  newSchedule: Pick<Schedule, 'id' | 'startTime' | 'endTime'>, 
  existingSchedules: Pick<Schedule, 'id' | 'startTime' | 'endTime'>[]
): boolean => {
  return existingSchedules.some(schedule => {
    // 跳过与自身的比较（编辑情况）
    if (schedule.id === newSchedule.id) {
      return false;
    }

    // 检查时间重叠
    // 情况1：新日程的开始时间在现有日程的时间范围内
    // 情况2：新日程的结束时间在现有日程的时间范围内
    // 情况3：新日程完全包含现有日程
    return (
      (newSchedule.startTime >= schedule.startTime && newSchedule.startTime < schedule.endTime) ||
      (newSchedule.endTime > schedule.startTime && newSchedule.endTime <= schedule.endTime) ||
      (newSchedule.startTime <= schedule.startTime && newSchedule.endTime >= schedule.endTime)
    );
  });
};

/**
 * 获取冲突的日程
 * @param newSchedule 新日程或编辑的日程
 * @param existingSchedules 现有日程列表
 * @returns 冲突的日程列表
 */
export const getConflictingSchedules = (
  newSchedule: Pick<Schedule, 'id' | 'startTime' | 'endTime'>, 
  existingSchedules: Schedule[]
): Schedule[] => {
  return existingSchedules.filter(schedule => {
    // 跳过与自身的比较（编辑情况）
    if (schedule.id === newSchedule.id) {
      return false;
    }

    // 检查时间重叠
    return (
      (newSchedule.startTime >= schedule.startTime && newSchedule.startTime < schedule.endTime) ||
      (newSchedule.endTime > schedule.startTime && newSchedule.endTime <= schedule.endTime) ||
      (newSchedule.startTime <= schedule.startTime && newSchedule.endTime >= schedule.endTime)
    );
  });
};