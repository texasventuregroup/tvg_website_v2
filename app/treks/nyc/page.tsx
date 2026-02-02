'use client';

import Image from 'next/image';
import Link from 'next/link';

// NYC Trek Data - Winter 2024
const trekData = {
    city: 'New York City',
    short: 'NYC',
    code: 'NYC-24',
    date: 'January 7-8, 2024',
    status: 'Complete',
    schedule: [
        {
            day: 'Tuesday, January 7th',
            events: [
                { time: '9:00 AM', title: 'NYSE Tour & Opening Bell', location: '11 Wall Street' },
                { time: '11:00 AM', title: 'RRE Ventures', location: '130 E 59th Street' },
                { time: '12:00 PM', title: 'Bessemer Venture Partners', location: '505 5th Ave, Floor 4' },
                { time: '2:00 PM', title: 'New Enterprise Associates (NEA)', location: '104 E 5th Ave, Floor 19' },
                { time: '4:00 PM', title: 'Remarkable Ventures & ERA', location: '40 W 25th St, Floor 9' },
                { time: '6:00 PM', title: 'NYC Student-Venture Happy Hour', location: 'Tribeca' },
            ]
        },
        {
            day: 'Wednesday, January 8th',
            events: [
                { time: '11:00 AM', title: 'Coffee & Breakfast with Adam Dell', location: 'SoHo' },
                { time: '1:00 PM', title: 'Team8 - Seed Investing & Cyber', location: '488 Madison, Suite 1103' },
                { time: '3:00 PM', title: 'Insight Partners - Software Investing', location: '1114 6th Ave, Floor 36' },
            ]
        }
    ],
    firms: [
        {
            name: 'Bessemer Venture Partners',
            category: 'Venture Capital',
            description: 'Established 1911 (oldest VC). Over $20B AUM. 135+ IPOs including LinkedIn, Shopify, Twilio, Yelp, Pinterest. Known for transparent "Anti-Portfolio" of missed deals.',
            aum: '$20B+',
            focus: 'Multi-Stage'
        },
        {
            name: 'New Enterprise Associates (NEA)',
            category: 'Venture Capital',
            description: 'Founded 1977. One of the world\'s largest VCs with $25B+ AUM. 270+ IPOs and 450+ M&A exits. Portfolio includes Salesforce, Workday, Robinhood.',
            aum: '$25B+',
            focus: 'All Stages'
        },
        {
            name: 'Insight Partners',
            category: 'Growth Equity',
            description: 'Founded 1995. Specializes ONLY in high-growth software. $90B+ AUM. 800+ investments, 55+ IPOs. Known for in-house "Onsite" operational team.',
            aum: '$90B+',
            focus: 'Software'
        },
        {
            name: 'RRE Ventures',
            category: 'Venture Capital',
            description: 'Founded 1994 by James D. Robinson III/IV and Stuart Ellman. $2B+ AUM. Focus on Seed, Series A/B. Portfolio: Business Insider, BuzzFeed, Datadog, Giphy, Venmo.',
            aum: '$2B+',
            focus: 'Early Stage'
        },
        {
            name: 'Team8',
            category: 'Venture Builder',
            description: 'Founded 2014. Dual model: venture creation + VC investing. Focus: cybersecurity, AI, fintech, digital health. $1B+ AUM. 20 companies built, 8 exits (~$1B in cyber exits).',
            aum: '$1B+',
            focus: 'Cyber / AI'
        },
        {
            name: 'Remarkable Ventures',
            category: 'Venture Capital',
            description: 'Founded 2013. 300+ early-stage investments with $10B+ market cap. Also runs climate-focused RVC fund. 1000+ mentor network.',
            focus: 'Early Stage'
        },
        {
            name: 'Entrepreneurs Roundtable Accelerator',
            category: 'Accelerator',
            description: 'Founded 2011. $150K for 6% equity. 4-month programs. Notable exits: Katapult ($1B SPAC), TripleLift ($1.4B to Vista). 500+ mentor network.',
            focus: 'Accelerator'
        },
        {
            name: 'Adam Dell',
            category: 'Investor / Operator',
            description: 'Venture capitalist and serial entrepreneur. Founded MessageOne ($155M exit to Dell), Clarity Money ($100M to Goldman Sachs), Domain Money. Previously Head of Product at Marcus by Goldman Sachs.',
            focus: 'Fintech'
        },
        {
            name: 'Oceans Ventures',
            category: 'Venture Capital',
            description: 'Founded 2018. Pre-seed/seed focus. Led by ex-Foursquare President and early Facebook team. 67 investments, 10 exits. Hands-on team-based support.',
            focus: 'Early Stage'
        }
    ]
};

export default function NYCTrek() {
    return (
        <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
            {/* Hero Header */}
            <section className="px-6 lg:px-12 pt-12 pb-8">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-end mb-8 border-b border-[#082820] pb-8">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-[#016F4E] text-[#fcf7f0] rounded-full text-xs font-mono uppercase tracking-wider">
                                    {trekData.status}
                                </span>
                                <span className="text-xs font-mono opacity-60 uppercase">
                                    {trekData.code}
                                </span>
                            </div>
                            <h1 className="text-[12vw] lg:text-[10rem] font-bold leading-[0.8] tracking-tighter text-[#082820] mb-4 -ml-1">
                                {trekData.short}
                            </h1>
                            <div className="text-lg font-medium opacity-70">{trekData.city}</div>
                        </div>

                        <div className="w-full lg:w-1/3 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                                <div>
                                    <span className="opacity-50 block mb-1 uppercase text-xs">Date</span>
                                    <span className="font-medium">{trekData.date}</span>
                                </div>
                                <div>
                                    <span className="opacity-50 block mb-1 uppercase text-xs">Firms</span>
                                    <span className="font-medium">{trekData.firms.length} Visited</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Image */}
            <section className="px-6 lg:px-12 pb-16">
                <div className="container mx-auto">
                    <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
                        <Image
                            src="/images/events/nyc.webp"
                            alt="NYC Trek 2024"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Schedule Section */}
            <section className="px-6 lg:px-12 py-16 bg-white">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between mb-12 border-b border-[#082820] pb-4">
                        <h2 className="text-2xl font-bold">Itinerary</h2>
                        <span className="text-xs font-mono uppercase tracking-widest opacity-50">2 Days</span>
                    </div>

                    <div className="space-y-16">
                        {trekData.schedule.map((day, dayIndex) => (
                            <div key={dayIndex}>
                                <h3 className="text-lg font-bold text-[#016F4E] mb-6 border-l-4 border-[#016F4E] pl-4">
                                    {day.day}
                                </h3>
                                <div className="space-y-0">
                                    {day.events.map((event, eventIndex) => (
                                        <div
                                            key={eventIndex}
                                            className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4 py-5 border-b border-[#082820]/10 hover:bg-[#082820]/5 transition-colors px-4 -mx-4"
                                        >
                                            <div className="font-mono text-sm text-[#016F4E]">{event.time}</div>
                                            <div className="font-semibold">{event.title}</div>
                                            <div className="text-sm opacity-60">{event.location}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Firms Section */}
            <section className="px-6 lg:px-12 py-16">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between mb-12 border-b border-[#082820] pb-4">
                        <h2 className="text-2xl font-bold">Firms Visited</h2>
                        <span className="text-xs font-mono uppercase tracking-widest opacity-50">{trekData.firms.length} Partners</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {trekData.firms.map((firm, index) => (
                            <div
                                key={index}
                                className="p-6 border border-[#082820]/10 rounded-xl hover:border-[#016F4E]/30 hover:bg-white transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold group-hover:text-[#016F4E] transition-colors">{firm.name}</h3>
                                        <span className="text-xs font-mono uppercase text-[#016F4E] opacity-70">{firm.category}</span>
                                    </div>
                                    {firm.aum && (
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-[#016F4E]">{firm.aum}</div>
                                            <div className="text-[10px] font-mono uppercase opacity-50">AUM</div>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm opacity-70 leading-relaxed mb-3">{firm.description}</p>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-[#082820]/5 rounded text-xs font-mono">{firm.focus}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NYSE Highlight */}
            <section className="px-6 lg:px-12 py-16 bg-[#082820] text-[#fcf7f0]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-[#01A072] mb-4 block">Highlight</span>
                            <h2 className="text-3xl font-bold mb-4">NYSE Opening Bell</h2>
                            <p className="opacity-70 mb-6">
                                Started Day 1 with an exclusive tour of the New York Stock Exchange and witnessed the iconic Opening Bell ceremony on Wall Street.
                            </p>
                        </div>
                        <div className="flex items-center justify-center lg:justify-end">
                            <Link
                                href="/treks"
                                className="px-8 py-4 border border-[#fcf7f0]/20 rounded-lg hover:bg-[#fcf7f0] hover:text-[#082820] transition-all font-medium"
                            >
                                ← Back to Treks
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
