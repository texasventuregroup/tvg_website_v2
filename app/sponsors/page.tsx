import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import PartnerLogo from '../components/PartnerLogo';

interface SponsorLink {
  label: string;
  url: string;
}

interface FeaturedSponsor {
  name: string;
  shortName?: string;
  description: string;
  website: string;
  logo?: string;
  links: SponsorLink[];
}

interface Sponsor {
  name: string;
  shortName?: string;
  website: string;
  logo?: string;
}

interface SponsorsData {
  featured: FeaturedSponsor[];
  sponsors: Sponsor[];
}

async function getSponsors(): Promise<SponsorsData> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'sponsors.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Sponsors() {
  const { featured, sponsors } = await getSponsors();

  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-32 pb-20">
      {/* Hero */}
      <section className="">
        <div className="container mx-auto px-6">
          <span className="block font-mono text-xs md:text-sm text-[#082820]/60 mb-6 tracking-widest uppercase">
            Support &amp; Sponsorship
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#082820] mb-8 leading-[1.1]">
            Our Sponsors
          </h1>
          <p className="text-lg md:text-xl text-[#082820]/70 leading-relaxed max-w-xl">
            The companies and firms that make our programs, events, and community possible.
          </p>
        </div>
      </section>

      {/* Featured Sponsors */}
      <section className="py-24 bg-tvg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Featured</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-tvg-forest">Current Sponsors</h2>
          </div>

          {featured.map((sponsor) => (
            <div
              key={sponsor.name}
              className="max-w-4xl mx-auto bg-white rounded-2xl border border-tvg-forest/10 shadow-lg overflow-hidden mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0">
                {/* Logo Side */}
                <div className="bg-tvg-forest/[0.03] flex items-center justify-center p-12 md:p-16 border-b md:border-b-0 md:border-r border-tvg-forest/10">
                  <a
                    href={`https://${sponsor.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full max-w-[200px]"
                  >
                    {sponsor.logo ? (
                      <Image
                        src={`/images/partners/${sponsor.logo}`}
                        alt={sponsor.name}
                        width={200}
                        height={80}
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <div className="w-full h-20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-tvg-forest">{sponsor.shortName || sponsor.name}</span>
                      </div>
                    )}
                  </a>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-tvg-forest mb-3">{sponsor.name}</h3>
                  <p className="text-tvg-forest/70 leading-relaxed mb-6">
                    {sponsor.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {sponsor.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-all border border-tvg-forest/15 text-tvg-forest hover:bg-tvg-forest hover:text-tvg-cream"
                      >
                        {link.label}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Sponsors Grid */}
      <section className="py-24 bg-[#f8f3eb]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Thank You</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-tvg-forest">Past Sponsors</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={`https://${sponsor.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 bg-white rounded-xl border border-tvg-forest/10 hover:shadow-lg hover:border-tvg-green/50 transition-all duration-300"
              >
                <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                  <PartnerLogo
                    name={sponsor.name}
                    website={sponsor.website}
                    logo={sponsor.logo}
                  />
                </div>
                <h3 className="text-lg font-bold text-center text-tvg-forest group-hover:text-tvg-green transition-colors">
                  {sponsor.shortName || sponsor.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-tvg-forest">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-sm text-tvg-teal uppercase tracking-wider">Get Involved</span>
            <h2 className="text-4xl font-bold mt-4 mb-6 text-white">Become a Sponsor</h2>
            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              Support the next generation of venture talent at UT Austin.
              Reach out to learn about sponsorship opportunities.
            </p>
            <div className="flex justify-center">
              <a href="mailto:contact.txventuregroup@gmail.com" className="px-8 py-4 rounded-sm bg-white text-tvg-forest font-bold hover:bg-tvg-teal hover:text-white transition-all">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
