/**
 * 生成唯一ID
 * @returns 唯一ID字符串
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * 生成分享ID
 * @returns 分享ID字符串
 */
export const generateShareId = (): string => {
  return 'share_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
};