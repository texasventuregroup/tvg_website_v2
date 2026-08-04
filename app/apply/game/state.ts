// Application session state, persisted to localStorage so applicants can resume.

export type StationId =
  | 'welcome'      // intro NPC house
  | 'whytvg'       // short-answer conversation house
  | 'artifact'     // essay + resume house
  | 'lab'          // paper + video house
  | 'puzzle-cipher'
  | 'puzzle-market';

export interface QuestionAnswer {
  q: string;
  a: string;
}

export interface ApplySession {
  name: string;
  email: string;
  startedAt: number;
  // world position
  mapId: string;
  px: number;
  py: number;
  facing: 'up' | 'down' | 'left' | 'right';
  // required stations
  welcomeDone: boolean;
  whyTvg: QuestionAnswer[];
  artifactEssay: string;
  artifactResumeName: string;
  labVideoSubmitted: boolean;
  labPaperOpened: boolean;
  // optional puzzles
  puzzleAnswers: Record<string, string>;
  leaderboardAlias: string;
  submitted: boolean;
}

const KEY = 'tvg-apply-session-v1';

export const WHY_TVG_QUESTIONS = [
  'Why TVG? What do you actually want out of this club?',
  'Tell us about something you stuck with long after it stopped being fun.',
  'What is a belief about startups or investing you hold that most people around you do not?',
  'You have 30 seconds with a founder you admire. What do you ask?',
];

export function defaultSession(): ApplySession {
  return {
    name: '',
    email: '',
    startedAt: Date.now(),
    mapId: 'town',
    px: 24,
    py: 16,
    facing: 'down',
    welcomeDone: false,
    whyTvg: WHY_TVG_QUESTIONS.map((q) => ({ q, a: '' })),
    artifactEssay: '',
    artifactResumeName: '',
    labVideoSubmitted: false,
    labPaperOpened: false,
    puzzleAnswers: {},
    leaderboardAlias: '',
    submitted: false,
  };
}

export function loadSession(): ApplySession {
  if (typeof window === 'undefined') return defaultSession();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSession();
    return { ...defaultSession(), ...JSON.parse(raw) };
  } catch {
    return defaultSession();
  }
}

export function saveSession(s: ApplySession) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function stationComplete(s: ApplySession, id: StationId): boolean {
  switch (id) {
    case 'welcome':
      return s.welcomeDone;
    case 'whytvg':
      return s.whyTvg.every((qa) => qa.a.trim().length > 0);
    case 'artifact':
      return s.artifactEssay.trim().length > 0 && s.artifactResumeName.length > 0;
    case 'lab':
      return s.labVideoSubmitted;
    case 'puzzle-cipher':
      return !!s.puzzleAnswers['cipher'];
    case 'puzzle-market':
      return !!s.puzzleAnswers['market'];
  }
}

export function requiredComplete(s: ApplySession): boolean {
  return (
    stationComplete(s, 'welcome') &&
    stationComplete(s, 'whytvg') &&
    stationComplete(s, 'artifact') &&
    stationComplete(s, 'lab')
  );
}
