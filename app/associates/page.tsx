import Link from 'next/link';

// ============================================
// DATA
// ============================================

const scope = [
  {
    id: '01',
    title: 'Client Work',
    description: 'Direct projects with portfolio companies and venture partners. Lead engagements from kickoff to deliverable.',
    icon: (
      <svg className="w-10 h-10 text-[#082820] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    bg: 'bg-[#01A072]/10',
  },
  {
    id: '02',
    title: 'Market Research',
    description: 'Deep sector analysis and competitive intelligence reports. Map emerging markets and identify investment-worthy trends.',
    icon: (
      <svg className="w-10 h-10 text-[#082820] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    bg: 'bg-blue-100/50',
  },
  {
    id: '03',
    title: 'Deal Support',
    description: 'Active involvement in sourcing and diligence workflows. Source deals, run screens, and present to investment committees.',
    icon: (
      <svg className="w-10 h-10 text-[#082820] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    bg: 'bg-purple-100/50',
  },
];

const clients = [
  { name: 'Silverton Partners', type: 'VC' },
  { name: '8VC', type: 'VC' },
  { name: 'S3 Ventures', type: 'VC' },
  { name: 'Founders Fund', type: 'VC' },
  { name: 'LiveOak Venture Partners', type: 'VC' },
  { name: 'Capital Factory', type: 'Accelerator' },
  { name: 'Techstars', type: 'Accelerator' },
  { name: 'Mercury Fund', type: 'VC' },
];

// ============================================
// PAGE
// ============================================

export default function Associates() {
  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820] overflow-x-hidden">

      {/* ============ HERO ============ */}
      <header className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#01A072]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] bg-[#082820]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto w-full relative z-10" data-animate>
          <h1 className="text-[clamp(4rem,15vw,14rem)] leading-[0.85] text-[#082820] tracking-tight font-black">
            {'Associates'.split('').map((letter, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-300 cursor-default hover:-translate-y-3 hover:text-[#01A072]"
              >
                {letter}
              </span>
            ))}
          </h1>

          <div className="flex flex-col md:flex-row items-start justify-between mt-12 md:mt-24 border-t border-[#082820]/10 pt-8">
            <p className="max-w-xl text-lg md:text-2xl font-light leading-relaxed text-[#082820]/80">
              For proven analysts ready to lead client engagements and drive real deal flow with top-tier firms.
            </p>

            <div className="mt-8 md:mt-0">
              <a
                href="#scope"
                className="group relative px-6 py-3 bg-[#082820] text-[#fcf7f0] rounded-full overflow-hidden transition-all hover:scale-105 inline-flex items-center gap-2 font-medium"
              >
                <span className="absolute inset-0 w-full h-full bg-[#01A072]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Explore Program
                  <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ============ SCOPE OF WORK ============ */}
      <section id="scope" className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-[#fcf7f0]">
        <div className="max-w-screen-xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20" data-animate>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Scope of Work</h2>
            <div className="h-px bg-[#082820]/10 flex-grow ml-12 mb-4 hidden md:block" />
            <p className="font-mono text-xs uppercase tracking-widest text-[#082820]/50 mb-2 md:mb-4 mt-4 md:mt-0">Engagements</p>
          </div>

          {/* Scope cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#082820]/10">
            {scope.map((item, idx) => (
              <div
                key={item.id}
                className={`group p-8 md:p-12 relative transition-colors duration-500 hover:bg-white/50 border-b md:border-b-0 ${idx < 2 ? 'md:border-r' : ''} border-[#082820]/10`}
                data-animate
              >
                <div className="absolute top-8 right-8 text-xs font-mono border border-[#082820]/20 rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-[#082820] group-hover:text-[#fcf7f0] transition-colors duration-300">
                  {item.id}
                </div>
                <div className={`h-24 w-24 rounded-full ${item.bg} mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-[#082820]/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLIENT NETWORK ============ */}
      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-[#082820] text-[#fcf7f0] relative overflow-hidden">
        {/* Subtle video bg */}
        <div className="absolute inset-0 opacity-[0.05]">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/ship.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Decorative dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20" data-animate>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Client Network</h2>
            <div className="h-px bg-[#fcf7f0]/10 flex-grow ml-12 mb-4 hidden md:block" />
            <p className="font-mono text-xs uppercase tracking-widest text-[#fcf7f0]/40 mb-2 md:mb-4 mt-4 md:mt-0">Partners</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#fcf7f0]/10">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group bg-[#082820] p-8 hover:bg-[#fcf7f0]/5 transition-colors duration-300 flex flex-col justify-between min-h-[140px]"
                data-animate
              >
                <span className="font-mono text-xs text-[#01A072] group-hover:text-[#01A072] transition-colors">
                  {client.type}
                </span>
                <span className="font-bold text-xl group-hover:translate-x-1 transition-transform duration-300">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-[#fcf7f0] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#082820]/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#082820]/5 rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10" data-animate>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#082820] mb-6">Interested in becoming an Associate?</h2>
          <p className="text-xl text-[#082820]/60 mb-12">Associates are selected from our analyst alumni each spring.</p>

          <Link
            href="/analysts"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#082820] text-[#fcf7f0] font-medium hover:bg-[#01A072] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Start as an Analyst
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
