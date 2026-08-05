'use client';

// Interiors for each building: the actual application steps, styled as
// retro dialog windows over the game.

import { useEffect, useRef, useState } from 'react';
import { ApplySession, StationId, WHY_TVG_QUESTIONS } from './state';
import { PUZZLE_BY_ID } from './puzzles';

const PAPER = {
  title: 'A New Golden Age for Computer Architecture (Hennessy & Patterson, Turing Lecture, CACM 2019)',
  pdf: '/apply/a-new-golden-age-for-computer-architecture.pdf',
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
  return (
    <Window title="Visitor Cabin" onClose={onClose}>
      <div className="space-y-3 font-mono text-sm leading-relaxed">
        <p>
          Welcome{session.name ? `, ${session.name.split(' ')[0]}` : ''}! You&apos;re checked in. Here&apos;s
          the lay of the land:
        </p>
        <ul className="list-none space-y-1">
          <li>◆ <b>TVG Hall</b> (blue roof, north-east): four interview questions, 2 to 3 sentences each.</li>
          <li>◆ <b>Archive House</b> (west): leave an essay on anything you care about, plus your resume.</li>
          <li>◆ <b>Research Lab</b> (east end of the main road): read a short paper, then record a 3-minute video explaining it.</li>
          <li>◆ <b>The outer world</b>: every road out of town leads somewhere with puzzles. Puzzle Woods east, Summit Hollow north, Mirror Lake west, Driftwood Landing south. All optional, all worth bonus points. Top 5 on the leaderboard go straight to interviews.</li>
        </ul>
        <p>Do them in any order. Your progress saves on this device automatically.</p>
        <button
          className={btn}
          onClick={() => {
            update({ welcomeDone: true });
            onClose();
          }}
        >
          ▸ Got it, let&apos;s go
        </button>
      </div>
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
    <Window title={`TVG Hall · question ${idx + 1} of ${WHY_TVG_QUESTIONS.length}`} onClose={() => { save(); onClose(); }} wide>
      <div className="space-y-3">
        <p className="font-mono text-sm leading-relaxed">
          <b>Interviewer:</b> {qa.q}
        </p>
        <p className="font-mono text-xs text-gray-600">Answer in 2 to 3 sentences. ({words} words)</p>
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
    <Window title="Archive House · your artifact" onClose={onClose} wide>
      <div className="space-y-3">
        <p className="font-mono text-sm leading-relaxed">
          The archivist slides a blank page across the desk. <b>&quot;Leave something behind.
          An essay on any topic you actually care about. And your resume, for the record.&quot;</b>
        </p>
        <p className="font-mono text-xs text-gray-600">Essay on any topic, roughly 300 to 500 words. ({words} words)</p>
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
  const boardRef = useRef<HTMLCanvasElement>(null);       // the whiteboard the candidate draws on
  const compositeRef = useRef<HTMLCanvasElement | null>(null); // board + camera PiP, what gets recorded
  const rafRef = useRef(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const [recording, setRecording] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const [pen, setPen] = useState<'black' | 'red' | 'blue' | 'eraser'>('black');
  const MAX = 180;
  const BW = 1024, BH = 576, PIP_W = 256, PIP_H = 192;

  // init whiteboard surface once
  useEffect(() => {
    const b = boardRef.current;
    if (!b) return;
    const g = b.getContext('2d')!;
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, BW, BH);
  }, [phase]);

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
    cancelAnimationFrame(rafRef.current);
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
      setCamOn(true);
    } catch {
      setErr('Camera/mic access denied. Enable permissions and try again.');
    }
  };

  // draw on the board with the pointer
  const boardPos = (e: React.PointerEvent) => {
    const b = boardRef.current!;
    const r = b.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * BW, y: ((e.clientY - r.top) / r.height) * BH };
  };
  const penDown = (e: React.PointerEvent) => {
    drawingRef.current = true;
    lastPtRef.current = boardPos(e);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const penMove = (e: React.PointerEvent) => {
    if (!drawingRef.current) return;
    const b = boardRef.current!;
    const g = b.getContext('2d')!;
    const pt = boardPos(e);
    const last = lastPtRef.current ?? pt;
    g.strokeStyle = pen === 'eraser' ? '#ffffff' : pen === 'red' ? '#c8341e' : pen === 'blue' ? '#2c5f8a' : '#20242c';
    g.lineWidth = pen === 'eraser' ? 36 : 4;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(last.x, last.y);
    g.lineTo(pt.x, pt.y);
    g.stroke();
    lastPtRef.current = pt;
  };
  const penUp = () => {
    drawingRef.current = false;
    lastPtRef.current = null;
  };
  const clearBoard = () => {
    const g = boardRef.current!.getContext('2d')!;
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, BW, BH);
  };

  // recording captures a composite: whiteboard + camera picture-in-picture + mic audio
  const startRecording = () => {
    if (!streamRef.current || !boardRef.current) return;
    const composite = document.createElement('canvas');
    composite.width = BW;
    composite.height = BH;
    compositeRef.current = composite;
    const cg = composite.getContext('2d')!;
    const paint = () => {
      cg.drawImage(boardRef.current!, 0, 0);
      if (videoRef.current && videoRef.current.readyState >= 2) {
        cg.save();
        // mirror the PiP so it matches the on-screen preview
        cg.translate(BW - 12, BH - PIP_H - 12);
        cg.scale(-1, 1);
        cg.drawImage(videoRef.current, -0, 0, PIP_W, PIP_H);
        cg.restore();
        cg.strokeStyle = '#20242c';
        cg.lineWidth = 3;
        cg.strokeRect(BW - PIP_W - 12, BH - PIP_H - 12, PIP_W, PIP_H);
      }
      rafRef.current = requestAnimationFrame(paint);
    };
    paint();
    const stream = composite.captureStream(30);
    const audio = streamRef.current.getAudioTracks()[0];
    if (audio) stream.addTrack(audio);
    chunksRef.current = [];
    const rec = new MediaRecorder(stream, { mimeType: 'video/webm' });
    rec.ondataavailable = (e) => chunksRef.current.push(e.data);
    rec.onstop = () => {
      cancelAnimationFrame(rafRef.current);
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
            camera. Three minutes, your own words. I care that you understood it, not that
            you memorized it.&quot;</b>
          </p>
          <div className="border-2 border-[#20242c] bg-white">
            <div className="flex items-center justify-between border-b-2 border-[#20242c] bg-[#f2ecd8] px-3 py-2">
              <h3 className="font-mono text-xs font-bold">{PAPER.title}</h3>
              <a href={PAPER.pdf} target="_blank" rel="noreferrer" className="ml-3 shrink-0 font-mono text-xs font-bold text-[#bf5700] underline">
                open in new tab ↗
              </a>
            </div>
            <iframe src={PAPER.pdf} title={PAPER.title} className="h-[60vh] w-full" />
          </div>
          <button
            className={btn}
            onClick={() => { update({ labPaperOpened: true }); setPhase('record'); }}
          >
            ▸ I&apos;ve read it, set up the camera
          </button>
        </div>
      )}
      {phase === 'record' && (
        <div className="space-y-3">
          <p className="font-mono text-sm">
            Explain the core idea of the paper in up to <b>3 minutes</b>. Draw on the whiteboard
            as you talk; the recording captures the board, your camera, and your voice together.
          </p>
          <div className="relative">
            <canvas
              ref={boardRef}
              width={BW}
              height={BH}
              className="w-full touch-none border-2 border-[#20242c] bg-white"
              style={{ cursor: 'crosshair' }}
              onPointerDown={penDown}
              onPointerMove={penMove}
              onPointerUp={penUp}
              onPointerLeave={penUp}
            />
            <video
              ref={videoRef}
              className="pointer-events-none absolute bottom-2 right-2 w-1/4 border-2 border-[#20242c] bg-black"
              style={{ transform: 'scaleX(-1)', display: camOn ? 'block' : 'none' }}
            />
            {recording && (
              <span className="absolute left-2 top-2 border-2 border-[#20242c] bg-[#c8341e] px-2 py-0.5 font-mono text-xs font-bold text-white">
                ● REC {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold">PEN:</span>
            {(['black', 'red', 'blue', 'eraser'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPen(p)}
                className={`border-2 px-2 py-1 font-mono text-xs font-bold ${
                  pen === p ? 'border-[#bf5700] bg-[#fce8d4]' : 'border-[#20242c] bg-white'
                }`}
              >
                {p === 'eraser' ? '◻ eraser' : p}
              </button>
            ))}
            <button className={btnGhost} onClick={clearBoard}>✕ Clear board</button>
          </div>
          {err && <p className="font-mono text-xs text-red-700">{err}</p>}
          <div className="flex flex-wrap items-center gap-2">
            {!camOn && <button className={btnGhost} onClick={startCamera}>◉ Enable camera + mic</button>}
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
                <video src={blobUrl} controls className="w-full border-2 border-[#20242c] bg-black" />
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
            Recording stops automatically at 3:00. Download a copy for yourself. You&apos;ll
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
// puzzle definitions live in puzzles.ts

export function PuzzleStation({ session, update, onClose, id }: StationProps & { id: string }) {
  const puzzle = PUZZLE_BY_ID[id];
  const solvedAlready = !!session.puzzleAnswers[id];
  const [answer, setAnswer] = useState(session.puzzleAnswers[id] ?? '');
  const [alias, setAlias] = useState(session.leaderboardAlias);
  const [wrong, setWrong] = useState(false);
  const [solved, setSolved] = useState(solvedAlready);
  if (!puzzle) return null;
  return (
    <Window title={`${puzzle.house} · ${puzzle.points} bonus points`} onClose={onClose}>
      <div className="space-y-3 font-mono text-sm">
        <p className="leading-relaxed">{puzzle.prompt}</p>
        {!solved ? (
          <>
            <input className={inputCls} value={answer} onChange={(e) => { setAnswer(e.target.value); setWrong(false); }} placeholder={puzzle.answerHint} />
            {wrong && <p className="text-xs text-red-700">Not quite. These are meant to be sat with. Scratch paper helps.</p>}
            <button
              className={btn}
              onClick={() => {
                if (puzzle.check(answer)) {
                  setSolved(true);
                  update({ puzzleAnswers: { ...session.puzzleAnswers, [id]: answer } });
                } else setWrong(true);
              }}
            >
              ▸ Submit
            </button>
          </>
        ) : (
          <>
            <p className="text-green-800">✓ Solved. {puzzle.points} bonus points banked for your application.</p>
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
    default: return id.startsWith('puzzle-') ? <PuzzleStation {...props} id={id} /> : null;
  }
}
