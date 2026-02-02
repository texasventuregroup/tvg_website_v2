'use client';

import Link from 'next/link';

const stats = [
    { value: '50+', label: 'VC & PE Firms' },
    { value: '100+', label: 'Startups' },
    { value: '200+', label: 'Members' },
];

const services = [
    {
        title: 'Due Diligence',
        description: 'Market research, competitive analysis, and customer discovery.',
        tags: ['VCs', 'PE Firms'],
    },
    {
        title: 'Market Research',
        description: 'Deep dives into emerging sectors and thesis development.',
        tags: ['Strategy', 'Investors'],
    },
    {
        title: 'Sourcing Pipeline',
        description: 'Access to student founders and early-stage deal flow.',
        tags: ['Seed Funds', 'Scouts'],
    },
    {
        title: 'Talent Access',
        description: 'Hire ambitious students for internships or full-time roles.',
        tags: ['Recruiting', 'HR'],
    },
    {
        title: 'Brand & Events',
        description: 'Sponsor our treks, hackathons, or speaker series.',
        tags: ['Marketing', 'Brand'],
    },
];

const partners = [
    'Sequoia Capital', 'a16z', 'Bessemer', '8VC', 'Founders Fund',
    'General Catalyst', 'BoxGroup', 'Thrive Capital', 'Insight Partners',
    'Vista Equity', 'Gradient Ventures', 'Union Square Ventures',
];

export default function WorkWithUs() {
    return (
        <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
            {/* Editorial Hero */}
            <section className="py-24 lg:py-32 px-6 lg:px-12 border-b border-[#082820]/10">
                <div className="max-w-[1400px] mx-auto">
                    <span className="label mb-6 block text-[#016F4E]">Collaboration</span>
                    <h1 className="text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.95] tracking-tight mb-12 max-w-5xl">
                        Partner with the next generation of venture.
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 border-t border-[#082820]/10 pt-12">
                        <p className="text-xl opacity-70 leading-relaxed lg:col-span-2">
                            We collaborate with world-class firms to provide diligence, sourcing, and unrivaled access to top student talent.
                        </p>

                        {/* <div className="flex gap-12">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-3xl font-bold text-[#016F4E] mb-1">{stat.value}</div>
                                    <div className="text-xs font-mono uppercase opacity-60">{stat.label}</div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Services Grid (Technical Specs) */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-16">
                        <h2 className="text-2xl font-semibold">Engagement Models</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {services.map((service) => (
                            <div key={service.title} className="group border-t border-[#082820]/10 pt-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {service.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-mono uppercase bg-[#082820]/5 px-2 py-1 rounded-sm text-[#082820]/60">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#016F4E] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-base opacity-70 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Ecosystem (Static Grid) */}
            <section className="py-24 bg-[#082820] text-[#fcf7f0] px-6 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="label text-[#01A072] mb-4 block">Ecosystem</span>
                            <h2 className="text-3xl font-semibold">Trusted Partners</h2>
                        </div>
                        <p className="text-sm opacity-50 max-w-xs text-right">
                            Firms we've worked with on diligence, sourcing, and talent pipelines.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-[#fcf7f0]/10">
                        {partners.map((partner) => (
                            <div
                                key={partner}
                                className="aspect-[3/1] flex items-center justify-center p-6 border-r border-b border-[#fcf7f0]/10 hover:bg-[#fcf7f0]/5 transition-colors cursor-default group"
                            >
                                <span className="text-lg md:text-xl font-medium opacity-40 group-hover:opacity-100 transition-opacity text-center">
                                    {partner}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 lg:px-12 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-semibold mb-8">See a work sample?</h2>
                    <a
                        href="mailto:partnerships@texasventuregroup.com"
                        className="inline-flex items-center gap-3 bg-[#016F4E] text-[#fcf7f0] px-8 py-4 text-lg font-medium rounded-full hover:bg-[#015a3e] transition-colors"
                    >
                        Get in Touch
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>
        </main>
    );
}
