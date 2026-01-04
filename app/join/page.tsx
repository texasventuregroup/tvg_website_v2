import { promises as fs } from 'fs';
import path from 'path';
import LogoCarousel, { CarouselLogo } from '../components/LogoCarousel';
import Countdown from '../components/Countdown';

const APPLICATION_DEADLINE = new Date('2025-09-07T23:59:00-06:00');

async function getCarouselLogos(): Promise<CarouselLogo[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'carousel-logos.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.logos || [];
}

export default async function Join() {
  const carouselLogos = await getCarouselLogos();

  return (
    <>
      <section className="hero hero--compact">
        <div className="container">
          <div className="hero__content animate-in">
            <h1 className="hero__title">Join TVG</h1>
            <p className="hero__text">
              Applications for the Fall 2025 cohort are now closed. Stay tuned for Spring 2026
              opportunities to join UT&apos;s premier venture capital and startup community.
            </p>
            <div className="rules-banner">
              <div className="rules-banner__item">
                <i className="fas fa-calendar"></i>
                <span>Applications Closed</span>
              </div>
              <div className="rules-banner__item">
                <i className="fas fa-clock"></i>
                <span>Fall 2025 Cohort</span>
              </div>
            </div>

            <Countdown
              targetDate={APPLICATION_DEADLINE}
              deadlineText="September 7, 2025 at 11:59 PM CST"
            />

            <div className="button-group button-group--centered" style={{ marginTop: 'var(--spacing-lg)' }}>
              <span className="button button--primary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                Applications Closed
              </span>
              <a href="mailto:contact.txventuregroup@gmail.com" className="button">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="logo-carousel-section" data-animate>
        <div className="container">
          <h2 className="logo-carousel-section__title">Placement.</h2>
          <p className="logo-carousel-section__subtitle">
            Internship and full-time offers include the firms below:
          </p>
          <LogoCarousel logos={carouselLogos} />
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2 className="content-section__title">Why Join TVG?</h2>
          <div className="cards-horizontal">
            <div className="card">
              <h3 className="card__title">Hands-on Experience</h3>
              <p className="card__text">
                Work directly with startups, conduct due diligence, and learn venture capital
                fundamentals through real-world practice.
              </p>
            </div>
            <div className="card card--featured">
              <h3 className="card__title">Network Access</h3>
              <p className="card__text">
                Connect with VC alumni, successful founders, and industry professionals in the Texas
                startup ecosystem.
              </p>
            </div>
            <div className="card">
              <h3 className="card__title">Career Development</h3>
              <p className="card__text">
                Access exclusive internship opportunities, mentorship programs, and career guidance
                in venture capital and startups.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h2 className="content-section__title">Application Process</h2>
          <div className="application-grid">
            <div className="application-card">
              <h3 className="application-card__title">Who We&apos;re Looking For</h3>
              <p className="application-card__description">
                Passionate students interested in venture capital, startups, and innovation. All
                majors welcome - no prior experience required.
              </p>
            </div>
            <div className="application-card">
              <h3 className="application-card__title">Time Commitment</h3>
              <p className="application-card__description">
                Weekly meetings, project work, and networking events designed to complement your
                academic schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" id="faq">
        <div className="container">
          <h2 className="content-section__title">Frequently Asked Questions</h2>
          <div className="cards-grid cards-grid--2col">
            <div className="card">
              <h3 className="card__title">How can I join TVG?</h3>
              <p className="card__text">
                Applications for our analyst class open each semester. We look for passionate
                students interested in venture capital, startups, and innovation. No prior experience
                is required.
              </p>
            </div>
            <div className="card">
              <h3 className="card__title">What programs do you offer?</h3>
              <p className="card__text">
                We offer several programs including our Analyst Program, Associates Program, and Bevs
                & Devs community. Each program provides hands-on experience in venture capital and entrepreneurship.
              </p>
            </div>
            <div className="card">
              <h3 className="card__title">Do I need to be a business major?</h3>
              <p className="card__text">
                No, we welcome students from all majors and backgrounds. Our community benefits from
                diverse perspectives and skill sets.
              </p>
            </div>
            <div className="card">
              <h3 className="card__title">What is the time commitment?</h3>
              <p className="card__text">
                Time commitment varies by program but typically involves weekly meetings, project
                work, and events. We work to ensure our activities complement your academic schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="content-section__inner text-center">
            <h2 className="content-section__title">Applications Closed</h2>
            <p className="content-section__text">
              Applications for the Fall 2025 cohort are now closed. Stay connected with TVG and
              watch for Spring 2026 opportunities to join UT&apos;s leading venture capital community.
            </p>
            <div className="button-group button-group--centered">
              <span className="button button--primary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                Applications Closed
              </span>
              <a href="mailto:contact.txventuregroup@gmail.com" className="button">
                Questions? Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
