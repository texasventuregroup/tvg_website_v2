'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ApplySession, StationId, defaultSession, loadSession,
  requiredComplete, saveSession, stationComplete,
} from './game/state';
import { StationRouter } from './game/Stations';
import type { Interaction } from './game/Engine';
import type { Facing } from './game/map';
import { AVATARS, makeCharacter, CharPalette } from './game/tileset';

const Engine = dynamic(() => import('./game/Engine'), { ssr: false });

export default function ApplyClient() {
  const [mode, setMode] = useState<'world' | 'form'>('world');
  const [session, setSession] = useState<ApplySession | null>(null);
  const [station, setStation] = useState<StationId | null>(null);
  const [dialog, setDialog] = useState<{ lines: string[]; station?: StationId } | null>(null);
  const [dialogIdx, setDialogIdx] = useState(0);
  const [curMap, setCurMap] = useState('town');
  const sessionRef = useRef<ApplySession | null>(null);

  useEffect(() => {
    const s = loadSession();
    sessionRef.current = s;
    setSession(s);
    setCurMap(s.mapId);
  }, []);

  const update = useCallback((patch: Partial<ApplySession>) => {
    setSession((prev) => {
      const next = { ...(prev ?? defaultSession()), ...patch };
      sessionRef.current = next;
      saveSession(next);
      return next;
    });
  }, []);

  const onMove = useCallback((mapId: string, px: number, py: number, facing: Facing) => {
    const prev = sessionRef.current ?? defaultSession();
    if (prev.mapId !== mapId) setCurMap(mapId);
    const next = { ...prev, mapId, px, py, facing };
    sessionRef.current = next;
    saveSession(next);
  }, []);

  const onInteract = useCallback((i: Interaction) => {
    if (i.type === 'sign' && i.text) {
      setDialog({ lines: [i.text] });
      setDialogIdx(0);
    } else if (i.type === 'npc' && i.lines) {
      setDialog({ lines: i.lines, station: i.station });
      setDialogIdx(0);
    }
  }, []);

  const advanceDialog = useCallback(() => {
    setDialog((d) => {
      if (!d) return null;
      if (dialogIdx + 1 >= d.lines.length) {
        if (d.station) setStation(d.station);
        setDialogIdx(0);
        return null;
      }
      setDialogIdx(dialogIdx + 1);
      return d;
    });
  }, [dialogIdx]);

  const toggleMode = useCallback(() => {
    setMode((m) => {
      if (m === 'form') {
        // re-sync React session from the ref so the engine remounts at the latest position
        if (sessionRef.current) setSession({ ...sessionRef.current });
        return 'world';
      }
      return 'form';
    });
  }, []);

  if (!session) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#2e6b3f] font-mono text-white">
        Loading TVG Grove…
      </div>
    );
  }

  const paused = station !== null || dialog !== null || mode === 'form' || !session.registered;
  const required: { id: StationId; label: string }[] = [
    { id: 'welcome', label: 'Visitor Cabin' },
    { id: 'whytvg', label: 'TVG Hall' },
    { id: 'artifact', label: 'Archive House' },
    { id: 'lab', label: 'Research Lab' },
  ];

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden bg-[#2e6b3f]">
      {mode === 'world' && (
        <Engine key={session.avatar} session={session} onInteract={onInteract} onMove={onMove} paused={paused} />
      )}

      {/* plain form (below the control bar) */}
      {mode === 'form' && <PlainForm session={session} update={update} />}

      {/* registration intro for new applicants */}
      {!session.registered && <IntroScreen update={update} />}

      {/* HUD checklist - hidden inside buildings and while dialog/forms are up */}
      {mode === 'world' && !curMap.startsWith('int-') && !dialog && !station && (
        <div className="pointer-events-none absolute left-4 top-4 z-40 select-none">
          <div className="pointer-events-auto border-2 border-[#20242c] bg-[#fffdf4] px-4 py-3 shadow-[4px_4px_0_0_rgba(32,36,44,0.4)] outline outline-2 outline-offset-2 outline-[#fffdf4]">
            <div className="mb-1 font-mono text-xs font-bold uppercase tracking-widest text-[#bf5700]">
              TVG Application · Fall 2026
            </div>
            <p className="mb-2 max-w-[15rem] font-mono text-xs text-[#2b3b2f]">
              ▸ {nextObjective(session)}
            </p>
            <ul className="space-y-0.5 font-mono text-xs text-[#2b3b2f]">
              {required.map((r) => (
                <li key={r.id}>
                  {stationComplete(session, r.id) ? '☑' : '☐'} {r.label}
                </li>
              ))}
              <li className="pt-1 text-gray-500">
                ◆ Puzzles solved: {Object.keys(session.puzzleAnswers).length}/2 (optional)
              </li>
            </ul>
            {requiredComplete(session) && !session.submitted && (
              <button
                className="mt-2 w-full border-2 border-[#20242c] bg-[#2e7d32] px-2 py-1 font-mono text-xs font-bold text-white hover:bg-[#3a9440]"
                onClick={() => update({ submitted: true })}
              >
                ▸ SUBMIT APPLICATION
              </button>
            )}
            {session.submitted && (
              <div className="mt-2 font-mono text-xs font-bold text-[#2e7d32]">✓ Submitted. We&apos;ll be in touch.</div>
            )}
          </div>
        </div>
      )}

      {/* mode toggle - always on top of both views */}
      <div className="absolute right-4 top-4 z-[60] flex gap-2">
        <button
          onClick={toggleMode}
          className="border-2 border-[#20242c] bg-[#fffdf4] px-3 py-2 font-mono text-xs font-bold text-[#20242c] shadow-[3px_3px_0_0_rgba(32,36,44,0.4)] hover:bg-[#f2ecd8] active:translate-y-[2px] active:shadow-none"
        >
          {mode === 'world' ? '☰ Plain form' : '◆ Back to world'}
        </button>
      </div>

      {mode === 'world' && !dialog && !station && (
        <div className="pointer-events-none absolute bottom-4 right-4 z-40 border-2 border-[#20242c] bg-[#fffdf4]/95 px-3 py-2 font-mono text-[10px] text-[#20242c] shadow-[3px_3px_0_0_rgba(32,36,44,0.4)]">
          ARROWS / WASD move · Z / ENTER interact · M map overview · walk into doorways to enter
        </div>
      )}

      {/* dialog box */}
      {dialog && (
        <DialogBox
          key={`${dialogIdx}-${dialog.lines[dialogIdx]}`}
          text={dialog.lines[dialogIdx]}
          onAdvance={advanceDialog}
        />
      )}

      {/* station interiors */}
      {station && (
        <StationRouter id={station} session={session} update={update} onClose={() => setStation(null)} />
      )}
    </div>
  );
}

// Pokemon-style dialog box with typewriter text
function DialogBox({ text, onAdvance }: { text: string; onAdvance: () => void }) {
  const [shown, setShown] = useState(0);
  const done = shown >= text.length;

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setShown((s) => Math.min(text.length, s + 2)), 18);
    return () => clearInterval(t);
  }, [text, done]);

  const handle = useCallback(() => {
    if (!done) setShown(text.length);
    else onAdvance();
  }, [done, text, onAdvance]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (['Enter', ' ', 'z', 'Z', 'e', 'E'].includes(e.key)) {
        e.preventDefault();
        handle();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [handle]);

  return (
    <div className="absolute inset-x-0 bottom-6 z-50 mx-auto w-full max-w-2xl px-4">
      <div
        className="cursor-pointer border-2 border-[#20242c] bg-[#fffdf4] p-4 shadow-[5px_5px_0_0_rgba(32,36,44,0.45)] outline outline-2 outline-offset-2 outline-[#fffdf4]"
        onClick={handle}
      >
        <p className="min-h-[3rem] font-mono text-sm leading-relaxed text-[#2b3b2f]">{text.slice(0, shown)}</p>
        {done && <p className="mt-1 animate-bounce text-right font-mono text-xs text-[#bf5700]">▼</p>}
      </div>
    </div>
  );
}

function PlainForm({ session, update }: { session: ApplySession; update: (p: Partial<ApplySession>) => void }) {
  const words = (t: string) => (t.trim() ? t.trim().split(/\s+/).length : 0);
  return (
    <div className="absolute inset-0 z-20 overflow-y-auto bg-[#f8f4e0] pt-20">
      <div className="mx-auto max-w-2xl px-6 pb-24">
        <h1 className="mb-1 font-mono text-2xl font-bold text-[#2b3b2f]">TVG Application - Fall 2026</h1>
        <p className="mb-8 font-mono text-sm text-gray-600">
          Same application, no walking required. Progress syncs with the world.
        </p>

        <Section title="1 · About you">
          <input className={pfInput} placeholder="Full name" value={session.name}
            onChange={(e) => update({ name: e.target.value })} />
          <input className={pfInput} placeholder="UT email" value={session.email}
            onChange={(e) => update({ email: e.target.value })} />
          <label className="mt-2 flex items-center gap-2 font-mono text-xs text-[#2b3b2f]">
            <input type="checkbox" checked={session.welcomeDone}
              onChange={(e) => update({ welcomeDone: e.target.checked })} />
            I&apos;ve read how the application works (four parts below; puzzles optional).
          </label>
        </Section>

        <Section title="2 · Short answers (2-3 sentences each)">
          {session.whyTvg.map((qa, i) => (
            <div key={i} className="mb-4">
              <label className="mb-1 block font-mono text-sm font-bold text-[#2b3b2f]">{qa.q}</label>
              <textarea className={`${pfInput} h-24`} value={qa.a}
                onChange={(e) => update({ whyTvg: session.whyTvg.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)) })} />
            </div>
          ))}
        </Section>

        <Section title="3 · Artifact">
          <p className="mb-2 font-mono text-xs text-gray-600">
            An essay on any topic you genuinely care about (~300-500 words · currently {words(session.artifactEssay)}), plus your resume.
          </p>
          <textarea className={`${pfInput} h-56`} value={session.artifactEssay}
            onChange={(e) => update({ artifactEssay: e.target.value })} />
          <input type="file" accept=".pdf" className="mt-2 font-mono text-xs"
            onChange={(e) => update({ artifactResumeName: e.target.files?.[0]?.name ?? '' })} />
          {session.artifactResumeName && <p className="mt-1 font-mono text-xs text-green-800">✓ {session.artifactResumeName}</p>}
        </Section>

        <Section title="4 · Paper + video">
          <p className="font-mono text-sm text-[#2b3b2f]">
            The reading and 3-minute video recording live in the world - enter the <b>Research Lab</b> (the big house
            southeast of the crossroads). {session.labVideoSubmitted ? '✓ Done.' : 'Not done yet.'}
          </p>
        </Section>

        <p className="font-mono text-xs text-gray-500">
          Optional puzzles are only in the world (follow the east road into the Puzzle Woods). Everything autosaves to this device.
        </p>
      </div>
    </div>
  );
}

const pfInput =
  'mb-2 w-full rounded border-2 border-[#2b3b2f] bg-white p-2 font-mono text-sm text-[#2b3b2f] focus:outline-none focus:ring-2 focus:ring-[#bf5700]';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 border-b-2 border-[#2b3b2f] pb-1 font-mono text-lg font-bold text-[#2b3b2f]">{title}</h2>
      {children}
    </section>
  );
}


function nextObjective(s: ApplySession): string {
  if (!stationComplete(s, 'welcome')) return 'Enter the Visitor Cabin (north-west house) to get oriented.';
  if (!stationComplete(s, 'whytvg')) return 'Head to TVG Hall (big blue-roof house, north-east) for your interview questions.';
  if (!stationComplete(s, 'artifact')) return 'Visit the Archive House (west) to leave your essay + resume.';
  if (!stationComplete(s, 'lab')) return 'Go to the Research Lab (south-east) - read the paper, record your video.';
  if (!s.submitted) return 'All required steps done! Submit below - or try the Puzzle Woods (east road).';
  return 'Application submitted. The Puzzle Woods are still open if you want the leaderboard.';
}

function AvatarPreview({ pal, big }: { pal: CharPalette; big?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const g = c.getContext('2d')!;
    g.imageSmoothingEnabled = false;
    g.clearRect(0, 0, c.width, c.height);
    g.drawImage(makeCharacter(pal).down[0], 0, 0, 16, 24, 0, 0, c.width, c.height);
  }, [pal]);
  const w = big ? 64 : 48;
  return <canvas ref={ref} width={w} height={(w / 16) * 24} style={{ imageRendering: 'pixelated' }} />;
}

function IntroScreen({ update }: { update: (p: Partial<ApplySession>) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(0);
  const ready = name.trim().length > 1 && /.+@.+\..+/.test(email);
  return (
    <div className="absolute inset-0 z-[70] flex items-center justify-center bg-[#10160f]/90 p-4">
      <div className="w-full max-w-lg border-2 border-[#20242c] bg-[#fdf9ea] p-6 shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] outline outline-2 outline-offset-2 outline-[#fdf9ea]">
        <h1 className="font-mono text-xl font-bold uppercase tracking-widest text-[#bf5700]">TVG Grove</h1>
        <p className="mb-4 mt-1 font-mono text-xs text-[#2b3b2f]">
          Fall 2026 application · Explore the town. Four marked houses hold the four parts of
          your application - walk into a doorway to enter, and talk to the host inside (Z).
          Everything autosaves, so you can leave and come back.
        </p>
        <label className="mb-1 block font-mono text-xs font-bold text-[#2b3b2f]">YOUR NAME</label>
        <input
          className="mb-3 w-full border-2 border-[#20242c] bg-white p-2 font-mono text-sm text-[#2b3b2f] focus:outline-none focus:ring-2 focus:ring-[#bf5700]"
          value={name} onChange={(e) => setName(e.target.value)} placeholder="Bevo Longhorn" autoFocus
        />
        <label className="mb-1 block font-mono text-xs font-bold text-[#2b3b2f]">UT EMAIL</label>
        <input
          className="mb-3 w-full border-2 border-[#20242c] bg-white p-2 font-mono text-sm text-[#2b3b2f] focus:outline-none focus:ring-2 focus:ring-[#bf5700]"
          value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@utexas.edu"
        />
        <label className="mb-1 block font-mono text-xs font-bold text-[#2b3b2f]">CHOOSE YOUR TRAINER</label>
        <div className="mb-4 flex gap-3">
          {AVATARS.map((a, i) => (
            <button
              key={a.name}
              onClick={() => setAvatar(i)}
              className={`flex flex-col items-center gap-1 border-2 p-2 ${
                avatar === i ? 'border-[#bf5700] bg-[#fce8d4]' : 'border-[#20242c] bg-white hover:bg-gray-50'
              }`}
            >
              <AvatarPreview pal={a.pal} />
              <span className="font-mono text-[10px] font-bold text-[#2b3b2f]">{a.name}</span>
            </button>
          ))}
        </div>
        <button
          disabled={!ready}
          onClick={() => update({ name: name.trim(), email: email.trim(), avatar, registered: true })}
          className="w-full border-2 border-[#20242c] bg-[#c25c10] px-4 py-2 font-mono text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(32,36,44,0.4)] hover:bg-[#d8692a] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          ▸ ENTER TVG GROVE
        </button>
      </div>
    </div>
  );
}
