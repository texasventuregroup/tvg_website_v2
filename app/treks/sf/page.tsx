'use client';

import Image from 'next/image';
import Link from 'next/link';

const sfTrek = {
    city: 'San Francisco',
    slug: 'sf',
    date: 'Fall 2025',
    description: 'Our flagship west coast trek. Members spent a week visiting top-tier VC firms and high-growth startups across the Bay Area.',
    image: '/images/events/sf_2025.jpeg',
    highlights: [
        'Visited Sequoia Capital at Sand Hill Road',
        'Toured Crusoe\'s AI data centers',
        'Pitch session at Gradient Ventures',
        'Networking with Bay Area founders',
    ],
    schedule: [
        { time: 'Day 1', event: 'Sequoia Capital & entrepreneurs first' },
        { time: 'Day 2', event: 'Vista Equity & Gradient Ventures' },
        { time: 'Day 3', event: 'Crusoe, Tavus, & Mira' },
        { time: 'Day 4', event: 'Alumni Dinner @ Mission District' },
    ],
    firms: [
        'Sequoia', 'Entrepreneurs First', 'Vista Equity', 'Gradient',
        'Antler', 'Heavybit', 'Transpose'
    ]
};

export default function SFTrek() {
    return (
        <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
            {/* Hero */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <Image
                    src={sfTrek.image}
                    alt={sfTrek.city}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16">
                    <div className="container mx-auto">
                        <span className="inline-block px-3 py-1 border border-white/30 rounded-full text-white/80 text-xs font-mono uppercase tracking-wider mb-6 backdrop-blur-md">
                            {sfTrek.date}
                        </span>
                        <h1 className="text-[clamp(4rem,10vw,8rem)] font-bold text-white leading-[0.9] tracking-tighter mb-4">
                            {sfTrek.city}
                        </h1>
                        <p className="text-white/80 text-xl max-w-xl leading-relaxed">
                            {sfTrek.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Main Info */}
                    <div className="lg:col-span-8">
                        <h2 className="text-3xl font-semibold mb-12">Mission Brief</h2>

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                            {sfTrek.highlights.map((item, i) => (
                                <div key={i} className="p-6 border border-[#082820]/10 rounded-lg hover:bg-[#082820]/5 transition-colors">
                                    <span className="block text-[#016F4E] font-mono text-xs mb-2">0{i + 1}</span>
                                    <p className="font-medium text-lg">{item}</p>
                                </div>
                            ))}
                        </div>

                        {/* Itinerary */}
                        <h3 className="text-xl font-semibold mb-6">Itinerary</h3>
                        <div className="border border-[#082820]/10 rounded-xl overflow-hidden">
                            {sfTrek.schedule.map((item, i) => (
                                <div key={i} className="flex border-b border-[#082820]/10 last:border-none">
                                    <div className="w-32 p-4 bg-[#082820]/5 border-r border-[#082820]/10 font-mono text-sm opacity-60">
                                        {item.time}
                                    </div>
                                    <div className="flex-1 p-4 font-medium">
                                        {item.event}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-12">
                        <div>
                            <h3 className="text-sm font-mono uppercase opacity-50 mb-6 border-b border-[#082820]/10 pb-2">
                                Network Stats
                            </h3>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="text-center p-4 bg-[#016F4E]/5 rounded-lg">
                                    <div className="text-3xl font-bold text-[#016F4E]">7</div>
                                    <div className="text-xs opacity-60">Firms Visited</div>
                                </div>
                                <div className="text-center p-4 bg-[#016F4E]/5 rounded-lg">
                                    <div className="text-3xl font-bold text-[#016F4E]">3</div>
                                    <div className="text-xs opacity-60">Startup Tours</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-mono uppercase opacity-50 mb-6 border-b border-[#082820]/10 pb-2">
                                Participating Firms
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {sfTrek.firms.map(firm => (
                                    <span key={firm} className="px-3 py-1.5 border border-[#082820]/20 rounded-md text-sm hover:bg-[#082820] hover:text-[#fcf7f0] transition-colors cursor-default">
                                        {firm}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Link href="/treks" className="block w-full py-4 text-center border border-[#082820]/20 rounded-lg hover:bg-[#082820] hover:text-[#fcf7f0] transition-all">
                            ← Back to All Treks
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
