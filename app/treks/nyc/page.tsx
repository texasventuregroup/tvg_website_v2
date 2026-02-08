'use client';

import TrekHero from '@/app/components/TrekHero';
import TrekJourneyMap from '@/app/components/TrekJourneyMap';
import FirmLogo from '@/app/components/FirmLogo';
import { Metadata } from 'next';
import Link from 'next/link';

// Data preserved and properly typed for the new components

const trekImages = [
    '/images/analysts/network-building.jpeg',
    '/images/about/nyc.jpg',
    '/images/events/nyc23.png',
];

// Split the schedule for the Journey Map visual
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
    {
        name: 'Bessemer Venture Partners',
        category: 'Venture Capital',
        description: 'Established 1911 (oldest VC). Over $20B AUM. 135+ IPOs including LinkedIn, Shopify, Twilio, Yelp, Pinterest.',
        aum: '$20B+',
        focus: 'Multi-Stage',
        domain: 'bvp.com'
    },
    {
        name: 'Insight Partners',
        category: 'Growth Equity',
        description: 'Founded 1995. Specializes ONLY in high-growth software. $90B+ AUM. 800+ investments, 55+ IPOs.',
        aum: '$90B+',
        focus: 'Software',
        domain: 'insightpartners.com',
        logo: '/images/partners/insight.webp'
    },
    {
        name: 'NEA',
        category: 'Venture Capital',
        description: 'Founded 1977. One of the world\'s largest VCs with $25B+ AUM. 270+ IPOs and 450+ M&A exits.',
        aum: '$25B+',
        focus: 'All Stages',
        domain: 'nea.com'
    },
    {
        name: 'RRE Ventures',
        category: 'Venture Capital',
        description: 'NYC-focused early stage. Raised $2B+. Investments include BuzzFeed, Venmo, Datadog, Giphy.',
        aum: '$2B+',
        focus: 'Early Stage',
        domain: 'rre.com'
    },
    {
        name: 'Team8',
        category: 'Venture Builder',
        description: 'Founded 2014. Dual model: venture creation + VC investing. Focus: cybersecurity, AI, fintech.',
        aum: '$1B+',
        focus: 'Cyber / AI',
        domain: 'team8.vc'
    },
    {
        name: 'Remarkable / ERA',
        category: 'Accelerator',
        description: 'Founded 2013. 300+ early-stage investments. 1000+ mentor network.',
        focus: 'Early Stage',
        domain: 'eranyc.com'
    },
    {
        name: 'Oceans Ventures',
        category: 'Venture Capital',
        description: 'Founded 2018. Pre-seed/seed focus. Led by ex-Foursquare President and early Facebook team.',
        focus: 'Early Stage',
        domain: 'oceans.vc'
    }
];

export default function NYCTrekPage() {
    return (
        <main className="bg-white min-h-screen">
            <TrekHero
                city="New York City"
                semester="Spring"
                year="2024"
                description="A journey into the world's financial capital. From the oldest VCs in the game to the titans of Private Equity and the builders of tomorrow."
                images={trekImages}
                firmCount={7}
            />

            <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-28">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* LEFT: Schedule */}
                    <div className="lg:w-2/3">
                        <h2 className="text-3xl font-bold mb-10 text-[#082820]">The Journey</h2>

                        <div className="mb-12">
                            <h3 className="text-xl font-mono text-[#016F4E] mb-6 border-b border-[#082820]/10 pb-2">DAY 01 - JAN 07</h3>
                            <TrekJourneyMap schedule={trekSchedule_Day1} />
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-mono text-[#016F4E] mb-6 border-b border-[#082820]/10 pb-2">DAY 02 - JAN 08</h3>
                            <TrekJourneyMap schedule={trekSchedule_Day2} />
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
                                            <FirmLogo name={firm.name} domain={firm.domain} logo={firm.logo} size={36} className="rounded-md shrink-0" />
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-[#082820] leading-tight text-sm">{firm.name}</h4>
                                                <span className="text-[10px] uppercase tracking-wider text-[#016F4E] font-medium">{firm.category}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs opacity-70 leading-relaxed mb-3">
                                            {firm.description}
                                        </p>
                                        {firm.aum && (
                                            <div className="flex justify-end">
                                                <span className="text-[10px] font-mono bg-[#016F4E]/10 px-2 py-1 rounded text-[#016F4E] whitespace-nowrap">{firm.aum} AUM</span>
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
