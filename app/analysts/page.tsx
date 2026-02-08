import Image from 'next/image';
import Link from 'next/link';

const pillars = [
  { id: '01', title: 'Venture Fluency', description: 'Term sheets, cap tables, and deal mechanics. Learn the language investors speak.' },
  { id: '02', title: 'Sector Mastery', description: 'Pick a vertical. Map every player. Become the expert in the room.' },
  { id: '03', title: 'Deal Experience', description: 'Real diligence on real companies. Your memos influence real investment decisions.' },
];

const process = [
  { step: '01', title: 'Info Sessions', description: 'Learn about TVG and meet current members at our open events.' },
  { step: '02', title: 'Coffee Chats', description: 'One-on-one conversations with members to learn more about the org.' },
  { step: '03', title: 'Application', description: 'Resume + short response questions about your interests.' },
  { step: '04', title: 'Interview', description: 'Behavioral and market knowledge discussion with the team.' },
];

export default function Analysts() {
  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820]">
      {/* Hero */}
      <section className="pt-32 lg:pt-40 pb-16 px-6 lg:px-12 border-b border-[#082820]/10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-tighter mb-6">
            Analysts
          </h1>
          <p className="text-lg lg:text-xl opacity-70 max-w-lg leading-relaxed">
            The entry point for students obsessed with how the future is built. Learn venture by doing venture.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 border-b border-[#082820]/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">What You Learn</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#082820]/10">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="bg-[#fcf7f0] p-8 hover:bg-white transition-colors">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#082820] text-[#fcf7f0] text-xs font-mono mb-6">
                  {pillar.id}
                </span>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="opacity-70 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Process - Animated Timeline */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-[#082820] text-[#fcf7f0]">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold">Selection Process</h2>
          </div>

          {/* Animated Timeline */}
          <div className="relative">
            {/* SVG for animated line with traveling pulses */}
            <svg className="absolute top-6 lg:top-7 left-6 lg:left-0 w-1 lg:w-full h-[calc(100%-24px)] lg:h-2 overflow-visible" style={{ zIndex: 1 }}>
              {/* Base line */}
              <line
                x1="0" y1="0"
                x2="0" y2="100%"
                className="lg:hidden"
                stroke="#01A072"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <line
                x1="0" y1="50%"
                x2="100%" y2="50%"
                className="hidden lg:block"
                stroke="#01A072"
                strokeWidth="2"
                strokeOpacity="0.3"
              />

              {/* Traveling pulse 1 */}
              <circle r="6" fill="#01A072" className="hidden lg:block">
                <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cx" values="0%;100%" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="50%;50%" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Traveling pulse 2 - offset */}
              <circle r="4" fill="#01A072" opacity="0.6" className="hidden lg:block">
                <animate attributeName="opacity" values="0;0.6;0.6;0" dur="3s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="cx" values="0%;100%" dur="3s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="cy" values="50%;50%" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </circle>

              {/* Traveling pulse 3 - faster */}
              <circle r="3" fill="#fcf7f0" opacity="0.4" className="hidden lg:block">
                <animate attributeName="opacity" values="0;0.4;0.4;0" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
                <animate attributeName="cx" values="0%;100%" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
                <animate attributeName="cy" values="50%;50%" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
              </circle>

              {/* Mobile vertical pulses */}
              <circle r="5" fill="#01A072" className="lg:hidden">
                <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cx" values="50%;50%" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="0%;100%" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
              {process.map((item, idx) => (
                <div key={item.step} className="relative flex lg:flex-col items-start lg:items-center text-left lg:text-center group">
                  {/* Simple dot node - no numbers */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="absolute inset-[-4px] rounded-full bg-[#01A072]/30 opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#082820] border-2 border-[#01A072] flex items-center justify-center group-hover:bg-[#01A072] group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#01A072]/20">
                      <div className="w-3 h-3 rounded-full bg-[#01A072] group-hover:bg-[#082820] transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
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

      {/* CTA */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to apply?</h2>
          <p className="text-lg opacity-60 mb-10">Applications for Fall 2026 open in September.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <span className="px-8 py-4 border border-[#082820]/20 rounded-full font-mono text-sm opacity-50">
              Applications Closed
            </span>
            <Link href="/events" className="px-8 py-4 bg-[#082820] text-[#fcf7f0] rounded-full font-bold hover:bg-[#01A072] transition-all">
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
