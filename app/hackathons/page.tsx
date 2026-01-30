import Image from 'next/image';
import JoinButton from '../components/JoinButton';

const hackathons = [
    {
        name: 'Bevs & Devs',
        tagline: 'Build something cool, meet cool people',
        description: 'Our flagship hackathon bringing together builders, designers, and entrepreneurs for a weekend of creation. Teams pitch to VC judges for prizes.',
        image: '/images/events/bevs-devs-zf.webp',
        stats: [
            { label: 'Participants', value: '100+' },
            { label: 'Projects', value: '25+' },
            { label: 'Prize Pool', value: '$5K+' },
        ],
    },
];

const pastEvents = [
    { name: 'Bevs & Devs Fall 2025', winners: ['Startup Name 1', 'Startup Name 2'] },
    { name: 'Bevs & Devs Spring 2025', winners: ['Startup Name 3'] },
    { name: 'Bevs & Devs Fall 2024', winners: ['Startup Name 4', 'Startup Name 5'] },
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

            {/* Featured Hackathon */}
            {hackathons.map((hackathon) => (
                <section key={hackathon.name} className="pb-24">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Image */}
                            <div className="relative h-[400px] rounded-2xl overflow-hidden">
                                <Image
                                    src={hackathon.image}
                                    alt={hackathon.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <span className="label text-[#016F4E] mb-2 block">Flagship Event</span>
                                <h2 className="text-4xl font-semibold mb-4">{hackathon.name}</h2>
                                <p className="text-lg opacity-70 mb-8">{hackathon.description}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    {hackathon.stats.map((stat) => (
                                        <div key={stat.label} className="text-center p-4 bg-white rounded-xl border border-[#082820]/10">
                                            <div className="text-2xl font-semibold text-[#016F4E]">{stat.value}</div>
                                            <div className="text-xs opacity-60">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* What to expect */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold">What to Expect</h3>
                                    <ul className="space-y-2 text-sm opacity-70">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#016F4E]" />
                                            48 hours of building
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#016F4E]" />
                                            Mentorship from founders & engineers
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#016F4E]" />
                                            Pitch to VC judges
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#016F4E]" />
                                            Cash prizes + follow-on opportunities
                                        </li>
                                    </ul>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pastEvents.map((event) => (
                            <div key={event.name} className="p-6 border border-[#fcf7f0]/10 rounded-xl">
                                <h3 className="font-semibold mb-3">{event.name}</h3>
                                <div className="text-sm opacity-60">
                                    Winners: {event.winners.join(', ')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
