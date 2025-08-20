import { useState, useEffect, useCallback } from 'react';

interface ViewportHeightHook {
  viewportHeight: number;
  isLandscape: boolean;
  isMobile: boolean;
}

const useViewportHeight = (): ViewportHeightHook => {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const updateViewportHeight = useCallback(() => {
    // Handle iOS Safari viewport height issues
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    setViewportHeight(window.innerHeight);
    setIsLandscape(window.innerWidth > window.innerHeight);
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    // Initial calculation
    updateViewportHeight();

    // Handle resize and orientation change
    const handleResize = () => {
      updateViewportHeight();
    };

    const handleOrientationChange = () => {
      // Delay to ensure viewport dimensions are updated
      setTimeout(updateViewportHeight, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Handle iOS Safari viewport changes
    window.addEventListener('scroll', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('scroll', updateViewportHeight);
    };
  }, [updateViewportHeight]);

  return {
    viewportHeight,
    isLandscape,
    isMobile
  };
};

export default useViewportHeight;