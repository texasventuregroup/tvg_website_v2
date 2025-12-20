import { useEffect, useState } from 'react';

interface Partner {
  name: string;
  shortName?: string;
  type: string;
  tier: string;
  industry: string;
  website: string;
  logo: string;
}

export default function Partnerships() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/partnerships.json')
      .then((res) => res.json())
      .then((data) => {
        setPartners(data.partnerships || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading partnerships:', err);
        setLoading(false);
      });
  }, []);

  // Sort partners by tier (S, A, B)
  const sortedPartners = [...partners].sort((a, b) => {
    const tierOrder: Record<string, number> = { S: 0, A: 1, B: 2 };
    return (tierOrder[a.tier] ?? 3) - (tierOrder[b.tier] ?? 3);
  });

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background">
          <img
            src="/images/about/cover.png"
            alt=""
            className="hero__background-image"
            aria-hidden="true"
          />
        </div>
        <div className="container">
          <div className="hero__content" data-animate>
            <h1 className="hero__title">Our Partners</h1>
            <p className="hero__text">
              We're proud to partner with leading venture capital firms, startups, and companies.
              Through these partnerships, we provide our members with unique opportunities for
              learning, networking, and hands-on experience in venture capital and entrepreneurship.
            </p>
          </div>
        </div>
      </section>

      {/* Partnerships Grid */}
      <section className="content-section" id="partnerships" data-animate>
        <div className="container">
          {loading ? (
            <p className="text-center">Loading partners...</p>
          ) : (
            <div className="partnerships-grid">
              {sortedPartners.map((partner) => (
                <a
                  key={partner.name}
                  href={`https://${partner.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partnership-card"
                >
                  <div className="partnership-card__logo-container">
                    <img
                      src={`/images/partners/${partner.logo}`}
                      alt={partner.name}
                      className="partnership-card__logo"
                      loading="lazy"
                    />
                  </div>
                  <div className="partnership-card__info">
                    <h3 className="partnership-card__name">
                      {partner.shortName || partner.name}
                    </h3>
                    <p className="partnership-card__type">{partner.type}</p>
                    <p className="partnership-card__industry">{partner.industry}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="content-section" data-animate>
        <div className="container">
          <div className="content-section__inner text-center">
            <h2 className="content-section__title">Partner With Us</h2>
            <p className="content-section__text">
              Interested in partnering with Texas Venture Group? We're always looking to expand our
              network and create meaningful relationships with innovative firms and companies.
            </p>
            <div className="button-group button-group--centered">
              <a href="mailto:contact.txventuregroup@gmail.com" className="button button--primary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
