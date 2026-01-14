'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { getLogoUrl } from '../config/logos';

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

export default function LogoCarousel({ logos: logoData, reverse = false }: LogoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const isPausedRef = useRef(false);
  const translateRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use IntersectionObserver to only animate when visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Reduce logos on mobile for better performance
  const logos = useMemo(() => {
    const logoSize = isMobile ? 96 : 160;
    const logoList = isMobile ? logoData.slice(0, 12) : logoData;

    return logoList.map(logo => ({
      name: logo.name,
      image: logo.logo_img || getLogoUrl(logo.domain, logoSize),
      domain: logo.domain,
      scale: logo.scale || 1,
    }));
  }, [logoData, isMobile]);

  useEffect(() => {
    if (!logos.length || !trackRef.current || !isVisible) {
      // Cancel animation if not visible
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      return;
    }

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
    translateRef.current = reverse ? -randomOffset : -randomOffset;
    track.style.transform = `translateX(${translateRef.current}px)`;

    // Slower speed on mobile for smoother animation
    const speed = (reverse ? 1 : -1) * (isMobile ? 0.5 : 1);

    const animate = () => {
      if (!isPausedRef.current && isVisible) {
        translateRef.current += speed;
        // Reset logic for seamless looping
        if (reverse) {
          if (translateRef.current >= 0) {
            translateRef.current = -itemSetWidth;
          }
        } else {
          if (translateRef.current <= -itemSetWidth) {
            translateRef.current = 0;
          }
        }
        track.style.transform = `translateX(${translateRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [logos, reverse, isVisible, isMobile]);

  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      ref={containerRef}
      className={`logo-carousel ${reverse ? 'logo-carousel--reverse' : ''}`}
    >
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
              style={logo.scale !== 1 ? { transform: `scale(${logo.scale})` } : undefined}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="logo-carousel__label">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
