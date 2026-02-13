'use client';

import TrekJourneyMap from '@/app/components/TrekJourneyMap';
import FirmLogo from '@/app/components/FirmLogo';
import Link from 'next/link';
import Image from 'next/image';

const trekImages = [
    '/images/events/sf_2025.jpeg',
    '/images/events/sf_trek_photo.jpg',
    '/images/events/sf.png',
];

const trekSchedule_Day1 = [
    { time: '1:30 PM', activity: 'Crusoe - Finance + Product Session', location: '225 Bush St', type: 'visit' as const },
    { time: '2:30 PM', activity: 'Tavus - Office Tour + CEO Chat', location: '35 Stillman St', type: 'visit' as const },
    { time: '4:15 PM', activity: 'Entrepreneurs First', location: '501 Folsom St', type: 'visit' as const },
    { time: '5:30 PM', activity: 'Group Dinner', location: 'Sushi Sato', type: 'social' as const },
];

const trekSchedule_Day2 = [
    { time: '10:00 AM', activity: 'Vista Equity Partners', location: '4 Embarcadero Center', type: 'visit' as const },
    { time: '11:45 AM', activity: 'Sequoia Capital - Partner Chat', location: '298 Alabama Street', type: 'visit' as const },
    { time: '1:00 PM', activity: 'Mira - Lunch + Co-Founder Chat', location: '85 5th St', type: 'visit' as const },
    { time: '2:30 PM', activity: 'Golden Gate Bridge / Presidio Explore', location: 'Presidio', type: 'social' as const },
    { time: '4:30 PM', activity: 'Delphi - Office Tour', location: '850 Montgomery', type: 'visit' as const },
];

const trekSchedule_Day3 = [
    { time: '9:45 AM', activity: 'Transpose & Heavybit', location: '27 South Park St', type: 'visit' as const },
    { time: '11:30 AM', activity: 'Gradient Ventures', location: '560 Davis St', type: 'visit' as const },
    { time: '1:30 PM', activity: 'Antler - Director Chat', location: '144 Townsend St', type: 'visit' as const },
];

const firms = [
    { name: 'Sequoia Capital', category: 'Venture Capital', description: 'Founded 1972. Backed Apple, Google, YouTube, Instagram, Airbnb. One of the most influential VC firms globally.', aum: '$85B+', focus: 'Seed to IPO', domain: 'sequoiacap.com' },
    { name: 'Vista Equity Partners', category: 'Private Equity', description: 'Founded 2000. Exclusively focused on enterprise software, data, and technology-enabled businesses.', aum: '$100B+', focus: 'Enterprise Software', domain: 'vistaequitypartners.com' },
    { name: 'Gradient Ventures', category: 'Venture Capital', description: 'Founded 2017 (Google VC spinout). Early-stage focus exclusively on AI startups.', aum: 'Undisclosed', focus: 'AI / ML', domain: 'gradient.com' },
    { name: 'Entrepreneurs First', category: 'Talent Investor', description: 'Founded 2011. Backs individuals pre-team and pre-idea. Industrializes founder creation globally.', aum: '$500M+', focus: 'Pre-Seed', domain: 'joinef.com' },
    { name: 'Tavus', category: 'AI Startup', description: 'Founded 2021. Building real-time multimodal AI humans. $18M Series A (2024).', raised: '$18M', focus: 'AI Video', domain: 'tavus.io' },
    { name: 'Mira', category: 'AI Hardware', description: 'AI-powered smart glasses acting as a "second brain." $6.6M seed led by General Catalyst.', raised: '$6.6M', focus: 'Wearables', domain: 'miralabs.io' },
    { name: 'Delphi', category: 'AI Startup', description: 'AI-powered "digital minds" that capture how a person thinks, speaks, and reasons.', raised: '$16M', focus: 'AI Clones', domain: 'delphi.ai' },
    { name: 'Antler', category: 'Venture Builder', description: 'Global Day Zero backer operating 30+ cities. Runs residency programs for co-founder matching.', aum: '$1B+', focus: 'Pre-Seed', domain: 'antler.co' },
    { name: 'Heavybit', category: 'Venture Capital', description: 'Specializes in developer-first and infrastructure software. Portfolio: PagerDuty, CircleCI.', aum: '$100M+', focus: 'DevTools', domain: 'heavybit.com' },
    { name: 'Transpose', category: 'Venture Capital', description: 'Formation-stage firm backing founders and emerging managers from Day 0.', focus: 'Formation Stage', domain: 'transpose.vc' },
];

export default function SFTrekPage() {
    return (
        <main className="w-full min-h-screen bg-[#fcf4e8] text-[#1a1a1a] selection:bg-[#082820] selection:text-[#fcf4e8]">

            {/* Masthead */}
            <header className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28">
                <div className="border-t border-[#1a1a1a] mb-3" />
                <div className="flex justify-between items-baseline font-body text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 mb-2">
                    <span>Special Dispatch</span>
                    <span>San Francisco, CA</span>
                    <span>December 2025</span>
                </div>
                <div className="border-y-[6px] border-[#1a1a1a] py-3 mb-1">
                    <h1 className="text-center font-serif font-black text-[clamp(3rem,10vw,8rem)] leading-[0.85] tracking-[-0.03em]">
                        THE TVG GAZETTE
                    </h1>
                </div>
                <div className="border-b-[2px] border-[#1a1a1a] mb-1" />
                <div className="text-center font-body text-[10px] uppercase tracking-[0.35em] text-[#1a1a1a]/40 py-2">
                    Trek Dispatch — San Francisco Edition
                </div>
                <div className="border-b border-[#1a1a1a] mb-10" />
            </header>

            <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-32">

                {/* Hero Image */}
                <div className="relative w-full h-[400px] mb-10 overflow-hidden">
                    <Image
                        src={trekImages[0]}
                        alt="San Francisco Trek"
                        fill
                        className="object-cover grayscale"
                    />
                </div>

                {/* Headline */}
                <div className="grid grid-cols-12 gap-0 mb-16">
                    <div className="col-span-12 lg:col-span-8 border-r-0 lg:border-r border-[#1a1a1a]/15 pr-0 lg:pr-10">
                        <h2 className="font-serif font-black text-[clamp(2.5rem,5vw,5rem)] leading-[0.92] tracking-[-0.02em] mb-6">
                            San Francisco
                        </h2>
                        <p className="font-body text-lg md:text-xl leading-relaxed italic text-[#1a1a1a]/60 mb-8 border-b border-[#1a1a1a]/10 pb-8">
                            The pilgrimage to the Mecca of technology. From Sand Hill Road to SoMa, meeting the architects of the AI revolution.
                        </p>

                        <div className="font-body text-[15px] leading-[1.9] text-[#1a1a1a]/80 mb-8">
                            <span className="float-left text-[4.5rem] leading-[0.75] pr-2 pt-1 font-serif font-black text-[#1a1a1a]">T</span>en
                            firms and startups across three days. TVG members met with partners at Sequoia Capital and Vista Equity Partners, toured offices at Tavus and Delphi, and spent time with the teams at Gradient Ventures, Entrepreneurs First, Antler, Heavybit, and Transpose. Between meetings, the group explored the Presidio, crossed the Golden Gate Bridge, and shared meals across the city.
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
                                    <span className="font-black">3 Days</span>
                                </div>
                                <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                                    <span className="text-[#1a1a1a]/60">Firms Visited</span>
                                    <span className="font-black">10</span>
                                </div>
                                <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                                    <span className="text-[#1a1a1a]/60">Combined AUM</span>
                                    <span className="font-black">$186B+</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#1a1a1a]/60">When</span>
                                    <span className="font-black">Dec 16–18, 2025</span>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
                    <div>
                        <h3 className="font-serif font-black text-xl mb-6 border-b-2 border-[#1a1a1a] pb-2">Day 01 — Dec 16</h3>
                        <TrekJourneyMap schedule={trekSchedule_Day1} />
                    </div>
                    <div>
                        <h3 className="font-serif font-black text-xl mb-6 border-b-2 border-[#1a1a1a] pb-2">Day 02 — Dec 17</h3>
                        <TrekJourneyMap schedule={trekSchedule_Day2} />
                    </div>
                    <div>
                        <h3 className="font-serif font-black text-xl mb-6 border-b-2 border-[#1a1a1a] pb-2">Day 03 — Dec 18</h3>
                        <TrekJourneyMap schedule={trekSchedule_Day3} />
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex-1 border-t border-[#1a1a1a]" />
                    <span className="font-serif font-black text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40">
                        Firms &amp; Startups Met
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
                                {(firm.aum || firm.raised) && (
                                    <span>· {firm.aum || firm.raised} {firm.aum ? 'AUM' : 'Raised'}</span>
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
                                alt={`SF Trek photo ${i + 1}`}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    ))}
                </div>

                {/* Back link */}
                <div className="text-center mb-16">
                    <Link href="/events" className="font-body text-sm text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors">
                        ← Back to The Gazette
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
