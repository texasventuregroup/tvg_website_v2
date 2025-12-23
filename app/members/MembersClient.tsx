'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function MembersClient({ members }: { members: MembersData }) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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
        <Image
          src={member.image}
          alt={member.name}
          width={300}
          height={300}
          className="team-member__image"
          style={{ objectFit: 'cover' }}
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

  return (
    <>
      {renderSection('Executive Team', members.executiveTeam)}
      {renderSection('Associates', members.associates, false)}
      {members.analysts && members.analysts.length > 0 ? (
        renderSection('Analysts', members.analysts, false)
      ) : (
        <section className="content-section" id="analysts">
          <div className="container">
            <h2 className="content-section__title">Analysts</h2>
            <p className="content-section__text" style={{ textAlign: 'center', margin: '0 auto' }}>
              Recruitment for Spring 2026 analysts will begin in the spring semester. Check back
              later for updates or visit our <Link href="/join">Join</Link> page for more
              information.
            </p>
          </div>
        </section>
      )}
      {renderSection('Alumni', members.alumni, false)}

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
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  width={150}
                  height={150}
                  className="member-popup__image"
                  style={{ objectFit: 'cover' }}
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
