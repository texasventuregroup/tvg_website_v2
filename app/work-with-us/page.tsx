'use client';

import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import Link from 'next/link';
import Reveal from '../components/Reveal';

const AsciiVideo = lazy(() => import('../components/AsciiVideo'));

/* ---- Service data ---- */
const services = [
    {
        number: '01',
        title: 'Market Mapping',
        description: 'Comprehensive landscape analysis to identify key players, emerging trends, and white space opportunities in target sectors.',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" /></svg>
        ),
    },
    {
        number: '02',
        title: 'Valuation Analysis',
        description: 'Rigorous financial modeling, comparable company analysis, and cap table scenarios to support pricing decisions.',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
        ),
    },
    {
        number: '03',
        title: 'Due Diligence',
        description: 'Deep-dive investigation into business models, competitive moats, risks, and operational viability of potential investments.',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
        ),
    },
    {
        number: '04',
        title: 'Tech Projects',
        description: 'Custom software prototyping, MVP development, and technical feasibility assessments for portfolio companies.',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
        ),
    },
    {
        number: '05',
        title: 'Thesis Development',
        description: 'Original research and data synthesis to help firms develop conviction in new markets or technologies.',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
        ),
    },
    {
        number: '06',
        title: 'Internal Tooling',
        description: 'Automation scripts, data pipelines, and custom dashboarding to streamline internal VC operations.',
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
        ),
    },
];

/* ---- Radial positions for 6 nodes ---- */
const nodeAngles = [0, 60, 120, 180, 240, 300];

function RadialCapabilities() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [converged, setConverged] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const radius = 250;

    const handleClick = (i: number) => {
        if (activeIndex === i) {
            // Deselect: collapse detail, then un-converge
            setShowDetail(false);
            setTimeout(() => {
                setConverged(false);
                setActiveIndex(null);
            }, 300);
        } else {
            // Select: converge all nodes, then show detail
            setActiveIndex(i);
            setConverged(true);
            setShowDetail(false);
            setTimeout(() => setShowDetail(true), 500);
        }
    };

    return (
        <div className="relative w-full max-w-[700px] aspect-square mx-auto hidden lg:block">
            {/* Orbit ring */}
            <div className={`absolute inset-0 m-auto w-[500px] h-[500px] border border-dashed rounded-full transition-all duration-700 ease-out ${converged ? 'border-[#016F4E]/20 scale-50' : 'border-[#082820]/10 scale-100'}`} />

            {/* Center hub */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-50 transition-all duration-700 ease-out ${converged
                ? 'w-24 h-24 bg-[#016F4E] shadow-[0_0_60px_rgba(1,111,78,0.3)]'
                : 'w-40 h-40 bg-[#082820] shadow-[0_0_50px_rgba(8,40,32,0.15)]'
                }`}>
                <span className={`font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#fcf7f0] transition-opacity duration-300 ${converged ? 'opacity-0' : 'opacity-100'}`}>
                    Our Focus
                </span>
            </div>

            {/* Detail card — appears after convergence */}
            {activeIndex !== null && (
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[420px] bg-[#016F4E] text-white rounded-3xl p-10 transition-all duration-500 ease-out ${showDetail ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}>
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#016F4E] mb-5">
                        {services[activeIndex].icon}
                    </div>
                    <span className="font-mono text-xs opacity-60 mb-2 block">{services[activeIndex].number}</span>
                    <h3 className="text-2xl font-semibold mb-4">{services[activeIndex].title}</h3>
                    <p className="text-sm leading-relaxed opacity-90">{services[activeIndex].description}</p>
                    <button
                        onClick={() => handleClick(activeIndex)}
                        className="mt-6 font-mono text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                    >
                        ← Back
                    </button>
                </div>
            )}

            {/* Nodes */}
            {services.map((svc, i) => {
                const rad = (nodeAngles[i] * Math.PI) / 180;
                const normalX = Math.cos(rad) * radius;
                const normalY = Math.sin(rad) * radius;

                // When converged, move to a tight cluster around center
                const convergedRadius = 0;
                const convergedX = Math.cos(rad) * convergedRadius;
                const convergedY = Math.sin(rad) * convergedRadius;

                const x = converged ? convergedX : normalX;
                const y = converged ? convergedY : normalY;

                return (
                    <div key={svc.number}>
                        {/* Label (outside the orbit) */}
                        <div
                            className={`absolute font-mono text-[11px] font-bold tracking-[0.15em] uppercase text-[#082820]/40 pointer-events-none transition-all duration-700 ease-out ${converged ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                                }`}
                            style={{
                                top: `calc(50% + ${normalY * 1.35}px)`,
                                left: `calc(50% + ${normalX * 1.35}px)`,
                                width: '220px',
                                textAlign: 'center',
                                zIndex: 100,
                                // Offset specific nodes to prevent collision
                                transform: i === 1 || i === 4 || i === 2 || i === 5
                                    ? 'translate(-50%, -50%) translateY(10px)'
                                    : i === 0
                                        ? 'translate(-50%, -50%) translateX(40px)' // Move Market Mapping Right (Outwards)
                                        : i === 3
                                            ? 'translate(-50%, -50%) translateX(-20px)' // Move Tech Projects Left (Outwards)
                                            : 'translate(-50%, -50%)',
                            }}
                        >
                            {svc.title}
                        </div>

                        {/* Node */}
                        <button
                            onClick={() => handleClick(i)}
                            className={`absolute w-[90px] h-[90px] rounded-full flex items-center justify-center transition-all duration-700 ease-out ${converged
                                ? 'scale-50 opacity-60 z-30'
                                : 'scale-100 opacity-100 z-40 bg-white border border-[#082820]/8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:border-[#01A072] hover:scale-110'
                                }`}
                            style={{
                                top: `calc(50% + ${y}px)`,
                                left: `calc(50% + ${x}px)`,
                                transform: 'translate(-50%, -50%)',
                                background: converged ? '#016F4E' : undefined,
                            }}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${converged ? 'bg-transparent text-white' : 'bg-[#fcf7f0] text-[#082820]'
                                }`}>
                                {svc.icon}
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

/* ---- Mobile fallback: accordion layout ---- */
function MobileCapabilities() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <div className="lg:hidden space-y-0">
            {services.map((svc, i) => (
                <Reveal key={svc.number} delay={i * 60}>
                    <button
                        onClick={() => setOpenIdx(openIdx === i ? null : i)}
                        className="w-full text-left group grid grid-cols-[60px_1fr] gap-4 py-8 border-b border-[#082820]/10 first:border-t"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${openIdx === i ? 'bg-[#016F4E] text-white' : 'bg-[#fcf7f0] text-[#082820]'
                            }`}>
                            {svc.icon}
                        </div>
                        <div>
                            <span className="font-mono text-xs text-[#016F4E] font-bold">{svc.number}</span>
                            <h3 className="text-xl font-semibold tracking-tight mt-1 mb-2">{svc.title}</h3>
                            <p className={`text-[#082820]/60 text-sm leading-relaxed transition-all duration-400 ${openIdx === i ? 'opacity-100 mt-2' : 'opacity-0 h-0 overflow-hidden'
                                }`}>
                                {svc.description}
                            </p>
                        </div>
                    </button>
                </Reveal>
            ))}
        </div>
    );
}

export default function WorkWithUs() {
    return (
        <main className="w-full min-h-screen bg-[#fcf7f0] text-[#082820]">

            {/* ===== HERO ===== */}
            <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center overflow-hidden bg-[#fcf7f0]">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="max-w-2xl">
                            <Reveal>
                                <span className="block font-mono text-xs md:text-sm text-[#082820]/60 mb-6 tracking-widest uppercase">
                                    Partnerships
                                </span>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#082820] mb-8 leading-[1.1]">
                                    Work With Us
                                </h1>
                            </Reveal>

                            <Reveal delay={100}>
                                <p className="text-lg md:text-xl text-[#082820]/70 leading-relaxed mb-10 max-w-xl">
                                    Texas Venture Group represents a paradigm shift in how institutional investors leverage academic talent. We bridge the gap between campus talent and real-world applications.
                                </p>
                                <p className="text-lg md:text-xl text-[#082820]/70 leading-relaxed max-w-xl">
                                    Our engagement models are designed for flexibility and depth. Whether it&apos;s mapping an entirely new vertical or developing custom internal tooling, our teams work with velocity and craftsmanship.
                                </p>
                            </Reveal>
                        </div>

                        {/* Video Content */}
                        <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#082820]/10 group bg-[#fcf7f0]">
                            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                                <span className="px-2 py-1 bg-[#082820]/80 backdrop-blur text-[10px] font-mono uppercase tracking-wider text-[#fcf7f0] rounded">
                                    Dreamway, UT Austin
                                </span>
                            </div>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="w-full h-full object-cover grayscale opacity-60 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-80 scale-[1.03]"
                            >
                                <source src="/videos/speedway.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#fcf7f0]/20 via-transparent to-[#082820]/5 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CAPABILITIES — Radial Layout ===== */}
            <section className="py-32 md:py-40 bg-[#f8f3eb] relative overflow-hidden">
                {/* Dot grid background */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(#082820 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <div className="container mx-auto px-6 lg:px-12 mb-16 lg:mb-24 text-center relative z-10">
                    <Reveal>
                        <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#016F4E] uppercase mb-4">How We Work</p>
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Capabilities</h2>
                        <p className="font-mono text-sm text-[#082820]/50 max-w-lg mx-auto">
                            Click on any node to explore our workflows.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={200}>
                    <RadialCapabilities />
                    <div className="container mx-auto px-6 lg:px-12">
                        <MobileCapabilities />
                    </div>
                </Reveal>
            </section>



            {/* ===== CTA ===== */}
            <section className="py-24 md:py-32 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #fcf7f0 0%, #f0e8dc 100%)' }}
            >
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <Reveal>
                        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-tight leading-tight mb-8">
                            Ready to accelerate<br />your firm?
                        </h2>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="font-mono text-base md:text-lg text-[#082820]/50 max-w-2xl mx-auto mb-12">
                            Join the growing list of venture firms leveraging TVG&apos;s top-tier student talent for critical operations.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="mailto:partnerships@texasventuregroup.com"
                                className="px-10 py-4 bg-[#082820] text-[#fcf7f0] font-mono font-bold uppercase tracking-[0.15em] text-sm rounded-sm transition-all hover:bg-[#016F4E] hover:-translate-y-0.5"
                            >
                                Get in Touch
                            </a>
                            <Link
                                href="/events"
                                className="px-10 py-4 border border-[#082820] text-[#082820] font-mono font-bold uppercase tracking-[0.15em] text-sm rounded-sm transition-all hover:bg-[#082820] hover:text-[#fcf7f0] hover:-translate-y-0.5"
                            >
                                View Events
                            </Link>
                        </div>
                    </Reveal>
                </div>

                <svg className="absolute bottom-0 left-0 w-full pointer-events-none opacity-10" height="200">
                    <path d="M0,100 Q720,200 1440,100" fill="none" stroke="#082820" strokeWidth="2" />
                </svg>
            </section>
        </main >
    );
}
