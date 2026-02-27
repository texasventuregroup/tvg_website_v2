'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';

export interface CarouselLogo {
  name: string;
  domain: string;
  logo_img?: string;
  scale?: number;
}

interface LogoCarouselProps {
  logos: CarouselLogo[];
  reverse?: boolean;
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

export default function LogoCarousel({ logos: logoData, reverse = false }: LogoCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const logos = useMemo(() => {
    const logoList = isMobile ? logoData.slice(0, 16) : logoData;
    return logoList.map(logo => ({
      name: logo.name,
      image: logo.logo_img || getLogoDevUrl(logo.domain),
      fallbackImage: `https://logo.clearbit.com/${logo.domain}`,
      domain: logo.domain,
      scale: logo.scale || 1,
    }));
  }, [logoData, isMobile]);

  // Triple the logos for seamless loop
  const displayLogos = [...logos, ...logos, ...logos];

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div
        className={`flex gap-12 md:gap-16 w-max items-center ${reverse ? 'animate-scroll-right' : 'animate-scroll-left'}`}
        style={{
          animationDuration: isMobile ? '60s' : '80s',
        }}
      >
        {displayLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex flex-col items-center justify-center transition-all duration-300 w-28 md:w-36 flex-shrink-0 hover:scale-105 opacity-80 hover:opacity-100"
          >
            <div className="relative w-full h-10 md:h-12">
              <Image
                src={logo.image}
                alt={`${logo.name} logo`}
                fill
                className="object-contain"
                loading="lazy"
                style={{
                  filter: 'grayscale(100%) contrast(200%) brightness(0.35)',
                  ...(logo.scale !== 1 ? { transform: `scale(${logo.scale})` } : {})
                }}
                onError={(e) => {
                  // Fallback handling for next/image
                  const target = e.target as HTMLImageElement;
                  if (target.src !== logo.fallbackImage) {
                    target.src = logo.fallbackImage;
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
