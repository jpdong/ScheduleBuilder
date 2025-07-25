/**
 * 格式化日期为 YYYY-MM-DD 格式
 * @param date 日期对象
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return new Date().toISOString().split('T')[0]; // Return current date as fallback
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 格式化时间为 HH:MM 格式
 * @param date 日期对象
 * @returns 格式化后的时间字符串
 */
export const formatTime = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * 格式化日期和时间为 YYYY-MM-DD HH:MM 格式
 * @param date 日期对象
 * @returns 格式化后的日期时间字符串
 */
export const formatDateTime = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    const now = new Date();
    return `${formatDate(now)} ${formatTime(now)}`;
  }
  return `${formatDate(date)} ${formatTime(date)}`;
};

/**
 * 解析日期时间字符串为 Date 对象
 * @param dateString 日期字符串 (YYYY-MM-DD)
 * @param timeString 时间字符串 (HH:MM)
 * @returns 日期对象
 */
export const parseDateTime = (dateString: string, timeString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

/**
 * 获取一周的开始日期（周一）
 * @param date 日期对象
 * @returns 一周的开始日期
 */
export const getWeekStart = (date: Date): Date => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    date = new Date();
  }
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : 1); // 调整为周一为一周的开始
  result.setDate(diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * 获取一周的结束日期（周日）
 * @param date 日期对象
 * @returns 一周的结束日期
 */
export const getWeekEnd = (date: Date): Date => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    date = new Date();
  }
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() + (day === 0 ? 0 : 7 - day); // 调整为周日为一周的结束
  result.setDate(diff);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * 获取一个月的开始日期
 * @param date 日期对象
 * @returns 一个月的开始日期
 */
export const getMonthStart = (date: Date): Date => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    date = new Date();
  }
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * 获取一个月的结束日期
 * @param date 日期对象
 * @returns 一个月的结束日期
 */
export const getMonthEnd = (date: Date): Date => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    date = new Date();
  }
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
};

/**
 * 获取两个日期之间的天数
 * @param start 开始日期
 * @param end 结束日期
 * @returns 天数
 */
export const getDaysBetween = (start: Date, end: Date): number => {
  if (!start || !(start instanceof Date) || isNaN(start.getTime())) {
    start = new Date();
  }
  if (!end || !(end instanceof Date) || isNaN(end.getTime())) {
    end = new Date();
  }
  const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
  const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
};

/**
 * Get reminder time options
 * @returns Array of reminder time options
 */
export const getReminderOptions = (): { label: string; value: number }[] => {
  return [
    { label: 'No reminder', value: 0 },
    { label: '5 minutes before', value: 5 },
    { label: '15 minutes before', value: 15 },
    { label: '30 minutes before', value: 30 },
    { label: '1 hour before', value: 60 },
    { label: '2 hours before', value: 120 },
    { label: '1 day before', value: 1440 },
  ];
};

/**
 * 计算提醒时间
 * @param scheduleTime 日程时间
 * @param minutesBefore 提前多少分钟
 * @returns 提醒时间
 */
export const calculateReminderTime = (scheduleTime: Date, minutesBefore: number): Date => {
  if (!scheduleTime || !(scheduleTime instanceof Date) || isNaN(scheduleTime.getTime())) {
    scheduleTime = new Date();
  }
  const reminderTime = new Date(scheduleTime);
  reminderTime.setMinutes(reminderTime.getMinutes() - minutesBefore);
  return reminderTime;
};