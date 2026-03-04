'use client';

import { useState } from 'react';

interface PartnerLogoProps {
  name: string;
  website: string;
  logo?: string;
}

export default function PartnerLogo({ name, website, logo }: PartnerLogoProps) {
  const [fallbackLevel, setFallbackLevel] = useState(0);

  // Priority: 1. Local logo, 2. Clearbit (free), 3. Letter placeholder
  const getImageSrc = () => {
    if (logo) return `/images/partners/${logo}`;
    if (fallbackLevel === 0) return `https://logo.clearbit.com/${website}`;
    return null;
  };

  const imgSrc = getImageSrc();

  if (!imgSrc) {
    return (
      <div className="w-16 h-16 rounded-lg bg-tvg-forest/10 flex items-center justify-center text-2xl font-bold text-tvg-forest">
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
