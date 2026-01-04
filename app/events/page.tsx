'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import eventsData from '../../public/data/events.json';

interface Event {
  title: string;
  date: string;
  image: string;
  description: string;
  year: string;
}

interface FilterOption {
  label: string;
  value: string;
}

function EventCard({ event }: { event: Event }) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [event.description]);

  return (
    <div className="event-card">
      {event.image ? (
        <Image
          src={event.image}
          alt={event.title}
          width={400}
          height={250}
          className="event-card__image"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <div className="event-card__image-placeholder" />
      )}
      <div className="event-card__content">
        <div className="event-card__date">{event.date}</div>
        <h3 className="event-card__title">{event.title}</h3>
        <p
          ref={descriptionRef}
          className={`event-card__description ${expanded ? 'expanded' : ''}`}
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
        {isTruncated && (
          <button
            className="event-card__toggle"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '- See Less' : '+ See More'}
          </button>
        )}
      </div>
    </div>
  );
}

const events: Event[] = eventsData.events;
const filterOptions: FilterOption[] = eventsData.filterOptions;

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(event => event.year === activeFilter);

  return (
    <>
      <section className="hero hero--compact">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">Events & Activities</h1>
            <p className="hero__text">
              Join us for exciting events throughout the year, from biweekly coworking sessions to
              career-building opportunities and speaker events.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="events-filter">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={`filter-button ${activeFilter === option.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="events-grid">
            {filteredEvents.map((event, index) => (
              <EventCard key={`${event.title}-${index}`} event={event} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
