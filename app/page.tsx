import Image from 'next/image';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import LogoCarousel, { CarouselLogo } from './components/LogoCarousel';
import JoinButton from './components/JoinButton';
import DomainPanels from './components/DomainPanels';
import CultureFlipCards from './components/CultureFlipCards';
import AustinSkylineSVG from './components/AustinSkylineSVG';

async function getCarouselLogos(): Promise<{ row1: CarouselLogo[]; row2: CarouselLogo[] }> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'carousel-logos.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  const logos: CarouselLogo[] = data.logos || [];
  const row1: CarouselLogo[] = [];
  const row2: CarouselLogo[] = [];
  logos.forEach((logo, index) => {
    if (index % 2 === 0) row1.push(logo);
    else row2.push(logo);
  });
  return { row1, row2 };
}

const programs = [
  {
    title: 'Analysts',
    description: 'Fundamental investing education. Market research, diligence, and thesis generation.',
    link: '/analysts',
    image: '/images/analysts/tvg_pitch.jpg'
  },
  {
    title: 'Associates',
    description: 'Portfolio management and sourcing. Working directly with partner firms.',
    link: '/associates',
    image: '/images/analysts/networking.png'
  },
  {
    title: 'Research',
    description: 'Deep dives into emerging verticals. Publishing white papers and industry maps.',
    link: '/associates',
    image: '/images/programs/research.jpeg'
  },
  {
    title: 'Hackathons',
    description: 'Our flagship building events. Join hundreds of students to build, pitch, and win prizes.',
    link: '/hackathons',
    image: '/images/events/hackathon-workspace.jpg'
  },
];

export default async function Home() {
  const { row1, row2 } = await getCarouselLogos();

  return (
    <main className="bg-[#fcf7f0] text-[#082820] bg-grid">
      {/* ========== HERO SECTION ========== */}
      <header className="min-h-[100svh] relative flex flex-col justify-start lg:justify-center overflow-hidden pt-40 pb-20 lg:py-0">
        <div className="container mx-auto relative z-10">
          <div className="hero-content">
            {/* Title + tagline share the title's width (capped at VENTURE). Tagline is left-aligned. */}
            <div className="hero-copy">
              <h1 className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight mb-8">
                TEXAS<br />VENTURE<br />GROUP
              </h1>

              <p className="hero-tagline text-left font-semibold tracking-tight leading-snug text-[clamp(1.375rem,3vw,1.875rem)] opacity-60">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <Link
                key={program.title}
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
                  <h3 className="text-[1.75rem] font-semibold mb-3">{program.title}</h3>
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
          <p className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.2] max-w-[1100px]">
            There wasn&apos;t a place for students <span className="text-[#016F4E]">obsessed</span> with startups. We built Texas Venture Group to be the gravity well for the ambitious, the curious, and the relentless.
          </p>
        </div>
      </section>

      {/* ========== PLACEMENT / ALUMNI SECTION ========== */}
      <section className="py-16 lg:py-[120px]">
        <div className="container mx-auto mb-12 lg:mb-24">
          <h2 className="label">Placement</h2>
        </div>
        <div className="space-y-8">
          <LogoCarousel logos={row1} />
          <LogoCarousel logos={row2} reverse />
        </div>
      </section>

      {/* ========== CULTURE SECTION ========== */}
      <section id="culture" className="py-16 lg:py-[120px] bg-white">
        <div className="container mx-auto">
          <h2 className="label mb-12">Core Values</h2>
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
          <p className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] max-w-[900px] mb-16">
            There&apos;s no single path to venture. We believe in meeting people where they are, whether
            you want to <span className="text-[#01A072]">invest</span>, <span className="text-[#01A072]">join</span>,
            or <span className="text-[#01A072]">found</span>.
          </p>

          {/* Three Modalities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Invest',
                desc: 'Learn to evaluate, diligence, and think like an investor. Understand how capital flows and decisions get made.'
              },
              {
                title: 'Join',
                desc: 'Find your place at a high-growth company. Operators, engineers, designers: startups need all of it.'
              },
              {
                title: 'Found',
                desc: 'Build something new. We support student founders with community, mentorship, and connections.'
              },
            ].map((mod) => (
              <div
                key={mod.title}
                className="p-8 border border-[#fcf7f0]/20 rounded-xl hover:border-[#01A072]/50 hover:bg-[#fcf7f0]/5 transition-all group"
              >
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
