'use client';

import { useState, useRef, useEffect } from 'react';
import JoinButton from '../components/JoinButton';

const events = [
    {
        name: "Let's Build",
        tagline: "Startups × Venture × Students",
        date: "Feb 20, 2026",
        location: "UT Austin",
        status: "upcoming",
        number: "01"
    },
    {
        name: "Bevs and Devs",
        tagline: "Casual Co-working & Demos",
        date: "Weekly",
        location: "Capital Factory",
        status: "ongoing",
        number: "02"
    }
];

const stats = [
    { value: "300+", label: "Hackers" },
    { value: "24h", label: "To Ship" },
    { value: "$5K", label: "In Prizes" },
    { value: "15+", label: "Sponsors" },
];

export default function Hackathons() {
    const [showContent, setShowContent] = useState(false);
    const [videoFading, setVideoFading] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);



    useEffect(() => {
        // Check session storage to see if video has already played
        const hasPlayed = sessionStorage.getItem('hackathonVideoPlayed');
        if (hasPlayed) {
            setShowContent(true);
            setVideoStarted(true); // Treat as started so overlay is hidden
            setVideoReady(true);
            return; // Skip video logic
        }

        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            setVideoFading(true);
            sessionStorage.setItem('hackathonVideoPlayed', 'true');
            setTimeout(() => {
                setShowContent(true);
            }, 1200);
        };

        const handleLoaded = () => {
            video.currentTime = 0.6;
        };

        const handleSeeked = () => {
            setVideoReady(true);
        };

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
        <main className="w-full min-h-screen bg-[#fcf4e8] text-black selection:bg-black selection:text-[#fcf4e8] font-mono">

            {/* ============================================
                INTRO: MAILBOX VIDEO
                ============================================ */}
            {!showContent && (
                <div
                    className={`min-h-[calc(100vh-80px)] flex items-center justify-center transition-opacity duration-1000 ease-out bg-[#fcf4e8] ${videoFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                >
                    <div className="relative flex flex-col items-center">
                        <div
                            className="relative max-w-[200px] w-full cursor-pointer overflow-hidden"
                            style={{ clipPath: 'inset(0 0 8px 0)' }}
                            onClick={!videoStarted ? handlePlay : undefined}
                        >
                            <video
                                ref={videoRef}
                                className={`w-full h-auto transition-opacity duration-300 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                                muted
                                playsInline
                                preload="auto"
                                style={{ background: 'transparent', mixBlendMode: 'multiply' }}
                            >
                                <source src="/videos/whimsy.mp4" type="video/mp4" />
                            </video>
                        </div>

                        {!videoStarted && (
                            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-[10px] uppercase tracking-[0.2em] text-black/40">
                                click anywhere to begin
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* ============================================
                MAIN CONTENT - CARTOONY REDESIGN
                ============================================ */}
            <div
                className={`transition-all duration-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ visibility: showContent ? 'visible' : 'hidden' }}
            >
                {/* Hero - Comic Panel Style */}
                <section className="min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-32 pb-20">
                    <div className="max-w-6xl mx-auto w-full">
                        <div className="border-4 border-black bg-white p-8 md:p-16 shadow-[12px_12px_0px_0px_#000000] relative overflow-hidden animate-fade-up">
                            <span className="inline-block bg-black text-[#fcf4e8] px-4 py-2 font-bold text-sm tracking-widest mb-8 border-2 border-black transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                                NEXT EVENT: FEB 20, 2026
                            </span>

                            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.9] tracking-tighter mb-10 uppercase transform rotate-1">
                                Build<br />The<br /><span className="text-white" style={{ textShadow: '4px 4px 0px #000', WebkitTextStroke: '3px black' }}>Future</span>
                            </h1>

                            <p className="text-xl md:text-3xl font-bold leading-relaxed max-w-2xl mb-12 border-l-8 border-black pl-6">
                                24 hours. 300 builders.
                            </p>

                            <JoinButton className="inline-block px-10 py-5 bg-[#fcf4e8] text-black border-4 border-black font-black text-xl shadow-[6px_6px_0px_0px_#000000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all active:translate-y-2 active:shadow-none">
                                Apply to Hack
                            </JoinButton>

                            {/* Decorative corner elements */}
                            <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>
                            <div className="absolute top-4 right-8 w-4 h-4 border-2 border-black rounded-full"></div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 bg-black rounded-full"></div>
                        </div>
                    </div>
                </section>

                {/* Event Schedule - Graphic Novel List */}
                <section className="py-24 px-6 lg:px-12 border-t-8 border-black bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-black mb-20 uppercase italic decoration-4 underline decoration-black underline-offset-8">The Schedule</h2>
                        <div className="space-y-12">
                            {events.map((event, i) => (
                                <div key={event.name} className={`border-4 border-black p-8 md:p-10 shadow-[12px_12px_0px_0px_#000000] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_#000000] transition-all bg-[#fcf4e8] ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                        <div>
                                            <span className="text-sm font-black bg-black text-white px-3 py-1 mb-3 inline-block uppercase tracking-widest border-2 border-black">Edition #{event.number}</span>
                                            <h3 className="text-4xl md:text-5xl font-black uppercase mb-2">{event.name}</h3>
                                            <p className="font-bold text-lg border-b-2 border-black inline-block pb-1">{event.tagline}</p>
                                        </div>
                                        <div className="text-left md:text-right mt-4 md:mt-0">
                                            <p className="text-3xl font-black">{event.date}</p>
                                            <p className="font-bold uppercase tracking-widest text-sm mt-1">{event.location}</p>
                                            <div className="mt-4">
                                                <span className={`inline-block px-4 py-1 border-2 border-black font-bold uppercase text-xs ${event.status === 'upcoming' ? 'bg-[#01A072] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                                    {event.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Builders - Comic Strip Grid */}
                <section className="py-24 px-6 lg:px-12 bg-[#fcf4e8] border-t-8 border-black">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black mb-16 text-center uppercase">Why <span className="text-white bg-black px-2">Builders</span> Choose Us</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#000000] h-full flex flex-col text-center -rotate-2">
                                <div className="text-6xl mb-6 font-black font-mono">01</div>
                                <h3 className="text-3xl font-black uppercase mb-4 decoration-4 underline decoration-[#01A072]">Mentors</h3>
                                <p className="font-bold text-lg">1:1 Founder Feedback calling out your bad takes.</p>
                            </div>
                            <div className="border-4 border-black bg-black text-[#fcf4e8] p-8 shadow-[8px_8px_0px_0px_#01A072] h-full flex flex-col text-center scale-105 z-10">
                                <div className="text-6xl mb-6 font-black font-mono">02</div>
                                <h3 className="text-3xl font-black uppercase mb-4">Judges</h3>
                                <p className="font-bold text-lg">VCs & Industry Leaders ready to roast (or invest).</p>
                            </div>
                            <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#000000] h-full flex flex-col text-center rotate-2">
                                <div className="text-6xl mb-6 font-black font-mono">03</div>
                                <h3 className="text-3xl font-black uppercase mb-4 decoration-4 underline decoration-[#01A072]">Network</h3>
                                <p className="font-bold text-lg">Direct access to the heart of the ATX ecosystem.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA - Final Panel */}
                <section className="py-32 px-6 bg-[#fcf4e8] text-black text-center border-t-2 border-[#000000]/10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-bold mb-8 font-serif">
                            Ready <br className="md:hidden" /> to Build?
                        </h2>
                        <p className="text-xl md:text-2xl font-medium opacity-60 mb-10 max-w-xl mx-auto">
                            Build, learn, and ship at TVG hackathons.
                        </p>
                        <JoinButton className="inline-block px-10 py-4 bg-black text-[#fcf4e8] rounded-full font-bold text-lg hover:bg-[#01A072] hover:scale-105 transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
                            Apply Now
                        </JoinButton>
                    </div>
                </section>
            </div>
        </main >
    );
}
