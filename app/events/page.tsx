'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import eventsData from '../../public/data/events.json';
import FirmLogo from '../components/FirmLogo';

interface Event {
  title: string;
  date: string;
  image: string;
  description: string;
  year: string;
  logos?: string[];
}

const treks = [
  {
    city: 'San Francisco',
    slug: 'sf',
    status: 'Dec 2025',
    description: 'Met top VC firms and visited high-growth startups across SF and the Bay Area.',
    image: '/images/events/sf_2025.jpeg',
    firms: ['Sequoia', 'Vista Equity', 'Gradient Ventures', 'Antler', 'Heavybit'],
  },
  {
    city: 'New York City',
    slug: 'nyc',
    status: 'Jan 2025',
    description: 'NYSE Opening Bell, meetings with leading VCs. A deep dive into East Coast fintech and venture.',
    image: '/images/about/nyc.jpg',
    firms: ['Bessemer', 'NEA', 'Insight Partners', 'RRE Ventures', 'Team8'],
  },
];

export default function Events() {
  const events: Event[] = eventsData.events || [];

  const years = [...new Set(events.map(e => e.year))].sort((a, b) => {
    const yearA = parseInt(a.slice(1));
    const yearB = parseInt(b.slice(1));
    if (yearA !== yearB) return yearB - yearA;
    const seasonA = a.charAt(0);
    const seasonB = b.charAt(0);
    if (seasonA === seasonB) return 0;
    return seasonA === 'F' ? -1 : 1;
  });

  const [activeYear, setActiveYear] = useState<string>(years[0] || 'F25');

  const cleanDescription = (html: string) => html.replace(/<[^>]*>/g, '');

  const filteredEvents = events.filter(e => e.year === activeYear);

  const formatYear = (y: string) => {
    const season = y.charAt(0) === 'F' ? 'Fall' : 'Spring';
    const yr = '20' + y.slice(1);
    return `${season} ${yr}`;
  };

  return (
    <main className="w-full min-h-screen bg-[#fcf4e8] text-[#1a1a1a] selection:bg-[#082820] selection:text-[#fcf4e8]">


      {/* ============================================
                THE GAZETTE
                ============================================ */}
      {/* ============================================
                THE GAZETTE
                ============================================ */}
      <div>
        {/* Masthead */}
        <header className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28">
          <div className="border-t border-[#1a1a1a] mb-3" />
          <div className="flex justify-between items-baseline font-body text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 mb-2">
            <span>Vol. XXVI · No. 2</span>
            <span>Austin, Texas</span>
            <span>February 2026</span>
          </div>
          <div className="border-y-[6px] border-[#1a1a1a] py-3 mb-1">
            <h1 className="text-center font-serif font-black text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-[-0.03em]">
              THE TVG GAZETTE
            </h1>
          </div>
          <div className="border-b-[2px] border-[#1a1a1a] mb-1" />
          <div className="text-center font-body text-[10px] uppercase tracking-[0.35em] text-[#1a1a1a]/40 py-2">
            The Official Record of the Texas Venture Group · Events Edition
          </div>
          <div className="border-b border-[#1a1a1a] mb-10" />
        </header>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-32">

          {/* ===== EDITION I — SPEAKER SERIES ===== */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 border-t border-[#1a1a1a]" />
            <span className="font-serif font-black text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40">
              Edition I — Speaker Series
            </span>
            <div className="flex-1 border-t border-[#1a1a1a]" />
          </div>

          <h2 className="font-serif font-black text-[clamp(2.5rem,5vw,5rem)] leading-[0.92] tracking-[-0.02em] mb-4">
            Conversations with the<br />People Building the Future
          </h2>
          <p className="font-body text-lg md:text-xl leading-relaxed italic text-[#1a1a1a]/60 mb-8 max-w-2xl border-b border-[#1a1a1a]/10 pb-8">
            Fireside chats, pitch nights, and panels with founders, investors, and operators redefining venture.
          </p>

          {/* Semester tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 py-2 text-xs font-body uppercase tracking-[0.15em] border transition-all whitespace-nowrap ${activeYear === year
                  ? 'bg-[#1a1a1a] text-[#fcf4e8] border-[#1a1a1a]'
                  : 'border-[#1a1a1a]/20 text-[#1a1a1a]/60 hover:border-[#1a1a1a]/50'
                  }`}
              >
                {formatYear(year)}
              </button>
            ))}
          </div>

          {/* Events — text only, no photos */}
          <div className="grid grid-cols-12 gap-0 mb-16">
            {/* Main column */}
            <div className="col-span-12 lg:col-span-8 border-r-0 lg:border-r border-[#1a1a1a]/15 pr-0 lg:pr-10">
              {/* Lead event */}
              {filteredEvents.slice(0, 1).map((event, i) => (
                <article key={i} className="mb-10 pb-10 border-b border-[#1a1a1a]/10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">{event.date}</span>
                    {event.logos && event.logos.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        {event.logos.map((domain) => (
                          <FirmLogo key={domain} name={domain.split('.')[0]} domain={domain} size={36} className="rounded-full" />
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif font-black text-3xl leading-[1.05] tracking-[-0.01em] mb-4">
                    {event.title}
                  </h3>
                  <p className="font-body text-[15px] leading-[1.9] text-[#1a1a1a]/80">
                    <span className="float-left text-[4.5rem] leading-[0.75] pr-2 pt-1 font-serif font-black text-[#1a1a1a]">
                      {cleanDescription(event.description).charAt(0)}
                    </span>
                    {cleanDescription(event.description).slice(1)}
                  </p>
                </article>
              ))}

              {/* Remaining events — two-column, no images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                {filteredEvents.slice(1).map((event, i) => (
                  <article key={i} className="pb-6 border-b border-[#1a1a1a]/10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-body text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">{event.date}</span>
                      {event.logos && event.logos.length > 0 && (
                        <div className="flex items-center gap-1">
                          {event.logos.map((domain) => (
                            <FirmLogo key={domain} name={domain.split('.')[0]} domain={domain} size={24} className="rounded-full" />
                          ))}
                        </div>
                      )}
                    </div>
                    <h4 className="font-serif font-black text-lg leading-[1.15] mb-2">
                      {event.title}
                    </h4>
                    <p className="font-body text-[13px] leading-[1.8] text-[#1a1a1a]/70 line-clamp-3">
                      {cleanDescription(event.description)}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 pl-0 lg:pl-10 mt-10 lg:mt-0">
              {/* Quick Stats */}
              <div className="border-2 border-[#1a1a1a] p-8 mb-8">
                <h4 className="font-serif font-black text-xl uppercase tracking-wide mb-4 text-center border-b border-[#1a1a1a]/20 pb-3">
                  By the Numbers
                </h4>
                <div className="space-y-4 font-body text-sm">
                  <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                    <span className="text-[#1a1a1a]/60">Total Events</span>
                    <span className="font-black">{events.length}+</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                    <span className="text-[#1a1a1a]/60">Semesters</span>
                    <span className="font-black">{years.length}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                    <span className="text-[#1a1a1a]/60">Cities Visited</span>
                    <span className="font-black">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1a1a1a]/60">VC Firms Hosted</span>
                    <span className="font-black">30+</span>
                  </div>
                </div>
              </div>

              {/* Semester Index */}
              <div className="border-t-2 border-[#1a1a1a] pt-5 mb-8">
                <h5 className="font-serif font-black text-xs uppercase tracking-[0.15em] mb-4">Semester Index</h5>
                <ul className="font-body text-sm space-y-0">
                  {years.map((year) => (
                    <li key={year} className="flex justify-between py-2 border-b border-[#1a1a1a]/10">
                      <button
                        onClick={() => setActiveYear(year)}
                        className={`italic hover:text-[#1a1a1a] transition-colors ${activeYear === year ? 'text-[#1a1a1a] font-bold' : 'text-[#1a1a1a]/60'}`}
                      >
                        {formatYear(year)}
                      </button>
                      <span className="text-[#1a1a1a]/30 tabular-nums">
                        {events.filter(e => e.year === year).length} articles
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hackathons link */}
              <div className="bg-[#1a1a1a]/[0.03] border border-[#1a1a1a]/10 p-6">
                <h5 className="font-serif font-black text-xs uppercase tracking-wide mb-2">See Also</h5>
                <Link href="/hackathons" className="font-body text-sm text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors underline underline-offset-2">
                  TVG Hackathons →
                </Link>
              </div>
            </div>
          </div>

          {/* ===== EDITION II — TREKS ===== */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 border-t border-[#1a1a1a]" />
            <span className="font-serif font-black text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a]/40">
              Edition II — Treks
            </span>
            <div className="flex-1 border-t border-[#1a1a1a]" />
          </div>

          <h2 className="font-serif font-black text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.01em] mb-4">
            On the Road: City Treks
          </h2>
          <p className="font-body text-lg leading-relaxed italic text-[#1a1a1a]/60 mb-10 max-w-2xl border-b border-[#1a1a1a]/10 pb-8">
            Each semester we take members to the country&apos;s startup hubs. Meet investors, tour companies, and see how the ecosystem works firsthand.
          </p>

          <div className="grid grid-cols-12 gap-0 mb-16">
            {treks.map((trek, idx) => (
              <Link
                key={trek.slug}
                href={`/treks/${trek.slug}`}
                className={`col-span-12 lg:col-span-6 group ${idx === 0 ? 'border-r-0 lg:border-r border-[#1a1a1a]/15 pr-0 lg:pr-10 mb-10 lg:mb-0' : 'pl-0 lg:pl-10'}`}
              >
                {/* Trek image */}
                <div className="relative w-full h-[280px] mb-6 overflow-hidden">
                  <Image
                    src={trek.image}
                    alt={trek.city}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-2 block">{trek.status}</span>

                <h3 className="font-serif font-black text-3xl leading-[1.05] tracking-[-0.01em] mb-4 group-hover:text-[#016F4E] transition-colors">
                  {trek.city}
                </h3>

                <p className="font-body text-[14px] leading-[1.85] text-[#1a1a1a]/70 mb-6">
                  {trek.description}
                </p>

                {/* Firms */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {trek.firms.map((firm) => (
                    <span key={firm} className="font-body text-[11px] px-3 py-1 border border-[#1a1a1a]/15 text-[#1a1a1a]/60">
                      {firm}
                    </span>
                  ))}
                </div>

                <span className="font-body text-xs text-[#1a1a1a]/40 italic group-hover:text-[#1a1a1a]/70 transition-colors">
                  Read the full dispatch →
                </span>
              </Link>
            ))}
          </div>

          {/* Colophon */}
          <footer className="mt-24 border-t-[4px] border-[#1a1a1a] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start font-body text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">
              <div>© 2026 Texas Venture Group — All Rights Reserved</div>
              <div className="mt-3 md:mt-0">Published in Austin, TX</div>
              <div className="mt-3 md:mt-0 flex gap-6">
                <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
                <Link href="/members" className="hover:text-[#1a1a1a] transition-colors">Team</Link>
                <Link href="/work-with-us" className="hover:text-[#1a1a1a] transition-colors">Work with Us</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
