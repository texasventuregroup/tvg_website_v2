import Image from 'next/image';
import JoinButton from '../components/JoinButton';
import Link from 'next/link';

interface Hackathon {
    name: string;
    tagline: string;
    description: string;
    image: string;
    status: 'upcoming' | 'recurring' | 'previous';
    partner?: string;
    date?: string;
    time?: string;
    location?: string;
    judges?: { name: string; title: string }[];
    stats?: { label: string; value: string }[];
    sponsors?: string[];
}

interface PastEvent {
    name: string;
    date: string;
    winners?: string[];
    sponsors?: string[];
    stats?: string;
}

const hackathons: Hackathon[] = [
    {
        name: "Let's Build",
        tagline: "Startups × Venture × Students",
        partner: 'Transpose Platform & Y Combinator',
        date: 'Friday, February 20th, 2026',
        time: '5:00 PM – 10:30 PM',
        location: 'UT Austin (Register for location)',
        description: 'Our Spring 2026 hackathon in partnership with Transpose Platform and Y Combinator. Build something new, pitch to founders, and compete for prizes.',
        image: '/images/events/bevs-devs-zf.webp',
        judges: [
            { name: 'Shapol M.', title: 'CEO, Entangl (YC S24)' },
            { name: 'Mason F.', title: 'Chief of Staff, Interface' },
            { name: 'Armel T.', title: 'CEO, Miru (YC S24)' },
            { name: 'Varun T.', title: 'CEO, Waypoint (YC W25)' },
        ],
        status: 'upcoming' as const,
    },
    {
        name: 'TVG Vibeathon',
        tagline: 'Build & Vibes',
        date: 'October 4-5th, 2025',
        time: 'Weekend',
        location: 'Austin, TX',
        description: 'A weekend of building and vibes. Sponsored by Flora and Framer.',
        image: '/images/events/american_dynamism.webp',
        sponsors: ['Flora', 'Anthropic', 'Framer'],
        status: 'previous' as const,
    },
];

const pastEvents: PastEvent[] = [
    { name: 'Bevs & Devs', date: 'Recurring Flagship', stats: '100+ Builders' },
    { name: 'Bevs & Devs Fall 2025', date: 'Fall 2025' },
    { name: 'Bevs & Devs Spring 2025', date: 'Spring 2025' },
    { name: 'Bevs & Devs Fall 2024', date: 'Fall 2024' },
];

export default function Hackathons() {
    return (
        <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
            {/* Hero */}
            <section className="py-16 lg:py-24 container mx-auto px-6">
                <span className="label mb-4 block">Build</span>
                <h1 className="text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight mb-6">Hackathons</h1>
                <p className="text-lg opacity-70 max-w-xl mb-8">
                    Weekend events where builders come together to create, compete, and connect. Pitch to real investors and win prizes.
                </p>
                <JoinButton className="btn-primary">
                    Get Notified for Next Event
                </JoinButton>
            </section>

            {/* Featured Hackathons (Upcoming & Previous Showcase) */}
            {hackathons.filter(h => h.status === 'upcoming' || h.status === 'previous').map((hackathon) => (
                <section key={hackathon.name} className="pb-24">
                    <div className="container mx-auto px-6">
                        <div className="bg-[#082820] text-[#fcf7f0] rounded-2xl p-8 lg:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${hackathon.status === 'upcoming'
                                                ? 'bg-[#01A072] text-[#fcf7f0]'
                                                : 'bg-[#fcf7f0]/20 text-[#fcf7f0]'
                                            }`}>
                                            {hackathon.status === 'upcoming' ? 'Upcoming' : 'Previous'}
                                        </span>
                                        {hackathon.partner && (
                                            <span className="text-xs font-mono opacity-60">
                                                with {hackathon.partner}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">{hackathon.name}</h2>
                                    <p className="text-lg opacity-70 mb-6">{hackathon.tagline}</p>
                                    <p className="opacity-70 mb-8">{hackathon.description}</p>

                                    {/* Event Details */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                        <div className="p-4 bg-[#fcf7f0]/10 rounded-lg">
                                            <div className="text-xs font-mono uppercase opacity-60 mb-1">Date</div>
                                            <div className="font-semibold">{hackathon.date}</div>
                                        </div>
                                        <div className="p-4 bg-[#fcf7f0]/10 rounded-lg">
                                            <div className="text-xs font-mono uppercase opacity-60 mb-1">Time</div>
                                            <div className="font-semibold">{hackathon.time}</div>
                                        </div>
                                        <div className="p-4 bg-[#fcf7f0]/10 rounded-lg">
                                            <div className="text-xs font-mono uppercase opacity-60 mb-1">Location</div>
                                            <div className="font-semibold">{hackathon.location}</div>
                                        </div>
                                    </div>

                                    {hackathon.status === 'upcoming' && (
                                        <JoinButton className="btn-primary bg-[#01A072] hover:bg-[#016F4E]">
                                            Register Now
                                        </JoinButton>
                                    )}
                                </div>

                                {/* Sidebar: Judges or Sponsors */}
                                <div>
                                    {hackathon.judges ? (
                                        <>
                                            <h3 className="font-semibold text-lg mb-6 border-b border-[#fcf7f0]/20 pb-4">Judges</h3>
                                            <div className="space-y-4">
                                                {hackathon.judges.map((judge) => (
                                                    <div key={judge.name} className="p-4 border border-[#fcf7f0]/10 rounded-lg hover:border-[#01A072]/50 transition-colors">
                                                        <div className="font-semibold">{judge.name}</div>
                                                        <div className="text-sm opacity-60">{judge.title}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : hackathon.sponsors ? (
                                        <>
                                            <h3 className="font-semibold text-lg mb-6 border-b border-[#fcf7f0]/20 pb-4">Sponsors</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {hackathon.sponsors.map((sponsor) => (
                                                    <span key={sponsor} className="px-4 py-3 bg-[#fcf7f0] text-[#082820] font-bold rounded-lg text-lg">
                                                        {sponsor}
                                                    </span>
                                                ))}
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Past Events */}
            <section className="py-16 bg-[#082820] text-[#fcf7f0]">
                <div className="container mx-auto px-6">
                    <span className="label text-[#01A072] mb-4 block">History</span>
                    <h2 className="text-3xl font-semibold mb-8">Past Hackathons</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pastEvents.map((event) => (
                            <div key={event.name} className="p-6 border border-[#fcf7f0]/10 rounded-xl hover:border-[#01A072]/30 transition-colors">
                                <h3 className="font-semibold mb-2">{event.name}</h3>
                                <div className="text-sm opacity-60 mb-3">{event.date}</div>
                                {event.sponsors && (
                                    <div className="flex flex-wrap gap-2">
                                        {event.sponsors.map((sponsor) => (
                                            <span key={sponsor} className="text-xs px-2 py-1 bg-[#fcf7f0]/10 rounded">
                                                {sponsor}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
