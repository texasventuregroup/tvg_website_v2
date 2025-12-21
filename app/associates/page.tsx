import Image from 'next/image';

const clients = [
  {
    name: 'Great Circle Ventures',
    url: 'http://usesteer.io',
    tag: 'Due-diligence & Market Research',
    description: 'Early-stage investment firm focused on the evolution of food and consumer health.',
  },
  {
    name: 'Steer',
    url: 'http://usesteer.io',
    tag: 'Software Development',
    description: 'First affiliate marketing software built for consumer service brands.',
  },
  {
    name: 'Mainshares',
    url: 'http://mainshares.com',
    tag: 'Due-diligence & Market Research',
    description: 'Austin-based, 8VC-backed startup helping future owner-operators acquire and run small businesses.',
  },
  {
    name: 'BoxGroup',
    url: 'http://boxgroup.com',
    tag: 'Internal Tooling',
    description: 'NYC-based VC partnering at the earliest stages with companies like Ramp, Clay, and Cursor.',
  },
  {
    name: 'Sorenson Capital',
    url: 'http://sorensoncapital.com',
    tag: 'Market Research',
    description: 'Utah-based VC investing in product-oriented B2B software companies across multiple stages.',
  },
  {
    name: 'Gothams',
    url: 'http://gothams.com',
    tag: 'Strategic Consulting',
    description: 'Austin-based firm designed to address complex crises through rapid deployment.',
  },
  {
    name: 'Harvest Growth Capital',
    url: 'http://harvestgrowthcapital.com',
    tag: 'Late-stage Investment',
    description: 'Late-stage (pre-IPO) investment firm providing growth capital and secondary liquidity to technology companies poised for public markets.',
  },
  {
    name: 'Earl Grey Capital',
    url: 'http://earlgrey.capital',
    tag: 'Software Development',
    description: 'Austin-based VC firm investing in DevOps, AI, and Web3. Founded by the team behind ClearBit. Portfolio includes CrewAI and ScienceIO.',
  },
  {
    name: 'Midnight Venture Partners',
    url: 'http://midnightvp.com',
    tag: 'Market Research',
    description: 'Austin-based VC firm focused on CPG investments. Portfolio includes Olipop, Jolie, and Jinx.',
  },
  {
    name: 'BMW iVentures',
    url: 'http://bmwiventures.com',
    tag: 'Due-diligence & Financial Modeling',
    description: 'Independent VC arm of BMW investing in robotics and transportation. Portfolio includes Fox Robotics, Kodiac, and Lime.',
  },
  {
    name: 'Oxcart Ventures',
    url: 'http://oxcart.vc',
    tag: 'Market & Technology Research',
    description: 'Recent spin-out of Gigafund, an Austin-based VC firm known for leading investments in SpaceX and Neuralink.',
  },
  {
    name: 'Overmatch Ventures',
    url: 'http://overmatch.vc',
    tag: 'Market & Technology Research',
    description: 'Austin-based VC firm focused on frontier technologies. Portfolio includes Base Power Company and Epirus.',
  },
  {
    name: 'Sweetspot',
    url: 'http://Sweetspot.so',
    tag: 'Software Development',
    description: 'Seed-stage startup applying AI to government contracting. Founded by UT alumni.',
  },
];

export default function Associates() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero hero--compact">
        <div className="container">
          <div className="hero__content animate-in">
            <h1 className="hero__title">Associates Program</h1>
            <p className="hero__text">
              TVG&apos;s associate program gives students the opportunity to work with leading startups and
              VCs. Our projects vary by client and have included software development, financial
              modeling, and market research. In addition to helping our clients, we also publish our
              own research.
            </p>
            <div className="button-group">
              <a href="mailto:charlesjmiele@gmail.com" className="button button--primary">
                Work With Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="content-section">
        <div className="container">
          <div className="photo-gallery">
            <Image
              src="/images/associates/associates_1.png"
              alt="Associates Program"
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="photo-gallery__image"
              style={{ objectFit: 'cover' }}
            />
            <Image
              src="/images/associates/associates_2.png"
              alt="Associates Program"
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="photo-gallery__image"
              style={{ objectFit: 'cover' }}
            />
            <Image
              src="/images/associates/associates_3.png"
              alt="Associates Program"
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="photo-gallery__image"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="content-section">
        <div className="container">
          <h2 className="content-section__title">Past & Current Clients</h2>
          <div className="clients-grid">
            {clients.map((client) => (
              <div key={client.name} className="client-card">
                <div className="client-card__header">
                  <h3 className="client-card__title">
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="client-card__link"
                    >
                      {client.name}
                    </a>
                  </h3>
                  <span className="client-card__tag">{client.tag}</span>
                </div>
                <p className="client-card__text">{client.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="content-section">
        <div className="container">
          <div className="content-section__inner text-center">
            <h2 className="content-section__title">Work With Us</h2>
            <p className="content-section__text">
              Interested in working with us? Reach out to our External Director,{' '}
              <a href="mailto:mayaglenn@utexas.edu">Maya Glenn</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
