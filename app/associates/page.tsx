import Image from 'next/image';
import Link from 'next/link';

const scope = [
  { id: '01', title: 'Client Work', description: 'Direct projects with portfolio companies and venture partners.' },
  { id: '02', title: 'Market Research', description: 'Deep sector analysis and competitive intelligence reports.' },
  { id: '03', title: 'Deal Support', description: 'Active involvement in sourcing and diligence workflows.' },
];

const clients = [
  { name: 'Silverton Partners', type: 'VC', logo: null },
  { name: '8VC', type: 'VC', logo: null },
  { name: 'S3 Ventures', type: 'VC', logo: null },
  { name: 'Founders Fund', type: 'VC', logo: null },
  { name: 'LiveOak Venture Partners', type: 'VC', logo: null },
  { name: 'Capital Factory', type: 'Accelerator', logo: null },
  { name: 'Techstars', type: 'Accelerator', logo: null },
  { name: 'Mercury Fund', type: 'VC', logo: null },
];

export default function Associates() {
  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820]">
      {/* Hero */}
      <section className="pt-32 lg:pt-40 pb-16 px-6 lg:px-12 border-b border-[#082820]/10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-tighter mb-6">
            Associates
          </h1>
          <p className="text-lg lg:text-xl opacity-70 max-w-lg leading-relaxed">
            For proven analysts ready to lead client engagements and drive real deal flow.
          </p>
        </div>
      </section>

      {/* Scope */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-b border-[#082820]/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Scope of Work</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#082820]/10">
            {scope.map((item) => (
              <div key={item.id} className="bg-[#fcf7f0] p-8 hover:bg-white transition-colors group">
                <div className="w-8 h-8 rounded-full border-2 border-[#01A072] flex items-center justify-center mb-6 group-hover:bg-[#01A072] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#01A072] group-hover:bg-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#01A072] transition-colors">{item.title}</h3>
                <p className="opacity-70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients - Grid Style */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-[#082820] text-[#fcf7f0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/ship.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex justify-between items-baseline mb-12">
            <h2 className="text-3xl font-bold">Client Network</h2>
            <span className="font-mono text-xs opacity-50">Partners</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#fcf7f0]/10">
            {clients.map((client) => (
              <div key={client.name} className="bg-[#082820] p-6 lg:p-8 hover:bg-[#fcf7f0]/5 transition-colors flex flex-col justify-between min-h-[120px]">
                <span className="font-mono text-xs text-[#01A072]">{client.type}</span>
                <span className="font-bold text-lg">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Interested in becoming an Associate?</h2>
          <p className="text-lg opacity-60 mb-10">Associates are selected from our analyst alumni each spring.</p>
          <Link href="/analysts" className="inline-block px-8 py-4 border-b-2 border-[#082820] font-bold hover:text-[#01A072] hover:border-[#01A072] transition-all">
            Start as an Analyst →
          </Link>
        </div>
      </section>
    </main>
  );
}
