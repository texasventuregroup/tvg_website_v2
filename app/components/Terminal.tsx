'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ============================================
// FILE SYSTEM DATA
// ============================================

interface FSNode {
  type: 'file' | 'dir';
  content?: string;
  route?: string;
  children?: Record<string, FSNode>;
}

const fileSystem: Record<string, FSNode> = {
  'README.txt': {
    type: 'file',
    route: '/',
    content: `
╔══════════════════════════════════════════════════════╗
║             TEXAS VENTURE GROUP                      ║
║        Student VC & Entrepreneurship at UT Austin    ║
╚══════════════════════════════════════════════════════╝

The ecosystem for student investors and founders.
Exploration is not just about where you go, but who you go with.

> Founded at The University of Texas at Austin
> Domains: Enterprise, Fintech, Healthcare, AI/ML, Consumer, Defense
> Programs: Analysts, Associates, Research, Hackathons

Type 'ls' to explore directories.
Type 'open README.txt' to visit the homepage.
`,
  },
  programs: {
    type: 'dir',
    children: {
      'analysts.txt': {
        type: 'file',
        route: '/analysts',
        content: `
┌─────────────────────────────────────────┐
│  ANALYST PROGRAM                        │
└─────────────────────────────────────────┘

The gateway into venture capital and startup investing.

PILLARS:
  [1] Market Research & Analysis
  [2] Due Diligence Frameworks
  [3] Thesis Generation
  [4] Pitch Development

DURATION: One semester
STATUS:   Applications open each fall & spring

> Type 'open analysts.txt' to visit the full page.
`,
      },
      'associates.txt': {
        type: 'file',
        route: '/associates',
        content: `
┌─────────────────────────────────────────┐
│  ASSOCIATE PROGRAM                      │
└─────────────────────────────────────────┘

Portfolio management, deal sourcing, and direct
collaboration with partner venture firms.

SCOPE OF WORK:
  - Startup sourcing & screening
  - Portfolio company support
  - LP/GP relationship management
  - Industry vertical deep dives

CLIENT NETWORK: Top-tier VC firms across the US.

> Type 'open associates.txt' to visit the full page.
`,
      },
    },
  },
  events: {
    type: 'dir',
    children: {
      'speaker-series.txt': {
        type: 'file',
        route: '/events',
        content: `
┌─────────────────────────────────────────┐
│  SPEAKER SERIES                         │
└─────────────────────────────────────────┘

Founder and investor talks throughout the year.
Past speakers include partners from a]16z, Sequoia,
Benchmark, and founders of unicorn startups.

FORMAT:  Fireside chats, panels, workshops
FREQ:    Bi-weekly during semester

> Type 'open speaker-series.txt' to visit the events page.
`,
      },
      treks: {
        type: 'dir',
        children: {
          'sf.txt': {
            type: 'file',
            route: '/treks/sf',
            content: `
┌─────────────────────────────────────────┐
│  SAN FRANCISCO TREK                     │
└─────────────────────────────────────────┘

3-day immersive trip to the Bay Area.

ITINERARY:
  Day 1 → Firm visits (Sand Hill Road)
  Day 2 → Startup tours & founder meetings
  Day 3 → Networking dinners & closing

FIRMS VISITED: Top-tier VC and growth equity firms.

> Type 'open sf.txt' to see the full itinerary.
`,
          },
          'nyc.txt': {
            type: 'file',
            route: '/treks/nyc',
            content: `
┌─────────────────────────────────────────┐
│  NEW YORK CITY TREK                     │
└─────────────────────────────────────────┘

Exploring the East Coast venture & finance ecosystem.

FOCUS AREAS:
  - Fintech & financial services
  - Media & consumer
  - Growth-stage investing

FIRMS VISITED: Leading NYC-based funds and startups.

> Type 'open nyc.txt' to see the full itinerary.
`,
          },
        },
      },
      'hackathons.txt': {
        type: 'file',
        route: '/hackathons',
        content: `
┌─────────────────────────────────────────┐
│  HACKATHONS                             │
└─────────────────────────────────────────┘

TVG's flagship building events. Hundreds of students
come together to build, pitch, and win prizes.

FORMAT:  Weekend-long build sprints
TRACKS:  AI/ML, Fintech, Consumer, Enterprise
PRIZES:  Cash prizes + mentorship from sponsors

> Type 'open hackathons.txt' to see upcoming events.
`,
      },
    },
  },
  'team.txt': {
    type: 'file',
    route: '/members',
    content: `
┌─────────────────────────────────────────┐
│  THE TEAM                               │
└─────────────────────────────────────────┘

TVG is led by a team of passionate students
across Executive Board, Chairs, Principals,
Associates, and Analysts.

STRUCTURE:
  /exec      → Executive leadership
  /chairs    → Program & event chairs
  /principals→ Senior members
  /associates→ Active deal team
  /analysts  → Current cohort

> Type 'open team.txt' to see the full roster.
`,
  },
  'partnerships.txt': {
    type: 'file',
    route: '/partnerships',
    content: `
┌─────────────────────────────────────────┐
│  PARTNERSHIPS                           │
└─────────────────────────────────────────┘

TVG partners with leading venture capital firms,
startups, and corporate sponsors.

PARTNER TIERS:
  [PLATINUM] → Full program integration
  [GOLD]     → Event sponsorship + sourcing
  [SILVER]   → Speaker series + branding

> Type 'open partnerships.txt' to see our partners.
`,
  },
  'work-with-us.txt': {
    type: 'file',
    route: '/work-with-us',
    content: `
┌─────────────────────────────────────────┐
│  WORK WITH US                           │
└─────────────────────────────────────────┘

Interested in partnering with TVG?

ENGAGEMENT MODELS:
  - Deal flow sourcing
  - Market research projects
  - Co-hosted events
  - Talent pipeline

We work with VCs, startups, and corporates.

> Type 'open work-with-us.txt' to learn more.
`,
  },
  'join.txt': {
    type: 'file',
    route: '/join',
    content: `
┌─────────────────────────────────────────┐
│  JOIN TVG                               │
└─────────────────────────────────────────┘

Applications open each semester.

PROCESS:
  1. Written application
  2. Behavioral interview
  3. Case study / stock pitch
  4. Final round

LOOKING FOR:
  - Intellectual curiosity
  - Passion for startups & investing
  - Strong communication skills

> Type 'open join.txt' to apply.
`,
  },
  'bevsanddevs.txt': {
    type: 'file',
    route: '/bevsanddevs',
    content: `
┌─────────────────────────────────────────┐
│  BEVS & DEVS                            │
└─────────────────────────────────────────┘

TVG's program for student founders.
A casual, community-driven space for builders.

FORMAT:  Monthly meetups
VIBE:    Drinks + demos + discussions
WHO:     Student founders, developers, designers

> Type 'open bevsanddevs.txt' to learn more.
`,
  },
};

// ============================================
// PATH UTILITIES
// ============================================

function resolvePath(current: string, target: string): string {
  if (target === '~' || target === '/') return '~';

  let parts: string[];
  if (target.startsWith('~/') || target.startsWith('/')) {
    parts = target.replace('~/', '').replace('/', '').split('/').filter(Boolean);
  } else {
    parts = [...current.replace('~', '').split('/').filter(Boolean), ...target.split('/').filter(Boolean)];
  }

  const resolved: string[] = [];
  for (const part of parts) {
    if (part === '..') resolved.pop();
    else if (part !== '.') resolved.push(part);
  }

  return '~' + (resolved.length ? '/' + resolved.join('/') : '');
}

function getNode(path: string): FSNode | null {
  const parts = path.replace('~', '').split('/').filter(Boolean);
  let current: Record<string, FSNode> = fileSystem;

  for (let i = 0; i < parts.length; i++) {
    const node = current[parts[i]];
    if (!node) return null;
    if (i === parts.length - 1) return node;
    if (node.type === 'dir' && node.children) {
      current = node.children;
    } else {
      return null;
    }
  }

  // Return a virtual dir node for root
  return { type: 'dir', children: current };
}

function getChildren(path: string): Record<string, FSNode> | null {
  const node = getNode(path);
  if (!node) return null;
  if (node.type === 'dir') return node.children || {};
  return null;
}

function getRouteForPath(path: string): string | null {
  const node = getNode(path);
  if (!node || node.type !== 'file') return null;
  return node.route || null;
}

// ============================================
// ASCII ART
// ============================================

const BOOT_LINES = [
  '',
  '  ████████╗██╗   ██╗ ██████╗ ',
  '  ╚══██╔══╝██║   ██║██╔════╝ ',
  '     ██║   ██║   ██║██║  ███╗',
  '     ██║   ╚██╗ ██╔╝██║   ██║',
  '     ██║    ╚████╔╝ ╚██████╔╝',
  '     ╚═╝     ╚═══╝   ╚═════╝ ',
  '',
  '  Texas Venture Group — Terminal v1.0',
  '  ────────────────────────────────────',
  '',
  '  System Status: ONLINE',
  '  Location:      UT Austin',
  '  Domains:       Enterprise | Fintech | Healthcare | AI/ML | Consumer | Defense',
  '',
  "  Type 'help' for available commands.",
  "  Type 'ls' to browse the directory.",
  '',
];

// ============================================
// COMPONENT
// ============================================

interface TerminalLine {
  type: 'input' | 'output';
  text: string;
}

interface TerminalProps {
  onClose: () => void;
}

export default function Terminal({ onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Boot animation — runs once on mount
  useEffect(() => {
    const bootLines: TerminalLine[] = BOOT_LINES.map(l => ({ type: 'output', text: l }));
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const line = bootLines[i];
        i++;
        setLines(prev => [...prev, line]);
      } else {
        clearInterval(interval);
        setBooted(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Focus input when booted or after command output
  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted, lines]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const addOutput = useCallback((text: string) => {
    const outputLines = text.split('\n').map(line => ({ type: 'output' as const, text: line }));
    setLines(prev => [...prev, ...outputLines]);
  }, []);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add input line
    setLines(prev => [...prev, { type: 'input', text: `${cwd} $ ${trimmed}` }]);
    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (command) {
      case 'help': {
        addOutput(`
  Available commands:
  ─────────────────────────────────────
  ls [dir]        List directory contents
  cd <dir>        Change directory
  cat <file>      Read file contents
  pwd             Print working directory
  open <file>     Navigate to page (opens in browser)
  clear           Clear terminal
  exit            Close terminal
  help            Show this message
  ─────────────────────────────────────

  Directories shown with [DIR], files with [FILE].
  Use 'cd ..' to go up, 'cd ~' to go home.
`);
        break;
      }

      case 'ls': {
        const targetPath = arg ? resolvePath(cwd, arg) : cwd;
        const children = getChildren(targetPath);
        if (!children) {
          addOutput(`  ls: cannot access '${arg || '.'}': No such directory`);
          break;
        }
        const entries = Object.entries(children);
        if (entries.length === 0) {
          addOutput('  (empty directory)');
          break;
        }
        const dirs = entries.filter(([, n]) => n.type === 'dir').sort();
        const files = entries.filter(([, n]) => n.type === 'file').sort();
        let output = '';
        for (const [name] of dirs) {
          output += `  [DIR]  ${name}/\n`;
        }
        for (const [name] of files) {
          output += `  [FILE] ${name}\n`;
        }
        addOutput(output.trimEnd());
        break;
      }

      case 'cd': {
        if (!arg) {
          setCwd('~');
          break;
        }
        const newPath = resolvePath(cwd, arg);
        const node = getNode(newPath);
        if (!node) {
          addOutput(`  cd: no such directory: ${arg}`);
        } else if (node.type !== 'dir') {
          addOutput(`  cd: not a directory: ${arg}`);
        } else {
          setCwd(newPath);
        }
        break;
      }

      case 'cat': {
        if (!arg) {
          addOutput('  usage: cat <filename>');
          break;
        }
        const filePath = resolvePath(cwd, arg);
        const node = getNode(filePath);
        if (!node) {
          addOutput(`  cat: ${arg}: No such file`);
        } else if (node.type === 'dir') {
          addOutput(`  cat: ${arg}: Is a directory`);
        } else {
          addOutput(node.content || '  (empty file)');
        }
        break;
      }

      case 'pwd': {
        addOutput(`  ${cwd}`);
        break;
      }

      case 'open': {
        if (!arg) {
          addOutput('  usage: open <filename>');
          break;
        }
        const filePath = resolvePath(cwd, arg);
        const route = getRouteForPath(filePath);
        if (!route) {
          const node = getNode(filePath);
          if (!node) {
            addOutput(`  open: ${arg}: No such file`);
          } else if (node.type === 'dir') {
            addOutput(`  open: ${arg}: Is a directory. Use 'cd' to enter directories.`);
          } else {
            addOutput(`  open: ${arg}: No page associated with this file.`);
          }
        } else {
          addOutput(`  Opening ${route}...`);
          setTimeout(() => {
            onClose();
            router.push(route);
          }, 300);
        }
        break;
      }

      case 'clear': {
        setLines([]);
        break;
      }

      case 'exit':
      case 'quit': {
        onClose();
        break;
      }

      default: {
        addOutput(`  command not found: ${command}. Type 'help' for available commands.`);
      }
    }
  }, [cwd, addOutput, onClose, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* CRT Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-[101] terminal-scanlines opacity-40" />

      {/* Terminal window */}
      <div
        className="relative z-[102] w-full max-w-3xl h-[80vh] max-h-[700px] flex flex-col border border-[#01A072]/40 rounded-lg overflow-hidden shadow-2xl shadow-[#01A072]/20 bg-[#0a0a0a] animate-scale-in"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f1f1a] border-b border-[#01A072]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="group/dots flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] flex items-center justify-center transition-colors"
                aria-label="Close terminal"
              >
                <svg className="w-2 h-2 text-[#4d0000] opacity-0 group-hover/dots:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 3l6 6M9 3l-6 6"/></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-3.5 h-3.5 rounded-full bg-[#febc2e] flex items-center justify-center transition-colors"
                aria-label="Minimize terminal"
              >
                <svg className="w-2 h-2 text-[#995700] opacity-0 group-hover/dots:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M2 6h8"/></svg>
              </button>
              <div className="w-3.5 h-3.5 rounded-full bg-[#28c840] flex items-center justify-center">
                <svg className="w-2 h-2 text-[#006500] opacity-0 group-hover/dots:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 4l4-2 4 2M2 8l4 2 4-2"/></svg>
              </div>
            </div>
            <span className="font-mono text-xs text-[#01A072]/60 tracking-wider hidden sm:inline">
              tvg@austin:~
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="text-[#01A072]/40 hover:text-[#01A072] transition-colors font-mono text-xs tracking-wider"
          >
            ESC to close
          </button>
        </div>

        {/* Terminal content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-space-mono), monospace' }}
        >
          {lines.filter(Boolean).map((line, i) => (
            <div key={i} className={line.type === 'input' ? 'text-[#01A072]' : 'text-[#01A072]/70'}>
              <pre className="whitespace-pre-wrap break-words m-0 font-mono text-sm">{line.text}</pre>
            </div>
          ))}

          {/* Input line */}
          {booted && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#01A072] whitespace-nowrap font-mono text-sm">{cwd} $</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-[#01A072] outline-none font-mono text-sm caret-transparent"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                />
                {/* Custom blinking cursor */}
                <span
                  className="absolute top-0 h-full w-[8px] bg-[#01A072] terminal-cursor pointer-events-none"
                  style={{ left: `${input.length * 0.6}em` }}
                />
              </div>
            </div>
          )}

          {/* Boot cursor before input is ready */}
          {!booted && (
            <div className="mt-1">
              <span className="inline-block w-[8px] h-[1.2em] bg-[#01A072] terminal-cursor" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
