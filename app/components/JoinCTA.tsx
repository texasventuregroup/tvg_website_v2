'use client';

import JoinButton from './JoinButton';

interface JoinCTAProps {
  title?: string;
  description?: string;
}

export default function JoinCTA({
  title = 'Join Our Community',
  description = "Ready to be part of Texas's leading student venture group? Applications for the Spring 2026 cohort are now open!",
}: JoinCTAProps) {
  return (
    <section className="content-section" data-animate>
      <div className="container">
        <div className="content-section__inner text-center">
          <h2 className="content-section__title">{title}</h2>
          <p className="content-section__text">{description}</p>
          <div className="button-group button-group--centered">
            <JoinButton className="button button--primary">
              Apply Now
            </JoinButton>
            <a href="mailto:contact.txventuregroup@gmail.com" className="button">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
