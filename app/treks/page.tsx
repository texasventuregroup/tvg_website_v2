import Link from 'next/link';
import Image from 'next/image';

const treks = [
    {
        city: 'San Francisco',
        slug: 'sf',
        description: 'Visit top VC firms and high-growth startups in the Bay Area.',
        image: '/images/events/sf_2025.jpeg',
        firms: ['Sequoia', 'Entrepreneurs First', 'Vista', 'Gradient Ventures', 'Antler'],
        companies: ['Crusoe', 'Tavus', 'Mira'],
    },
    {
        city: 'New York City',
        slug: 'nyc',
        description: 'Explore the East Coast startup ecosystem and meet leaders in fintech, media, and enterprise.',
        image: '/images/events/nyc.webp',
        firms: ['Union Square Ventures', 'Thrive Capital', 'Insight Partners'],
        companies: ['Ramp', 'Notion'],
    },
];

export default function Treks() {
    return (
        <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
            {/* Hero */}
            <section className="py-16 lg:py-24 container mx-auto px-6">
                <span className="label mb-4 block">Experiences</span>
                <h1 className="text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight mb-6">Treks</h1>
                <p className="text-lg opacity-70 max-w-xl">
                    Each semester we take members to the country's startup hubs. Meet investors, tour companies, and see how the ecosystem works firsthand.
                </p>
            </section>

            {/* Trek Cards */}
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {treks.map((trek) => (
                            <Link
                                key={trek.slug}
                                href={`/treks/${trek.slug}`}
                                className="group relative h-[400px] rounded-2xl overflow-hidden"
                            >
                                {/* Background Image */}
                                <Image
                                    src={trek.image}
                                    alt={trek.city}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#082820] via-[#082820]/50 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-[#fcf7f0]">
                                    <span className="label text-[#01A072] mb-2 block">Trek</span>
                                    <h2 className="text-3xl font-semibold mb-2">{trek.city}</h2>
                                    <p className="text-sm opacity-70 mb-4 line-clamp-2">{trek.description}</p>

                                    {/* Firms preview */}
                                    <div className="flex flex-wrap gap-2">
                                        {trek.firms.slice(0, 3).map((firm) => (
                                            <span key={firm} className="text-xs px-3 py-1 bg-[#fcf7f0]/10 rounded-full">
                                                {firm}
                                            </span>
                                        ))}
                                        {trek.firms.length > 3 && (
                                            <span className="text-xs px-3 py-1 bg-[#fcf7f0]/10 rounded-full">
                                                +{trek.firms.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Arrow */}
                                    <div className="mt-4 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                                        View Trek
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
