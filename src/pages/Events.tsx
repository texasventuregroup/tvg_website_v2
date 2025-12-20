import { useState } from 'react';

interface Event {
  title: string;
  date: string;
  image: string;
  description: string;
  year: string;
}

const events: Event[] = [
  // Spring 2025 Events
  { title: 'TVG x BuildGroup', date: 'Spring 2025', image: '/images/events/buildgroup.jpeg', description: 'Fireside chat with Jim Curry, co-founder of BuildGroup, who brought a powerhouse perspective on long-term growth and investing with purpose.', year: 'S25' },
  { title: 'TVG x Saga Ventures', date: 'Spring 2025', image: '/images/events/saga-ventures.jpeg', description: 'Fireside chat with Max Altman, co-founder of Saga Ventures, who discussed the nature of VC in the Bay Area and his passion for AI, fintech, and manufacturing.', year: 'S25' },
  { title: 'TVG x Earl Grey Capital', date: 'Spring 2025', image: '/images/events/earl-grey-capital.jpeg', description: 'Fireside chat with Amit Vasudev, co-founder of Earl Grey Capital, who shared incredible insights on early-stage tech investing and his journey from starting Clearbit to his own VC firm.', year: 'S25' },
  { title: 'TVG x USIT x Tacora Capital', date: 'Spring 2025', image: '/images/events/tacora-capital.jpeg', description: 'With USIT, hosted fireside chat with Keri Findley, founder of Tacora Capital, first female partner at Third Point LLC, and Columbia University graduate, who discussed asset-based lending for VC-backed companies and her journey as a trailblazing woman in finance.', year: 'S25' },
  { title: 'TVG x Capital Creek Partners', date: 'Spring 2025', image: '/images/events/capital-creek.jpeg', description: "Fireside chat with Jordyn Gauntt, senior associate at Capital Creek Partners, mentor for Girls Who Invest, and advisor for UT Austin's MSF program.", year: 'S25' },
  { title: 'TVG x LiveOak Ventures', date: 'Spring 2025', image: '/images/events/liveoak.jpeg', description: 'Fireside chat with Venu Shamapant, co-founder of LiveOak Ventures with $500M+ AUM, who reflected on his early years in VC and the Austin startup ecosystem', year: 'S25' },
  { title: 'TVG x S3 Ventures', date: 'Spring 2025', image: '/images/events/s3-ventures.jpg', description: 'Fireside chat with Brian Smith, founder of S3 Ventures with over $900M AUM, who shared insights from his 18+ years of venture experience.', year: 'S25' },
  { title: 'TVG x Kamerra', date: 'Spring 2025', image: '/images/events/kamerra.jpg', description: 'Fireside chat with Gautam Shah, partner at Kamerra, who discussed digital transformation investments and his experience in finance and strategy.', year: 'S25' },
  { title: 'TVG x Energy Transition Ventures', date: 'Spring 2025', image: '/images/events/etv.jpg', description: 'Fireside chat with Craig Lawrence, founder of Energy Transition Ventures, who delved into cleantech investing and energy transition.', year: 'S25' },
  { title: 'TVG x Untitled Capital', date: 'Spring 2025', image: '/images/events/untitled-capital.jpg', description: 'Fireside chat with Roger Dickey, Managing Partner at Untitled Capital, who discussed his experience investing in 120+ startups and founding successful companies.', year: 'S25' },
  { title: 'TVG x TUIT x Grafton Street Partners', date: 'Spring 2025', image: '/images/events/grafton-street.jpg', description: 'Co-hosted Stephen Santrach with TUIT, co-founder of Grafton Street Partners, who shared insights from managing a $500M+ investment fund.', year: 'S25' },
  { title: 'TVG x NVIDIA', date: 'Spring 2025', image: '/images/events/nvidia.jpg', description: 'Fireside chat with Anish Maddipoti, who shared his journey from college startup founder to product manager at NVIDIA working on AI developer tools.', year: 'S25' },
  { title: 'TVG x Velo CFO', date: 'Spring 2025', image: '/images/events/velo-cfo.jpg', description: 'Fireside chat with Vibhav Joopelli, UT Austin alum and founder of Velo CFO, who discussed outsourced CFO services for VC-backed startups.', year: 'S25' },
  { title: 'TVG Bevs & Devs x Z Fellows', date: 'Spring 2025', image: '/images/events/bevs-devs-zf.jpg', description: 'Networking event with students from TVG Bevs & Devs and Z Fellows.', year: 'S25' },
  { title: 'Genesis x TVG Student Entrepreneurship Mixer', date: 'Spring 2025', image: '/images/events/mixer-tvg-genesis.avif', description: 'Networking event with students from Genesis and TVG.', year: 'S25' },
  { title: 'TVG x New York Venture Capital', date: 'Spring 2025', image: '/images/events/nyc.jpg', description: 'Visiting top VC firms in New York City.', year: 'S25' },
  // Fall 2024 Events
  { title: 'Base Power Company: Growth in Energy', date: 'Fall 2024', image: '/images/events/base.jpeg', description: 'Talk + Q&A with Cole Jones, Head of Growth at Base Power Company', year: 'F24' },
  { title: 'Saronic / 8VC Fireside Chat', date: 'Fall 2024', image: '/images/events/saronic-8vc.jpeg', description: 'Fireside chat with Alex Moore, Partner at 8VC, and Vib Altekar, Head of Software at Saronic.', year: 'F24' },
  { title: 'Pipedream Labs: Innovation in Logistics', date: 'Fall 2024', image: '/images/events/pipedream.jpeg', description: 'Talk + Q&A with Canon Reeves, CTO of Pipedream Labs.', year: 'F24' },
  { title: 'TVG x Genesis x Momentum', date: 'Fall 2024', image: '/images/events/efpc.jpg', description: 'Entrepreneur First Pitch Competition - Showcasing the next generation of student founders.', year: 'F24' },
  // Spring 2024 Events
  { title: 'Lazard: Venture & Growth Banking', date: 'Spring 2024', image: '/images/events/lazard.jpg', description: 'Talk + Q&A from the Venture & Growth Banking team at Lazard.', year: 'S24' },
  { title: 'BMW iVentures: Financial Modeling', date: 'Spring 2024', image: '/images/events/bmw.jpg', description: 'Financial modeling workshop with Scott Walbrun, Principal at BMW iVentures', year: 'S24' },
  { title: 'Crypto Panel', date: 'Spring 2024', image: '/images/events/crypto.jpeg', description: 'Expert panel discussion on the future of cryptocurrency and blockchain technology.', year: 'S24' },
];

const filterOptions = [
  { label: 'All Events', value: 'all' },
  { label: 'Spring 2025', value: 'S25' },
  { label: 'Fall 2024', value: 'F24' },
  { label: 'Spring 2024', value: 'S24' },
];

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(event => event.year === activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__content" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xl)' }}>
            <div className="hero__text-content">
              <h1 className="hero__title">Events & Activities</h1>
              <p className="hero__text">
                Join us for exciting events throughout the year, from biweekly coworking sessions to
                career-building opportunities and speaker events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
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
              <div key={`${event.title}-${index}`} className="event-card">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-card__image"
                  loading="lazy"
                />
                <div className="event-card__content">
                  <div className="event-card__date">{event.date}</div>
                  <h3 className="event-card__title">{event.title}</h3>
                  <p className="event-card__description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
