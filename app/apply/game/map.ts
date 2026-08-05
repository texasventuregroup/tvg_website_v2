// Multi-map world: the town, the puzzle woods (east map connection), and one
// furnished interior per building. Maps are generated in code.
import { StationId } from './state';

// terrain codes
export const T_GRASS = 0;
export const T_PATH = 1;
export const T_WATER = 2;
export const T_TALL = 3;
export const T_CLIFF = 4;
export const T_BRIDGE = 5;
export const T_FLOOR = 6;
export const T_WALL = 7;
export const T_RUG = 8;
export const T_MAT = 9;

export type Facing = 'up' | 'down' | 'left' | 'right';

export interface ObjDef {
  kind:
    | 'tree' | 'bush' | 'flower' | 'fenceH' | 'fenceV' | 'fencePost'
    | 'sign' | 'lamp' | 'barrel' | 'rock' | 'crops'
    | 'desk' | 'shelf' | 'plant' | 'machine' | 'table' | 'stool' | 'window';
  x: number;
  y: number;
  variant?: number;
}

export interface HouseDef {
  id: StationId;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  roof: 'blue' | 'green';
  wall: 'wood' | 'gray';
  big?: boolean;
  deco?: boolean; // decorative only: no interior, no completion marker
}

export interface WarpDef {
  x: number;
  y: number;
  toMap: string;
  toX: number;
  toY: number;
  facing: Facing;
}

export interface NpcDef {
  x: number;
  y: number;
  variant: number;
  lines: string[];
  station?: StationId; // talking to this NPC opens the station UI after the lines
}

export interface GameMap {
  id: string;
  name: string;
  w: number;
  h: number;
  outdoor: boolean;
  terrain: Uint8Array;
  collision: Uint8Array;
  objects: ObjDef[];
  houses: HouseDef[];
  above: { x: number; y: number; kind: string; variant: number; ox: number }[];
  signs: { x: number; y: number; text: string }[];
  npcs: NpcDef[];
  warps: WarpDef[];
}

function hash(x: number, y: number, seed = 0): number {
  let h = x * 374761393 + y * 668265263 + seed * 1274126177;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

interface Builder {
  m: GameMap;
  set: (x: number, y: number, t: number) => void;
  get: (x: number, y: number) => number;
  rect: (x0: number, y0: number, x1: number, y1: number, t: number) => void;
  block: (x: number, y: number) => void;
  solid: (x: number, y: number, kind: ObjDef['kind'], variant?: number) => void;
  deco: (x: number, y: number, kind: ObjDef['kind'], variant?: number) => void;
}

function newMap(id: string, name: string, w: number, h: number, outdoor: boolean, fill: number): Builder {
  const m: GameMap = {
    id, name, w, h, outdoor,
    terrain: new Uint8Array(w * h).fill(fill),
    collision: new Uint8Array(w * h),
    objects: [], houses: [], above: [], signs: [], npcs: [], warps: [],
  };
  const set = (x: number, y: number, t: number) => {
    if (x >= 0 && y >= 0 && x < w && y < h) m.terrain[y * w + x] = t;
  };
  const get = (x: number, y: number) =>
    x < 0 || y < 0 || x >= w || y >= h ? fill : m.terrain[y * w + x];
  const rect = (x0: number, y0: number, x1: number, y1: number, t: number) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) set(x, y, t);
  };
  const block = (x: number, y: number) => {
    if (x >= 0 && y >= 0 && x < w && y < h) m.collision[y * w + x] = 1;
  };
  const solid = (x: number, y: number, kind: ObjDef['kind'], variant = 0) => {
    m.objects.push({ kind, x, y, variant });
    block(x, y);
  };
  const deco = (x: number, y: number, kind: ObjDef['kind'], variant = 0) => {
    m.objects.push({ kind, x, y, variant });
  };
  return { m, set, get, rect, block, solid, deco };
}

// The door graphic is centered on the house's pixel midline: a single tile for
// odd widths, the middle two tiles (the seam) for even widths.
export function doorTiles(def: HouseDef): number[] {
  return def.w % 2 === 0
    ? [def.x + def.w / 2 - 1, def.x + def.w / 2]
    : [def.x + Math.floor(def.w / 2)];
}

// place a house plus its door warp into an interior map
function placeHouse(b: Builder, def: HouseDef) {
  b.m.houses.push(def);
  for (let y = def.y; y < def.y + def.h; y++)
    for (let x = def.x; x < def.x + def.w; x++) b.block(x, y);
  const doorY = def.y + def.h - 1; // bottom wall row where the door graphic sits
  const dts = doorTiles(def);
  for (const dx of dts) {
    b.m.collision[doorY * b.m.w + dx] = 0;
    b.m.warps.push({ x: dx, y: doorY, toMap: `int-${def.id}`, toX: 0, toY: 0, facing: 'up' });
  }
  // path stub below the door, as wide as the doorway
  b.rect(dts[0], def.y + def.h, dts[dts.length - 1], def.y + def.h + 1, T_PATH);
}

// decorative house: no interior, door is blocked, a sign explains it
function placeDecoHouse(b: Builder, def: HouseDef) {
  b.m.houses.push(def);
  for (let y = def.y; y < def.y + def.h; y++)
    for (let x = def.x; x < def.x + def.w; x++) b.block(x, y);
  const dts = doorTiles(def);
  b.rect(dts[0], def.y + def.h, dts[dts.length - 1], def.y + def.h + 1, T_PATH);
}

// ---------------- TOWN ----------------
export function buildTown(): GameMap {
  const W = 68, H = 52;
  const b = newMap('town', 'TVG Grove', W, H, true, T_GRASS);
  const { rect, set, get, block, solid, deco } = b;
  const collision = b.m.collision;

  // paths: every segment is a straight 2-tile ribbon meeting at aligned junctions
  rect(24, 0, 25, 12, T_PATH);   // north path, from the top bridge
  rect(0, 13, 55, 14, T_PATH);   // main road, open to the west edge
  rect(24, 15, 25, 32, T_PATH);  // south street, straight under the north path
  rect(24, 33, 67, 34, T_PATH);  // east road to the Puzzle Woods
  rect(24, 35, 25, 42, T_PATH);  // promenade down to the lakeside park
  rect(15, 43, 40, 44, T_PATH);  // lakeside path
  rect(37, 45, 38, 51, T_PATH);  // lane to the south edge
  rect(12, 24, 23, 25, T_PATH);  // west branch to the Archive House
  rect(10, 15, 11, 23, T_PATH);  // northwest lane linking main road to the west branch
  rect(33, 5, 34, 12, T_PATH);   // TVG Hall drive
  rect(7, 9, 7, 12, T_PATH);     // Visitor Cabin walk

  // water
  rect(12, 4, 17, 8, T_WATER);
  rect(11, 5, 12, 7, T_WATER);
  rect(17, 5, 18, 6, T_WATER);
  rect(13, 3, 16, 3, T_WATER);
  rect(14, 9, 16, 9, T_WATER);
  rect(20, 47, 33, 51, T_WATER);
  rect(18, 48, 20, 51, T_WATER);
  rect(33, 49, 36, 51, T_WATER);
  rect(22, 46, 30, 46, T_WATER);
  rect(44, 26, 46, 51, T_WATER);
  rect(44, 24, 45, 26, T_WATER);
  rect(47, 28, 47, 31, T_WATER);
  rect(43, 29, 43, 32, T_WATER);
  rect(47, 38, 47, 41, T_WATER);
  rect(43, 43, 43, 46, T_WATER);
  rect(47, 47, 47, 50, T_WATER);
  rect(56, 20, 60, 23, T_WATER);
  rect(55, 21, 56, 22, T_WATER);
  rect(60, 21, 61, 22, T_WATER);
  rect(44, 33, 46, 34, T_BRIDGE);
  rect(24, 0, 25, 1, T_BRIDGE);

  for (let i = 0; i < W * H; i++) if (b.m.terrain[i] === T_WATER) collision[i] = 1;

  // houses (required stations live in town)
  placeHouse(b, { id: 'welcome', label: 'Visitor Cabin', x: 5, y: 5, w: 5, h: 4, roof: 'green', wall: 'wood' });
  placeHouse(b, { id: 'whytvg', label: 'TVG Hall', x: 31, y: 4, w: 6, h: 5, roof: 'blue', wall: 'wood', big: true });
  placeHouse(b, { id: 'artifact', label: 'Archive House', x: 9, y: 17, w: 5, h: 4, roof: 'green', wall: 'gray' });
  placeHouse(b, { id: 'lab', label: 'Research Lab', x: 50, y: 7, w: 6, h: 5, roof: 'green', wall: 'gray', big: true });

  // decorative homes in the south district (no interiors)
  placeDecoHouse(b, { id: 'welcome', label: 'Cottage', x: 14, y: 38, w: 4, h: 4, roof: 'blue', wall: 'wood', deco: true });
  placeDecoHouse(b, { id: 'welcome', label: 'Cottage', x: 34, y: 38, w: 4, h: 4, roof: 'green', wall: 'wood', deco: true });

  // forest border wall
  const clearOfPath = (x: number, y: number, pad = 1) => {
    for (let dy = -pad; dy <= pad; dy++)
      for (let dx = -pad; dx <= pad + 1; dx++) {
        const t = get(x + dx, y + dy);
        if (t === T_PATH || t === T_WATER || t === T_BRIDGE) return false;
      }
    for (const h of b.m.houses)
      if (x + 1 >= h.x - 1 && x <= h.x + h.w && y >= h.y - 1 && y <= h.y + h.h + 1) return false;
    return true;
  };
  const nearWater = (x: number, y: number) => {
    for (let dy = -2; dy <= 0; dy++)
      for (let dx = 0; dx <= 1; dx++) {
        const t = get(x + dx, y + dy);
        if (t === T_WATER || t === T_BRIDGE) return true;
      }
    return false;
  };
  const treeAt = (x: number, y: number) => {
    if (nearWater(x, y)) return;
    b.m.above.push({ x, y, kind: 'tree', variant: Math.floor(hash(x, y, 5) * 3), ox: (y % 2) * 8 });
    block(x, y);
    block(x + 1, y);
  };
  for (let ring = 0; ring < 4; ring++) {
    for (let x = -1 + (ring % 2); x < W; x += 1) {
      if (clearOfPath(x, ring * 2 - 1, 0)) treeAt(x, ring * 2 - 1);
      if (clearOfPath(x, H - 2 - ring * 2, 0)) treeAt(x, H - 2 - ring * 2);
    }
    for (let y = -1; y < H; y += 1) {
      const xL = ring * 2 - 1 + (y % 2 ? 1 : 0);
      const xR = W - 3 - ring * 2 - (y % 2 ? 1 : 0);
      if (clearOfPath(xL, y, 0)) treeAt(xL, y);
      if (clearOfPath(xR, y, 0)) treeAt(xR, y);
    }
  }
  for (let i = 0; i < 90; i++) {
    const x = 5 + Math.floor(hash(i, 1, 21) * (W - 12));
    const y = 5 + Math.floor(hash(i, 2, 23) * (H - 12));
    if (hash(i, 3, 25) < 0.35 && clearOfPath(x, y)) {
      treeAt(x, y);
      if (hash(i, 4, 27) < 0.5 && clearOfPath(x + 1, y + 1)) treeAt(x + 1, y + 1);
    }
  }

  // tall grass
  const tallPatch = (x0: number, y0: number, w2: number, h2: number) => {
    for (let y = y0; y < y0 + h2; y++)
      for (let x = x0; x < x0 + w2; x++)
        if (get(x, y) === T_GRASS && !collision[y * W + x] && hash(x, y, 31) < 0.85) set(x, y, T_TALL);
  };
  tallPatch(28, 24, 3, 2);
  tallPatch(51, 17, 3, 2);
  tallPatch(58, 27, 3, 2);
  tallPatch(50, 38, 3, 2);
  tallPatch(15, 30, 3, 2);
  tallPatch(29, 7, 2, 2);

  // fences
  const fenceYard = (x0: number, y0: number, x1: number, y1: number, gates: [number, number][]) => {
    const isGate = (x: number, y: number) => gates.some(([gx, gy]) => gx === x && gy === y);
    const place = (x: number, y: number, kind: ObjDef['kind']) => {
      if (isGate(x, y)) return;
      if (collision[y * W + x] || get(x, y) !== T_GRASS) return;
      solid(x, y, kind);
    };
    place(x0, y0, 'fencePost'); place(x1, y0, 'fencePost');
    place(x0, y1, 'fencePost'); place(x1, y1, 'fencePost');
    for (let x = x0 + 1; x < x1; x++) { place(x, y0, 'fenceH'); place(x, y1, 'fenceH'); }
    for (let y = y0 + 1; y < y1; y++) { place(x0, y, 'fenceV'); place(x1, y, 'fenceV'); }
  };
  fenceYard(28, 2, 39, 10, [[33, 10], [34, 10]]);
  fenceYard(3, 3, 12, 10, [[7, 10], [8, 10]]);
  fenceYard(6, 15, 15, 22, [[11, 22], [12, 22]]);
  fenceYard(47, 5, 58, 12, [[52, 12], [53, 12]]);

  // decor
  const flowersSpots: [number, number][] = [
    [18, 10], [19, 10], [26, 15], [27, 15], [14, 22], [15, 27], [24, 28], [25, 20],
    [30, 11], [37, 12], [10, 25], [31, 30], [33, 25], [17, 18], [42, 34],
  ];
  for (const [x, y] of flowersSpots)
    if (get(x, y) === T_GRASS && !collision[y * W + x]) deco(x, y, 'flower', Math.floor(hash(x, y, 41) * 4));
  for (let gy = 4; gy < H - 4; gy += 3)
    for (let gx = 4; gx < W - 4; gx += 3) {
      const r = hash(gx, gy, 45);
      if (r > 0.4) continue;
      const x = gx + Math.floor(hash(gx, gy, 46) * 3);
      const y = gy + Math.floor(hash(gx, gy, 47) * 3);
      if (get(x, y) !== T_GRASS || collision[y * W + x]) continue;
      if (r < 0.15) deco(x, y, 'flower', Math.floor(hash(x, y, 48) * 4));
      else if (r < 0.28) set(x, y, T_TALL);
      else deco(x, y, 'bush', Math.floor(hash(x, y, 49) * 2));
    }
  const bushSpots: [number, number][] = [
    [19, 6], [26, 10], [16, 16], [26, 22], [12, 28], [30, 28], [36, 25], [28, 17], [52, 30], [58, 36],
  ];
  for (const [x, y] of bushSpots)
    if (get(x, y) === T_GRASS && !collision[y * W + x]) solid(x, y, 'bush', Math.floor(hash(x, y, 43) * 2));
  solid(19, 12, 'lamp');
  solid(18, 23, 'lamp');
  solid(33, 35, 'lamp');
  solid(30, 8, 'barrel');
  solid(31, 8, 'barrel');
  solid(13, 18, 'rock');
  solid(17, 35, 'rock');
  for (let x = 30; x <= 33; x++) for (let y = 11; y <= 12; y++)
    if (get(x, y) === T_GRASS && !collision[y * W + x]) solid(x, y, 'crops');

  const signs = [
    { x: 23, y: 17, text: 'TVG GROVE - Visit every marked house to complete your application.' },
    { x: 26, y: 12, text: 'NORTH: TVG Hall (interview questions)  ·  WEST: Visitor Cabin (start here)' },
    { x: 36, y: 32, text: 'EAST: Puzzle Woods - optional puzzles worth BONUS POINTS on your application. Top 5 solvers earn auto-interviews.' },
    { x: 13, y: 23, text: 'Archive House - submit your artifact: an essay on anything you care about, plus your resume.' },
  ];
  for (const s of signs) { solid(s.x, s.y, 'sign'); b.m.signs.push(s); }

  b.m.npcs = [
    {
      x: 26, y: 17, variant: 0,
      lines: [
        'Welcome to TVG Grove! Four houses hold your application: the Visitor Cabin, TVG Hall, the Archive House, and the Research Lab.',
        'Step into a doorway to go inside. The road east leads to the Puzzle Woods - optional, but the top solvers get auto-interviews.',
        'Your progress saves automatically. Leave and come back anytime.',
      ],
    },
    { x: 32, y: 10, variant: 1, lines: ['The Hall folks ask real questions. Two to three sentences each - make them count.'] },
    { x: 42, y: 32, variant: 2, lines: ['Keep east past the bridge for the Puzzle Woods. The puzzles are hard, but they are worth bonus points on your application.'] },
  ];
  for (const n of b.m.npcs) block(n.x, n.y);

  // edge connections: east to the puzzle woods, trails off every other side
  for (const y of [33, 34]) b.m.warps.push({ x: W - 1, y, toMap: 'woods', toX: 1, toY: y - 23, facing: 'right' });
  for (const x of [24, 25]) b.m.warps.push({ x, y: 0, toMap: 'route-north', toX: x - 18, toY: 24, facing: 'up' });
  for (const y of [13, 14]) b.m.warps.push({ x: 0, y, toMap: 'route-west', toX: 28, toY: y - 7, facing: 'left' });
  for (const x of [37, 38]) b.m.warps.push({ x, y: H - 1, toMap: 'route-south', toX: x - 31, toY: 1, facing: 'down' });

  return b.m;
}

// ---------------- PUZZLE WOODS ----------------
export function buildWoods(): GameMap {
  const W = 40, H = 24;
  const b = newMap('woods', 'Puzzle Woods', W, H, true, T_GRASS);
  const { rect, set, get, block, solid, deco } = b;
  const collision = b.m.collision;

  // path in from the west edge, opening into a clearing
  rect(0, 10, 14, 11, T_PATH);
  rect(14, 8, 16, 14, T_PATH);
  rect(16, 6, 24, 7, T_PATH);
  rect(16, 13, 26, 14, T_PATH);
  rect(24, 3, 25, 7, T_PATH);
  rect(26, 10, 27, 14, T_PATH);
  rect(26, 10, 33, 11, T_PATH);

  // pond in the clearing
  rect(19, 17, 24, 20, T_WATER);
  rect(18, 18, 19, 19, T_WATER);
  rect(24, 18, 25, 19, T_WATER);
  for (let i = 0; i < W * H; i++) if (b.m.terrain[i] === T_WATER) collision[i] = 1;

  placeHouse(b, { id: 'puzzle-cipher', label: 'Puzzle Den', x: 22, y: 0, w: 5, h: 4, roof: 'blue', wall: 'wood' });
  placeHouse(b, { id: 'puzzle-market', label: 'Trading Post', x: 31, y: 6, w: 5, h: 4, roof: 'green', wall: 'wood' });

  const clearOfPath = (x: number, y: number, pad = 0) => {
    for (let dy = -pad; dy <= pad; dy++)
      for (let dx = -pad; dx <= pad + 1; dx++) {
        const t = get(x + dx, y + dy);
        if (t === T_PATH || t === T_WATER) return false;
      }
    for (const h of b.m.houses)
      if (x + 1 >= h.x - 1 && x <= h.x + h.w && y >= h.y - 1 && y <= h.y + h.h + 1) return false;
    return true;
  };
  const nearWater = (x: number, y: number) => {
    for (let dy = -2; dy <= 0; dy++)
      for (let dx = 0; dx <= 1; dx++)
        if (get(x + dx, y + dy) === T_WATER) return true;
    return false;
  };
  const treeAt = (x: number, y: number) => {
    if (nearWater(x, y)) return;
    b.m.above.push({ x, y, kind: 'tree', variant: Math.floor(hash(x, y, 6) * 3), ox: (y % 2) * 8 });
    block(x, y);
    block(x + 1, y);
  };
  // woods are DENSE: fill everything not near path/houses/pond with trees
  for (let y = -1; y < H; y++)
    for (let x = -1 + (y % 2); x < W; x += 2)
      if (clearOfPath(x, y)) treeAt(x, y);
  // extra offset layer for full coverage
  for (let y = 0; y < H; y += 2)
    for (let x = (y % 4 === 0 ? 0 : 1); x < W; x += 2)
      if (clearOfPath(x, y) && hash(x, y, 61) < 0.7) treeAt(x, y);

  // clearing accents
  const tallSpots: [number, number][] = [[17, 16], [18, 15], [27, 16], [28, 15], [29, 12], [13, 13]];
  for (const [x, y] of tallSpots) if (get(x, y) === T_GRASS && !collision[y * W + x]) set(x, y, T_TALL);
  for (const [x, y] of [[17, 12], [28, 9], [22, 15]] as [number, number][])
    if (get(x, y) === T_GRASS && !collision[y * W + x]) deco(x, y, 'flower', Math.floor(hash(x, y, 63) * 4));
  solid(12, 9, 'lamp');
  solid(30, 13, 'rock');
  solid(18, 5, 'barrel');

  const signs = [
    { x: 4, y: 9, text: 'PUZZLE WOODS - Two dens, two puzzles, real bonus points. Solve them, claim a leaderboard alias, and the top 5 skip to interviews.' },
  ];
  for (const s of signs) { solid(s.x, s.y, 'sign'); b.m.signs.push(s); }

  b.m.npcs = [
    { x: 28, y: 13, variant: 2, lines: ['The Den up north has a racing puzzle. The Trading Post asks a nastier question than it looks. Both are worth bonus points. Take your time - thinking is the whole point.'] },
  ];
  for (const n of b.m.npcs) block(n.x, n.y);

  // west edge back to town
  for (const y of [10, 11]) b.m.warps.push({ x: 0, y, toMap: 'town', toX: 66, toY: y + 23, facing: 'left' });

  return b.m;
}

// ---------------- INTERIORS ----------------
interface InteriorSpec {
  id: StationId;
  name: string;
  w: number;
  h: number;
  rug: number; // rug variant
  npcVariant: number;
  npcLines: string[];
  furnish: (b: Builder) => void;
}

function buildInterior(spec: InteriorSpec): GameMap {
  const { w, h } = spec;
  const b = newMap(`int-${spec.id}`, spec.name, w, h, false, T_FLOOR);
  const { rect, block, solid } = b;

  // back wall: two rows of paneling; side columns are wall trim
  rect(0, 0, w - 1, 1, T_WALL);
  rect(0, 0, 0, h - 1, T_WALL);
  rect(w - 1, 0, w - 1, h - 1, T_WALL);
  for (let x = 0; x < w; x++) { block(x, 0); block(x, 1); }
  for (let y = 0; y < h; y++) { block(0, y); block(w - 1, y); }
  // windows on the back wall
  b.deco(2, 1, 'window');
  b.deco(w - 3, 1, 'window');

  // rug in the middle
  const rw = Math.min(4, w - 6), rh = 2;
  rect(Math.floor(w / 2 - rw / 2), Math.floor(h / 2), Math.floor(w / 2 + rw / 2) - 1, Math.floor(h / 2) + rh - 1, T_RUG);

  // host NPC behind a desk at top-center
  const cx = Math.floor(w / 2);
  solid(cx - 1, 3, 'desk');
  block(cx, 3); // desk sprite spans two tiles
  b.m.npcs.push({ x: cx - 1, y: 2, variant: spec.npcVariant, lines: spec.npcLines, station: spec.id });
  block(cx - 1, 2);

  spec.furnish(b);

  // exit mat at bottom-center (2 tiles), warps back outside; toX/toY patched later
  const mx = Math.floor(w / 2);
  rect(mx - 1, h - 1, mx, h - 1, T_MAT);
  b.m.collision[(h - 1) * w + (mx - 1)] = 0;
  b.m.collision[(h - 1) * w + mx] = 0;
  b.m.warps.push({ x: mx - 1, y: h - 1, toMap: '', toX: 0, toY: 0, facing: 'down' });
  b.m.warps.push({ x: mx, y: h - 1, toMap: '', toX: 0, toY: 0, facing: 'down' });

  return b.m;
}

// A quiet forest route off one edge of town. Mostly scenery; ends at a sign.
function buildRoute(
  id: string, name: string, w: number, h: number, vertical: boolean,
  back: { edge: 'top' | 'bottom' | 'left' | 'right'; toX: number; toY: number; facing: Facing },
  signText: string,
): GameMap {
  const b = newMap(id, name, w, h, true, T_GRASS);
  const { rect, set, get, block, solid } = b;
  const collision = b.m.collision;
  const c0 = Math.floor((vertical ? w : h) / 2) - 1;
  if (vertical) rect(c0, 0, c0 + 1, h - 1, T_PATH);
  else rect(0, c0, w - 1, c0 + 1, T_PATH);

  const clear = (x: number, y: number) => {
    for (let dy = -1; dy <= 0; dy++)
      for (let dx = 0; dx <= 1; dx++)
        if (get(x + dx, y + dy) === T_PATH) return false;
    return true;
  };
  const treeAt = (x: number, y: number) => {
    b.m.above.push({ x, y, kind: 'tree', variant: Math.floor(hash(x, y, 7) * 3), ox: (y % 2) * 8 });
    block(x, y);
    block(x + 1, y);
  };
  for (let y = -1; y < h; y++)
    for (let x = -1 + (y % 2); x < w; x += 2)
      if (clear(x, y)) treeAt(x, y);
  // second offset pass fills the strip left bare beside the trail
  for (let y = 0; y < h; y++)
    for (let x = (y + 1) % 2; x < w; x += 2)
      if (clear(x, y) && !collision[y * w + x] && !collision[y * w + Math.min(w - 1, x + 1)]) treeAt(x, y);
  // tall grass along the trail
  for (let i = 0; i < 30; i++) {
    const x = Math.floor(hash(i, 9, 91) * w);
    const y = Math.floor(hash(i, 8, 93) * h);
    if (get(x, y) === T_GRASS && !collision[y * w + x] && hash(x, y, 95) < 0.5) set(x, y, T_TALL);
  }
  // sign at the far end of the trail
  const signPos = vertical
    ? { x: c0 - 1, y: back.edge === 'bottom' ? 2 : h - 3 }
    : { x: back.edge === 'right' ? 2 : w - 3, y: c0 - 1 };
  solid(signPos.x, signPos.y, 'sign');
  b.m.signs.push({ ...signPos, text: signText });
  // block the far end of the trail so the route dead-ends at the sign
  if (vertical) {
    const yEnd = back.edge === 'bottom' ? 0 : h - 1;
    block(c0, yEnd); block(c0 + 1, yEnd);
  } else {
    const xEnd = back.edge === 'right' ? 0 : w - 1;
    block(xEnd, c0); block(xEnd, c0 + 1);
  }
  // warps back to town along the entry edge
  if (back.edge === 'bottom') for (const x of [c0, c0 + 1]) b.m.warps.push({ x, y: h - 1, toMap: 'town', toX: back.toX + (x - c0), toY: back.toY, facing: back.facing });
  if (back.edge === 'top') for (const x of [c0, c0 + 1]) b.m.warps.push({ x, y: 0, toMap: 'town', toX: back.toX + (x - c0), toY: back.toY, facing: back.facing });
  if (back.edge === 'right') for (const y of [c0, c0 + 1]) b.m.warps.push({ x: w - 1, y, toMap: 'town', toX: back.toX, toY: back.toY + (y - c0), facing: back.facing });
  if (back.edge === 'left') for (const y of [c0, c0 + 1]) b.m.warps.push({ x: 0, y, toMap: 'town', toX: back.toX, toY: back.toY + (y - c0), facing: back.facing });
  return b.m;
}

export function buildAllMaps(): Record<string, GameMap> {
  const town = buildTown();
  const woods = buildWoods();

  const interiors: InteriorSpec[] = [
    {
      id: 'welcome', name: 'Visitor Cabin', w: 10, h: 8, rug: 0, npcVariant: 0,
      npcLines: ['Oh! A new face. Welcome to TVG Grove. Let me get you registered.'],
      furnish: (b) => {
        b.solid(1, 2, 'plant');
        b.solid(8, 2, 'shelf');
        b.solid(7, 2, 'shelf');
        b.solid(1, 5, 'table');
        b.deco(2, 5, 'stool');
      },
    },
    {
      id: 'whytvg', name: 'TVG Hall', w: 12, h: 9, rug: 1, npcVariant: 1,
      npcLines: ['Take a seat. I have four questions for you. Answer like you mean it - two or three sentences each.'],
      furnish: (b) => {
        b.solid(1, 2, 'shelf'); b.solid(2, 2, 'shelf');
        b.solid(9, 2, 'shelf'); b.solid(10, 2, 'shelf');
        b.solid(1, 6, 'plant'); b.solid(10, 6, 'plant');
        b.solid(2, 4, 'table'); b.deco(3, 4, 'stool');
        b.solid(9, 4, 'table'); b.deco(8, 4, 'stool');
      },
    },
    {
      id: 'artifact', name: 'Archive House', w: 10, h: 8, rug: 2, npcVariant: 2,
      npcLines: ['The archive keeps what people leave behind. Leave something worth keeping - an essay you care about, and your resume for the record.'],
      furnish: (b) => {
        for (let x = 1; x <= 3; x++) b.solid(x, 2, 'shelf');
        for (let x = 6; x <= 8; x++) b.solid(x, 2, 'shelf');
        b.solid(1, 4, 'shelf'); b.solid(1, 5, 'shelf');
        b.solid(8, 4, 'shelf'); b.solid(8, 5, 'shelf');
        b.solid(6, 5, 'table');
      },
    },
    {
      id: 'lab', name: 'Research Lab', w: 12, h: 9, rug: 3, npcVariant: 1,
      npcLines: ['Ah, the applicant. I have a paper for you - power laws in venture returns. Read it, then explain it back to me on camera. Three minutes.'],
      furnish: (b) => {
        b.solid(1, 2, 'machine'); b.solid(2, 2, 'machine');
        b.solid(9, 2, 'machine'); b.solid(10, 2, 'machine');
        b.solid(1, 5, 'machine');
        b.solid(10, 5, 'shelf');
        b.solid(3, 6, 'table'); b.deco(4, 6, 'stool');
        b.solid(8, 4, 'plant');
      },
    },
    {
      id: 'puzzle-cipher', name: 'Puzzle Den', w: 10, h: 8, rug: 1, npcVariant: 2,
      npcLines: ['Sssh. The note on my desk has been driving people mad all week. Think you can read it?'],
      furnish: (b) => {
        b.solid(1, 2, 'shelf'); b.solid(2, 2, 'shelf');
        b.solid(8, 2, 'plant');
        b.solid(2, 5, 'table');
        b.solid(7, 5, 'barrel');
      },
    },
    {
      id: 'puzzle-market', name: 'Trading Post', w: 10, h: 8, rug: 0, npcVariant: 0,
      npcLines: ['Everything here has a price, and most people compute it wrong. Care to try a little allocation problem?'],
      furnish: (b) => {
        b.solid(1, 2, 'barrel'); b.solid(2, 2, 'barrel');
        b.solid(7, 2, 'shelf'); b.solid(8, 2, 'shelf');
        b.solid(1, 5, 'table');
        b.solid(8, 5, 'plant');
      },
    },
  ];

  const maps: Record<string, GameMap> = { town, woods };
  maps['route-north'] = buildRoute('route-north', 'North Trail', 14, 26, true,
    { edge: 'bottom', toX: 24, toY: 1, facing: 'down' },
    'NORTH TRAIL: The path is overgrown past here. It reopens next semester.');
  maps['route-west'] = buildRoute('route-west', 'West Trail', 30, 14, false,
    { edge: 'right', toX: 1, toY: 13, facing: 'right' },
    'WEST TRAIL: Nothing out here but trees. For now.');
  maps['route-south'] = buildRoute('route-south', 'South Trail', 14, 24, true,
    { edge: 'top', toX: 37, toY: 50, facing: 'up' },
    'SOUTH TRAIL: The lake feeds a river somewhere down there. Trail closed.');
  for (const spec of interiors) maps[`int-${spec.id}`] = buildInterior(spec);

  // wire door warps: exterior door → interior mat position; interior mats → outside the door
  for (const outdoor of [town, woods]) {
    for (const h of outdoor.houses) {
      if (h.deco) continue;
      const int = maps[`int-${h.id}`];
      const dts = doorTiles(h);
      const doorY = h.y + h.h - 1;
      const mx = Math.floor(int.w / 2);
      for (const wp of outdoor.warps) {
        if (wp.toMap === `int-${h.id}`) {
          wp.toX = mx;
          wp.toY = int.h - 2; // just above the mat
        }
      }
      for (const wp of int.warps) {
        if (wp.toMap === '') {
          wp.toMap = outdoor.id;
          wp.toX = dts[0];
          wp.toY = doorY + 1; // on the stub below the door
        }
      }
    }
  }
  return maps;
}
