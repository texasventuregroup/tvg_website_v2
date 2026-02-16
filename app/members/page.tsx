import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import MembersClient from './MembersClient';
import JoinButton from '../components/JoinButton';
import Reveal from '../components/Reveal';

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

async function getMembers(): Promise<MembersData> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'members.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-32 pb-20">
      {/* Hero */}
      <section className="">
        <div className="container mx-auto px-6">
          <Reveal animation="up">
            <span className="block font-mono text-xs md:text-sm text-[#082820]/60 mb-6 tracking-widest uppercase">
              The Team
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#082820] mb-8 leading-[1.1]">
              Our Team
            </h1>
          </Reveal>

          <Reveal animation="up" delay={100}>
            <p className="text-lg md:text-xl text-[#082820]/70 leading-relaxed max-w-xl">
              The people building TVG. Students exploring the frontier of technology and entrepreneurship at UT Austin.
            </p>
          </Reveal>
        </div>
      </section>

      <MembersClient members={members} />

      {/* Join Section */}
      <section className="border-t border-[#082820]/10 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/lecture.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10">
          <span className="label block mb-4">Join Us</span>
          <h2 className="text-4xl font-semibold mb-6">Want To Be Part of This?</h2>
          <p className="text-sm opacity-70 max-w-md mx-auto mb-10">
            Applications for Spring 2026 are closed. Check back for Fall 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 border border-[#082820]/30 opacity-50 cursor-not-allowed text-sm rounded-lg">
              Applications Closed
            </span>
            <JoinButton className="btn-primary">Stay Updated</JoinButton>
          </div>
        </div>
      </section>
    </main>
  );
}
