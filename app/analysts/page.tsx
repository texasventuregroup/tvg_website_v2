import Image from 'next/image';
import Link from 'next/link';

const experienceCards = [
  {
    title: 'Training & Development',
    image: '/images/analysts/training-development.jpeg',
    description:
      'Comprehensive training in venture capital fundamentals, financial modeling, and market analysis through structured workshops and hands-on projects.',
    featured: false,
  },
  {
    title: 'Network Building',
    image: '/images/analysts/networking.png',
    description:
      'Connect with industry professionals, successful entrepreneurs, and fellow analysts through regular networking events and social gatherings.',
    featured: true,
  },
  {
    title: 'Project Work',
    image: '/images/analysts/project_work.png',
    description:
      'Work on real investment opportunities, conduct due diligence, and present findings to the investment committee.',
    featured: false,
  },
];

const processSteps = [
  {
    number: 1,
    title: 'Information Sessions & Coffee Chats',
    description:
      "Attend our information sessions to learn more about TVG and meet current members. We also host coffee chats throughout the start of the semester for prospective applicants to connect with our team one-on-one.",
    fullWidth: true,
  },
  {
    number: 2,
    title: 'Application',
    description:
      'Submit your resume and complete our application form, sharing your interest in venture capital and relevant experience.',
  },
  {
    number: 3,
    title: 'Interview',
    description:
      'Selected candidates will be invited for interviews with current members to discuss their background and interests.',
  },
  {
    number: 4,
    title: 'Case Study',
    description:
      'Demonstrate your analytical abilities through a case study analysis of a potential investment opportunity.',
  },
  {
    number: 5,
    title: 'Final Decision',
    description:
      "Successful candidates will be notified and begin their journey with TVG's analyst program.",
  },
];

export default function Analysts() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero hero--compact">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-xl)' }}>
            <div className="hero__content animate-in">
              <h1 className="hero__title">Analyst Program</h1>
              <p className="hero__text">
                Our Analyst Program provides comprehensive training in venture capital fundamentals
                through hands-on experience. Members learn essential skills in deal evaluation, market
                analysis, and due diligence while working on real investment opportunities. The program
                culminates in formal pitch presentations where analysts evaluate startups and defend
                their investment theses, preparing them for future roles in venture capital and the
                broader startup ecosystem.
              </p>
              <div className="button-group">
                <span
                  className="button button--primary"
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                >
                  Applications Closed
                </span>
                <a href="mailto:contact.txventuregroup@gmail.com" className="button">
                  Learn More
                </a>
              </div>
            </div>
            <div style={{ flexShrink: 0, width: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src="/images/analysts/tvg_pitch.jpg"
                alt="TVG Analysts"
                width={600}
                height={400}
                style={{ objectFit: 'cover', width: '100%', height: 'auto', borderRadius: 8 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview Section */}
      <section className="content-section" id="program-overview">
        <div className="container">
          <h2 className="content-section__title">Program Overview</h2>
          <div className="cards-horizontal">
            <div className="card">
              <h3 className="card__title">Research & Analysis</h3>
              <p className="card__text">
                Conduct in-depth market research, analyze industry trends, and evaluate startup
                opportunities. Work directly with portfolio companies and potential investments.
              </p>
            </div>
            <div className="card card--featured">
              <h3 className="card__title">Hands-on Experience</h3>
              <p className="card__text">
                Gain practical experience in venture capital operations, due diligence processes, and
                investment analysis through real-world projects.
              </p>
            </div>
            <div className="card">
              <h3 className="card__title">Mentorship</h3>
              <p className="card__text">
                Work closely with experienced principals and associates who provide guidance and
                support throughout your journey in venture capital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analyst Experience Section */}
      <section className="content-section" id="experience">
        <div className="container">
          <h2 className="content-section__title">The Analyst Experience</h2>
          <div className="cards-horizontal">
            {experienceCards.map((card) => (
              <div key={card.title} className={`card ${card.featured ? 'card--featured' : ''}`}>
                <div className="card__image-container">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={400}
                    height={250}
                    className="card__image"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="card__title">{card.title}</h3>
                <p className="card__text">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="content-section" id="apply">
        <div className="container">
          <h2 className="content-section__title">Application Process</h2>
          <p className="content-section__text">
            Applications for the Fall 2025 cohort are open through September 7th. The selection
            process includes:
          </p>
          <div className="process-grid">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="process-card"
                style={step.fullWidth ? { gridColumn: '1 / -1' } : undefined}
              >
                <h3 className="process-card__title">
                  <span className="process-card__number">{step.number}</span>
                  {step.title}
                </h3>
                <p className="process-card__text">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA Section */}
      <section className="content-section">
        <div className="container">
          <div className="content-section__inner text-center">
            <h2 className="content-section__title">Ready to Join?</h2>
            <p className="content-section__text">
              Ready to dive into the world of venture capital? Applications for the Fall 2025 cohort
              are now closed. Stay tuned for Spring 2026 opportunities to join TVG&apos;s analyst program!
            </p>
            <div className="button-group button-group--centered">
              <span
                className="button button--primary"
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              >
                Applications Closed
              </span>
              <Link href="/join" className="button">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
