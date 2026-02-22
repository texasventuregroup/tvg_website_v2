'use client';

import { useEffect, useRef } from 'react';

export default function AustinSkylineSVG() {
    const skylineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!skylineRef.current) return;
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            skylineRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={skylineRef}
            className="absolute right-[-5%] bottom-0 w-[70%] h-[80%] z-[1] pointer-events-none opacity-[0.15] transition-transform duration-100 hidden lg:block"
        >
            <style jsx>{`
                @keyframes drawLine {
                    from { stroke-dashoffset: 1000; }
                    to { stroke-dashoffset: 0; }
                }
                .skyline-path {
                    stroke: #082820;
                    stroke-width: 1.5;
                    fill: none;
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: drawLine 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
            `}</style>
            <svg
                className="w-full h-full"
                viewBox="0 0 800 400"
                preserveAspectRatio="none"
            >
                {/* Tower with spire */}
                <path className="skyline-path" d="M500,400 L500,150 L520,100 L540,150 L540,400" style={{ animationDelay: '0.2s' }} />
                {/* Dome building (Capitol) */}
                <path className="skyline-path" d="M300,400 L300,200 A50,50 0 0,1 400,200 L400,400" style={{ animationDelay: '0.5s' }} />
                {/* Wide buildings */}
                <path className="skyline-path" d="M100,400 L100,250 L180,250 L180,400 M620,400 L620,220 L720,180 L720,400" style={{ animationDelay: '0.8s' }} />
                {/* Stepped building */}
                <path className="skyline-path" d="M200,400 L200,280 L240,280 L240,320 L260,320 L260,400" style={{ animationDelay: '0.3s' }} />
                {/* Pointed tower */}
                <path className="skyline-path" d="M420,400 L420,190 L450,170 L480,190 L480,400" style={{ animationDelay: '0.6s' }} />
                {/* Small peaked building */}
                <path className="skyline-path" d="M560,400 L560,260 L580,240 L600,260 L600,400" style={{ animationDelay: '0.4s' }} />
                {/* Another peaked building */}
                <path className="skyline-path" d="M740,400 L740,300 L770,280 L800,300 L800,400" style={{ animationDelay: '0.7s' }} />
                {/* Ground line (Lady Bird Lake) */}
                <path className="skyline-path" d="M0,350 Q400,320 800,350" fill="none" style={{ strokeWidth: 2, opacity: 0.5 }} />
                {/* Decorative wave line (hills) */}
                <path className="skyline-path" d="M50,50 Q200,100 400,50 T750,100" fill="none" strokeDasharray="10,10" style={{ opacity: 0.3 }} />
            </svg>
        </div>
    );
}

