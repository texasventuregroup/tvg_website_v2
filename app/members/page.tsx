import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import MembersClient from './MembersClient';
import JoinCTA from '../components/JoinCTA';

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

// This runs at build time - SSG
async function getMembers(): Promise<MembersData> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'members.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <>
      {/* Hero Section */}
      <section className="hero hero--compact">
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

      <MembersClient members={members} />

      {/* Join Section */}
      <JoinCTA
        title="Join Our Team"
        description="Interested in joining TVG? Applications for the Spring 2026 cohort are now open!"
      />
    </>
  );
}
