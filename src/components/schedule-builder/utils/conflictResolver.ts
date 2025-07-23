import { Schedule } from '../types';

/**
 * 查找下一个可用的时间段
 * @param schedules 现有日程列表
 * @param duration 所需时间段长度（毫秒）
 * @param startAfter 开始搜索的时间点
 * @returns 建议的开始时间和结束时间
 */
export const findNextAvailableSlot = (
  schedules: Schedule[],
  duration: number,
  startAfter: Date = new Date()
): { startTime: Date; endTime: Date } => {
  // 如果没有日程，直接返回从现在开始的时间段
  if (schedules.length === 0) {
    const start = new Date(Math.max(startAfter.getTime(), Date.now()));
    const end = new Date(start.getTime() + duration);
    return { startTime: start, endTime: end };
  }

  // 按开始时间排序日程
  const sortedSchedules = [...schedules].sort((a, b) => 
    a.startTime.getTime() - b.startTime.getTime()
  );

  // 找到第一个开始时间晚于 startAfter 的日程
  let candidateStart = new Date(Math.max(startAfter.getTime(), Date.now()));
  
  for (let i = 0; i < sortedSchedules.length; i++) {
    const currentSchedule = sortedSchedules[i];
    
    // 如果当前日程开始时间晚于候选开始时间，检查间隔是否足够
    if (currentSchedule.startTime > candidateStart) {
      const availableGap = currentSchedule.startTime.getTime() - candidateStart.getTime();
      
      // 如果间隔足够，返回这个时间段
      if (availableGap >= duration) {
        return {
          startTime: candidateStart,
          endTime: new Date(candidateStart.getTime() + duration)
        };
      }
    }
    
    // 更新候选开始时间为当前日程结束时间
    if (currentSchedule.endTime > candidateStart) {
      candidateStart = new Date(currentSchedule.endTime);
    }
  }

  // 如果没有找到合适的间隔，返回最后一个日程结束后的时间段
  return {
    startTime: candidateStart,
    endTime: new Date(candidateStart.getTime() + duration)
  };
};

/**
 * 建议调整时间以避免冲突
 * @param schedule 要调整的日程
 * @param existingSchedules 现有日程列表
 * @returns 建议的开始时间和结束时间
 */
export const suggestAlternativeTime = (
  schedule: Pick<Schedule, 'startTime' | 'endTime'>,
  existingSchedules: Schedule[]
): { startTime: Date; endTime: Date } => {
  const duration = schedule.endTime.getTime() - schedule.startTime.getTime();
  
  // 尝试找到最接近原始时间的可用时间段
  return findNextAvailableSlot(existingSchedules, duration, schedule.startTime);
};

/**
 * 检查两个日程是否重叠
 * @param a 第一个日程
 * @param b 第二个日程
 * @returns 是否重叠
 */
export const doSchedulesOverlap = (
  a: Pick<Schedule, 'startTime' | 'endTime'>,
  b: Pick<Schedule, 'startTime' | 'endTime'>
): boolean => {
  return (
    (a.startTime >= b.startTime && a.startTime < b.endTime) ||
    (a.endTime > b.startTime && a.endTime <= b.endTime) ||
    (a.startTime <= b.startTime && a.endTime >= b.endTime)
  );
};