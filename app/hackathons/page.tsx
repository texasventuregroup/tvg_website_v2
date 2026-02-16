'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


/* ---- Scroll-reveal with multiple animation styles ---- */
function Reveal({
    children,
    className = '',
    delay = 0,
    animation = 'up',
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    animation?: 'up' | 'left' | 'right' | 'fade' | 'scale';
}) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Don't observe if element's parent is hidden (prevents premature reveals)
        const parent = el.closest('[style*="visibility: hidden"]');
        if (parent) {
            const mo = new MutationObserver(() => {
                if (!parent.getAttribute('style')?.includes('hidden')) {
                    mo.disconnect();
                    startObserving();
                }
            });
            mo.observe(parent, { attributes: true, attributeFilter: ['style'] });
            return () => mo.disconnect();
        }
        startObserving();

        function startObserving() {
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
                { threshold: 0.08 }
            );
            observer.observe(el!);
        }
    }, []);

    const hidden: Record<string, string> = {
        up: 'opacity-0 translate-y-8',
        left: 'opacity-0 translate-x-8',
        right: 'opacity-0 -translate-x-8',
        fade: 'opacity-0',
        scale: 'opacity-0 scale-95',
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : hidden[animation]} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
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
            setTimeout(() => {
                window.scrollTo(0, 0);
                setShowContent(true);
            }, 1000);
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
        <main className={`w-full min-h-screen text-[#082820] ${showContent ? 'bg-[#f5f0e3]' : 'bg-[#f7f8f1]'}`}>

            {/* ========== INTRO VIDEO ========== */}
            {!showContent && (
                <div className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-1000 ease-out bg-[#f7f8f1] ${videoFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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

            {/* ========== MAIN CONTENT ========== */}
            <div
                className={`transition-all duration-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ visibility: showContent ? 'visible' : 'hidden' }}
            >

                {/* ===== HERO — Image with overlaid title ===== */}
                <section className="relative h-screen overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/hackathon/image.png"
                            alt="Watercolor hackathon scene"
                            fill
                            className="object-cover object-[center_30%] md:object-center grayscale"
                            priority
                            sizes="100vw"
                        />
                        {/* Bottom fade */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-[70%] pointer-events-none"
                            style={{ background: 'linear-gradient(to top, #f5f0e3 10%, transparent)' }}
                        />
                    </div>

                    {/* Title — top-left on all screens */}
                    <div className="absolute top-24 md:top-32 left-6 md:left-12 lg:left-20 z-10">
                        <span className="label mb-2 block">TVG</span>
                        <h1
                            className="text-4xl md:text-6xl lg:text-8xl font-semibold leading-[0.92] tracking-tight text-[#082820]"
                            style={{ textShadow: '0 2px 20px rgba(245, 240, 227, 0.8), 0 0 40px rgba(245, 240, 227, 0.5)' }}
                        >
                            Hackathons
                        </h1>
                    </div>
                </section>

                {/* ===== CURRENT EVENT — Let's Build 2026 ===== */}
                <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                    <Reveal animation="up">
                        <p className="label mb-6">Next Up</p>
                    </Reveal>

                    {/* Immersive Event Card */}
                    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#082820] shadow-[8px_8px_0px_0px_rgba(8,40,32,1)] bg-[#e8e6e1]">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            <Image
                                src="/hackathon/suphack1.png"
                                alt="UT Tower watercolor illustration"
                                fill
                                className="object-cover object-top opacity-20"
                                sizes="(max-width: 1280px) 100vw, 1280px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#e8e6e1] via-transparent to-transparent" />
                        </div>

                        <div className="relative z-10 p-8 md:p-16 lg:p-20 text-[#082820]">
                            <div className="max-w-4xl">
                                <Reveal animation="up" delay={100}>
                                    <h2 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight mb-4 text-[#082820]">
                                        Let&apos;s Build
                                    </h2>
                                    <p className="font-mono text-xs md:text-sm text-[#082820]/60 uppercase tracking-widest mb-10">
                                        TVG &times; Transpose Platform &bull; 2026
                                    </p>
                                </Reveal>

                                <Reveal animation="up" delay={200}>
                                    <div className="flex flex-wrap gap-3 mb-12">
                                        <span className="px-4 py-1.5 rounded-full bg-[#082820]/5 border border-[#082820]/20 text-xs font-bold uppercase tracking-wider">Startups</span>
                                        <span className="px-4 py-1.5 rounded-full bg-[#082820]/5 border border-[#082820]/20 text-xs font-bold uppercase tracking-wider">Venture</span>
                                        <span className="px-4 py-1.5 rounded-full bg-[#082820]/5 border border-[#082820]/20 text-xs font-bold uppercase tracking-wider">Students</span>
                                    </div>
                                </Reveal>

                                <Reveal animation="up" delay={300}>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-[#082820]/10 pt-10">
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
                                        <div className="col-span-2 md:col-span-2">
                                            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#082820]/40 mb-2">Where</p>
                                            <p className="text-xl md:text-2xl font-semibold">Gates Dell Complex, UT</p>
                                            <p className="text-sm opacity-60">Register for location</p>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal animation="fade" delay={400}>
                                    <div className="mt-10 pt-6 border-t border-[#082820]/10">
                                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#082820]/40 mb-2">Judges</p>
                                        <p className="font-mono text-sm text-[#082820] leading-relaxed max-w-2xl">
                                            Shapol M. (CEO, Entangl YC S24) &bull; Mason F. (Chief of Staff, Interface) &bull; Armel T. (CEO, Miru YC S24) &bull; Varun T. (CEO, Waypoint YC W25)
                                        </p>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== PAST HACKATHONS ===== */}
                <section className="py-12 md:py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-[#082820]/8">
                    <Reveal animation="up">
                        <p className="label mb-8">Previously</p>
                    </Reveal>

                    <Reveal animation="up" delay={100}>
                        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#082820] shadow-[8px_8px_0px_0px_rgba(8,40,32,1)] bg-[#e8e6e1] group cursor-default">
                            <div className="absolute inset-0">
                                <Image
                                    src="/hackathon/suphack2.png"
                                    alt="Welch Hall watercolor illustration"
                                    fill
                                    className="object-cover object-[center_15%] opacity-20 group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 1280px) 100vw, 1280px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#e8e6e1] via-transparent to-transparent" />
                            </div>

                            <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end min-h-[400px] text-[#082820]">
                                <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[#082820]">TVG Vibeathon</h3>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 rounded-full bg-[#082820]/5 border border-[#082820]/20 text-[10px] font-bold uppercase tracking-wider text-[#082820]">Flora</span>
                                    <span className="px-3 py-1 rounded-full bg-[#082820]/5 border border-[#082820]/20 text-[10px] font-bold uppercase tracking-wider text-[#082820]">AV</span>
                                    <span className="px-3 py-1 rounded-full bg-[#082820]/5 border border-[#082820]/20 text-[10px] font-bold uppercase tracking-wider text-[#082820]">Framer</span>
                                </div>

                                <div className="grid grid-cols-2 gap-8 text-sm">
                                    <div>
                                        <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-1">Date</p>
                                        <p className="font-semibold">Oct 4, 2025</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-1">Location</p>
                                        <p className="font-semibold">Welch Hall, UT</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>

            </div>
        </main>
    );
}
