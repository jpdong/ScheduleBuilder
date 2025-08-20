import { useState, useEffect, useRef, RefObject, useCallback, useMemo } from 'react';
import useViewportHeight from './useViewportHeight';

interface ContainerHeightHook {
  containerRef: RefObject<HTMLDivElement | null>;
  availableHeight: number;
  cellHeight: number;
  isResizing: boolean;
  hasError: boolean;
  error?: Error;
}

interface UseContainerHeightOptions {
  headerHeight?: number;
  padding?: number;
  rowCount?: number;
  minCellHeight?: number;
  maxCellHeight?: number;
  debounceMs?: number;
}

const useContainerHeight = (options: UseContainerHeightOptions = {}): ContainerHeightHook => {
  const {
    headerHeight = 60,
    padding = 40,
    rowCount = 6,
    minCellHeight = 60,
    maxCellHeight = 150,
    debounceMs = 100
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [availableHeight, setAvailableHeight] = useState(0);
  const [cellHeight, setCellHeight] = useState(minCellHeight);
  const [isResizing, setIsResizing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error>();
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use viewport height hook for mobile optimization
  const { viewportHeight, isLandscape, isMobile } = useViewportHeight();

  const calculateHeight = useCallback(() => {
    try {
      if (!containerRef.current) {
        // Fallback to default values if container is not available
        setAvailableHeight(minCellHeight * rowCount);
        setCellHeight(minCellHeight);
        return;
      }

      const containerElement = containerRef.current;
      const containerRect = containerElement.getBoundingClientRect();
      let containerHeight = containerRect.height;

      // Handle zero height during initial render
      if (containerHeight === 0) {
        // Use fallback height calculation
        containerHeight = viewportHeight > 0 ? viewportHeight - 200 : 600;
      }

      // Mobile-specific adjustments
      if (isMobile) {
        // Use viewport height for mobile to handle address bar changes
        const mobileAdjustment = isLandscape ? 100 : 200; // Account for browser UI
        containerHeight = Math.min(containerHeight, viewportHeight - mobileAdjustment);
      }

      // Calculate available height after subtracting header and padding
      // For month view, we want the grid to fill the remaining space after the header
      const available = Math.max(0, containerHeight - headerHeight);
      
      // Adjust min/max cell heights for mobile and landscape
      let adjustedMinHeight = minCellHeight;
      let adjustedMaxHeight = maxCellHeight;
      
      if (isMobile) {
        if (isLandscape) {
          adjustedMinHeight = Math.max(40, minCellHeight * 0.7);
          adjustedMaxHeight = Math.min(80, maxCellHeight * 0.6);
        } else {
          adjustedMinHeight = Math.max(50, minCellHeight * 0.8);
          adjustedMaxHeight = Math.min(120, maxCellHeight * 0.8);
        }
      }
      
      // Calculate optimal cell height with bounds checking
      const calculatedCellHeight = Math.max(
        adjustedMinHeight,
        Math.min(adjustedMaxHeight, available / rowCount)
      );

      // Validate calculated values
      if (isNaN(calculatedCellHeight) || calculatedCellHeight <= 0) {
        throw new Error('Invalid cell height calculation');
      }

      setAvailableHeight(available);
      setCellHeight(calculatedCellHeight);
      setHasError(false);
      setError(undefined);
    } catch (err) {
      console.error('Error calculating container height:', err);
      setHasError(true);
      setError(err instanceof Error ? err : new Error('Unknown height calculation error'));
      
      // Fallback to safe default values
      setAvailableHeight(minCellHeight * rowCount);
      setCellHeight(minCellHeight);
    }
  }, [headerHeight, rowCount, minCellHeight, maxCellHeight, isMobile, isLandscape, viewportHeight]);

  const debouncedCalculateHeight = useCallback(() => {
    setIsResizing(true);
    
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    // Use requestAnimationFrame for smooth visual updates
    const animationFrame = requestAnimationFrame(() => {
      resizeTimeoutRef.current = setTimeout(() => {
        calculateHeight();
        setIsResizing(false);
      }, debounceMs);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [calculateHeight, debounceMs]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial calculation
    calculateHeight();

    // Use ResizeObserver if available
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        debouncedCalculateHeight();
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
      };
    } else {
      // Fallback to window resize event for older browsers
      const handleResize = () => {
        debouncedCalculateHeight();
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
      };
    }
  }, [calculateHeight, debouncedCalculateHeight]);

  // Recalculate when container ref changes
  useEffect(() => {
    if (containerRef.current) {
      calculateHeight();
    }
  }, [calculateHeight]);

  return {
    containerRef,
    availableHeight,
    cellHeight,
    isResizing,
    hasError,
    error
  };
};

export default useContainerHeight;