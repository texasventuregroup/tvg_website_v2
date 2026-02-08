'use client';

import Link from 'next/link';
import ProjectNetwork from '../components/ProjectNetwork';
import PartnerMap from '../components/PartnerMap';

export default function WorkWithUs() {
    return (
        <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
            {/* Hero Section */}
            <section className="py-24 lg:py-32 px-6 lg:px-12 border-b border-[#082820]/10">
                <div className="max-w-screen-xl mx-auto">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#01A072] mb-6 block">
                        Partnerships
                    </span>
                    <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.95] tracking-tighter mb-12 max-w-4xl">
                        Collaborate on high-impact projects.
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-12 lg:items-end">
                        <div className="lg:w-2/3">
                            <p className="text-xl lg:text-2xl opacity-70 leading-relaxed max-w-2xl mb-8">
                                Partner with TVG to access student-driven research, diligence, and innovative tooling. We work alongside firms to tackle real investment challenges.
                            </p>
                        </div>

                        <div>
                            <a href="mailto:partnerships@texasventuregroup.com" className="inline-block px-8 py-4 bg-[#082820] text-[#fcf7f0] rounded-full font-bold hover:bg-[#016F4E] transition-all">
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Project Network */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-screen-xl mx-auto">
                    <div className="mb-16">
                        <span className="label block mb-4">Engagement Models</span>
                        <h2 className="text-4xl font-bold">How We Work</h2>
                    </div>

                    <ProjectNetwork />
                </div>
            </section>

            {/* Partner Map */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
                        <div>
                            <span className="label text-[#01A072] mb-4 block">Ecosystem</span>
                            <h2 className="text-3xl font-semibold text-[#082820]">Partner Network</h2>
                        </div>
                        <p className="text-sm text-[#082820]/50 max-w-md md:text-right">
                            We work with leading venture firms and startups across the country
                        </p>
                    </div>

                    <PartnerMap />
                </div>
            </section>
        </main>
    );
}
