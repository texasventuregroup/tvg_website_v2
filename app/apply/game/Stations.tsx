'use client';

// Interiors for each building: the actual application steps, styled as
// retro dialog windows over the game.

import { useEffect, useRef, useState } from 'react';
import { ApplySession, StationId, WHY_TVG_QUESTIONS } from './state';

const PAPER = {
  title: 'The Power Law: Venture Capital and the Making of the New Future (excerpt)',
  body: `Venture returns do not follow a normal distribution. They follow a power law: a tiny
number of investments produce nearly all of a fund's returns, while most return little or
nothing. If a fund makes twenty investments, history suggests one or two will matter.

This has strange consequences. A rational venture investor should not ask "is this likely
to work?" — most things that changed the world looked unlikely. The right question is
"if this works, how big can it get?" A 95% chance of failure is acceptable if the 5%
case returns 100x. This is why venture capitalists are systematically drawn to ideas
that sound unreasonable: reasonable ideas have capped upside, and capped upside cannot
carry a portfolio governed by a power law.

The discipline this demands is emotional, not analytical. Power-law investing means being
wrong most of the time in public, and staying in the game long enough for the tail event
to arrive. Funds that cut their winners early — or that diversify into comfort — convert
a power-law portfolio back into a mediocre one. The math rewards conviction held over
years, which is precisely what most humans, and most institutions, find hardest to do.`,
};

function Window({ title, children, onClose, wide }: {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className={`w-full ${wide ? 'max-w-3xl' : 'max-w-xl'} max-h-[85vh] overflow-y-auto border-2 border-[#20242c] bg-[#fdf9ea] shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] outline outline-2 outline-offset-2 outline-[#fdf9ea]`}
        style={{ imageRendering: 'pixelated' }}
      >
        <div className="flex items-center justify-between border-b-2 border-[#20242c] bg-[#f2ecd8] px-4 py-2">
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-[#20242c]">{title}</span>
          {onClose && (
            <button onClick={onClose} className="font-mono font-bold text-[#20242c] hover:text-[#c8341e]" aria-label="Close">
              ✕
            </button>
          )}
        </div>
        <div className="p-5 text-[#2b3b2f]">{children}</div>
      </div>
    </div>
  );
}

const btn =
  'border-2 border-[#20242c] bg-[#c25c10] px-4 py-2 font-mono text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(32,36,44,0.4)] hover:bg-[#d8692a] active:translate-y-[2px] active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none';
const btnGhost =
  'border-2 border-[#20242c] bg-white px-4 py-2 font-mono text-sm font-bold text-[#20242c] shadow-[3px_3px_0_0_rgba(32,36,44,0.25)] hover:bg-gray-100 active:translate-y-[2px] active:shadow-none';
const inputCls =
  'w-full border-2 border-[#20242c] bg-white p-2 font-mono text-sm text-[#2b3b2f] focus:outline-none focus:ring-2 focus:ring-[#bf5700]';

// ---------- Welcome ----------
export function WelcomeStation({ session, update, onClose }: StationProps) {
  const [name, setName] = useState(session.name);
  const [email, setEmail] = useState(session.email);
  const [page, setPage] = useState(0);
  return (
    <Window title="Visitor Cabin" onClose={onClose}>
      {page === 0 ? (
        <div className="space-y-3 font-mono text-sm leading-relaxed">
          <p>
            Oh! A new face. Welcome to <b>TVG Grove</b>.
          </p>
          <p>
            Here&apos;s how it works: four houses hold the four parts of your application.
            Visit them in any order. The puzzle district across the east bridge is optional —
            but the top five solvers go straight to interviews.
          </p>
          <p>Everything you type is saved on this device, so you can leave and come back.</p>
          <p>First — who are you?</p>
          <button className={btn} onClick={() => setPage(1)}>▸ Next</button>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block font-mono text-sm font-bold">Full name</label>
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Bevo Longhorn" />
          <label className="block font-mono text-sm font-bold">UT email</label>
          <input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@utexas.edu" />
          <button
            className={btn}
            disabled={!name.trim() || !/.+@.+\..+/.test(email)}
            onClick={() => {
              update({ name: name.trim(), email: email.trim(), welcomeDone: true });
              onClose();
            }}
          >
            ▸ Register
          </button>
        </div>
      )}
    </Window>
  );
}

// ---------- Why TVG (conversation) ----------
export function WhyTvgStation({ session, update, onClose }: StationProps) {
  const firstUnanswered = session.whyTvg.findIndex((qa) => !qa.a.trim());
  const [idx, setIdx] = useState(firstUnanswered === -1 ? 0 : firstUnanswered);
  const [draft, setDraft] = useState(session.whyTvg[firstUnanswered === -1 ? 0 : firstUnanswered]?.a ?? '');
  const qa = session.whyTvg[idx];
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const save = () => {
    const next = session.whyTvg.map((x, i) => (i === idx ? { ...x, a: draft } : x));
    update({ whyTvg: next });
  };
  return (
    <Window title={`TVG Hall — question ${idx + 1} of ${WHY_TVG_QUESTIONS.length}`} onClose={() => { save(); onClose(); }} wide>
      <div className="space-y-3">
        <p className="font-mono text-sm leading-relaxed">
          <b>Interviewer:</b> {qa.q}
        </p>
        <p className="font-mono text-xs text-gray-600">Answer in 2–3 sentences. ({words} words)</p>
        <textarea
          className={`${inputCls} h-28`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type your answer..."
        />
        <div className="flex gap-2">
          <button
            className={btnGhost}
            disabled={idx === 0}
            onClick={() => { save(); setIdx(idx - 1); setDraft(session.whyTvg[idx - 1].a); }}
          >
            ◂ Back
          </button>
          {idx < WHY_TVG_QUESTIONS.length - 1 ? (
            <button
              className={btn}
              disabled={!draft.trim()}
              onClick={() => { save(); setIdx(idx + 1); setDraft(session.whyTvg[idx + 1].a); }}
            >
              ▸ Next question
            </button>
          ) : (
            <button className={btn} disabled={!draft.trim()} onClick={() => { save(); onClose(); }}>
              ▸ Done
            </button>
          )}
        </div>
      </div>
    </Window>
  );
}

// ---------- Artifact (essay + resume) ----------
export function ArtifactStation({ session, update, onClose }: StationProps) {
  const [essay, setEssay] = useState(session.artifactEssay);
  const [resumeName, setResumeName] = useState(session.artifactResumeName);
  const fileRef = useRef<HTMLInputElement>(null);
  const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  return (
    <Window title="Archive House — your artifact" onClose={onClose} wide>
      <div className="space-y-3">
        <p className="font-mono text-sm leading-relaxed">
          The archivist slides a blank page across the desk. <b>&quot;Leave something behind.
          An essay on any topic you actually care about. And your resume, for the record.&quot;</b>
        </p>
        <p className="font-mono text-xs text-gray-600">Essay — any topic, ~300–500 words. ({words} words)</p>
        <textarea
          className={`${inputCls} h-56`}
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Write about anything you find genuinely interesting..."
        />
        <div className="flex items-center gap-3">
          <button className={btnGhost} onClick={() => fileRef.current?.click()}>
            {resumeName ? '↻ Replace resume' : '⇧ Attach resume (PDF)'}
          </button>
          {resumeName && <span className="font-mono text-xs">{resumeName} ✓</span>}
          <input
            ref={fileRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setResumeName(f.name);
            }}
          />
        </div>
        <button
          className={btn}
          onClick={() => {
            update({ artifactEssay: essay, artifactResumeName: resumeName });
            onClose();
          }}
        >
          ▸ Save to archive
        </button>
      </div>
    </Window>
  );
}

// ---------- Lab (paper + video) ----------
export function LabStation({ session, update, onClose }: StationProps) {
  const [phase, setPhase] = useState<'paper' | 'record' | 'done'>(
    session.labVideoSubmitted ? 'done' : session.labPaperOpened ? 'record' : 'paper',
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const MAX = 180;

  useEffect(() => {
    let t: ReturnType<typeof setInterval>;
    if (recording) t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  useEffect(() => {
    if (recording && seconds >= MAX) stopRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, recording]);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.play();
      }
      setErr('');
    } catch {
      setErr('Camera/mic access denied. Enable permissions and try again.');
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    chunksRef.current = [];
    const rec = new MediaRecorder(streamRef.current);
    rec.ondataavailable = (e) => chunksRef.current.push(e.data);
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setBlobUrl(URL.createObjectURL(blob));
    };
    rec.start();
    recorderRef.current = rec;
    setSeconds(0);
    setRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <Window title="Research Lab" onClose={onClose} wide>
      {phase === 'paper' && (
        <div className="space-y-3">
          <p className="font-mono text-sm">
            The researcher hands you a paper. <b>&quot;Read this. Then explain it back to me on
            camera — three minutes, your own words. I care that you understood it, not that
            you memorized it.&quot;</b>
          </p>
          <div className="border-2 border-[#20242c] bg-white p-4">
            <h3 className="mb-2 font-mono text-sm font-bold">{PAPER.title}</h3>
            <div className="whitespace-pre-line font-serif text-sm leading-relaxed">{PAPER.body}</div>
          </div>
          <button
            className={btn}
            onClick={() => { update({ labPaperOpened: true }); setPhase('record'); }}
          >
            ▸ I&apos;ve read it — set up the camera
          </button>
        </div>
      )}
      {phase === 'record' && (
        <div className="space-y-3">
          <p className="font-mono text-sm">
            Explain the core idea of the paper in up to <b>3 minutes</b>. One take is fine.
            You can re-read the paper anytime.
          </p>
          <video ref={videoRef} className="aspect-video w-full rounded border-2 border-[#2b3b2f] bg-black" />
          {err && <p className="font-mono text-xs text-red-700">{err}</p>}
          <div className="flex flex-wrap items-center gap-2">
            {!streamRef.current?.active && <button className={btnGhost} onClick={startCamera}>◉ Enable camera</button>}
            {!recording && !blobUrl && (
              <button className={btn} onClick={startRecording} disabled={!streamRef.current}>
                ● Start recording
              </button>
            )}
            {recording && (
              <button className={btn} onClick={stopRecording}>
                ■ Stop ({Math.floor((MAX - seconds) / 60)}:{String((MAX - seconds) % 60).padStart(2, '0')} left)
              </button>
            )}
            {blobUrl && (
              <>
                <a className={btnGhost} href={blobUrl} download={`tvg-video-${session.name || 'applicant'}.webm`}>
                  ⇩ Download my take
                </a>
                <button className={btnGhost} onClick={() => { setBlobUrl(null); setSeconds(0); }}>
                  ↻ Re-record
                </button>
                <button
                  className={btn}
                  onClick={() => { update({ labVideoSubmitted: true }); setPhase('done'); }}
                >
                  ▸ Submit this take
                </button>
              </>
            )}
            <button className={btnGhost} onClick={() => setPhase('paper')}>☰ Re-read paper</button>
          </div>
          <p className="font-mono text-xs text-gray-600">
            Recording stops automatically at 3:00. Download a copy for yourself — you&apos;ll
            attach it when you submit.
          </p>
        </div>
      )}
      {phase === 'done' && (
        <div className="space-y-3 font-mono text-sm">
          <p><b>&quot;Got it. Nice work.&quot;</b> The researcher stamps your file. ✓</p>
          <button className={btn} onClick={onClose}>▸ Leave the lab</button>
        </div>
      )}
    </Window>
  );
}

// ---------- Puzzles ----------
const CIPHER = {
  prompt:
    'A note is pinned to the wall: "GUR ORFG GVZR GB CYNAG N GERR JNF GJRAGL LRNEF NTB." Decode it.',
  check: (a: string) => a.toLowerCase().includes('twenty years ago'),
};
const MARKET = {
  prompt:
    'You can invest $100 across two startups. Startup A returns 0x with prob 0.9 and 50x with prob 0.1. ' +
    'Startup B returns 2x with certainty. To maximize EXPECTED value, how much goes into A? (just the number)',
  check: (a: string) => /^\$?\s*100\s*$/.test(a.trim()),
};

export function PuzzleStation({ session, update, onClose, which }: StationProps & { which: 'cipher' | 'market' }) {
  const puzzle = which === 'cipher' ? CIPHER : MARKET;
  const solvedAlready = !!session.puzzleAnswers[which];
  const [answer, setAnswer] = useState(session.puzzleAnswers[which] ?? '');
  const [alias, setAlias] = useState(session.leaderboardAlias);
  const [wrong, setWrong] = useState(false);
  const [solved, setSolved] = useState(solvedAlready);
  return (
    <Window title={which === 'cipher' ? 'Puzzle Den' : 'Trading Post'} onClose={onClose}>
      <div className="space-y-3 font-mono text-sm">
        <p className="leading-relaxed">{puzzle.prompt}</p>
        {!solved ? (
          <>
            <input className={inputCls} value={answer} onChange={(e) => { setAnswer(e.target.value); setWrong(false); }} placeholder="Your answer" />
            {wrong && <p className="text-xs text-red-700">Not quite. Sit with it — that&apos;s the point.</p>}
            <button
              className={btn}
              onClick={() => {
                if (puzzle.check(answer)) {
                  setSolved(true);
                  update({ puzzleAnswers: { ...session.puzzleAnswers, [which]: answer } });
                } else setWrong(true);
              }}
            >
              ▸ Submit
            </button>
          </>
        ) : (
          <>
            <p className="text-green-800">✓ Solved. Nicely done.</p>
            <label className="block text-xs font-bold">Leaderboard alias (anonymous)</label>
            <input className={inputCls} value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="e.g. night_owl_42" />
            <button className={btn} onClick={() => { update({ leaderboardAlias: alias }); onClose(); }}>
              ▸ Post to leaderboard
            </button>
          </>
        )}
      </div>
    </Window>
  );
}

// ---------- shared ----------
export interface StationProps {
  session: ApplySession;
  update: (patch: Partial<ApplySession>) => void;
  onClose: () => void;
}

export function StationRouter({ id, ...props }: StationProps & { id: StationId }) {
  switch (id) {
    case 'welcome': return <WelcomeStation {...props} />;
    case 'whytvg': return <WhyTvgStation {...props} />;
    case 'artifact': return <ArtifactStation {...props} />;
    case 'lab': return <LabStation {...props} />;
    case 'puzzle-cipher': return <PuzzleStation {...props} which="cipher" />;
    case 'puzzle-market': return <PuzzleStation {...props} which="market" />;
  }
}
