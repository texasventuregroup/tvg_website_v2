import Image from 'next/image';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import LogoCarousel, { CarouselLogo } from './components/LogoCarousel';
import JoinButton from './components/JoinButton';

async function getCarouselLogos(): Promise<{ row1: CarouselLogo[]; row2: CarouselLogo[] }> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'carousel-logos.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  const logos: CarouselLogo[] = data.logos || [];

  const row1: CarouselLogo[] = [];
  const row2: CarouselLogo[] = [];
  logos.forEach((logo, index) => {
    if (index % 2 === 0) {
      row1.push(logo);
    } else {
      row2.push(logo);
    }
  });

  return { row1, row2 };
}

const programs = [
  {
    title: 'Analysts',
    image: '/images/programs/analysts_3.jpg',
    description: 'Our analyst program is the entry point into TVG. Analysts learn venture capital fundamentals through hands-on experience, working on real projects with startups and VCs. They participate in Special Interest Groups (SIGs) focused on specific industries, conducting market research and sharing insights through regular market watches.',
    link: '/analysts',
  },
  {
    title: 'Associates',
    image: '/images/programs/associates.png',
    description: 'Associates take on leadership roles within TVG, managing client relationships and mentoring analysts. They lead Special Interest Groups (SIGs), coordinate research projects, and work directly with VCs and startups on due diligence, market research, and software development projects.',
    link: '/associates',
  },
  {
    title: 'Research',
    image: '/images/programs/research.jpeg',
    description: 'Our research program produces in-depth market analysis through our Special Interest Groups (SIGs). Members focus on specific industries like Software & AI, Fintech, Climate, or Life Sciences, publishing regular market watches and deep-dive reports that are shared with the broader community.',
    link: '/associates',
  },
  {
    title: 'Bevs & Devs',
    image: '/images/programs/bevs-devs.png',
    description: 'Our community of student founders and builders meets regularly to share ideas, get feedback, and connect with mentors. Members range from early-stage founders to those interested in joining startups.',
    link: '/bevsanddevs',
  },
];

export default async function Home() {
  const { row1, row2 } = await getCarouselLogos();

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background">
          <Image
            src="/images/about/cover.webp"
            alt=""
            fill
            priority
            className="hero__background-image"
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span
              className="application-button"
              style={{ backgroundColor: 'rgba(225, 135, 32, 0.2)', cursor: 'not-allowed', opacity: 0.7 }}
            >
              Applications Closed - Spring 2026 Cohort
            </span>
          </div>
          <div className="hero__content" data-animate>
            <h1 className="hero__title">
              UT Austin&apos;s hub for venture capital learning and startup building.
            </h1>
            <p className="hero__text">
              We&apos;re a group of UT Austin students building a better entrepreneurial ecosystem. We
              support students in joining, building, and investing in early-stage to growth-stage
              ventures.
            </p>
            <div className="button-group">
              <a href="#about" className="button">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}

      {/* Logo Carousel Section */}
      <section className="logo-carousel-section" data-animate>
        <div className="container">
          <h2 className="logo-carousel-section__title">Placement.</h2>
          <p className="logo-carousel-section__subtitle">
            Internship and full-time offers include the firms below:
          </p>
          <LogoCarousel logos={row1} />
          <LogoCarousel logos={row2} reverse />
        </div>
      </section>

      {/* Programs Section */}
      <section className="content-section" id="programs" data-animate>
        <div className="container">
          <h2 className="content-section__title">Our Programs</h2>
          <div className="programs-grid">
            {programs.map((program) => (
              <div key={program.title} className="card" data-animate>
                <div className="card__image-container">
                  <Image
                    src={program.image}
                    alt={`TVG ${program.title}`}
                    width={500}
                    height={300}
                    className="card__image"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="card__title">{program.title}</h3>
                <p className="card__text">{program.description}</p>
                <Link href={program.link} className="card__link">
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="content-section" id="impact">
        <div className="container">
          <h2 className="content-section__title">Our Impact</h2>
          <div className="cards-horizontal">
            <div className="card">
              <h3 className="card__title">Founder Community</h3>
              <p className="card__text">
                We are the only existing touch point for VC-Alumni advisors on campus. Our goal is to
                develop a pipeline of eager, passionate students to join the rapidly growing world of
                venture.
              </p>
            </div>
            <div className="card card--featured">
              <h3 className="card__title">Venture Network</h3>
              <p className="card__text">
                Through our network of alumni and partners, we connect students with leading venture
                capital firms and startups, facilitating internships and full-time opportunities.
              </p>
            </div>
            <div className="card">
              <h3 className="card__title">Educational Resources</h3>
              <p className="card__text">
                We provide comprehensive training in venture capital fundamentals, startup analysis,
                and investment strategies through our structured programs and workshops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="content-section" id="events">
        <div className="container">
          <div
            className="content-section__inner"
            style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-xl)' }}
          >
            <div className="content-section__text-content">
              <h2 className="content-section__title">Events & Activities</h2>
              <p className="content-section__text">
                We host a variety of events aimed at fostering entrepreneurial spirit and providing
                valuable learning experiences. From workshops and pitch nights to networking sessions
                and sprints, our events connect students with industry professionals and innovative
                startups.
              </p>
            </div>
            <div className="content-section__image-container" style={{ flexShrink: 0, margin: 0 }}>
              <Image
                src="/images/events/american_dynamism_pic.jpeg"
                alt="TVG, a16z, Saronic, and Base Power Company"
                width={500}
                height={300}
                className="content-section__image"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="content-section" data-animate>
        <div className="container">
          <div className="content-section__inner text-center">
            <h2 className="content-section__title">Join Our Community</h2>
            <p className="content-section__text">
              Ready to be part of Texas&apos;s leading student venture group? Applications for the Spring
              2026 cohort are now closed. Check back for Fall 2026 opportunities.
            </p>
            <div className="button-group button-group--centered">
              <span
                className="button button--primary"
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              >
                Applications Closed
              </span>
              <JoinButton>
                Learn More
              </JoinButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
