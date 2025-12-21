'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { logoMappings, getLogoUrl } from '../config/logos';

interface LogoCarouselProps {
  type: 'tech' | 'finance';
  reverse?: boolean;
}

export default function LogoCarousel({ type, reverse = false }: LogoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const isPausedRef = useRef(false);
  const translateRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const logos = useMemo(() => {
    const mappings = logoMappings[type] || [];
    return mappings.map(logo => ({
      name: logo.name,
      image: getLogoUrl(logo.domain, 128),
      domain: logo.domain,
    }));
  }, [type]);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carousel animation (desktop only)
  useEffect(() => {
    if (isMobile || !logos.length || !trackRef.current) return;

    const track = trackRef.current;
    const items = track.querySelectorAll('.logo-carousel__item');
    if (!items.length) return;

    const getItemSetWidth = () => {
      let width = 0;
      const half = Math.floor(items.length / 2);
      for (let i = 0; i < half; i++) {
        const item = items[i] as HTMLElement;
        const style = window.getComputedStyle(item);
        const marginLeft = parseFloat(style.marginLeft) || 0;
        const marginRight = parseFloat(style.marginRight) || 0;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        width += item.offsetWidth + marginLeft + marginRight + gap;
      }
      return width;
    };

    const itemSetWidth = getItemSetWidth();
    const randomOffset = Math.random() * (itemSetWidth / 1.5);
    translateRef.current = reverse ? randomOffset : -randomOffset;
    track.style.transform = `translateX(${translateRef.current}px)`;

    const speed = reverse ? 1 : -1;

    const animate = () => {
      if (!isPausedRef.current) {
        translateRef.current += speed;
        if (Math.abs(translateRef.current) >= itemSetWidth) {
          translateRef.current = 0;
        }
        track.style.transform = `translateX(${translateRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [logos, reverse, isMobile]);

  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  const duplicatedLogos = [...logos, ...logos];

  // Mobile: Static grid layout
  if (isMobile) {
    return (
      <div className="logo-carousel logo-carousel--mobile">
        <div className="logo-carousel__grid">
          {logos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="logo-carousel__item">
              <img
                src={logo.image}
                alt={logo.name}
                loading="lazy"
                decoding="async"
                width={64}
                height={64}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop: Animated carousel
  return (
    <div className={`logo-carousel ${reverse ? 'logo-carousel--reverse' : ''}`}>
      <div
        ref={trackRef}
        className="logo-carousel__track"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="logo-carousel__item">
            <img
              src={logo.image}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              width={128}
              height={128}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
