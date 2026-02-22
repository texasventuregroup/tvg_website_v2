'use client';

import TrekJourneyMap from '@/app/components/TrekJourneyMap';
import FirmLogo from '@/app/components/FirmLogo';
import Link from 'next/link';
import Image from 'next/image';

const trekImages = [
    '/images/analysts/network-building.jpeg',
    '/images/about/nyc.jpg',
    '/images/events/nyc23.png',
];

const trekSchedule_Day1 = [
    { time: '9:00 AM', activity: 'NYSE Tour & Opening Bell', location: '11 Wall Street', type: 'visit' as const },
    { time: '11:00 AM', activity: 'RRE Ventures', location: '130 E 59th Street', type: 'visit' as const },
    { time: '12:00 PM', activity: 'Bessemer Venture Partners', location: '505 5th Ave', type: 'visit' as const },
    { time: '2:00 PM', activity: 'New Enterprise Associates (NEA)', location: '104 E 5th Ave', type: 'visit' as const },
    { time: '4:00 PM', activity: 'Remarkable Ventures & ERA', location: '40 W 25th St', type: 'visit' as const },
    { time: '6:00 PM', activity: 'NYC Student-Venture Happy Hour', location: 'Tribeca', type: 'social' as const },
];

const trekSchedule_Day2 = [
    { time: '11:00 AM', activity: 'Coffee & Breakfast with Adam Dell', location: 'SoHo', type: 'social' as const },
    { time: '1:00 PM', activity: 'Team8 - Seed Investing & Cyber', location: '488 Madison', type: 'visit' as const },
    { time: '3:00 PM', activity: 'Insight Partners', location: '1114 6th Ave', type: 'visit' as const },
];

const firms = [
    { name: 'Bessemer Venture Partners', category: 'Venture Capital', description: 'Established 1911 (oldest VC). Over $20B AUM. 135+ IPOs including LinkedIn, Shopify, Twilio, Yelp, Pinterest.', aum: '$20B+', focus: 'Multi-Stage', domain: 'bvp.com' },
    { name: 'Insight Partners', category: 'Growth Equity', description: 'Founded 1995. Specializes ONLY in high-growth software. $90B+ AUM. 800+ investments, 55+ IPOs.', aum: '$90B+', focus: 'Software', domain: 'insightpartners.com' },
    { name: 'NEA', category: 'Venture Capital', description: 'Founded 1977. One of the world\'s largest VCs with $25B+ AUM. 270+ IPOs and 450+ M&A exits.', aum: '$25B+', focus: 'All Stages', domain: 'nea.com' },
    { name: 'RRE Ventures', category: 'Venture Capital', description: 'NYC-focused early stage. Raised $2B+. Investments include BuzzFeed, Venmo, Datadog, Giphy.', aum: '$2B+', focus: 'Early Stage', domain: 'rre.com' },
    { name: 'Team8', category: 'Venture Builder', description: 'Founded 2014. Dual model: venture creation + VC investing. Focus: cybersecurity, AI, fintech.', aum: '$1B+', focus: 'Cyber / AI', domain: 'team8.vc' },
    { name: 'Remarkable / ERA', category: 'Accelerator', description: 'Founded 2013. 300+ early-stage investments. 1000+ mentor network.', focus: 'Early Stage', domain: 'eranyc.com' },
    { name: 'Oceans Ventures', category: 'Venture Capital', description: 'Founded 2018. Pre-seed/seed focus. Led by ex-Foursquare President and early Facebook team.', focus: 'Early Stage', domain: 'oceans.vc' },
];

export default function NYCTrekPage() {
    return (
        <main className="w-full min-h-screen bg-[#fcf4e8] text-[#1a1a1a] selection:bg-[#082820] selection:text-[#fcf4e8]">

            {/* Masthead */}
            <header className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28">
                <div className="border-t border-[#1a1a1a] mb-3" />
                <div className="flex justify-between items-baseline font-body text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 mb-2">
                    <span>Special Dispatch</span>
                    <span>New York City, NY</span>
                    <span>January 2025</span>
                </div>
                <div className="border-y-[6px] border-[#1a1a1a] py-3 mb-1">
                    <h1 className="text-center font-serif font-black text-[clamp(3rem,10vw,8rem)] leading-[0.85] tracking-[-0.03em]">
                        THE TVG TIMES
                    </h1>
                </div>
                <div className="border-b-[2px] border-[#1a1a1a] mb-1" />
                <div className="text-center font-body text-[10px] uppercase tracking-[0.35em] text-[#1a1a1a]/40 py-2">
                    Trek Dispatch — New York City Edition
                </div>
                <div className="border-b border-[#1a1a1a] mb-10" />
            </header>

            <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-32">

                {/* Hero Image */}
                <div className="relative w-full h-[400px] mb-10 overflow-hidden">
                    <Image
                        src={trekImages[1]}
                        alt="New York City Trek"
                        fill
                        className="object-cover grayscale"
                        priority
                    />
                </div>

                {/* Headline */}
                <div className="grid grid-cols-12 gap-0 mb-16">
                    <div className="col-span-12 lg:col-span-8 border-r-0 lg:border-r border-[#1a1a1a]/15 pr-0 lg:pr-10">
                        <h2 className="font-serif font-black text-[clamp(2.5rem,5vw,5rem)] leading-[0.92] tracking-[-0.02em] mb-6">
                            New York City
                        </h2>
                        <p className="font-body text-lg md:text-xl leading-relaxed italic text-[#1a1a1a]/60 mb-8 border-b border-[#1a1a1a]/10 pb-8">
                            A journey into the world&apos;s financial capital. From the oldest VCs in the game to the titans of Private Equity and the builders of tomorrow.
                        </p>

                        <div className="font-body text-[15px] leading-[1.9] text-[#1a1a1a]/80 mb-8">
                            <span className="float-left text-[4.5rem] leading-[0.75] pr-2 pt-1 font-serif font-black text-[#1a1a1a]">S</span>even
                            firms and organizations across two days. TVG members rang the NYSE Opening Bell, met with partners at Bessemer Venture Partners and NEA, explored growth investing at Insight Partners, and connected with cyber-focused Team8. The trip culminated with a student-venture happy hour in Tribeca and breakfast with Adam Dell in SoHo.
                        </div>
                    </div>

                    {/* Quick Facts sidebar */}
                    <div className="col-span-12 lg:col-span-4 pl-0 lg:pl-10 mt-10 lg:mt-0">
                        <div className="border-2 border-[#1a1a1a] p-8 mb-8">
                            <h4 className="font-serif font-black text-lg uppercase tracking-wide mb-4 text-center border-b border-[#1a1a1a]/20 pb-3">
                                Dispatch Facts
                            </h4>
                            <div className="space-y-3 font-body text-sm">
                                <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                                    <span className="text-[#1a1a1a]/60">Duration</span>
                                    <span className="font-black">2 Days</span>
                                </div>
                                <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                                    <span className="text-[#1a1a1a]/60">Firms Visited</span>
                                    <span className="font-black">7</span>
                                </div>
                                <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                                    <span className="text-[#1a1a1a]/60">Combined AUM</span>
                                    <span className="font-black">$138B+</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#1a1a1a]/60">When</span>
                                    <span className="font-black">Jan 7–8, 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex-1 border-t border-[#1a1a1a]" />
                    <span className="font-serif font-black text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40">
                        The Itinerary
                    </span>
                    <div className="flex-1 border-t border-[#1a1a1a]" />
                </div>

                {/* Schedule */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                    <div>
                        <h3 className="font-serif font-black text-xl mb-6 border-b-2 border-[#1a1a1a] pb-2">Day 01 — Jan 07</h3>
                        <TrekJourneyMap schedule={trekSchedule_Day1} />
                    </div>
                    <div>
                        <h3 className="font-serif font-black text-xl mb-6 border-b-2 border-[#1a1a1a] pb-2">Day 02 — Jan 08</h3>
                        <TrekJourneyMap schedule={trekSchedule_Day2} />
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex-1 border-t border-[#1a1a1a]" />
                    <span className="font-serif font-black text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40">
                        Firms &amp; Organizations Met
                    </span>
                    <div className="flex-1 border-t border-[#1a1a1a]" />
                </div>

                {/* Firms grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-16">
                    {firms.map((firm) => (
                        <div key={firm.name} className="pb-6 border-b border-[#1a1a1a]/10">
                            <div className="flex items-center gap-3 mb-3">
                                <FirmLogo name={firm.name} domain={firm.domain} size={32} className="rounded-full shrink-0" />
                                <div className="min-w-0">
                                    <h4 className="font-serif font-black text-base leading-tight">{firm.name}</h4>
                                    <span className="font-body text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/40">{firm.category}</span>
                                </div>
                            </div>
                            <p className="font-body text-[13px] leading-[1.8] text-[#1a1a1a]/70 mb-2">
                                {firm.description}
                            </p>
                            <div className="flex gap-3 font-body text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                                <span>{firm.focus}</span>
                                {firm.aum && (
                                    <span>· {firm.aum} AUM</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gallery */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex-1 border-t border-[#1a1a1a]" />
                    <span className="font-serif font-black text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40">
                        Photo Record
                    </span>
                    <div className="flex-1 border-t border-[#1a1a1a]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {trekImages.map((img, i) => (
                        <div key={i} className="relative h-[250px] overflow-hidden">
                            <Image
                                src={img}
                                alt={`NYC Trek photo ${i + 1}`}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    ))}
                </div>

                {/* Back link */}
                <div className="text-center mb-16">
                    <Link href="/events" className="font-body text-sm text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors">
                        ← Back to The TVG Times
                    </Link>
                </div>

                {/* Colophon */}
                <footer className="border-t-[4px] border-[#1a1a1a] pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-start font-body text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                        <div>© 2026 Texas Venture Group</div>
                        <div className="mt-3 md:mt-0">Published in Austin, TX</div>
                        <div className="mt-3 md:mt-0 flex gap-6">
                            <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
                            <Link href="/events" className="hover:text-[#1a1a1a] transition-colors">Events</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}
