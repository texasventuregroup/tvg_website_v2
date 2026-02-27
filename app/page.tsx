import Image from 'next/image';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import LogoCarousel, { CarouselLogo } from './components/LogoCarousel';
import JoinButton from './components/JoinButton';
import DomainPanels from './components/DomainPanels';
import CultureFlipCards from './components/CultureFlipCards';
import AustinSkylineSVG from './components/AustinSkylineSVG';
import programs from '@/data/programs.json';

async function getCarouselLogos(): Promise<{ row1: CarouselLogo[]; row2: CarouselLogo[] }> {

export default async function Home() {
  const { row1, row2 } = await getCarouselLogos();

  return (
    <main className="bg-[#fcf7f0] text-[#082820] bg-grid">
      {/* ========== HERO SECTION ========== */}
      <header className="min-h-[100svh] relative flex flex-col justify-start lg:justify-center overflow-hidden pt-40 pb-20 lg:py-0">
        <div className="container mx-auto relative z-10">
          <div className="hero-content">
            {/* Badges */}
            <div className="flex gap-3 mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <span className="pill">Est. 2021</span>
              <span className="pill">UT Austin</span>
            </div>

            {/* Title */}
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight mb-8 max-w-[900px] animate-fade-up" style={{ animationDelay: '0.4s' }}>
              TEXAS<br />VENTURE<br />GROUP
            </h1>

            {/* Tagline - Typewriter Effect */}
            <div className="max-w-[400px] animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <p className="font-mono text-base leading-relaxed border-l border-[#016F4E] pl-5 overflow-hidden whitespace-nowrap border-r-2" 
                 style={{ 
                   animation: 'typewriter 2.5s steps(40) 1s forwards, blinkTextCursor 0.8s step-end infinite',
                   width: '0'
                 }}>
                Exploration is not just about where you go, but who you go with.
              </p>
              <p className="font-mono text-sm mt-4 opacity-70 pl-5">
                The ecosystem for student investors and founders at UT Austin.
              </p>
            </div>
          </div>
        </div>

        {/* Pencil Skyline Background */}
        <AustinSkylineSVG />
      </header>

      {/* ========== PROGRAMS SECTION ========== */}
      <section id="programs" className="py-[120px]">
        <div className="container mx-auto">
          <span className="label mb-4 block">Our Ecosystem</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[60px]">
            {programs.map((program) => (
              <Link
                key={program.id}
                href={program.link}
                className="program-card group"
              >
                {/* Background Image (shows on hover) */}
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="card-bg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Content */}
                <div className="relative z-10">
                  <span className="font-mono text-sm text-[#016F4E] mb-4 block">{program.id}</span>
                  <h3 className="text-[1.75rem] font-semibold mb-3 matrix-decode">{program.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{program.description}</p>
                </div>

                {/* Arrow */}
                <div className="card-arrow group-hover:bg-[#082820] group-hover:text-[#fcf7f0] group-hover:rotate-[-45deg]">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section id="mission" className="py-[120px] bg-white relative">
        <div className="container mx-auto relative z-10">
          <span className="label mb-6 block">The Mission</span>
          <p className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.2] max-w-[1100px]">
            There wasn&apos;t a place for students <span className="text-[#016F4E]">obsessed</span> with startups. We built Texas Venture Group to be the gravity well for the ambitious, the curious, and the relentless.
          </p>
        </div>
      </section>

      {/* ========== PLACEMENT / ALUMNI SECTION ========== */}
      <section className="py-16 lg:py-[120px]">
        <div className="container mx-auto mb-12 lg:mb-24">
          <span className="label mb-4 block">Placement</span>
        </div>
        <div className="space-y-8">
          <LogoCarousel logos={row1} />
          <LogoCarousel logos={row2} reverse />
        </div>
      </section>

      {/* ========== CULTURE SECTION ========== */}
      <section id="culture" className="py-16 lg:py-[120px] bg-white">
        <div className="container mx-auto">
          <span className="label mb-12 block">Culture & Values</span>
          <CultureFlipCards />
        </div>
      </section>

      {/* ========== PHILOSOPHY SECTION ========== */}
      <section id="philosophy" className="pt-16 pb-[120px] bg-[#082820] text-[#fcf7f0] relative overflow-hidden">
        {/* Tron Grid Background Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{
               backgroundImage: 'linear-gradient(var(--tvg-teal) 1px, transparent 1px), linear-gradient(90deg, var(--tvg-teal) 1px, transparent 1px)',
               backgroundSize: '40px 40px',
               animation: 'move-grid 4s linear infinite',
               transformOrigin: 'top'
             }} 
        />
        
        <div className="container mx-auto relative z-10">
          <span className="label text-[#01A072] mb-6 block">Our Philosophy</span>
          <p className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] max-w-[900px] mb-16">
            There&apos;s no single path to venture. We believe in meeting people where they are—whether
            you want to <span className="text-[#01A072]">invest</span>, <span className="text-[#01A072]">join</span>,
            or <span className="text-[#01A072]">found</span>.
          </p>

          {/* Three Modalities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Invest',
                desc: 'Learn to evaluate, diligence, and think like an investor. Understand how capital flows and decisions get made.'
              },
              {
                num: '02',
                title: 'Join',
                desc: 'Find your place at a high-growth company. Operators, engineers, designers—startups need all of it.'
              },
              {
                num: '03',
                title: 'Found',
                desc: 'Build something new. We support student founders with community, mentorship, and connections.'
              },
            ].map((mod) => (
              <div
                key={mod.title}
                className="p-8 border border-[#fcf7f0]/20 rounded-xl hover:border-[#01A072]/50 hover:bg-[#fcf7f0]/5 transition-all group"
              >
                <span className="text-xs font-mono text-[#01A072]/60 mb-4 block">{mod.num}</span>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#01A072] transition-colors">{mod.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DOMAINS SECTION ========== */}
      <section id="domains" className="pt-8 pb-[120px] bg-[#082820] text-[#fcf7f0]">
        <div className="container mx-auto px-6">
          <DomainPanels variant="newspaper" />
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-16 lg:py-[160px] text-center relative overflow-hidden">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#082820]/10" />

        <div className="container mx-auto relative z-10">
          <h2 className="text-[clamp(3rem,6vw,6rem)] font-semibold mb-8 tracking-tight">
            JOIN THE EXPEDITION
          </h2>
          <JoinButton className="btn-expedition relative overflow-hidden group">
            {/* Animated snake border effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#01A072] to-transparent bg-[length:200%_100%] animate-[snake-border_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" style={{ padding: '2px' }} />
            <span className="relative z-10">JOIN OUR NEWSLETTER</span>
          </JoinButton>
        </div>
      </section>
    </main>
  );
}
