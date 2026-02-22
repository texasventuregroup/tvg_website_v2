'use client';

import { useState } from 'react';

const values = [
    {
        num: '01',
        title: 'Curiosity',
        statement: 'We ask the hard questions.',
        detail: 'We dig deeper than the headline. Genuine intellectual curiosity is the only competitive advantage that lasts.',
    },
    {
        num: '02',
        title: 'Agency',
        statement: 'We don\'t wait for permission.',
        detail: 'High-agency individuals see a problem and solve it, without needing to be told how or when.',
    },
    {
        num: '03',
        title: 'Critical Thinking',
        statement: 'Focused effort to tackle complex problems.',
        detail: 'Our members have this relentless drive to find the best solution.',
    },
];

export default function CultureValues() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, idx) => {
                const isActive = active === idx;
                return (
                    <div
                        key={value.num}
                        className={`
                            group relative p-8 rounded-2xl border transition-all duration-500 ease-out overflow-hidden
                            ${isActive
                                ? 'bg-[#082820] border-[#082820] -translate-y-2 shadow-2xl'
                                : 'bg-transparent border-[#082820]/10 hover:border-[#082820]/30 hover:bg-[#082820]/5'}
                        `}
                        onMouseEnter={() => setActive(idx)}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className="relative z-10 h-full flex flex-col justify-between min-h-[280px]">
                            <div>
                                <span className={`font-mono text-xs font-bold mb-6 block transition-colors duration-300 ${isActive ? 'text-[#01A072]' : 'text-[#082820]/40'}`}>
                                    {value.num}
                                </span>
                                <h3 className={`text-3xl font-bold tracking-tight mb-4 transition-colors duration-300 ${isActive ? 'text-[#fcf7f0]' : 'text-[#082820]'}`}>
                                    {value.title}
                                </h3>
                                <p className={`text-lg leading-relaxed transition-colors duration-300 ${isActive ? 'text-[#fcf7f0]/90' : 'text-[#082820]/60'}`}>
                                    {value.statement}
                                </p>
                            </div>

                            <div className={`mt-8 pt-8 border-t transition-all duration-500 ${isActive ? 'border-[#fcf7f0]/20 opacity-100 translate-y-0' : 'border-[#082820]/10 opacity-0 translate-y-4'}`}>
                                <p className={`text-sm leading-relaxed ${isActive ? 'text-[#fcf7f0]/70' : 'text-[#082820]/50'}`}>
                                    {value.detail}
                                </p>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className={`
                            absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] pointer-events-none transition-all duration-500
                            ${isActive ? 'bg-[#01A072]/20' : 'bg-transparent'}
                        `} />
                    </div>
                );
            })}
        </div>
    );
}
