'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { logoMappings, getLogoUrl } from '../config/logos';

const AUTO_SCROLL_INTERVAL_MS = 3000;
const SCROLL_END_DEBOUNCE_MS = 120;

export default function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const isJumpingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const currentPageRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const logos = useMemo(() => {
    const combined = [...logoMappings.tech, ...logoMappings.finance];
    const seen = new Set<string>();
    const logoSize = isMobile ? 96 : 160;

    return combined
      .filter((logo) => {
        if (seen.has(logo.domain)) return false;
        seen.add(logo.domain);
        return true;
      })
      .map((logo) => ({
        name: logo.name,
        image: getLogoUrl(logo.domain, logoSize, 'full'),
        domain: logo.domain,
      }));
  }, [isMobile]);

  const logosPerSlide = isMobile ? 4 : 8;
  const slides = useMemo(() => {
    const groups = [];
    for (let i = 0; i < logos.length; i += logosPerSlide) {
      groups.push(logos.slice(i, i + logosPerSlide));
    }
    return groups;
  }, [logos, logosPerSlide]);

  const totalSlides = slides.length;
  const loopSlides = totalSlides > 1 ? [...slides, ...slides, ...slides] : slides;

  const jumpToPage = (pageIndex: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft = viewport.clientWidth * pageIndex;
  };

  const scrollToPage = (pageIndex: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({ left: viewport.clientWidth * pageIndex, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!totalSlides) {
      setCurrentIndex(0);
      currentPageRef.current = 0;
      return;
    }
    const startPage = totalSlides;
    currentPageRef.current = startPage;
    setCurrentIndex(0);
    jumpToPage(startPage);
  }, [totalSlides]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !totalSlides) return;
    const normalized = (currentPageRef.current % totalSlides) + totalSlides;
    currentPageRef.current = normalized;
    jumpToPage(normalized);
  }, [isMobile, totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1) return;
    if (!isVisible) return;

    const interval = window.setInterval(() => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      scrollToPage(currentPageRef.current + 1);
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [totalSlides, isVisible]);

  const handleScrollEnd = () => {
    const viewport = viewportRef.current;
    if (!viewport || !totalSlides) return;
    const pageWidth = viewport.clientWidth || 1;
    const pageIndex = Math.round(viewport.scrollLeft / pageWidth);
    currentPageRef.current = pageIndex;

    if (totalSlides > 1) {
      if (pageIndex < totalSlides) {
        isJumpingRef.current = true;
        const normalized = pageIndex + totalSlides;
        jumpToPage(normalized);
        currentPageRef.current = normalized;
        setCurrentIndex(pageIndex);
        isJumpingRef.current = false;
        isAnimatingRef.current = false;
        return;
      }
      if (pageIndex >= totalSlides * 2) {
        isJumpingRef.current = true;
        const normalized = pageIndex - totalSlides;
        jumpToPage(normalized);
        currentPageRef.current = normalized;
        setCurrentIndex(pageIndex - totalSlides);
        isJumpingRef.current = false;
        isAnimatingRef.current = false;
        return;
      }
      setCurrentIndex(pageIndex - totalSlides);
    } else {
      setCurrentIndex(0);
    }

    isAnimatingRef.current = false;
  };

  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      if (isJumpingRef.current) return;
      handleScrollEnd();
    }, SCROLL_END_DEBOUNCE_MS);
  };

  const handlePrev = () => {
    if (!totalSlides) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    scrollToPage(currentPageRef.current - 1);
  };

  const handleNext = () => {
    if (!totalSlides) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    scrollToPage(currentPageRef.current + 1);
  };

  return (
    <div ref={containerRef} className="logo-carousel">
      {totalSlides > 1 && (
        <div className="logo-carousel__controls">
          <button
            type="button"
            className="logo-carousel__control logo-carousel__control--prev"
            aria-label="Previous logos"
            onClick={handlePrev}
          >
            ‹
          </button>
          <button
            type="button"
            className="logo-carousel__control logo-carousel__control--next"
            aria-label="Next logos"
            onClick={handleNext}
          >
            ›
          </button>
        </div>
      )}
      <div
        ref={viewportRef}
        className="logo-carousel__viewport"
        onScroll={handleScroll}
      >
        <div className="logo-carousel__track">
          {loopSlides.map((slide, slideIndex) => (
            <div key={`logos-slide-${slideIndex}`} className="logo-carousel__slide">
              {slide.map((logo) => (
                <div key={logo.name} className="logo-carousel__item">
                  <img
                    src={logo.image}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <div className="logo-carousel__dots" role="tablist" aria-label="Logo slides">
          {slides.map((_, index) => (
            <button
              key={`logos-dot-${index}`}
              type="button"
              className={`logo-carousel__dot ${index === currentIndex ? 'is-active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={index === currentIndex}
              onClick={() => {
                if (isAnimatingRef.current) return;
                isAnimatingRef.current = true;
                currentPageRef.current = index;
                scrollToPage(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
