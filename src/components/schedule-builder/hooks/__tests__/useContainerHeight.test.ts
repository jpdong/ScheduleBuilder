import { renderHook, act } from '@testing-library/react';
import useContainerHeight from '../useContainerHeight';

// Mock ResizeObserver
class MockResizeObserver {
  callback: ResizeObserverCallback;
  
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  
  observe() {
    // Mock implementation
  }
  
  unobserve() {
    // Mock implementation
  }
  
  disconnect() {
    // Mock implementation
  }
}

global.ResizeObserver = MockResizeObserver as any;

// Mock getBoundingClientRect
const mockGetBoundingClientRect = jest.fn();

describe('useContainerHeight', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetBoundingClientRect.mockReturnValue({
      height: 600,
      width: 800,
      top: 0,
      left: 0,
      bottom: 600,
      right: 800,
    });
  });

  it('should return initial values', () => {
    const { result } = renderHook(() => useContainerHeight());
    
    expect(result.current.containerRef).toBeDefined();
    expect(result.current.availableHeight).toBe(0);
    expect(result.current.cellHeight).toBe(60); // default minCellHeight
    expect(result.current.isResizing).toBe(false);
    expect(result.current.hasError).toBe(false);
  });

  it('should calculate height correctly with default options', () => {
    const { result } = renderHook(() => useContainerHeight());
    
    // Mock container element
    const mockElement = {
      getBoundingClientRect: mockGetBoundingClientRect,
    } as any;
    
    act(() => {
      (result.current.containerRef as any).current = mockElement;
    });

    // Trigger height calculation
    act(() => {
      // Simulate ResizeObserver callback
      const observer = new MockResizeObserver(() => {});
      observer.callback([] as any, observer as any);
    });

    expect(result.current.availableHeight).toBe(500); // 600 - 60 (header) - 40 (padding)
    expect(result.current.cellHeight).toBe(83.33333333333333); // 500 / 6 rows
  });

  it('should respect min and max cell height constraints', () => {
    const { result } = renderHook(() => 
      useContainerHeight({
        minCellHeight: 80,
        maxCellHeight: 100,
      })
    );
    
    const mockElement = {
      getBoundingClientRect: () => ({ height: 200 }), // Very small container
    } as any;
    
    act(() => {
      (result.current.containerRef as any).current = mockElement;
    });

    expect(result.current.cellHeight).toBe(80); // Should use minCellHeight
  });

  it('should handle mobile viewport adjustments', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 667, writable: true });
    
    const { result } = renderHook(() => useContainerHeight());
    
    const mockElement = {
      getBoundingClientRect: () => ({ height: 600 }),
    } as any;
    
    act(() => {
      (result.current.containerRef as any).current = mockElement;
    });

    // Should adjust for mobile
    expect(result.current.cellHeight).toBeGreaterThan(0);
  });

  it('should handle errors gracefully', () => {
    const { result } = renderHook(() => useContainerHeight());
    
    // Mock element that throws error
    const mockElement = {
      getBoundingClientRect: () => {
        throw new Error('Test error');
      },
    } as any;
    
    act(() => {
      (result.current.containerRef as any).current = mockElement;
    });

    expect(result.current.hasError).toBe(true);
    expect(result.current.error).toBeDefined();
    expect(result.current.cellHeight).toBe(60); // Should fallback to minCellHeight
  });

  it('should handle zero height containers', () => {
    const { result } = renderHook(() => useContainerHeight());
    
    const mockElement = {
      getBoundingClientRect: () => ({ height: 0 }),
    } as any;
    
    act(() => {
      (result.current.containerRef as any).current = mockElement;
    });

    // Should use fallback height calculation
    expect(result.current.cellHeight).toBeGreaterThan(0);
  });

  it('should debounce resize events', async () => {
    jest.useFakeTimers();
    
    const { result } = renderHook(() => 
      useContainerHeight({ debounceMs: 100 })
    );
    
    const mockElement = {
      getBoundingClientRect: mockGetBoundingClientRect,
    } as any;
    
    act(() => {
      (result.current.containerRef as any).current = mockElement;
    });

    // Trigger multiple resize events
    act(() => {
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isResizing).toBe(true);

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.isResizing).toBe(false);
    
    jest.useRealTimers();
  });
});