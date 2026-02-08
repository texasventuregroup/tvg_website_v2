'use client';

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
        name: "American Dynamism",
        tagline: "Defense Tech & Hard Engineering",
        date: "Oct 2025",
        location: "Capital Factory",
        status: "past",
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
    return (
        <main className="min-h-screen bg-[#fcf7f0] text-[#082820]">
            {/* Hero Section - Typography-focused */}
            <section className="min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-32 pb-20 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-20 right-20 w-64 h-64 border border-[#082820]/10 rounded-full" />
                <div className="absolute top-32 right-32 w-48 h-48 border border-[#01A072]/20 rounded-full" />
                <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#01A072]/10 rounded-full blur-3xl" />

                <div className="max-w-screen-xl mx-auto w-full">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
                        <div className="flex-1">
                            <span className="font-mono text-xs uppercase tracking-widest text-[#01A072] mb-6 block">
                                Next Event: Feb 20, 2026
                            </span>
                            <h1 className="text-[clamp(4rem,12vw,10rem)] font-bold leading-[0.85] tracking-tighter">
                                BUILD
                                <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: '2px #082820' }}>
                                    THE
                                </span>
                                <br />
                                FUTURE
                            </h1>
                        </div>
                        <div className="lg:max-w-md lg:pb-4">
                            <p className="text-lg lg:text-xl opacity-70 leading-relaxed mb-8">
                                24 hours. 300 builders. Ship something that matters.
                            </p>
                            <JoinButton className="inline-block px-8 py-4 bg-[#082820] text-[#fcf7f0] rounded-full font-bold hover:bg-[#01A072] transition-all">
                                Apply to Hack
                            </JoinButton>
                        </div>
                    </div>

                </div>
            </section>

            {/* Event Schedule */}
            <section className="py-20 lg:py-32 px-6 lg:px-12 bg-[#082820] text-[#fcf7f0]">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex items-baseline justify-between border-b border-[#fcf7f0]/20 pb-4 mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold">Event Schedule</h2>
                        <span className="font-mono text-xs opacity-50">2025-2026</span>
                    </div>

                    <div className="space-y-0">
                        {events.map((event) => (
                            <div
                                key={event.name}
                                className="group border-b border-[#fcf7f0]/10 py-10 hover:bg-[#fcf7f0]/5 transition-all px-6 -mx-6"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                    <div className="lg:w-16">
                                        <span className="font-mono text-sm text-[#01A072]">{event.number}</span>
                                    </div>
                                    <div className="lg:flex-1">
                                        <h3 className="text-2xl lg:text-3xl font-bold group-hover:text-[#01A072] transition-colors">
                                            {event.name}
                                        </h3>
                                        <p className="text-[#fcf7f0]/50 mt-1 font-mono text-sm">{event.tagline}</p>
                                    </div>
                                    <div className="lg:w-48 lg:text-center">
                                        <span className="block text-lg font-bold">{event.date}</span>
                                        <span className="text-sm opacity-40">{event.location}</span>
                                    </div>
                                    <div className="lg:w-32 lg:text-right">
                                        <span className={`inline-block px-4 py-2 rounded-full text-xs font-mono uppercase ${event.status === 'upcoming'
                                            ? 'bg-[#01A072] text-white'
                                            : 'border border-[#fcf7f0]/20 text-[#fcf7f0]/50'
                                            }`}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Creative Metrics Section */}
            <section className="py-20 lg:py-32 px-6 lg:px-12 relative overflow-hidden">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* Left - Typography art */}
                        <div className="relative">
                            <div className="text-[clamp(6rem,20vw,14rem)] font-bold leading-[0.8] tracking-tighter opacity-5 absolute -top-10 -left-10 pointer-events-none select-none">
                                HACK
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-8 relative">
                                Why builders
                                <br />
                                <span className="text-[#01A072]">choose us</span>
                            </h2>
                            <p className="text-lg opacity-70 leading-relaxed">
                                We're not just another hackathon. We connect you directly with founders,
                                investors, and the people shaping Austin's tech ecosystem.
                            </p>
                        </div>

                        {/* Right - Creative cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-8 bg-[#082820] text-[#fcf7f0] rounded-2xl">
                                <span className="text-4xl font-bold text-[#01A072]">Mentors</span>
                                <p className="mt-2 text-sm opacity-70">1:1 Founder Feedback</p>
                            </div>
                            <div className="p-8 border-2 border-[#082820] rounded-2xl">
                                <span className="text-4xl font-bold">Judges</span>
                                <p className="mt-2 text-sm opacity-70">VCs & Industry Leaders</p>
                            </div>
                            <div className="p-8 border-2 border-[#01A072] rounded-2xl col-span-2">
                                <div className="flex items-center gap-4">
                                    <span className="text-5xl font-bold text-[#01A072]">∞</span>
                                    <div>
                                        <span className="text-2xl font-bold">Connections</span>
                                        <p className="text-sm opacity-70">Direct access to founders & VCs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-32 px-6 lg:px-12 bg-[#01A072] text-white">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6">Ready to build?</h2>
                    <p className="text-xl opacity-80 mb-10 max-w-xl mx-auto">
                        Applications for Let's Build 2026 are now open.
                    </p>
                    <JoinButton className="inline-block px-12 py-5 bg-white text-[#01A072] rounded-full font-bold text-lg hover:bg-[#082820] hover:text-white transition-all">
                        Apply Now
                    </JoinButton>
                </div>
            </section>
        </main >
    );
}
