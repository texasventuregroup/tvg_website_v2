import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Member {
  name: string;
  role?: string;
  major?: string;
  sig?: string;
  image: string;
  linkedin?: string;
  bio?: string;
  quote?: { text: string; author?: string } | string;
  favoritePart?: string;
  favoriteBook?: string;
  childhoodDream?: string;
}

interface MembersData {
  executiveTeam: Member[];
  chairs: Member[];
  principals: Member[];
  associates: Member[];
  analysts: Member[];
  alumni: Member[];
}

export default function Members() {
  const [members, setMembers] = useState<MembersData | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/members.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load members');
        return res.json();
      })
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMember]);

  const closePopup = () => setSelectedMember(null);

  const renderMemberCard = (member: Member, showRole: boolean = true) => (
    <div
      key={member.name}
      className="team-member"
      onClick={() => setSelectedMember(member)}
      style={{ cursor: 'pointer' }}
    >
      <div className="team-member__image-container">
        <img
          src={member.image}
          alt={member.name}
          className="team-member__image"
          loading="lazy"
          decoding="async"
          width={300}
          height={300}
        />
      </div>
      <h3 className="team-member__name">{member.name}</h3>
      {showRole && member.role && <p className="team-member__role">{member.role}</p>}
      {member.major && <p className="team-member__major">{member.major}</p>}
      {member.sig && <p className="team-member__sig"><i>{member.sig}</i></p>}
      {member.linkedin && (
        <a
          href={member.linkedin}
          className="team-member__link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <i className="fab fa-linkedin"></i>
        </a>
      )}
    </div>
  );

  const renderSection = (title: string, memberList: Member[], showRole: boolean = true) => {
    if (!memberList || memberList.length === 0) return null;
    return (
      <section className="content-section" id={title.toLowerCase().replace(/\s/g, '-')}>
        <div className="container">
          <h2 className="content-section__title">{title}</h2>
          <div className="team-grid">
            {memberList.map((member) => renderMemberCard(member, showRole))}
          </div>
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">Loading...</h1>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">Error</h1>
            <p className="hero__text">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__content animate-in">
            <h1 className="hero__title">Our Team</h1>
            <p className="hero__text">
              Meet the dedicated students driving innovation and entrepreneurship at UT Austin
              through venture capital education and startup support.
            </p>
          </div>
        </div>
      </section>

      {members && (
        <>
          {renderSection('Executive Team', members.executiveTeam)}
          {renderSection('Associates', members.associates, false)}
          {members.analysts && members.analysts.length > 0 ? (
            renderSection('Analysts', members.analysts, false)
          ) : (
            <section className="content-section" id="analysts">
              <div className="container">
                <h2 className="content-section__title">Analysts</h2>
                <div className="content-section__text text-center">
                  <p>
                    Recruitment for Fall 2025 analysts will begin in the fall semester. Check back
                    later for updates or visit our <Link to="/join">Join</Link> page for more
                    information.
                  </p>
                </div>
              </div>
            </section>
          )}
          {renderSection('Alumni', members.alumni, false)}
        </>
      )}

      {/* Join Section */}
      <section className="content-section" id="join">
        <div className="container">
          <div className="content-section__inner text-center">
            <h2 className="content-section__title">Join Our Team</h2>
            <div className="content-section__text text-center mt-4">
              Interested in joining TVG? Applications for the Fall 2025 cohort are now closed. Check
              back for Spring 2026 opportunities to join our team!
            </div>
            <div className="button-group button-group--centered">
              <span
                className="button button--primary"
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              >
                Applications Closed
              </span>
              <Link to="/join" className="button">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Member Popup */}
      {selectedMember && (
        <div className="member-popup-overlay active" onClick={closePopup}>
          <div className="member-popup" onClick={(e) => e.stopPropagation()}>
            <div className="member-popup__close-wrapper">
              <button className="member-popup__close" onClick={closePopup}>
                &times;
              </button>
            </div>

            <div className="member-popup__header">
              <div className="member-popup__image-container">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="member-popup__image"
                />
              </div>
              <div className="member-popup__title">
                <h3 className="member-popup__name">{selectedMember.name}</h3>
                {selectedMember.role && (
                  <p className="member-popup__role">{selectedMember.role}</p>
                )}
                {selectedMember.major && (
                  <p className="member-popup__major">{selectedMember.major}</p>
                )}
                {selectedMember.sig && (
                  <p className="member-popup__major">
                    <i>{selectedMember.sig}</i>
                  </p>
                )}
              </div>
            </div>

            <div className="member-popup__content">
              {selectedMember.quote && (
                <div className="member-popup__quote">
                  <i className="fas fa-quote-left"></i>
                  <p className="member-popup__quote-text">
                    {typeof selectedMember.quote === 'string'
                      ? selectedMember.quote
                      : selectedMember.quote.text}
                    {typeof selectedMember.quote !== 'string' && selectedMember.quote.author && (
                      <span className="member-popup__quote-author">
                        {' '}
                        ― {selectedMember.quote.author}
                      </span>
                    )}
                  </p>
                  <i className="fas fa-quote-right"></i>
                </div>
              )}

              {selectedMember.bio && (
                <div className="member-popup__section">
                  <h4 className="member-popup__section-title">About</h4>
                  <p className="member-popup__section-text">{selectedMember.bio}</p>
                </div>
              )}

              {selectedMember.favoritePart && (
                <div className="member-popup__section">
                  <h4 className="member-popup__section-title">Favorite Part About TVG</h4>
                  <p className="member-popup__section-text">{selectedMember.favoritePart}</p>
                </div>
              )}

              {selectedMember.favoriteBook && (
                <div className="member-popup__section">
                  <h4 className="member-popup__section-title">Favorite Book</h4>
                  <p className="member-popup__section-text">{selectedMember.favoriteBook}</p>
                </div>
              )}

              {selectedMember.childhoodDream && (
                <div className="member-popup__section">
                  <h4 className="member-popup__section-title">Childhood Dream Job</h4>
                  <p className="member-popup__section-text">{selectedMember.childhoodDream}</p>
                </div>
              )}
            </div>

            <div className="member-popup__footer">
              {selectedMember.linkedin && (
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="member-popup__linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                  Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
