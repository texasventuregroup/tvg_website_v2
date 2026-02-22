'use client';

import dynamic from 'next/dynamic';

const HeroGlobe = dynamic(() => import('./HeroGlobe'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-b from-[#fcf7f0] to-[#e8e4dc]" />
});

export default function HeroBackground() {
    return <HeroGlobe />;
}
