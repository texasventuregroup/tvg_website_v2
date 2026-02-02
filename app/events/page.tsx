'use client';

import { useState } from 'react';
import eventsData from '../../public/data/events.json';

interface Event {
  title: string;
  date: string;
  image: string;
  description: string;
  year: string;
}

export default function Events() {
  const events: Event[] = eventsData.events || [];
  const years = [...new Set(events.map(e => e.year))].sort((a, b) => {
    // Sort logic: Year descending, then Season (Fall > Spring)
    const yearA = parseInt(a.slice(1));
    const yearB = parseInt(b.slice(1));
    if (yearA !== yearB) return yearB - yearA; // Newest year first

    // If years equal, Fall (F) comes before Spring (S) for reverse chronological
    const seasonA = a.charAt(0);
    const seasonB = b.charAt(0);
    if (seasonA === seasonB) return 0;
    return seasonA === 'F' ? -1 : 1; // F comes before S
  });
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  // Group events by year
  const groupedByYear = years.reduce((acc, year) => {
    acc[year] = events.filter(e => e.year === year);
    return acc;
  }, {} as Record<string, Event[]>);

  const cleanDescription = (html: string) => html.replace(/<[^>]*>/g, '');

  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
      {/* Hero */}
      <section className="py-12 lg:py-16 container mx-auto px-6">
        <span className="label mb-4 block">Community</span>
        <h1 className="text-4xl lg:text-5xl font-semibold leading-[0.95] tracking-tight mb-4">Events</h1>
        <p className="text-lg opacity-60 max-w-xl">
          Speaker sessions, pitch nights, and conversations with the people building the future.
        </p>
      </section>

      {/* Timeline */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          {/* Year tabs */}
          <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
            {years.map(year => (
              <a
                key={year}
                href={`#year-${year}`}
                className="px-4 py-2 text-sm font-medium rounded-full border border-[#082820]/20 hover:bg-[#082820] hover:text-[#fcf7f0] hover:border-[#082820] transition-all whitespace-nowrap"
              >
                {year}
              </a>
            ))}
          </div>

          {/* Timeline track */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#082820]/20 md:-translate-x-px" />

            {years.map((year) => {
              const yearEvents = groupedByYear[year] || [];

              return (
                <div key={year} id={`year-${year}`} className="relative mb-16 last:mb-0">
                  {/* Year marker */}
                  <div className="relative flex items-center mb-8">
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#016F4E] border-4 border-[#fcf7f0] -translate-x-1/2 z-10" />
                    <div className="ml-12 md:ml-0 md:absolute md:left-1/2 md:translate-x-6 bg-[#016F4E] text-[#fcf7f0] px-4 py-2 rounded-lg text-lg font-bold">
                      {year}
                    </div>
                  </div>

                  {/* Events */}
                  <div className="space-y-6">
                    {yearEvents.map((event, index) => {
                      const eventKey = `${year}-${index}`;
                      const isExpanded = expandedEvent === eventKey;
                      const isLeft = index % 2 === 0;

                      return (
                        <div
                          key={eventKey}
                          className={`relative flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                        >
                          {/* Connector dot */}
                          <div className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full bg-[#082820]/30 border-2 border-[#fcf7f0] -translate-x-1/2 z-10" />

                          {/* Connector line */}
                          <div className={`hidden md:block absolute top-7 h-px bg-[#082820]/20 w-[calc(50%-2rem)] ${isLeft ? 'left-[calc(50%+0.5rem)]' : 'right-[calc(50%+0.5rem)]'
                            }`} style={{ width: 'calc(50% - 4rem)', left: isLeft ? 'calc(50% + 0.5rem)' : 'auto', right: isLeft ? 'auto' : 'calc(50% + 0.5rem)' }} />

                          {/* Card */}
                          <div
                            onClick={() => setExpandedEvent(isExpanded ? null : eventKey)}
                            className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] bg-white rounded-xl border transition-all cursor-pointer group ${isExpanded
                              ? 'border-[#016F4E] shadow-lg'
                              : 'border-[#082820]/10 hover:border-[#016F4E]/50 hover:shadow-md'
                              }`}
                          >
                            <div className="p-5">
                              {/* Date badge */}
                              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#016F4E] bg-[#016F4E]/10 px-3 py-1 rounded-full mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#016F4E]" />
                                {event.date}
                              </span>

                              {/* Title */}
                              <h3 className={`font-semibold mb-2 group-hover:text-[#016F4E] transition-colors ${isExpanded ? 'text-lg text-[#016F4E]' : 'text-base'
                                }`}>
                                {event.title}
                              </h3>

                              {/* Description */}
                              <p className={`text-sm opacity-60 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'
                                }`}>
                                {cleanDescription(event.description)}
                              </p>

                              {/* Expand indicator */}
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-[#016F4E]">
                                  {isExpanded ? '← Collapse' : 'Read more →'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* End marker */}
            <div className="relative flex items-center">
              <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-[#082820]/10 border-4 border-[#fcf7f0] -translate-x-1/2 z-10 flex items-center justify-center">
                <span className="text-[8px]">✓</span>
              </div>
              <div className="ml-12 md:ml-0 md:absolute md:left-1/2 md:translate-x-6 text-sm opacity-40">
                The beginning...
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
