'use client';

import { useEffect } from 'react';

export default function AnimationObserver() {
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Use requestIdleCallback for non-critical initialization
    const init = () => {
      const animatedElements = document.querySelectorAll('[data-animate]');
      if (!animatedElements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      animatedElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    // Delay initialization to not block main thread
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(init);
    } else {
      setTimeout(init, 100);
    }
  }, []);

  return null;
}
