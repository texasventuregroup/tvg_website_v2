'use client';

import { useEffect } from 'react';

export default function Spotlight() {
  useEffect(() => {
    // Only initialize if device supports hover (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    function updateCursorPosition(e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;

      // Only update if position has changed significantly
      if (Math.abs(x - lastX) > 0.5 || Math.abs(y - lastY) > 0.5) {
        document.documentElement.style.setProperty('--cursor-x', `${x}px`);
        document.documentElement.style.setProperty('--cursor-y', `${y}px`);
        lastX = x;
        lastY = y;
      }

      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => updateCursorPosition(e));
    }

    function initSpotlight(e: MouseEvent) {
      lastX = e.clientX;
      lastY = e.clientY;
      document.documentElement.style.setProperty('--cursor-x', `${lastX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${lastY}px`);
      document.removeEventListener('mousemove', initSpotlight);
      document.addEventListener('mousemove', updateCursorPosition, { passive: true });
    }

    document.addEventListener('mousemove', initSpotlight, { passive: true });

    // Handle touch devices (disable effect)
    const handleTouch = () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousemove', initSpotlight);
    };
    window.addEventListener('touchstart', handleTouch, { passive: true });

    // Reset on window blur
    const handleBlur = () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
    window.addEventListener('blur', handleBlur);

    const handleFocus = () => {
      lastX = 0;
      lastY = 0;
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('mousemove', initSpotlight);
      document.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null; // This component only adds event listeners
}
