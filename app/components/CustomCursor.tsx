'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
        transition: 'transform 0.05s ease-out',
      }}
    >
      {/* The Cursor */}
      <div 
        className={`w-full h-full border border-white transition-all duration-200 ${
          isPointer ? 'bg-white scale-125' : 'bg-transparent scale-100'
        }`}
        style={{
          borderRadius: isPointer ? '0' : '50%',
        }}
      />
      
      {/* Optional: Small center dot for precision */}
      <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-white -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
