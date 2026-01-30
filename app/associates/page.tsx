import Image from 'next/image';
import Link from 'next/link';

const clients = [
  { id: '01', name: 'Great Circle Ventures', tag: 'Due Diligence', description: 'Early-stage investment firm focused on food and consumer health.' },
  { id: '02', name: 'Steer', tag: 'Software', description: 'Affiliate marketing software for consumer service brands.' },
  { id: '03', name: 'Mainshares', tag: 'Research', description: '8VC-backed startup helping owner-operators acquire small businesses.' },
  { id: '04', name: 'BoxGroup', tag: 'Tooling', description: 'NYC VC with portfolio including Ramp, Clay, and Cursor.' },
  { id: '05', name: 'Sorenson Capital', tag: 'Research', description: 'Utah-based VC investing in B2B software.' },
  { id: '06', name: 'Gothams', tag: 'Strategy', description: 'Crisis response firm with rapid deployment capabilities.' },
  { id: '07', name: 'Harvest Growth Capital', tag: 'Investment', description: 'Late-stage growth capital for tech companies.' },
  { id: '08', name: 'Earl Grey Capital', tag: 'Software', description: 'Austin VC investing in DevOps, AI, and Web3.' },
  { id: '09', name: 'Midnight Venture Partners', tag: 'Research', description: 'CPG-focused VC with Olipop, Jolie, and Jinx.' },
  { id: '10', name: 'BMW iVentures', tag: 'Due Diligence', description: "BMW's VC arm in robotics and transportation." },
  { id: '11', name: 'Oxcart Ventures', tag: 'Research', description: 'Gigafund spin-out, invested in SpaceX and Neuralink.' },
  { id: '12', name: 'Overmatch Ventures', tag: 'Research', description: 'Frontier tech VC, Base Power Company and Epirus.' },
];

const researchAreas = [
  { id: '01', title: 'Software', description: 'B2B SaaS, developer tools, AI/ML infrastructure.' },
  { id: '02', title: 'Fintech', description: 'Payments, lending, capital markets infrastructure.' },
  { id: '03', title: 'Climate', description: 'Energy transition, carbon markets, sustainability tech.' },
  { id: '04', title: 'Life Sciences', description: 'Biotech, healthtech, medical devices.' },
];

export default function Associates() {
  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
      {/* Hero - Two Column Layout */}
      <section className="border-b border-[#082820]/10 grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Content */}
        <div className="p-8 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#082820]/10">
          <span className="label mb-4">Program 02</span>
          <h1 className="text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight mb-8">
            Associate<br />Program
          </h1>
          <p className="text-lg opacity-70 max-w-md mb-10">
            Real client work with startups and VC firms. Software development, financial modeling, market research—projects vary. You lead research initiatives and help shape what TVG becomes next.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:charlesjmiele@gmail.com" className="btn-primary">Work With Us</a>
            <Link href="/analysts" className="btn-secondary">Start as Analyst</Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-[400px] lg:h-auto">
          <Image src="/images/associates/associates_1.webp" alt="TVG Associates" fill className="object-cover" />
        </div>
      </section>

      {/* Research Areas */}
      <section className="border-b border-[#082820]/10">
        <div className="p-6 border-b border-[#082820]/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Research Coverage</h2>
          <span className="label">Sectors</span>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-4 p-4 border-b border-[#082820]/10 text-[10px] font-mono uppercase tracking-wider opacity-40">
          <div>idx</div>
          <div>Sector</div>
          <div>Focus Areas</div>
          <div></div>
        </div>

        {researchAreas.map((area) => (
          <div key={area.id} className="grid grid-cols-1 md:grid-cols-4 p-6 border-b border-[#082820]/10 hover:bg-[#082820]/5 transition-all items-center gap-2 md:gap-0">
            <div className="font-mono text-sm opacity-50 hidden md:block">{area.id}</div>
            <div className="font-semibold">{area.title}</div>
            <div className="opacity-70 text-sm hidden md:block">{area.description}</div>
            <div></div>
          </div>
        ))}
      </section>

      {/* Clients - Dark Section */}
      <section className="bg-[#082820] text-[#fcf7f0]">
        <div className="p-6 border-b border-[#fcf7f0]/20 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Past Clients</h2>
          <span className="label text-[#01A072]">Portfolio</span>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-4 p-4 border-b border-[#fcf7f0]/20 text-[10px] font-mono uppercase tracking-wider opacity-40">
          <div>idx</div>
          <div>Client</div>
          <div>Work Type</div>
          <div>Description</div>
        </div>

        {clients.map((client) => (
          <div key={client.id} className="grid grid-cols-1 md:grid-cols-4 p-6 border-b border-[#fcf7f0]/10 hover:bg-[#fcf7f0]/5 transition-all items-center gap-2 md:gap-0">
            <div className="font-mono text-sm opacity-50 hidden md:block">{client.id}</div>
            <div className="font-semibold">{client.name}</div>
            <div className="text-sm opacity-70 hidden md:block">{client.tag}</div>
            <div className="text-sm opacity-70">{client.description}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <span className="label block mb-4">Interested?</span>
        <h2 className="text-4xl font-semibold mb-6">Work With Us</h2>
        <p className="text-sm opacity-70 max-w-md mx-auto mb-10">
          We&apos;re always looking for partners. If you&apos;re a VC or a startup with a project, reach out.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:charlesjmiele@gmail.com" className="btn-primary">Get In Touch</a>
          <Link href="/analysts" className="btn-secondary">Join as Analyst</Link>
        </div>
      </section>
    </main>
  );
}
