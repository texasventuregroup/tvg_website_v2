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
                transform: visible ? 'translateY(0)' : 'translateY(1.5rem)',
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
        <main className="w-full min-h-screen bg-[#fcf7f0] text-[#082820]">

            {/* ===== INTRO VIDEO ===== */}
            {!showContent && (
                <div className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-1000 ease-out bg-[#f5f6ef] ${videoFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
            {showContent && <div className="animate-fade-up" style={{ animationDuration: '600ms', animationFillMode: 'both' }}>

                {/* ===== HERO ===== */}
                <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center overflow-hidden bg-[#fcf7f0]">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Text */}
                            <div className="max-w-2xl">
                                <Reveal>
                                    <span className="block font-mono text-xs md:text-sm text-[#082820]/60 mb-6 tracking-widest uppercase">
                                        TVG
                                    </span>
                                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#082820] mb-8 leading-[1.1]">
                                        Hackathons
                                    </h1>
                                </Reveal>
                                <Reveal delay={120}>
                                    <p className="text-lg md:text-xl text-[#082820]/70 leading-relaxed max-w-xl">
                                        Build nights, judged demos, and real prizes. TVG hosts events where students ship products alongside founders and investors.
                                    </p>
                                </Reveal>
                            </div>

                            {/* Illustration panel */}
                            <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#082820]/10">
                                <Image
                                    src="/hackathon/image.png"
                                    alt="Hackathon scene"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== NEXT UP ===== */}
                <section className="border-t border-[#082820]/10">
                    <div className="container mx-auto px-6 py-16 lg:py-24">
                        <Reveal>
                            <span className="label mb-10 block">Next Up</span>
                        </Reveal>

                        <Reveal delay={80}>
                            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#082820] shadow-[8px_8px_0px_0px_rgba(8,40,32,1)] bg-[#edeae3]">
                                {/* Illustration as subtle bg */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <Image
                                        src="/hackathon/suphack2.png"
                                        alt=""
                                        fill
                                        className="object-cover object-top opacity-[0.12]"
                                        sizes="(max-width: 1280px) 100vw, 1280px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#edeae3] via-[#edeae3]/80 to-transparent" />
                                </div>

                                <div className="relative z-10 p-8 md:p-12 lg:p-16">
                                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.92] tracking-tight mb-3">
                                        c0mpiled
                                    </h2>
                                    <p className="font-mono text-xs text-[#082820]/40 uppercase tracking-widest mb-8">
                                        TVG &times; Transpose Platform &bull; 2026
                                    </p>

                                    <div className="flex items-center gap-2 flex-wrap mb-10">
                                        <span className="pill">Startups</span>
                                        <span className="text-[#016F4E]/40">&times;</span>
                                        <span className="pill">Venture</span>
                                        <span className="text-[#016F4E]/40">&times;</span>
                                        <span className="pill">Students</span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#082820]/10 pt-8 mb-8">
                                        <div>
                                            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#082820]/40 mb-2">When</p>
                                            <p className="text-xl md:text-2xl font-semibold">Feb 20</p>
                                            <p className="text-sm opacity-60">Friday</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#082820]/40 mb-2">Time</p>
                                            <p className="text-xl md:text-2xl font-semibold">5 PM</p>
                                            <p className="text-sm opacity-60">– 10:30 PM</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#082820]/40 mb-2">Where</p>
                                            <p className="text-xl md:text-2xl font-semibold">Gates Dell, UT</p>
                                            <p className="font-mono text-[10px] text-[#082820]/30 uppercase tracking-wider mt-1">Register for location</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-[#082820]/10 pt-6">
                                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#082820]/40 mb-2">Judges</p>
                                        <p className="font-mono text-sm text-[#082820]/60 leading-relaxed max-w-2xl">
                                            Shapol M. (CEO, Entangl YC S24) &bull; Mason F. (Chief of Staff, Interface) &bull; Armel T. (CEO, Miru YC S24) &bull; Varun T. (CEO, Waypoint YC W25)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ===== PAST HACKATHONS ===== */}
                <section className="border-t border-[#082820]/10">
                    <div className="container mx-auto px-6 py-16 lg:py-24">
                        <Reveal>
                            <span className="label mb-10 block">Previously</span>
                        </Reveal>

                        <Reveal delay={80}>
                            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#082820] shadow-[8px_8px_0px_0px_rgba(8,40,32,1)] bg-[#edeae3] group cursor-default">
                                {/* Illustration as subtle bg */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <Image
                                        src="/hackathon/suphack1.png"
                                        alt=""
                                        fill
                                        className="object-cover object-[center_15%] opacity-[0.12] group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 1280px) 100vw, 1280px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#edeae3] via-[#edeae3]/80 to-transparent" />
                                </div>

                                <div className="relative z-10 p-8 md:p-12 lg:p-16">
                                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.92] tracking-tight mb-8">
                                        TVG Vibeathon
                                    </h2>

                                    <div className="flex items-center gap-2 flex-wrap mb-10">
                                        <span className="pill">Flora</span>
                                        <span className="pill">AV</span>
                                        <span className="pill">Framer</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 border-t border-[#082820]/10 pt-8">
                                        <div>
                                            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#082820]/40 mb-2">When</p>
                                            <p className="text-xl md:text-2xl font-semibold">Oct 4</p>
                                            <p className="text-sm opacity-60">Saturday, 2025</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#082820]/40 mb-2">Where</p>
                                            <p className="text-xl md:text-2xl font-semibold">Welch Hall</p>
                                            <p className="text-sm opacity-60">UT Austin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

            </div>
        </main>
    );
}
