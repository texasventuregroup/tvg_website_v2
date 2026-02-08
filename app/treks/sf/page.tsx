'use client';

import TrekHero from '@/app/components/TrekHero';
import TrekJourneyMap from '@/app/components/TrekJourneyMap';
import FirmLogo from '@/app/components/FirmLogo';
import { Metadata } from 'next';
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
    {
        name: 'Sequoia Capital',
        category: 'Venture Capital',
        description: 'Founded 1972. Backed Apple, Google, YouTube, Instagram, Airbnb. One of the most influential VC firms globally.',
        aum: '$85B+',
        focus: 'Seed to IPO',
        domain: 'sequoiacap.com'
    },
    {
        name: 'Vista Equity Partners',
        category: 'Private Equity',
        description: 'Founded 2000. Exclusively focused on enterprise software, data, and technology-enabled businesses.',
        aum: '$100B+',
        focus: 'Enterprise Software',
        domain: 'vistaequitypartners.com'
    },
    {
        name: 'Gradient Ventures',
        category: 'Venture Capital',
        description: 'Founded 2017 (Google VC spinout). Early-stage focus exclusively on AI startups.',
        aum: 'Undisclosed',
        focus: 'AI / ML',
        domain: 'gradient.com'
    },
    {
        name: 'Entrepreneurs First',
        category: 'Talent Investor',
        description: 'Founded 2011. Backs individuals pre-team and pre-idea. Industrializes founder creation globally.',
        aum: '$500M+',
        focus: 'Pre-Seed',
        domain: 'joinef.com'
    },
    {
        name: 'Tavus',
        category: 'AI Startup',
        description: 'Founded 2021. Building real-time multimodal AI humans. $18M Series A (2024).',
        raised: '$18M',
        focus: 'AI Video',
        domain: 'tavus.io'
    },
    {
        name: 'Mira',
        category: 'AI Hardware',
        description: 'AI-powered smart glasses acting as a "second brain." $6.6M seed led by General Catalyst.',
        raised: '$6.6M',
        focus: 'Wearables',
        domain: 'miralabs.io'
    },
    {
        name: 'Delphi',
        category: 'AI Startup',
        description: 'AI-powered "digital minds" that capture how a person thinks, speaks, and reasons.',
        raised: '$16M',
        focus: 'AI Clones',
        domain: 'delphi.ai'
    },
    {
        name: 'Antler',
        category: 'Venture Builder',
        description: 'Global Day Zero backer operating 30+ cities. Runs residency programs for co-founder matching.',
        aum: '$1B+',
        focus: 'Pre-Seed',
        domain: 'antler.co'
    },
    {
        name: 'Heavybit',
        category: 'Venture Capital',
        description: 'Specializes in developer-first and infrastructure software. Portfolio: PagerDuty, CircleCI.',
        aum: '$100M+',
        focus: 'DevTools',
        domain: 'heavybit.com'
    },
    {
        name: 'Transpose',
        category: 'Venture Capital',
        description: 'Formation-stage firm backing founders and emerging managers from Day 0.',
        focus: 'Formation Stage',
        domain: 'transpose.vc'
    }
];

export default function SFTrekPage() {
    return (
        <main className="bg-white min-h-screen">
            <TrekHero
                city="San Francisco"
                semester="Winter"
                year="2025"
                description="The pilgrimage to the Mecca of technology. From Sand Hill Road to SoMa, meeting the architects of the AI revolution."
                images={trekImages}
                firmCount={10}
            />

            <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-28">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* LEFT: Schedule */}
                    <div className="lg:w-2/3">
                        <h2 className="text-3xl font-bold mb-10 text-[#082820]">The Journey</h2>

                        <div className="mb-12">
                            <h3 className="text-xl font-mono text-[#016F4E] mb-6 border-b border-[#082820]/10 pb-2">DAY 01 - DEC 16</h3>
                            <TrekJourneyMap schedule={trekSchedule_Day1} />
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-mono text-[#016F4E] mb-6 border-b border-[#082820]/10 pb-2">DAY 02 - DEC 17</h3>
                            <TrekJourneyMap schedule={trekSchedule_Day2} />
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-mono text-[#016F4E] mb-6 border-b border-[#082820]/10 pb-2">DAY 03 - DEC 18</h3>
                            <TrekJourneyMap schedule={trekSchedule_Day3} />
                        </div>

                        {/* Back Link */}
                        <div className="mt-20">
                            <Link href="/treks" className="inline-flex items-center gap-2 text-[#016F4E] hover:underline font-mono text-sm">
                                ← VIEW ALL TREKS
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: Firms Grid */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
                            <h2 className="text-3xl font-bold mb-8 text-[#082820]">Firms Visited</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {firms.map((firm) => (
                                    <div key={firm.name} className="group p-5 rounded-xl border border-[#082820]/10 hover:border-[#016F4E] transition-all hover:shadow-lg bg-[#fcf7f0]/30">
                                        <div className="flex items-center gap-3 mb-3">
                                            <FirmLogo name={firm.name} domain={firm.domain} size={36} className="rounded-md shrink-0" />
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-[#082820] leading-tight text-sm">{firm.name}</h4>
                                                <span className="text-[10px] uppercase tracking-wider text-[#016F4E] font-medium">{firm.category}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs opacity-70 leading-relaxed mb-3">
                                            {firm.description}
                                        </p>
                                        {(firm.aum || firm.raised) && (
                                            <div className="flex justify-end">
                                                <span className="text-[10px] font-mono bg-[#016F4E]/10 px-2 py-1 rounded text-[#016F4E] whitespace-nowrap">{firm.aum || firm.raised} {firm.aum ? 'AUM' : 'Raised'}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
