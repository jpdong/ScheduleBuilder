import { renderHook, act } from '@testing-library/react';
import useViewportHeight from '../useViewportHeight';

describe('useViewportHeight', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    // Reset window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
  });

  afterEach(() => {
    // Restore original values
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, writable: true });
  });

  it('should return initial viewport dimensions', () => {
    const { result } = renderHook(() => useViewportHeight());
    
    expect(result.current.viewportHeight).toBe(768);
    expect(result.current.isLandscape).toBe(true); // 1024 > 768
    expect(result.current.isMobile).toBe(false); // 1024 > 768
  });

  it('should detect mobile viewport', () => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 667, writable: true });
    
    const { result } = renderHook(() => useViewportHeight());
    
    expect(result.current.viewportHeight).toBe(667);
    expect(result.current.isLandscape).toBe(false); // 375 < 667
    expect(result.current.isMobile).toBe(true); // 375 <= 768
  });

  it('should detect landscape orientation', () => {
    Object.defineProperty(window, 'innerWidth', { value: 667, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 375, writable: true });
    
    const { result } = renderHook(() => useViewportHeight());
    
    expect(result.current.viewportHeight).toBe(375);
    expect(result.current.isLandscape).toBe(true); // 667 > 375
    expect(result.current.isMobile).toBe(true); // 667 <= 768
  });

  it('should update on window resize', () => {
    const { result } = renderHook(() => useViewportHeight());
    
    expect(result.current.viewportHeight).toBe(768);
    
    act(() => {
      Object.defineProperty(window, 'innerHeight', { value: 600, writable: true });
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(result.current.viewportHeight).toBe(600);
  });

  it('should update on orientation change', async () => {
    const { result } = renderHook(() => useViewportHeight());
    
    expect(result.current.isLandscape).toBe(true);
    
    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 1024, writable: true });
      window.dispatchEvent(new Event('orientationchange'));
    });
    
    // Wait for the timeout in orientationchange handler
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(result.current.isLandscape).toBe(false);
    expect(result.current.viewportHeight).toBe(1024);
  });

  it('should set CSS custom property for viewport height', () => {
    renderHook(() => useViewportHeight());
    
    const vh = window.innerHeight * 0.01;
    expect(document.documentElement.style.getPropertyValue('--vh')).toBe(`${vh}px`);
  });

  it('should handle scroll events for iOS Safari', () => {
    const { result } = renderHook(() => useViewportHeight());
    
    const initialHeight = result.current.viewportHeight;
    
    act(() => {
      // Simulate iOS Safari address bar hiding
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    expect(result.current.viewportHeight).toBe(800);
  });
});