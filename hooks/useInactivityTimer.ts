import { useEffect, useRef } from 'react';

/**
 * Hook for detecting user inactivity
 * Triggers callback when user is inactive for specified duration
 * Resets timer on any user activity (click, touch, keyboard, mouse movement)
 */
export function useInactivityTimer(
  onInactive: () => void,
  delayMs: number = 45000, // 45 seconds default
  enabled: boolean = true
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (!enabled) return;

    // Clear existing timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timer
    timeoutRef.current = setTimeout(onInactive, delayMs);
  };

  useEffect(() => {
    if (!enabled) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    // Activity listeners
    const events = ['click', 'touchstart', 'keypress', 'mousemove', 'scroll'];

    const handleActivity = () => {
      resetTimer();
    };

    // Start initial timer
    resetTimer();

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, delayMs, onInactive]);
}

export default useInactivityTimer;
