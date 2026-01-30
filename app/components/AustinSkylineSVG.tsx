'use client';

import { useEffect, useRef } from 'react';

export default function AustinSkylineSVG() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            containerRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="hidden lg:block absolute right-[-5%] bottom-0 w-[70%] h-[80%] z-[1] pointer-events-none opacity-[0.15] transition-transform duration-100"
        >
            <svg
                className="w-full h-full"
                viewBox="0 0 800 400"
                preserveAspectRatio="none"
            >
                {/* Capitol Building */}
                <path
                    className="skyline-path"
                    d="M500,400 L500,150 L520,100 L540,150 L540,400"
                    style={{ animationDelay: '0.2s' }}
                />
                {/* Frost Tower Dome */}
                <path
                    className="skyline-path"
                    d="M300,400 L300,200 A50,50 0 0,1 400,200 L400,400"
                    style={{ animationDelay: '0.5s' }}
                />
                {/* Downtown Buildings */}
                <path
                    className="skyline-path"
                    d="M100,400 L100,250 L180,250 L180,400 M600,400 L600,220 L700,180 L700,400"
                    style={{ animationDelay: '0.8s' }}
                />
                {/* Bridge/Horizon */}
                <path
                    className="skyline-path"
                    d="M0,350 Q400,320 800,350"
                    fill="none"
                    style={{ strokeWidth: 2, opacity: 0.5 }}
                />
                {/* Birds/Sky detail */}
                <path
                    className="skyline-path"
                    d="M50,50 Q200,100 400,50 T750,100"
                    fill="none"
                    strokeDasharray="10,10"
                    style={{ opacity: 0.3 }}
                />
            </svg>
        </div>
    );
}
