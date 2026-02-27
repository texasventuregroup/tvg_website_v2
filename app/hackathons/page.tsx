'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

function Reveal({
    children,
    className = '',
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.08 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(1.2rem)',
                transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default function Hackathons() {
    const [showContent, setShowContent] = useState(false);
    const [videoFading, setVideoFading] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const hasPlayed = sessionStorage.getItem('hackathonVideoPlayed');
        if (hasPlayed) {
            window.scrollTo(0, 0);
            setShowContent(true);
            setVideoStarted(true);
            setVideoReady(true);
            return;
        }
        const video = videoRef.current;
        if (!video) return;
        const handleEnded = () => {
            setVideoFading(true);
            sessionStorage.setItem('hackathonVideoPlayed', 'true');
            window.scrollTo(0, 0);
            setTimeout(() => { window.scrollTo(0, 0); setShowContent(true); }, 1000);
        };
        const handleLoaded = () => { video.currentTime = 0.6; };
        const handleSeeked = () => { setVideoReady(true); };
        video.addEventListener('ended', handleEnded);
        video.addEventListener('loadeddata', handleLoaded);
        video.addEventListener('seeked', handleSeeked);
        return () => {
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('loadeddata', handleLoaded);
            video.removeEventListener('seeked', handleSeeked);
        };
    }, []);

    const handlePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        setVideoStarted(true);
        video.currentTime = 0.6;
        video.play().catch(() => { });
    };

    return (
        <main className="w-full min-h-screen bg-[#fcf7f0] text-[#082820] overflow-hidden">

            {/* ===== INTRO VIDEO ===== */}
            {!showContent && (
                <div className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-1000 bg-[#f5f6ef] ${videoFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="relative flex flex-col items-center">
                        <div
                            className="relative max-w-[200px] w-full cursor-pointer overflow-hidden"
                            style={{ clipPath: 'inset(0 0 8px 0)' }}
                            onClick={!videoStarted ? handlePlay : undefined}
                        >
                            <video
                                ref={videoRef}
                                className={`w-full h-auto transition-opacity duration-300 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                                muted playsInline preload="auto"
                                style={{ background: 'transparent', mixBlendMode: 'multiply' }}
                            >
                                <source src="/videos/whimsy.mp4" type="video/mp4" />
                            </video>
                        </div>
                        {!videoStarted && (
                            <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-[#082820]/35 animate-pulse">
                                click to begin
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* ===== MAIN CONTENT ===== */}
            {showContent && (
                <div className="animate-fade-up" style={{ animationDuration: '600ms', animationFillMode: 'both' }}>

                    {/* HERO */}
                    <section className="pt-28 pb-10 sm:pt-32 sm:pb-16 bg-[#fcf7f0]">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                <div>
                                    <Reveal>
                                        <span className="block font-mono text-xs text-[#082820]/50 mb-4 tracking-widest uppercase">TVG</span>
                                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
                                            Hackathons
                                        </h1>
                                    </Reveal>
                                    <Reveal delay={100}>
                                        <p className="text-base sm:text-lg text-[#082820]/65 leading-relaxed max-w-md">
                                            Build nights, judged demos, and real prizes. TVG hosts events where students ship products alongside founders and investors.
                                        </p>
                                    </Reveal>
                                </div>
                                <Reveal delay={80}>
                                    <div className="relative h-[220px] sm:h-[300px] lg:h-[460px] rounded-xl overflow-hidden border-2 border-[#082820] shadow-lg">
                                        <Image
                                            src="/images-rebrand/image copy 5.png"
                                            alt="Hackathon scene"
                                            fill
                                            className="object-cover scale-[1.15]"
                                            priority
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </section>

                    {/* NEXT UP */}
                    <section className="border-t border-[#082820]/10">
                        <div className="max-w-6xl mx-auto px-6 py-10 sm:py-16 lg:py-24">
                            <Reveal>
                                <span className="label mb-8 block">Next Up</span>
                            </Reveal>
                            <Reveal delay={80}>
                                <EventCard
                                    title="c0mpiled"
                                    meta="TVG × Transpose Platform · 2026"
                                    pills={['Startups', 'Venture', 'Students']}
                                    bgImage="/images-rebrand/image copy 3.png"
                                    stats={[
                                        { label: 'When', value: 'Feb 20', sub: 'Friday' },
                                        { label: 'Time', value: '5 PM', sub: '– 10:30 PM' },
                                        { label: 'Where', value: 'Gates Dell Complex, UT', sub: 'Register for location', subMono: true, colSpan: true },
                                    ]}
                                    judges="Shapol M. (CEO, Entangl YC S24) · Mason F. (Chief of Staff, Interface) · Armel T. (CEO, Miru YC S24) · Varun T. (CEO, Waypoint YC W25)"
                                />
                            </Reveal>
                        </div>
                    </section>

                    {/* PREVIOUSLY */}
                    <section className="border-t border-[#082820]/10">
                        <div className="max-w-6xl mx-auto px-6 pt-10 pb-24 sm:pt-16 sm:pb-32 lg:pt-24 lg:pb-40">
                            <Reveal>
                                <span className="label mb-8 block">Previously</span>
                            </Reveal>
                            <Reveal delay={80}>
                                <EventCard
                                    title="TVG Vibeathon"
                                    pills={['Flora', 'AV', 'Framer']}
                                    bgImage="/images-rebrand/image copy 2.png"
                                    stats={[
                                        { label: 'When', value: 'Oct 4', sub: 'Saturday, 2025' },
                                        { label: 'Where', value: 'Welch Hall', sub: 'UT Austin' },
                                    ]}
                                />
                            </Reveal>
                        </div>
                    </section>

                </div>
            )}
        </main>
    );
}

/* ---- Reusable event card ---- */
function EventCard({
    title,
    meta,
    pills,
    bgImage,
    stats,
    judges,
}: {
    title: string;
    meta?: string;
    pills: string[];
    bgImage: string;
    stats: { label: string; value: string; sub: string; subMono?: boolean; colSpan?: boolean }[];
    judges?: string;
}) {
    return (
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#082820] bg-[#edeae3] shadow-lg md:shadow-[6px_6px_0px_0px_#082820]">
            {/* Subtle bg */}
            <div className="absolute inset-0 pointer-events-none select-none">
                <Image src={bgImage} alt="" fill className="object-cover opacity-[0.09]" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#edeae3] via-[#edeae3]/70 to-transparent" />
            </div>

            <div className="relative z-10 p-6 sm:p-10 lg:p-14">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">{title}</h2>
                {meta && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#082820]/40 mb-5">{meta}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                    {pills.map((p) => (
                        <span key={p} className="pill">{p}</span>
                    ))}
                </div>

                <div className="border-t border-[#082820]/10 pt-5 mb-0">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
                        {stats.map((s) => (
                            <div key={s.label} className={s.colSpan ? 'col-span-2' : ''}>
                                <p className="font-mono text-[9px] uppercase tracking-widest text-[#082820]/40 mb-1">{s.label}</p>
                                <p className="text-base sm:text-xl font-semibold leading-tight">{s.value}</p>
                                <p className={`mt-0.5 leading-snug ${s.subMono ? 'font-mono text-[9px] uppercase tracking-wider text-[#082820]/30' : 'text-xs text-[#082820]/50'}`}>{s.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {judges && (
                    <div className="border-t border-[#082820]/10 mt-5 pt-5">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-[#082820]/40 mb-2">Judges</p>
                        <p className="font-mono text-xs text-[#082820]/55 leading-relaxed">{judges}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
