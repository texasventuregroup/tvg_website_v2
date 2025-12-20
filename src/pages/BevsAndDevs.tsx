export default function BevsAndDevs() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__content animate-in">
            <div className="hero__logo-container">
              <img
                src="/images/logo/bevs-and-devs.jpg"
                alt="Bevs & Devs Logo"
                className="hero__logo"
              />
            </div>
            <h1 className="hero__title">Bevs & Devs</h1>
            <p className="hero__text">
              Biweekly coworking sessions bringing together UT's top builders and hackers. Join us for
              coffee, collaboration, and community.
            </p>
            <div className="button-group">
              <a href="#schedule" className="button button--primary">
                View Schedule
              </a>
              <a href="#join" className="button">
                Join Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="content-section">
        <div className="container">
          <div
            className="content-section__inner"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xl)',
              flexWrap: 'wrap',
            }}
          >
            <div className="content-section__text-content" style={{ flex: 1, minWidth: '300px' }}>
              <h2 className="content-section__title">About the Program</h2>
              <p className="content-section__text">
                This is a community of UT's top student founders and hackers. Built by founders for
                founders, our coworking sessions accelerate growth and make the journey less lonely.
                We connect students with a fleet of experienced YC-backed mentors and VC firms from
                Austin to SF such as Sputnik, Antler, 1517, and Pear VC.
              </p>
            </div>
            <div
              className="content-section__image-container"
              style={{ flex: 1, minWidth: '300px', maxWidth: '500px' }}
            >
              <img
                src="/images/programs/bevs-devs-zf.jpeg"
                alt="Bevs & Devs Event"
                className="content-section__image"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="content-section" id="schedule">
        <div className="container">
          <h2 className="content-section__title">Biweekly Schedule</h2>
          <div className="cards-horizontal">
            <div className="card">
              <h3 className="card__title">Part 1</h3>
              <p className="card__text">Updates</p>
            </div>
            <div className="card">
              <h3 className="card__title">Part 2</h3>
              <p className="card__text">Work Sprint</p>
            </div>
            <div className="card">
              <h3 className="card__title">Part 3</h3>
              <p className="card__text">Casual Open Demos</p>
            </div>
          </div>
          <div className="rules-banner">
            <div className="rules-banner__item">
              <i className="fas fa-clock"></i>
              <span>Be on time</span>
            </div>
            <div className="rules-banner__item">
              <i className="fas fa-ban"></i>
              <span>No schoolwork allowed</span>
            </div>
            <div className="rules-banner__item">
              <i className="fas fa-coffee"></i>
              <span>Snacks and Bevs provided</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Benefits */}
      <section className="content-section">
        <div className="container">
          <h2 className="content-section__title">Community Benefits</h2>
          <div className="cards-grid cards-grid--2col">
            <div className="card card--featured">
              <h3 className="card__title">Expert Mentorship</h3>
              <p className="card__text">
                Connect with experienced YC-backed mentors and VC firms from Austin to SF including
                Sputnik, Antler, 1517, and Pear VC.
              </p>
            </div>
            <div className="card">
              <h3 className="card__title">Founder Community</h3>
              <p className="card__text">
                Join a community of UT's top student founders and hackers. Built by founders for
                founders, our coworking sessions accelerate growth and make the journey less lonely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="content-section" id="join">
        <div className="container">
          <h2 className="content-section__title">Sponsored By</h2>
          <div className="card card--sponsor">
            <img src="/images/logo/Teal_Sputnik.png" alt="Sputnik VC Logo" className="sponsor-logo" />
            <div className="card__content">
              <h3 className="card__title">Sputnik VC</h3>
              <p className="card__text">
                Proudly sponsored by Sputnik VC, supporting the next generation of student founders
                and innovators.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
