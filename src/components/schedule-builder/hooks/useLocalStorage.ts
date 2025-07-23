"use client"
import { useState, useEffect } from 'react';

/**
 * 使用本地存储的自定义钩子
 * @param key 存储键
 * @param initialValue 初始值
 * @returns [存储的值, 设置值的函数, 是否正在加载, 错误信息]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, boolean, Error | null] {
  // 状态
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 初始化
  useEffect(() => {
    try {
      // 从本地存储获取值
      const item = window.localStorage.getItem(key);
      // 如果存在值，则解析并设置
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      // 如果出错，设置错误状态
      console.error(`Error reading localStorage key "${key}":`, error);
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      // 无论成功还是失败，都设置加载完成
      setLoading(false);
    }
  }, [key]);

  // 设置值的函数
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许值是一个函数，类似于 useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // 保存到状态
      setStoredValue(valueToStore);
      // 保存到本地存储
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // 如果出错，设置错误状态
      console.error(`Error setting localStorage key "${key}":`, error);
      setError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return [storedValue, setValue, loading, error];
}

/**
 * 使用会话存储的自定义钩子
 * @param key 存储键
 * @param initialValue 初始值
 * @returns [存储的值, 设置值的函数]
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // 状态
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // 从会话存储获取值
      const item = window.sessionStorage.getItem(key);
      // 如果存在值，则解析并返回
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // 如果出错，返回初始值
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 设置值的函数
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许值是一个函数，类似于 useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // 保存到状态
      setStoredValue(valueToStore);
      // 保存到会话存储
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // 如果出错，记录错误
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}