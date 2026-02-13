'use client';

import Link from 'next/link';

const services = [
    {
        number: '01',
        title: 'Market Mapping',
        description: 'Comprehensive landscape analysis to identify key players, emerging trends, and white space opportunities in target sectors.',
    },
    {
        number: '02',
        title: 'Valuation Analysis',
        description: 'Rigorous financial modeling, comparable company analysis, and cap table scenarios to support pricing decisions.',
    },
    {
        number: '03',
        title: 'Due Diligence',
        description: 'Deep-dive investigation into business models, competitive moats, risks, and operational viability of potential investments.',
    },
    {
        number: '04',
        title: 'Tech Projects',
        description: 'Custom software prototyping, MVP development, automation, and technical feasibility assessments for portfolio companies.',
    },
    {
        number: '05',
        title: 'Thesis Development',
        description: 'Original research and data synthesis to help firms develop conviction in new markets or technologies.',
    },
    {
        number: '06',
        title: 'Internal Tooling',
        description: 'Automation scripts, data pipelines, and custom dashboarding to streamline internal VC operations.',
    },
];

export default function WorkWithUs() {
    return (
        <main className="w-full min-h-screen bg-[#fcf7f0] text-[#082820]">



            {/* Thesis */}
            {/* Thesis */}
            <section className="bg-[#fcf7f0] text-[#082820] pt-40 pb-24 md:pb-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#01A072] opacity-[0.05] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight mb-16 text-[#082820]">
                        Work With Us
                    </h1>
                    {/* Stacked prose with larger text */}
                    {/* Stacked prose with larger text */}
                    <div className="space-y-12 max-w-3xl">
                        <p className="text-2xl leading-relaxed text-[#082820]/80 font-light">
                            Texas Venture Group represents a paradigm shift in how institutional investors leverage academic talent. We bridge the gap between campus talent and real-world applications. 
                        </p>
                        <p className="text-2xl leading-relaxed text-[#082820]/80 font-light">
                            Our engagement models are designed for flexibility and depth. Whether it&apos;s mapping an entirely new vertical or developing custom internal tooling, our teams integrate seamlessly with your existing workflows. We&apos;ve built lasting relationships with firms who return semester after semester.
                        </p>
                    </div>
                </div>
            </section>

            {/* How We Work — Frontier Grid */}
            <section className="border-t border-[#082820]/10 py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-[#082820]">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">How We Work</h2>
                            <p className="font-mono text-sm text-[#082820]/40 uppercase tracking-widest">Capabilities &amp; Services</p>
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="text-sm text-[#082820]/50 max-w-xs">
                                Direct engagement with top university talent for specialized venture capital operations.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#082820]">
                        {services.map((svc) => (
                            <div
                                key={svc.number}
                                className="border-r border-b border-[#082820] p-8 md:p-12 group relative overflow-hidden transition-all duration-300 hover:bg-white hover:shadow-[inset_0_0_0_1px_#01A072]"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-12 h-12 bg-[#01A072]/10 rounded-lg flex items-center justify-center text-[#01A072] group-hover:bg-[#01A072] group-hover:text-white transition-colors duration-300">
                                        <span className="font-mono font-bold text-lg">{svc.number}</span>
                                    </div>
                                    <span className="font-mono text-2xl font-bold text-[#082820]/10 group-hover:text-[#01A072]/30 transition-colors">
                                        {svc.number}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform">
                                    {svc.title}
                                </h3>
                                <p className="text-[#082820]/60 leading-relaxed group-hover:text-[#082820] transition-colors">
                                    {svc.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-[#082820] text-[#fcf7f0] rounded-2xl p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#01A072] opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#01A072] opacity-10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to accelerate your firm?</h2>
                                <p className="text-[#fcf7f0]/60 text-lg mb-8">
                                    Join the growing list of venture firms leveraging TVG&apos;s top-tier student talent for critical operations.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="mailto:partnerships@texasventuregroup.com"
                                        className="bg-[#fcf7f0] text-[#082820] px-8 py-3 rounded-full font-semibold hover:bg-[#01A072] hover:text-white transition-colors text-center"
                                    >
                                        Get in Touch
                                    </a>
                                    <Link
                                        href="/events"
                                        className="border border-[#fcf7f0]/30 text-[#fcf7f0] px-8 py-3 rounded-full font-semibold hover:border-[#01A072] hover:text-[#01A072] transition-colors text-center"
                                    >
                                        View Events
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#082820]/10 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#082820]/40 font-mono">
                    <p>© 2026 Texas Venture Group. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/" className="hover:text-[#082820] transition-colors">Home</Link>
                        <Link href="/members" className="hover:text-[#082820] transition-colors">Team</Link>
                        <Link href="/events" className="hover:text-[#082820] transition-colors">Events</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
