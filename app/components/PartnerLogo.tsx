'use client';

import { useState } from 'react';

interface PartnerLogoProps {
  name: string;
  website: string;
  logo?: string;
}

// Logo.dev API key from environment
const LOGO_DEV_TOKEN = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || '';

function getLogoDevUrl(domain: string): string {
  const params = new URLSearchParams({
    token: LOGO_DEV_TOKEN,
    size: '128',
    format: 'png',
  });
  return `https://img.logo.dev/${domain}?${params.toString()}`;
}

export default function PartnerLogo({ name, website, logo }: PartnerLogoProps) {
  const [fallbackLevel, setFallbackLevel] = useState(0);

  // Priority: 1. Local logo, 2. logo.dev, 3. Clearbit, 4. Letter placeholder
  const getImageSrc = () => {
    if (logo) return `/images/partners/${logo}`;
    if (fallbackLevel === 0) return getLogoDevUrl(website);
    if (fallbackLevel === 1) return `https://logo.clearbit.com/${website}`;
    return null;
  };

  const imgSrc = getImageSrc();

  if (!imgSrc) {
    return (
      <div className="w-16 h-16 rounded-lg bg-tvg-forest/10 dark:bg-white/10 flex items-center justify-center text-2xl font-bold text-tvg-forest dark:text-white">
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={`${name} logo`}
      className="max-w-full max-h-full object-contain"
      loading="lazy"
      onError={() => {
        if (!logo) {
          setFallbackLevel(prev => prev + 1);
        }
      }}
    />
  );
}
