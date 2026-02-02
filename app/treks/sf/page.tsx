'use client';

import Image from 'next/image';
import Link from 'next/link';

// SF Trek Data - Winter 2025
const trekData = {
    city: 'San Francisco',
    short: 'SF',
    code: 'SFO-25',
    date: 'December 16-18, 2025',
    status: 'Complete',
    hotel: {
        name: 'Stanford Court Hotel',
        address: '905 California St, San Francisco, CA 94108',
        description: 'Perched atop Nob Hill, this elegant, contemporary hotel on the cable-car line is 7 minutes walk from Chinatown and 10 minutes walk from Union Square.'
    },
    schedule: [
        {
            day: 'Tuesday, December 16th',
            events: [
                { time: '1:30 PM', title: 'Crusoe - Finance + Product Session', location: '225 Bush St #15' },
                { time: '2:30 PM', title: 'Tavus - Office Tour + CEO Chat', location: '35 Stillman St' },
                { time: '4:15 PM', title: 'Entrepreneurs First - Investor Chat', location: '501 Folsom St' },
                { time: '5:30 PM', title: 'Group Dinner', location: 'Sushi Sato, 1122 Post St' },
            ]
        },
        {
            day: 'Wednesday, December 17th',
            events: [
                { time: '10:00 AM', title: 'Vista Equity Partners - Office Tour', location: '4 Embarcadero Center, 30th Floor' },
                { time: '11:45 AM', title: 'Sequoia Capital - Partner Chat', location: '298 Alabama Street' },
                { time: '1:00 PM', title: 'Mira - Lunch + Co-Founder Chat', location: '85 5th St Suite A' },
                { time: '2:30 PM', title: 'Golden Gate Bridge / Presidio Explore', location: 'Presidio Park' },
                { time: '4:30 PM', title: 'Delphi - Office Tour + Co-Founder Chat', location: '850 Montgomery' },
            ]
        },
        {
            day: 'Thursday, December 18th',
            events: [
                { time: '9:45 AM', title: 'Transpose & Heavybit - Partner Chats', location: '27 South Park St' },
                { time: '11:30 AM', title: 'Gradient Ventures - Office Tour', location: '560 Davis St #150' },
                { time: '1:30 PM', title: 'Antler - Director Chat', location: '144 Townsend Street, 3rd Floor' },
            ]
        }
    ],
    firms: [
        {
            name: 'Sequoia Capital',
            category: 'Venture Capital',
            description: 'Founded 1972. Backed Apple, Google, YouTube, Instagram, Airbnb, WhatsApp, Zoom, Stripe, Nvidia. One of the most influential VC firms globally, managing tens of billions in capital.',
            aum: '$85B+',
            focus: 'Seed to IPO'
        },
        {
            name: 'Vista Equity Partners',
            category: 'Private Equity',
            description: 'Founded 2000. Exclusively focused on enterprise software, data, and technology-enabled businesses. Known for deep operational infrastructure via Vista Consulting Group.',
            aum: '$100B+',
            focus: 'Enterprise Software'
        },
        {
            name: 'Gradient Ventures',
            category: 'Venture Capital',
            description: 'Founded 2017 (Google VC spinout). Early-stage focus exclusively on AI startups. Offers deep technical mentorship and access to Google engineering resources.',
            aum: 'Undisclosed',
            focus: 'AI / ML'
        },
        {
            name: 'Entrepreneurs First',
            category: 'Talent Investor',
            description: 'Founded 2011, London. Backs individuals pre-team and pre-idea. Produced Tractable, Cleo, Omnipresent. Industrializes founder creation globally.',
            aum: '$500M+',
            focus: 'Pre-Seed'
        },
        {
            name: 'Tavus',
            category: 'AI Startup',
            description: 'Founded 2021. Building real-time multimodal AI humans. Core product: Conversational Video Interface (CVI). Over 2B+ interactive sessions to date. $18M Series A (2024).',
            raised: '$18M',
            focus: 'AI Video'
        },
        {
            name: 'Mira',
            category: 'AI Hardware',
            description: 'AI-powered smart glasses acting as a "second brain." Features: infinite memory, instant answers, proactive intelligence. $6.6M seed led by General Catalyst, Naval Ravikant.',
            raised: '$6.6M',
            focus: 'Wearables'
        },
        {
            name: 'Delphi',
            category: 'AI Startup',
            description: 'Founded 2022. AI-powered "digital minds" that capture how a person thinks, speaks, and reasons. $16M Series A led by Sequoia (2025). Used by creators, coaches, executives.',
            raised: '$16M',
            focus: 'AI Clones'
        },
        {
            name: 'Antler',
            category: 'Venture Builder',
            description: 'Founded 2017 (Singapore). Global Day Zero backer operating 30+ cities. Runs residency programs for co-founder matching. 1,800+ investments to date.',
            aum: '$1B+',
            focus: 'Pre-Seed'
        },
        {
            name: 'Heavybit',
            category: 'Venture Capital',
            description: 'Founded 2013. Specializes in developer-first and infrastructure software. Portfolio: PagerDuty, CircleCI, Netlify, Snyk, LaunchDarkly, Tailscale. Hands-on go-to-market coaching.',
            aum: '$100M+',
            focus: 'DevTools'
        },
        {
            name: 'Transpose',
            category: 'Venture Capital',
            description: 'Founded 2015. Formation-stage firm backing founders and emerging managers from Day 0. 1000+ companies, 80+ unicorns/decacorns in portfolio.',
            focus: 'Formation Stage'
        }
    ]
};

export default function SFTrek() {
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
                            src="/images/events/sf_2025.jpeg"
                            alt="SF Trek 2025"
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
                        <span className="text-xs font-mono uppercase tracking-widest opacity-50">3 Days</span>
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
                                    {(firm.aum || firm.raised) && (
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-[#016F4E]">{firm.aum || firm.raised}</div>
                                            <div className="text-[10px] font-mono uppercase opacity-50">{firm.aum ? 'AUM' : 'Raised'}</div>
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

            {/* Hotel Info */}
            <section className="px-6 lg:px-12 py-16 bg-[#082820] text-[#fcf7f0]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-[#01A072] mb-4 block">Accommodation</span>
                            <h2 className="text-3xl font-bold mb-4">{trekData.hotel.name}</h2>
                            <p className="opacity-70 mb-6">{trekData.hotel.description}</p>
                            <div className="font-mono text-sm opacity-60">{trekData.hotel.address}</div>
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
