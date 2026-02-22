'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useJoinModal } from '../components/SignupModal';

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
  const [activeSection, setActiveSection] = useState<string>('all');
  const { openModal } = useJoinModal();

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedMember]);

  const closePopup = () => setSelectedMember(null);

  // Section filter tabs
  const allMembers = [
    ...(members.executiveTeam || []),
    ...(members.associates || []),
    ...(members.analysts || []),
    ...(members.alumni || []),
  ];

  const sections = [
    { id: 'all', label: 'All', count: allMembers.length },
    { id: 'exec', label: 'Executive', count: members.executiveTeam?.length || 0 },
    { id: 'associates', label: 'Associates', count: members.associates?.length || 0 },
    { id: 'analysts', label: 'Analysts', count: members.analysts?.length || 0 },
    { id: 'alumni', label: 'Alumni', count: members.alumni?.length || 0 },
  ];

  const getCurrentMembers = (): Member[] => {
    switch (activeSection) {
      case 'all': return allMembers;
      case 'exec': return members.executiveTeam || [];
      case 'associates': return members.associates || [];
      case 'analysts': return members.analysts || [];
      case 'alumni': return members.alumni || [];
      default: return allMembers;
    }
  };

  const currentMembers = getCurrentMembers();

  return (
    <>
      {/* Section Tabs */}
      <div className="border-b border-[#082820]/10 sticky top-16 md:top-20 bg-[#fcf7f0] z-40">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all rounded-full ${activeSection === section.id
                  ? 'bg-[#082820] text-[#fcf7f0]'
                  : 'text-[#082820]/70 hover:text-[#082820] hover:bg-[#082820]/5'
                  }`}
              >
                {section.label}
                {section.count > 0 && (
                  <span className="ml-2 text-xs opacity-60">{section.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {currentMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {currentMembers.map((member) => (
                <div
                  key={member.name}
                  className="group cursor-pointer text-center"
                  onClick={() => setSelectedMember(member)}
                >
                  {/* Circular Photo */}
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full bg-[#082820]/5 ring-2 ring-transparent group-hover:ring-[#016F4E] transition-all">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Name & Role */}
                  <h3 className="font-medium text-sm mb-0.5 group-hover:text-[#016F4E] transition-colors truncate">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="text-xs text-[#082820]/50 truncate">{member.role}</p>
                  )}
                  {activeSection !== 'exec' && member.major && (
                    <p className="text-[10px] text-[#082820]/40 truncate mt-0.5">{member.major}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="label block mb-4">
                {activeSection === 'analysts' ? 'Analysts' : 'No Members'}
              </span>
              <p className="text-sm opacity-60 max-w-md mx-auto">
                {activeSection === 'analysts' ? (
                  <>
                    Recruitment for Spring 2026 is complete. Check back for Fall 2026 or{' '}
                    <button onClick={openModal} className="underline hover:opacity-100 transition-opacity">
                      stay updated
                    </button>.
                  </>
                ) : (
                  'No members in this section yet.'
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#082820]/80 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div
            className="bg-[#fcf7f0] text-[#082820] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#082820]/10 transition-colors text-xl"
              onClick={closePopup}
            >
              ×
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Left - Large Image */}
              <div className="md:col-span-1 p-8">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-xl mb-1">{selectedMember.name}</h3>
                {selectedMember.role && (
                  <p className="text-sm text-[#016F4E] font-medium mb-1">{selectedMember.role}</p>
                )}
                {selectedMember.major && (
                  <p className="text-sm opacity-60">{selectedMember.major}</p>
                )}
                {selectedMember.linkedin && (
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#016F4E] hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>

              {/* Right - Details */}
              <div className="md:col-span-2 p-8 border-t md:border-t-0 md:border-l border-[#082820]/10">
                {selectedMember.quote && (
                  <div className="mb-6 border-l-2 border-[#016F4E] pl-4 text-lg italic">
                    <p className="opacity-80">
                      &quot;{typeof selectedMember.quote === 'string' ? selectedMember.quote : selectedMember.quote.text}&quot;
                    </p>
                    {typeof selectedMember.quote !== 'string' && selectedMember.quote.author && (
                      <p className="text-sm mt-2 not-italic opacity-50">— {selectedMember.quote.author}</p>
                    )}
                  </div>
                )}

                {selectedMember.bio && (
                  <div className="mb-6">
                    <span className="label block mb-2">About</span>
                    <p className="text-sm opacity-70 leading-relaxed">{selectedMember.bio}</p>
                  </div>
                )}

                {(selectedMember.favoritePart || selectedMember.favoriteBook || selectedMember.childhoodDream) && (
                  <div className="grid grid-cols-1 gap-4 pt-4 border-t border-[#082820]/10">
                    {selectedMember.favoritePart && (
                      <div>
                        <span className="label block mb-1">Favorite Part of TVG</span>
                        <p className="text-sm opacity-70">{selectedMember.favoritePart}</p>
                      </div>
                    )}
                    {selectedMember.favoriteBook && (
                      <div>
                        <span className="label block mb-1">Favorite Book</span>
                        <p className="text-sm opacity-70">{selectedMember.favoriteBook}</p>
                      </div>
                    )}
                    {selectedMember.childhoodDream && (
                      <div>
                        <span className="label block mb-1">Childhood Dream Job</span>
                        <p className="text-sm opacity-70">{selectedMember.childhoodDream}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
