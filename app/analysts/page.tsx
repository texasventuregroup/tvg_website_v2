import Image from 'next/image';
import Link from 'next/link';
import JoinButton from '../components/JoinButton';

const processSteps = [
  { id: '01', title: 'Meet Us', processing: 'Info Sessions', output: 'Get to know the team' },
  { id: '02', title: 'Apply', processing: 'Written App', output: 'Tell us about you' },
  { id: '03', title: 'Interview', processing: 'Conversation', output: 'How you think' },
  { id: '04', title: 'Case Study', processing: 'Analysis', output: 'Evaluate a startup' },
  { id: '05', title: 'Decision', processing: 'Final', output: 'Welcome to the crew' },
];

const pillars = [
  { id: '01', title: 'Research', description: 'Dig into markets. Understand industries. Figure out what makes companies win or lose.' },
  { id: '02', title: 'Experience', description: 'Work on real deals. Conduct due diligence. Present to the team. Learn by doing.' },
  { id: '03', title: 'Community', description: "Find mentors. Build friendships. Join a network you'll have for the next fifteen years." },
];

export default function Analysts() {
  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
      {/* Hero */}
      <section className="border-b border-[#082820]/10 grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Content */}
        <div className="p-8 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#082820]/10">
          <span className="label mb-4">Program 01</span>
          <h1 className="text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight mb-8">
            Analyst<br />Program
          </h1>
          <p className="text-lg opacity-70 max-w-md mb-10">
            The entry point. You&apos;ll work on real projects with startups and investors, learning how technology businesses actually work.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="btn-secondary opacity-50 cursor-not-allowed">Applications Closed</span>
            <Link href="/events" className="btn-primary">Attend an Event</Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-[400px] lg:h-auto">
          <Image src="/images/analysts/tvg_pitch.jpg" alt="TVG Analysts" fill className="object-cover" />
        </div>
      </section>

      {/* What You'll Do */}
      <section className="border-b border-[#082820]/10">
        <div className="p-6 border-b border-[#082820]/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold">What You&apos;ll Do</h2>
          <span className="label">Three Pillars</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#082820]/10">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="p-8 lg:p-12 hover:bg-[#082820] hover:text-[#fcf7f0] transition-all group">
              <span className="inline-flex items-center justify-center w-8 h-8 border border-current rounded-full text-xs mb-6">{pillar.id}</span>
              <h3 className="text-lg font-semibold mb-4">{pillar.title}</h3>
              <p className="text-sm opacity-70">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="border-b border-[#082820]/10 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[400px] lg:h-auto border-b lg:border-b-0 lg:border-r border-[#082820]/10">
          <Image src="/images/analysts/networking.png" alt="Analyst Experience" fill className="object-cover" />
        </div>
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <span className="label mb-4">The Experience</span>
          <h2 className="text-3xl font-semibold mb-6">Find Your People</h2>
          <p className="text-sm opacity-70 mb-4">
            Dinners, treks, coffee chats. Meet founders, investors, and other students who think the same way you do.
          </p>
          <p className="text-sm opacity-70">
            By the end, you&apos;ll have evaluated companies, presented investment theses, and figured out what part of this world you want to explore next.
          </p>
        </div>
      </section>

      {/* Application Process - Dark Section */}
      <section className="bg-[#082820] text-[#fcf7f0]">
        <div className="p-6 border-b border-[#fcf7f0]/20 flex justify-between items-center">
          <h2 className="text-xl font-semibold">The Process</h2>
          <span className="label text-[#01A072]">How To Join</span>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-4 p-4 border-b border-[#fcf7f0]/20 text-[10px] font-mono uppercase tracking-wider opacity-40">
          <div>Step</div>
          <div>Title</div>
          <div>Processing</div>
          <div>Output</div>
        </div>

        {processSteps.map((step) => (
          <div key={step.id} className="grid grid-cols-1 md:grid-cols-4 p-6 border-b border-[#fcf7f0]/10 hover:bg-[#fcf7f0]/5 transition-all items-center gap-2 md:gap-0">
            <div className="font-mono text-sm opacity-50 hidden md:block">{step.id}</div>
            <div className="font-semibold">{step.title}</div>
            <div className="text-sm opacity-70 hidden md:block">{step.processing}</div>
            <div className="text-sm opacity-70">{step.output}</div>
          </div>
        ))}

        <div className="p-6 text-xs opacity-40">
          Applications for Spring 2026 are closed. Check back for Fall 2026.
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <span className="label block mb-4">Stay Connected</span>
        <h2 className="text-4xl font-semibold mb-6">Applications Closed</h2>
        <p className="text-sm opacity-70 max-w-md mx-auto mb-10">
          Check back for Fall 2026. In the meantime, come to our events. Meet the team.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <JoinButton className="btn-primary">Stay Updated</JoinButton>
          <Link href="/events" className="btn-secondary">View Events</Link>
        </div>
      </section>
    </main>
  );
}
