'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for non-critical components (code splitting)
const Spotlight = dynamic(() => import('./Spotlight'), { ssr: false });
const AnimationObserver = dynamic(() => import('./AnimationObserver'), { ssr: false });

export function ClientEffects() {
  return (
    <>
      <Spotlight />
      <AnimationObserver />
    </>
  );
}
