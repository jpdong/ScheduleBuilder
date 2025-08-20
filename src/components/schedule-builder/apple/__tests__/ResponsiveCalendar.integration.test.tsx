import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ScheduleProvider } from '../../context/ScheduleContext';
import AppleScheduleBuilder from '../AppleScheduleBuilder';

// Mock ResizeObserver
class MockResizeObserver {
  callback: ResizeObserverCallback;
  
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as any;

// Mock getBoundingClientRect
const mockGetBoundingClientRect = jest.fn(() => ({
  height: 600,
  width: 800,
  top: 0,
  left: 0,
  bottom: 600,
  right: 800,
}));

// Mock HTML element
Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
  value: mockGetBoundingClientRect,
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ScheduleProvider>
    {children}
  </ScheduleProvider>
);

describe('Responsive Calendar Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
  });

  it('should render calendar with responsive height in month view', async () => {
    render(
      <TestWrapper>
        <AppleScheduleBuilder />
      </TestWrapper>
    );

    // Switch to month view
    const monthButton = screen.getByText('Month');
    fireEvent.click(monthButton);

    await waitFor(() => {
      expect(screen.getByText('Sun')).toBeInTheDocument();
      expect(screen.getByText('Mon')).toBeInTheDocument();
    });

    // Check if month view container has responsive styling
    const monthView = document.querySelector('.apple-month-view');
    expect(monthView).toBeInTheDocument();
  });

  it('should adapt to mobile viewport', async () => {
    // Simulate mobile viewport
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 667, writable: true });

    mockGetBoundingClientRect.mockReturnValue({
      height: 400,
      width: 375,
      top: 0,
      left: 0,
      bottom: 400,
      right: 375,
    });

    render(
      <TestWrapper>
        <AppleScheduleBuilder />
      </TestWrapper>
    );

    // Switch to month view
    const monthButton = screen.getByText('Month');
    fireEvent.click(monthButton);

    await waitFor(() => {
      const monthView = document.querySelector('.apple-month-view');
      expect(monthView).toBeInTheDocument();
    });

    // Verify mobile-specific CSS variables are applied
    const monthView = document.querySelector('.apple-month-view') as HTMLElement;
    expect(monthView?.style.getPropertyValue('--calculated-cell-height')).toBeTruthy();
  });

  it('should handle window resize events', async () => {
    render(
      <TestWrapper>
        <AppleScheduleBuilder />
      </TestWrapper>
    );

    // Switch to month view
    const monthButton = screen.getByText('Month');
    fireEvent.click(monthButton);

    await waitFor(() => {
      expect(screen.getByText('Sun')).toBeInTheDocument();
    });

    // Simulate window resize
    Object.defineProperty(window, 'innerHeight', { value: 900, writable: true });
    mockGetBoundingClientRect.mockReturnValue({
      height: 700,
      width: 800,
      top: 0,
      left: 0,
      bottom: 700,
      right: 800,
    });

    fireEvent(window, new Event('resize'));

    // Wait for debounced resize handler
    await waitFor(() => {
      const monthView = document.querySelector('.apple-month-view');
      expect(monthView).toBeInTheDocument();
    }, { timeout: 200 });
  });

  it('should handle orientation change', async () => {
    render(
      <TestWrapper>
        <AppleScheduleBuilder />
      </TestWrapper>
    );

    // Switch to month view
    const monthButton = screen.getByText('Month');
    fireEvent.click(monthButton);

    await waitFor(() => {
      expect(screen.getByText('Sun')).toBeInTheDocument();
    });

    // Simulate orientation change to landscape
    Object.defineProperty(window, 'innerWidth', { value: 667, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 375, writable: true });

    fireEvent(window, new Event('orientationchange'));

    // Wait for orientation change handler
    await waitFor(() => {
      const monthView = document.querySelector('.apple-month-view');
      expect(monthView).toBeInTheDocument();
    }, { timeout: 200 });
  });

  it('should maintain functionality during resize', async () => {
    render(
      <TestWrapper>
        <AppleScheduleBuilder />
      </TestWrapper>
    );

    // Switch to month view
    const monthButton = screen.getByText('Month');
    fireEvent.click(monthButton);

    await waitFor(() => {
      expect(screen.getByText('Sun')).toBeInTheDocument();
    });

    // Simulate resize
    fireEvent(window, new Event('resize'));

    // Verify calendar is still interactive
    const newButton = screen.getByText('+ New');
    expect(newButton).toBeInTheDocument();
    
    fireEvent.click(newButton);
    // Modal should open (assuming it exists in the component)
  });

  it('should handle very small viewport heights gracefully', async () => {
    // Simulate very small viewport (like landscape mobile)
    Object.defineProperty(window, 'innerWidth', { value: 667, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 320, writable: true });

    mockGetBoundingClientRect.mockReturnValue({
      height: 200,
      width: 667,
      top: 0,
      left: 0,
      bottom: 200,
      right: 667,
    });

    render(
      <TestWrapper>
        <AppleScheduleBuilder />
      </TestWrapper>
    );

    // Switch to month view
    const monthButton = screen.getByText('Month');
    fireEvent.click(monthButton);

    await waitFor(() => {
      expect(screen.getByText('Sun')).toBeInTheDocument();
    });

    // Calendar should still render without errors
    const monthView = document.querySelector('.apple-month-view');
    expect(monthView).toBeInTheDocument();
  });

  it('should recover from height calculation errors', async () => {
    // Mock getBoundingClientRect to throw error initially
    mockGetBoundingClientRect.mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    render(
      <TestWrapper>
        <AppleScheduleBuilder />
      </TestWrapper>
    );

    // Switch to month view
    const monthButton = screen.getByText('Month');
    fireEvent.click(monthButton);

    await waitFor(() => {
      // Should still render something (fallback UI)
      const monthView = document.querySelector('.apple-month-view') || 
                       document.querySelector('.apple-month-view-error');
      expect(monthView).toBeInTheDocument();
    });
  });
});