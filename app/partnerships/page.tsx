import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import { getLogoUrl } from '../config/logos';

interface Partner {
  name: string;
  shortName?: string;
  type: string;
  tier: string;
  industry: string;
  website: string;
  logo: string;
}

async function getPartnerships(): Promise<Partner[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'partnerships.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.partnerships || [];
}

export default async function Partnerships() {
  const partners = await getPartnerships();

  const sortedPartners = [...partners].sort((a, b) => {
    const tierOrder: Record<string, number> = { S: 0, A: 1, B: 2 };
    return (tierOrder[a.tier] ?? 3) - (tierOrder[b.tier] ?? 3);
  });

  return (
    <>
      <section className="hero hero--compact">
        <div className="hero__background">
          <Image
            src="/images/about/cover.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero__background-image"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="container">
          <div className="hero__content" data-animate>
            <h1 className="hero__title">Our Partners</h1>
            <p className="hero__text">
              We&apos;re proud to partner with leading venture capital firms, startups, and companies.
              Through these partnerships, we provide our members with unique opportunities for
              learning, networking, and hands-on experience in venture capital and entrepreneurship.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section" id="partnerships" data-animate>
        <div className="container">
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
                    src={getLogoUrl(partner.website, 128)}
                    alt={`${partner.name} logo`}
                    className="partnership-card__logo"
                    loading="lazy"
                  />
                </div>
                <h3 className="partnership-card__name">
                  {partner.shortName || partner.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" data-animate>
        <div className="container">
          <div className="content-section__inner text-center">
            <h2 className="content-section__title">Partner With Us</h2>
            <p className="content-section__text">
              Interested in partnering with Texas Venture Group? We&apos;re always looking to expand our
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
