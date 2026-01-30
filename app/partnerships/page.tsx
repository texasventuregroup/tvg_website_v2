import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import PartnerLogo from '../components/PartnerLogo';

interface Partner {
  name: string;
  shortName?: string;
  type: string;
  tier: string;
  industry: string;
  website: string;
  logo?: string;
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
    <main className="min-h-screen bg-tvg-cream text-tvg-forest pt-20">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-tvg-forest">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/about/cover.webp"
            alt="Partnerships Cover"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-tvg-forest/60" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-sm text-tvg-teal uppercase tracking-wider">Our Network</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4">Partners</h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              VCs, startups, and companies we work with. Through these partnerships,
              members get real experience and access to the people building the future.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-tvg-cream" id="partnerships">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sortedPartners.map((partner) => (
              <a
                key={partner.name}
                href={`https://${partner.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 bg-white rounded-xl border border-tvg-forest/10 hover:shadow-lg hover:border-tvg-green/50 transition-all duration-300"
              >
                <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                  <PartnerLogo
                    name={partner.name}
                    website={partner.website}
                    logo={partner.logo}
                  />
                </div>
                <h3 className="text-lg font-bold text-center text-tvg-forest group-hover:text-tvg-green transition-colors">
                  {partner.shortName || partner.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Work With Us</span>
            <h2 className="text-4xl font-bold mt-4 mb-6 text-tvg-forest">Partner With TVG</h2>
            <p className="text-xl text-tvg-forest/70 mb-10 leading-relaxed">
              Interested in working with us? We&apos;re always looking to connect with
              firms and companies doing interesting things.
            </p>
            <div className="flex justify-center">
              <a href="mailto:contact.txventuregroup@gmail.com" className="px-8 py-4 rounded-sm bg-tvg-forest text-white font-bold hover:bg-tvg-forest/90 transition-all">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
