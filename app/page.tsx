import Image from 'next/image';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import LogoCarousel, { CarouselLogo } from './components/LogoCarousel';
import JoinButton from './components/JoinButton';
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
    id: '01',
    title: 'Analysts',
    description: 'Fundamental investing education. Market research, diligence, and thesis generation.',
    link: '/analysts',
    image: '/images/analysts/tvg_pitch.jpg'
  },
  {
    id: '02',
    title: 'Associates',
    description: 'Portfolio management and sourcing. Working directly with partner firms.',
    link: '/associates',
    image: '/images/analysts/networking.png'
  },
  {
    id: '03',
    title: 'Research',
    description: 'Deep dives into emerging verticals. Publishing white papers and industry maps.',
    link: '/associates',
    image: '/images/research/future-of-compute.webp'
  },
  {
    id: '04',
    title: 'Hackathons',
    description: 'Our flagship building events. Join hundreds of students to build, pitch, and win prizes.',
    link: '/hackathons',
    image: '/images/events/bevs-devs-zf.webp'
  },
];

const cultureValues = [
  {
    title: 'GENUINE CURIOSITY',
    image: '/images-rebrand/image copy 2.png'
  },
  {
    title: 'HIGH AGENCY',
    image: '/images-rebrand/image copy 3.png'
  },
  {
    title: 'LONG-TERM THINKING',
    image: '/images-rebrand/image copy 4.png'
  },
];

export default async function Home() {
  const { row1, row2 } = await getCarouselLogos();

  return (
    <main className="bg-[#fcf7f0] text-[#082820]">
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

            {/* Tagline */}
            <p className="font-mono text-base max-w-[400px] leading-relaxed border-l border-[#016F4E] pl-5 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              Exploration is not just about where you go, but who you go with. The ecosystem for student investors and founders at UT Austin.
            </p>
          </div>
        </div>

        {/* SVG Skyline Background */}
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
                />

                {/* Content */}
                <div className="relative z-10">
                  <span className="font-mono text-sm text-[#016F4E] mb-4 block">{program.id}</span>
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
      <section id="mission" className="py-[120px] bg-white">
        <div className="container mx-auto">
          <span className="label mb-6 block">The Mission</span>
          <p className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.2] max-w-[1100px]">
            There wasn&apos;t a place for students <span className="text-[#016F4E]">obsessed</span> with startups. We built Texas Venture Group to be the gravity well for the ambitious, the curious, and the relentless.
          </p>
        </div>
      </section>

      {/* ========== PHILOSOPHY SECTION ========== */}
      <section id="philosophy" className="py-[120px] bg-[#082820] text-[#fcf7f0]">
        <div className="container mx-auto">
          <span className="label text-[#01A072] mb-6 block">Our Philosophy</span>
          <p className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] max-w-[900px] mb-16">
            No single path into startups. We believe in meeting people where they are—whether
            you want to <span className="text-[#01A072]">invest</span>, <span className="text-[#01A072]">join</span>,
            or <span className="text-[#01A072]">found</span>.
          </p>

          {/* Three Modalities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
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

          {/* Areas of Interest */}
          <div className="border-t border-[#fcf7f0]/10 pt-12">
            <span className="label text-[#01A072] mb-8 block">Areas of Interest</span>
            <div className="flex flex-wrap gap-3">
              {[
                'Enterprise Software', 'AI/ML', 'Fintech', 'Climate & Energy',
                'Healthcare', 'Defense Tech', 'Consumer', 'Crypto/Web3',
                'Developer Tools', 'Biotech', 'Robotics', 'Space'
              ].map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 border border-[#fcf7f0]/20 rounded-full text-sm hover:border-[#01A072] hover:text-[#01A072] transition-colors cursor-default"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
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
      <section id="culture" className="py-16 lg:py-[120px]">
        <div className="container mx-auto">
          <span className="label mb-4 block">Culture & Values</span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {cultureValues.map((value) => (
              <div key={value.title} className="culture-card group">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="culture-img group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="culture-label">{value.title}</div>
              </div>
            ))}
          </div>
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
          <JoinButton className="btn-expedition">
            JOIN OUR NEWSLETTER
          </JoinButton>
        </div>
      </section>
    </main>
  );
}
