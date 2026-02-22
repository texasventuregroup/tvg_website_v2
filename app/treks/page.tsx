import Link from 'next/link';
import Image from 'next/image';

const treks = [
    {
        city: 'San Francisco',
        slug: 'sf',
        status: 'Dec 2025',
        description: 'Meet top VCs and high-growth AI startups across SF and the Bay Area.',
        image: '/images/events/sf_2025.jpeg',
        video: '/videos/speedway.mp4',
        firms: ['Sequoia', 'Vista Equity', 'Gradient Ventures', 'Antler', 'Heavybit'],
        companies: ['Tavus', 'Mira', 'Delphi'],
    },
    {
        city: 'New York City',
        slug: 'nyc',
        status: 'Jan 2024',
        description: 'NYSE Opening Bell, Wall Street VCs, and East Coast fintech leaders.',
        image: '/images/about/nyc.jpg',
        video: '/videos/fintech.mp4',
        firms: ['Bessemer', 'NEA', 'Insight Partners', 'RRE Ventures', 'Team8'],
        companies: [],
    },
];

export default function Treks() {
    return (
        <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
            {/* Hero */}
            <section className="py-16 lg:py-24 container mx-auto px-6">
                <span className="label mb-4 block">Experiences</span>
                <h1 className="text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight mb-6">Treks</h1>
                <p className="text-lg opacity-70 max-w-xl leading-relaxed">
                    Each semester we take members to the country&apos;s startup hubs. Meet investors, tour companies, and see how the ecosystem works firsthand.
                </p>
            </section>

            {/* Trek Cards */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6">
                    <div className="space-y-12">
                        {treks.map((trek, idx) => (
                            <Link
                                key={trek.slug}
                                href={`/treks/${trek.slug}`}
                                className={`group flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 rounded-2xl overflow-hidden bg-white border border-[#082820]/5 hover:shadow-xl transition-all duration-500`}
                            >
                                {/* Image side */}
                                <div className="relative lg:w-3/5 h-[300px] lg:h-[450px] overflow-hidden">
                                    <Image
                                        src={trek.image}
                                        alt={trek.city}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content side */}
                                <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="label">Trek</span>
                                        <span className="text-xs font-mono opacity-40">{trek.status}</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-[#016F4E] transition-colors">{trek.city}</h2>
                                    <p className="text-base opacity-60 mb-8 leading-relaxed">{trek.description}</p>

                                    {/* Firms preview */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {trek.firms.map((firm) => (
                                            <span key={firm} className="text-xs px-3 py-1.5 bg-[#082820]/5 rounded-full font-medium">
                                                {firm}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex items-center gap-2 text-sm font-bold text-[#016F4E] group-hover:gap-4 transition-all">
                                        View Full Trek
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
