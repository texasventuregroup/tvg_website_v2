'use client';

import { useState } from 'react';
import Image from 'next/image';

// Each firm positioned on the map (% coordinates calibrated to us-map.png)
const firms = [
    // Seattle
    { name: 'Boundary ML', x: 8, y: 8 },
    // SF Bay Area cluster
    { name: 'Sequoia Capital', x: 3, y: 33 },
    { name: 'a16z', x: 5, y: 35 },
    { name: 'Founders Fund', x: 2, y: 36 },
    { name: 'Vista Equity', x: 6, y: 37 },
    { name: 'Gradient Ventures', x: 4, y: 38 },
    // Austin cluster
    { name: '8VC', x: 48, y: 74 },
    { name: 'BoxGroup', x: 50, y: 77 },
    { name: 'Earl Grey Capital', x: 47, y: 78 },
    // NYC cluster
    { name: 'Bessemer', x: 86, y: 27 },
    { name: 'General Catalyst', x: 89, y: 26 },
    { name: 'Insight Partners', x: 87, y: 29 },
    { name: 'Union Square Ventures', x: 85, y: 30 },
    { name: 'Thrive Capital', x: 90, y: 29 },
];

// Visit order: Seattle → SF firms → Austin → NYC → back to Seattle
const visitOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0];

export default function PartnerMap() {
    const [hoveredFirm, setHoveredFirm] = useState<string | null>(null);

    // Build the SVG path for animateMotion
    const pathPoints = visitOrder.map((idx) => {
        const f = firms[idx];
        return `${f.x},${f.y}`;
    });
    const motionPath = `M ${pathPoints[0]} ` + pathPoints.slice(1).map(p => `L ${p}`).join(' ');

    const totalDuration = 14;

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="relative w-full" style={{ aspectRatio: '1024 / 633' }}>
                {/* Map background */}
                <Image
                    src="/images/us-map.png"
                    alt="US Map"
                    fill
                    className="object-fill opacity-[0.18]"
                />

                {/* SVG layer for beam + trail */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Traveling arrow - points in direction of travel */}
                    <polygon points="-1.2,-0.7 1.2,0 -1.2,0.7" fill="#01A072">
                        <animateMotion
                            dur={`${totalDuration}s`}
                            repeatCount="indefinite"
                            path={motionPath}
                            rotate="auto"
                        />
                    </polygon>
                </svg>

                {/* Firm dots and labels */}
                {firms.map((firm) => {
                    const isHovered = hoveredFirm === firm.name;

                    return (
                        <div
                            key={firm.name}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${firm.x}%`, top: `${firm.y}%`, zIndex: isHovered ? 30 : 10 }}
                            onMouseEnter={() => setHoveredFirm(firm.name)}
                            onMouseLeave={() => setHoveredFirm(null)}
                        >
                            <div className="relative flex items-center justify-center cursor-pointer p-2">
                                <div className={`
                                    w-2.5 h-2.5 rounded-full bg-[#01A072] transition-all duration-200
                                    ${isHovered ? 'scale-150 shadow-[0_0_6px_rgba(1,160,114,0.5)]' : ''}
                                `} />

                                {/* Tooltip label on hover */}
                                {isHovered && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#082820] rounded-md shadow-lg pointer-events-none">
                                        <span className="text-[10px] lg:text-xs font-medium whitespace-nowrap text-[#fcf7f0]">
                                            {firm.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
