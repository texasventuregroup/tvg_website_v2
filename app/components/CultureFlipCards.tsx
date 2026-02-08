'use client';

import { useState } from 'react';

const values = [
    {
        num: '01',
        title: 'Curiosity',
        statement: 'We ask the hard questions.',
        detail: 'We dig deeper than the headline. Genuine intellectual curiosity is the only competitive advantage that lasts.',
        video: '/videos/robot2.mp4',
    },
    {
        num: '02',
        title: 'Agency',
        statement: 'We don\'t wait for permission.',
        detail: 'High-agency individuals see a problem and solve it, without needing to be told how or when.',
        video: '/videos/robot.mp4',
    },
    {
        num: '03',
        title: 'Critical thinking',
        statement: 'Focused effort to tackle complex problems.',
        detail: 'Our members have this relentless drive to find the best solution.',
        video: '/videos/lecture.mp4',
    }
];

export default function CultureValues() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left: Values */}
            <div className="lg:w-1/2 space-y-0">
                {values.map((value, idx) => (
                    <div
                        key={value.num}
                        className={`
                            group py-10 lg:py-12 border-b border-[#082820]/10 cursor-default
                            transition-all duration-300
                            ${idx === 0 ? 'border-t' : ''}
                        `}
                        onMouseEnter={() => setActive(idx)}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className="flex items-start gap-6">
                            {/* Number pip */}
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1
                                font-mono text-xs font-bold transition-all duration-300
                                ${active === idx
                                    ? 'bg-[#016F4E] text-white'
                                    : 'border border-[#082820]/20 text-[#082820]/40'}
                            `}>
                                {value.num}
                            </div>

                            <div className="flex-1">
                                <h3 className={`
                                    text-2xl lg:text-4xl font-bold tracking-tight mb-2 transition-colors duration-300
                                    ${active === idx ? 'text-[#016F4E]' : 'text-[#082820]'}
                                `}>
                                    {value.title}
                                </h3>
                                <p className="text-lg text-[#082820]/70 leading-relaxed mb-0">
                                    {value.statement}
                                </p>
                                <p className={`
                                    text-sm text-[#082820]/50 leading-relaxed mt-3 max-w-lg
                                    transition-all duration-400 overflow-hidden
                                    ${active === idx ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}
                                `}>
                                    {value.detail}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right: Featured Video - switches based on active value */}
            <div className="lg:w-1/2 relative">
                <div className="lg:sticky lg:top-32">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-[#016F4E]/10 to-[#082820]/5 rounded-3xl blur-2xl" />

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#082820]/10 h-[350px] lg:h-[500px]">
                            {values.map((value, idx) => (
                                <video
                                    key={value.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                                        active === idx || (active === null && idx === 0) ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <source src={value.video} type="video/mp4" />
                                </video>
                            ))}
                        </div>

                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#016F4E] rounded-tl-lg" />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#016F4E] rounded-br-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
