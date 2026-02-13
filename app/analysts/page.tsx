import Link from 'next/link';

// ============================================
// DATA
// ============================================

const pillars = [
  {
    id: '01',
    title: 'Venture Fluency',
    description: 'Term sheets, cap tables, and deal mechanics. Learn the language investors speak through rigorous simulated deal flows.',
    icon: (
      <svg className="w-10 h-10 text-[#082820] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    bg: 'bg-[#01A072]/10',
  },
  {
    id: '02',
    title: 'Sector Mastery',
    description: 'Pick a vertical. Map every player. Become the undisputed expert in the room on emerging markets and technologies.',
    icon: (
      <svg className="w-10 h-10 text-[#082820] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    bg: 'bg-blue-100/50',
  },
  {
    id: '03',
    title: 'Deal Experience',
    description: 'Real diligence on real companies. Your memos influence real investment decisions made by the firm.',
    icon: (
      <svg className="w-10 h-10 text-[#082820] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    bg: 'bg-purple-100/50',
  },
];

const process = [
  { step: '01', title: 'Info Sessions', description: 'Learn about TVG and meet current members at our open events.' },
  { step: '02', title: 'Coffee Chats', description: 'One-on-one conversations with members to learn more about the org.' },
  { step: '03', title: 'Application', description: 'Resume + short response questions about your interests.' },
  { step: '04', title: 'Interview', description: 'Behavioral and market knowledge discussion with the team.' },
];

// ============================================
// PAGE
// ============================================

export default function Analysts() {
  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820] overflow-x-hidden">

      {/* ============ HERO ============ */}
      <header className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#01A072]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] bg-[#082820]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto w-full relative z-10" data-animate>
          <h1 className="text-[clamp(4rem,15vw,14rem)] leading-[0.85] text-[#082820] tracking-tight font-black">
            {'Analysts'.split('').map((letter, i) => (
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
              The entry point for students obsessed with how the future is built. Learn venture by doing venture.
            </p>

            <div className="mt-8 md:mt-0">
              <a
                href="#curriculum"
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

      {/* ============ WHAT YOU LEARN ============ */}
      <section id="curriculum" className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-[#fcf7f0]">
        <div className="max-w-screen-xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20" data-animate>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">What You Learn</h2>
            <div className="h-px bg-[#082820]/10 flex-grow ml-12 mb-4 hidden md:block" />
            <p className="font-mono text-xs uppercase tracking-widest text-[#082820]/50 mb-2 md:mb-4 mt-4 md:mt-0">Curriculum</p>
          </div>

          {/* Pillar cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#082820]/10">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className={`group p-8 md:p-12 relative transition-colors duration-500 hover:bg-white/50 border-b md:border-b-0 ${idx < 2 ? 'md:border-r' : ''} border-[#082820]/10`}
                data-animate
              >
                <div className="absolute top-8 right-8 text-xs font-mono border border-[#082820]/20 rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-[#082820] group-hover:text-[#fcf7f0] transition-colors duration-300">
                  {pillar.id}
                </div>
                <div className={`h-24 w-24 rounded-full ${pillar.bg} mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {pillar.title}
                </h3>
                <p className="text-[#082820]/60 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SELECTION PROCESS ============ */}
      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-[#082820] text-[#fcf7f0]">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16" data-animate>
            <h2 className="text-4xl md:text-5xl font-bold">Selection Process</h2>
          </div>

          {/* Animated Timeline */}
          <div className="relative">
            <svg className="absolute top-6 lg:top-7 left-6 lg:left-0 w-1 lg:w-full h-[calc(100%-24px)] lg:h-2 overflow-visible" style={{ zIndex: 1 }}>
              <line x1="0" y1="0" x2="0" y2="100%" className="lg:hidden" stroke="#01A072" strokeWidth="2" strokeOpacity="0.3" />
              <line x1="0" y1="50%" x2="100%" y2="50%" className="hidden lg:block" stroke="#01A072" strokeWidth="2" strokeOpacity="0.3" />
              <circle r="6" fill="#01A072" className="hidden lg:block">
                <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cx" values="0%;100%" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="50%;50%" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle r="4" fill="#01A072" opacity="0.6" className="hidden lg:block">
                <animate attributeName="opacity" values="0;0.6;0.6;0" dur="3s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="cx" values="0%;100%" dur="3s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="cy" values="50%;50%" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </circle>
              <circle r="5" fill="#01A072" className="lg:hidden">
                <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cx" values="50%;50%" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="0%;100%" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
              {process.map((item) => (
                <div key={item.step} className="relative flex lg:flex-col items-start lg:items-center text-left lg:text-center group" data-animate>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="absolute inset-[-4px] rounded-full bg-[#01A072]/30 opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#082820] border-2 border-[#01A072] flex items-center justify-center group-hover:bg-[#01A072] group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#01A072]/20">
                      <div className="w-3 h-3 rounded-full bg-[#01A072] group-hover:bg-[#082820] transition-colors" />
                    </div>
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-8 flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#01A072] transition-colors">{item.title}</h3>
                    <p className="text-sm opacity-60 leading-relaxed lg:max-w-[200px] lg:mx-auto">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-[#fcf7f0] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#082820]/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#082820]/5 rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10" data-animate>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#082820] mb-6">Ready to apply?</h2>
          <p className="text-xl text-[#082820]/60 mb-12">Applications for Fall 2026 open in September.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <span className="px-8 py-4 rounded-full border border-[#082820]/20 text-[#082820]/40 font-medium cursor-not-allowed">
              Applications Closed
            </span>
            <Link
              href="/events"
              className="group px-8 py-4 rounded-full bg-[#082820] text-[#fcf7f0] font-medium hover:bg-[#01A072] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2"
            >
              View Upcoming Events
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
