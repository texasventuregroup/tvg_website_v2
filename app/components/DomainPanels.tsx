'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Domain {
    id: string;
    title: string;
    image: string;
    video: string;
    description: string;
}

const domains: Domain[] = [
    { id: 'fintech', title: 'Fintech', image: '/domains/fintech.png', video: '/videos/fintech.mp4', description: 'Financial Infrastructure' },
    { id: 'defense', title: 'Defense', image: '/domains/defense.png', video: '/videos/defense.mp4', description: 'National Security & Dual-Use' },
    { id: 'consumer', title: 'Consumer', image: '/domains/consumer.png', video: '/videos/consumer.mp4', description: 'Social, Marketplace, & Media' },
    { id: 'healthcare', title: 'Health & Bio', image: '/domains/healthcare.png', video: '/videos/healthcare.mp4', description: 'Biotech, Healthtech, & Life Sciences' },
];

interface DomainPanelsProps {
    variant?: 'default' | 'newspaper';
}

export default function DomainPanels({ variant = 'default' }: DomainPanelsProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const isNews = variant === 'newspaper';
    const textColor = isNews ? 'text-[#fcf7f0]' : 'text-[#fcf7f0]';
    const subTextColor = isNews ? 'text-[#fcf7f0]/70' : 'text-[#fcf7f0]/70';
    const accentColor = isNews ? 'text-[#fcf7f0]/50' : 'text-[#01A072]';
    const titleFont = isNews ? 'font-serif font-black' : 'font-semibold tracking-tight';

    // Newspaper variant: Cream overlay, sepia/grayscale images
    // Default variant: Dark gradient overlay, normal images

    return (
        <section id="domains" className="w-full">
            {/* Header */}
            {!isNews && (
                <div className="container mx-auto px-6 pt-12 pb-8 lg:pt-16 lg:pb-12">
                    <span className="block font-mono text-xs uppercase tracking-widest text-[#01A072] mb-3">
                        Specialized Domains
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold leading-[1.1] tracking-tight text-[#fcf7f0]">
                        Where We Invest
                    </h2>
                </div>
            )}

            {isNews && (
                <div className="w-full border-t border-[#fcf7f0]/20 py-1.5 mb-3 text-center font-sans font-bold uppercase text-[10px] tracking-[0.3em] text-[#fcf7f0]/60">
                    Specialized Domains
                </div>
            )}

            {/* Full-bleed panels - no background wrapper, flows edge-to-edge */}
            <div className={`w-full h-auto min-h-[1000px] lg:h-[70vh] lg:min-h-[500px] flex flex-col lg:flex-row overflow-hidden ${isNews ? 'border-y border-[#082820]/10' : ''}`}>
                {domains.map((domain) => (
                    <div
                        key={domain.id}
                        className={`
                            relative group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                            w-full h-auto min-h-[200px] lg:h-auto lg:w-auto lg:min-h-0
                            ${activeId === domain.id ? 'lg:flex-[3]' : 'lg:flex-1'}
                            hover:lg:flex-[3]
                            cursor-default overflow-hidden
                            ${isNews ? 'border-b lg:border-b-0 lg:border-r border-[#082820]/10 last:border-0' : ''}
                        `}
                        onMouseEnter={() => {
                            setActiveId(domain.id);
                            const video = document.getElementById(`video-${domain.id}`) as HTMLVideoElement;
                            if (video) {
                                video.currentTime = 0;
                                video.play().catch(() => { });
                            }
                        }}
                        onMouseLeave={() => {
                            setActiveId(null);
                            const video = document.getElementById(`video-${domain.id}`) as HTMLVideoElement;
                            if (video) {
                                video.pause();
                            }
                        }}
                    >
                        {/* Background Media */}
                        <div className={`absolute inset-0 ${isNews ? 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out' : ''}`}>
                            {/* Image (Default) */}
                            <div className={`absolute inset-0 transition-opacity duration-700 ${activeId === domain.id ? 'opacity-0' : 'opacity-100'}`}>
                                <Image
                                    src={domain.image}
                                    alt={domain.title}
                                    fill
                                    className={`object-cover ${domain.id === 'health_bio' ? 'scale-[1.35]' : ['defense', 'consumer'].includes(domain.id) ? 'scale-[1.2]' : ''}`}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority={domain.id === 'fintech'}
                                />
                            </div>

                            {/* Video (Hover) */}
                            <video
                                id={`video-${domain.id}`}
                                className={`
                                    absolute inset-0 w-full h-full object-cover 
                                    transition-all duration-700 
                                    ${activeId === domain.id ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}
                                `}
                                loop
                                muted
                                playsInline
                                preload="none"
                            >
                                <source src={domain.video} type="video/mp4" />
                            </video>

                            {/* Gradient Overlay */}
                            <div className={`
                                absolute inset-0 transition-opacity duration-500 
                                ${isNews
                                    ? 'bg-[#fcf7f0]/95 group-hover:bg-[#fcf7f0]/20 mix-blend-multiply'
                                    : 'bg-gradient-to-t from-[#082820] via-[#082820]/50 to-[#082820]/20 opacity-80 group-hover:opacity-60'
                                }
                            `} />
                        </div>

                        {/* Content */}
                        <div className={`absolute inset-0 flex flex-col ${isNews ? 'justify-end' : 'justify-end'} ${textColor}`}>
                            <div className={`transform transition-all duration-500 ${isNews ? 'bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 lg:px-6 py-4 lg:py-5' : 'p-6 lg:p-10'}`}>
                                {!isNews && (
                                    <span className={`font-mono text-[10px] lg:text-xs ${accentColor} mb-1 block tracking-widest uppercase`}>
                                        {domain.id}
                                    </span>
                                )}
                                <h3 className={`${isNews ? 'text-base lg:text-lg font-bold tracking-[0.12em] uppercase text-white' : `text-2xl lg:text-4xl ${titleFont}`} leading-tight`}>
                                    {domain.title}
                                </h3>
                                {!isNews && (
                                    <p className={`
                                        text-sm ${subTextColor} max-w-md leading-relaxed
                                        transition-all duration-500 overflow-hidden
                                        ${activeId === domain.id
                                            ? 'max-h-20 opacity-100 translate-y-0 mt-2'
                                            : 'lg:max-h-0 lg:opacity-0 lg:translate-y-2 lg:mt-0 max-h-20 opacity-100 mt-2'}
                                    `}>
                                        {domain.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
