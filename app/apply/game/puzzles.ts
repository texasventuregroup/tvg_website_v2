// The world's puzzle registry. Every outer village and the Puzzle Woods hold
// puzzle houses; solving them banks bonus points toward the leaderboard.

export interface PuzzleDef {
  id: string;            // station id, always `puzzle-<key>`
  house: string;         // building name in the world
  village: string;       // which map it lives on
  points: number;
  hostLine: string;      // what the host says before the puzzle opens
  prompt: string;
  answerHint: string;    // input placeholder
  check: (a: string) => boolean;
}

const num = (a: string) => parseFloat(a.trim().replace(/[$%]/g, ''));

export const PUZZLES: PuzzleDef[] = [
  {
    id: 'puzzle-cipher',
    house: 'Puzzle Den',
    village: 'Puzzle Woods',
    points: 30,
    hostLine: 'Sssh. The racing problem on my desk has been driving people mad all week. Twenty-five horses, five lanes, no stopwatch. Care to try?',
    prompt:
      'You have 25 horses and a track with 5 lanes. Races give you finishing order only, no times. ' +
      'What is the minimum number of races that GUARANTEES you can name the fastest three horses, in order? ' +
      'Answer with a single number.',
    answerHint: 'Number of races',
    check: (a) => a.trim().replace(/races?/i, '').trim() === '7',
  },
  {
    id: 'puzzle-market',
    house: 'Trading Post',
    village: 'Puzzle Woods',
    points: 30,
    hostLine: 'Everything here has a price, and most people compute it wrong. I will quote you three prices. Know when to take one.',
    prompt:
      'I will show you up to three prices, one at a time, each drawn uniformly from 0 to 100. When you see a ' +
      'price you must take it or wave it off forever; if you wave off the first two, you are stuck with the ' +
      'third. Play optimally. What is your expected payoff? Answer as an exact decimal or fraction.',
    answerHint: 'Expected payoff',
    check: (a) => {
      const t = a.trim().replace(/\$/g, '');
      if (t === '2225/32') return true;
      const v = num(t);
      return !isNaN(v) && Math.abs(v - 69.53125) < 0.005;
    },
  },
  {
    id: 'puzzle-cube',
    house: 'House of Steps',
    village: 'Summit Hollow',
    points: 25,
    hostLine: 'An ant lives on my ceiling beam. It walks the edges of a perfect cube and never learns. Watch it long enough and you start asking questions.',
    prompt:
      'An ant stands on one corner of a cube. Each second it walks along one of the three edges at its corner, ' +
      'chosen uniformly at random. What is the expected number of seconds until it first reaches the opposite ' +
      'corner of the cube?',
    answerHint: 'Expected seconds',
    check: (a) => Math.abs(num(a) - 10) < 0.001,
  },
  {
    id: 'puzzle-lockers',
    house: 'Locker Lodge',
    village: 'Summit Hollow',
    points: 20,
    hostLine: 'A hundred lockers line my hallway. Every guest has a strange ritual with them. The pattern is prettier than it looks.',
    prompt:
      '100 closed lockers. Person 1 toggles every locker. Person 2 toggles every 2nd. Person 3 every 3rd, and ' +
      'so on through person 100. When they finish, how many lockers are open?',
    answerHint: 'Number of open lockers',
    check: (a) => a.trim() === '10',
  },
  {
    id: 'puzzle-dice',
    house: 'Dice Lodge',
    village: 'Mirror Lake',
    points: 25,
    hostLine: 'I roll one die, over and over, every night by the lake. I stop when I have seen every face. Some nights are long.',
    prompt:
      'You roll a fair six-sided die repeatedly. What is the expected number of rolls until you have seen all ' +
      'six faces at least once? Answer as an exact decimal or fraction.',
    answerHint: 'Expected rolls',
    check: (a) => {
      const t = a.trim();
      if (t === '147/10' || t === '14.7') return true;
      const v = num(t);
      return !isNaN(v) && Math.abs(v - 14.7) < 0.005;
    },
  },
  {
    id: 'puzzle-coin',
    house: 'Coin Cabin',
    village: 'Mirror Lake',
    points: 20,
    hostLine: 'One coin. I flip until it lands heads twice in a row, then I stop and look at the lake. How long do I usually wait?',
    prompt:
      'You flip a fair coin repeatedly until you see two heads in a row. What is the expected total number of ' +
      'flips?',
    answerHint: 'Expected flips',
    check: (a) => Math.abs(num(a) - 6) < 0.001,
  },
  {
    id: 'puzzle-plane',
    house: 'Ferry House',
    village: 'Driftwood Landing',
    points: 25,
    hostLine: 'The old ferry sat exactly 100. First passenger aboard had lost his ticket and sat anywhere he pleased. Chaos, every single crossing.',
    prompt:
      '100 passengers board a 100-seat ferry in order. The first lost his ticket and takes a uniformly random ' +
      'seat. Everyone else takes their own seat if free, otherwise a uniformly random free seat. What is the ' +
      'probability the 100th passenger ends up in their own seat?',
    answerHint: 'Probability',
    check: (a) => {
      const t = a.trim();
      if (t === '1/2' || t === '50%' || t === '.5') return true;
      const v = num(t);
      return !isNaN(v) && Math.abs(v - 0.5) < 0.001;
    },
  },
  {
    id: 'puzzle-ace',
    house: 'Card House',
    village: 'Driftwood Landing',
    points: 25,
    hostLine: 'Fresh deck, honest shuffle, one question: how deep do you usually have to dig before the first ace turns up?',
    prompt:
      'A standard 52-card deck is shuffled uniformly. You draw cards one at a time from the top. What is the ' +
      'expected position of the first ace? Answer as an exact decimal or fraction.',
    answerHint: 'Expected position',
    check: (a) => {
      const t = a.trim();
      if (t === '53/5' || t === '10.6') return true;
      const v = num(t);
      return !isNaN(v) && Math.abs(v - 10.6) < 0.005;
    },
  },
];

export const PUZZLE_BY_ID: Record<string, PuzzleDef> = Object.fromEntries(PUZZLES.map((p) => [p.id, p]));

export const TOTAL_PUZZLE_POINTS = PUZZLES.reduce((s, p) => s + p.points, 0);

export function puzzleScore(answers: Record<string, string>): number {
  return PUZZLES.reduce((s, p) => s + (answers[p.id] ? p.points : 0), 0);
}

export function puzzlesSolved(answers: Record<string, string>): number {
  return PUZZLES.filter((p) => answers[p.id]).length;
}
