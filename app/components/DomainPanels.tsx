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
{ id: 'aiml', title: 'AI / ML', image: '/domains/aiml.png', video: '/videos/aiml.mp4', description: 'Generative Models & Intelligence' },
    { id: 'fintech', title: 'Fintech', image: '/domains/fintech.png', video: '/videos/fintech.mp4', description: 'Financial Infrastructure' },
    { id: 'defense', title: 'Defense', image: '/domains/defense.png', video: '/videos/defense.mp4', description: 'National Security & Dual-Use' },
    { id: 'consumer', title: 'Consumer', image: '/domains/consumer.png', video: '/videos/consumer.mp4', description: 'Social, Marketplace, & Media' },
    { id: 'healthcare', title: 'Health & Bio', image: '/domains/healthcare.png', video: '/videos/healthcare.mp4', description: 'Biotech, Healthtech, & Life Sciences' },
];

export default function DomainPanels() {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <section id="domains" className="w-full">
            {/* Header - matches container alignment of Philosophy section above */}
            <div className="container mx-auto pt-20 pb-16 lg:pt-28 lg:pb-32">
                <span className="block font-mono text-xs uppercase tracking-widest text-[#01A072] mb-6">
                    Our Domains
                </span>
            </div>

            {/* Full-bleed panels - no background wrapper, flows edge-to-edge */}
            <div className="w-full h-auto min-h-[1000px] lg:h-[70vh] lg:min-h-[500px] flex flex-col lg:flex-row overflow-hidden">
                {domains.map((domain) => (
                    <div
                        key={domain.id}
                        className={`
                            relative group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                            w-full h-auto min-h-[200px] lg:h-auto lg:w-auto lg:min-h-0
                            ${activeId === domain.id ? 'lg:flex-[3]' : 'lg:flex-1'}
                            hover:lg:flex-[3]
                            cursor-default overflow-hidden
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
                        <div className="absolute inset-0">
                            {/* Image (Default) */}
                            <div className={`absolute inset-0 transition-opacity duration-700 ${activeId === domain.id ? 'opacity-0' : 'opacity-100'}`}>
                                <Image
                                    src={domain.image}
                                    alt={domain.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority={domain.id === 'enterprise'}
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
                            <div className="absolute inset-0 bg-gradient-to-t from-[#082820] via-[#082820]/50 to-[#082820]/20 opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-end text-[#fcf7f0]">
                            <div className="transform transition-all duration-500">
                                <span className="font-mono text-[10px] lg:text-xs text-[#01A072] mb-1 block tracking-widest uppercase">
                                    {domain.id}
                                </span>
                                <h3 className="text-2xl lg:text-4xl font-bold leading-none mb-2 tracking-tight">
                                    {domain.title}
                                </h3>
                                <p className={`
                                    text-sm text-[#fcf7f0]/70 max-w-md leading-relaxed
                                    transition-all duration-500 overflow-hidden
                                    ${activeId === domain.id
                                        ? 'max-h-20 opacity-100 translate-y-0 mt-2'
                                        : 'lg:max-h-0 lg:opacity-0 lg:translate-y-2 lg:mt-0 max-h-20 opacity-100 mt-2'}
                                `}>
                                    {domain.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
