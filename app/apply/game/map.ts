// Multi-map world: the town, the puzzle woods (east map connection), and one
// furnished interior per building. Maps are generated in code.
import { StationId } from './state';
import { PUZZLES, PuzzleDef } from './puzzles';

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
export const T_ALPINE = 10;
export const T_MARSHW = 11;
export const T_SAND = 12;
export const T_SEA = 13;
export const T_MUD = 14;
export const T_TARN = 15;

export type Facing = 'up' | 'down' | 'left' | 'right';

export interface ObjDef {
  kind:
    | 'tree' | 'bush' | 'flower' | 'fenceH' | 'fenceV' | 'fencePost'
    | 'sign' | 'lamp' | 'barrel' | 'rock' | 'crops'
    | 'mushroom' | 'log' | 'shell' | 'boat' | 'pierpost'
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
  roof: 'blue' | 'green' | 'red';
  wall: 'wood' | 'gray';
  big?: boolean;
  deco?: boolean; // decorative only: no interior, no completion marker
  stilt?: boolean; // stands over water on pilings
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
  tint?: string; // ambient overlay color (e.g. Deepwood gloom)
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
  if (def.stilt) return; // over water: no path stub
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
    { x: 23, y: 17, text: 'TVG GROVE: visit every marked house to complete your application.' },
    { x: 26, y: 12, text: 'NORTH: TVG Hall (interview questions)  ·  WEST: Visitor Cabin (start here)' },
    { x: 36, y: 32, text: 'EAST: Puzzle Woods. Optional puzzles worth BONUS POINTS on your application. Top 5 solvers earn auto-interviews.' },
    { x: 13, y: 23, text: 'Archive House: submit your artifact, an essay on anything you care about, plus your resume.' },
  ];
  for (const s of signs) { solid(s.x, s.y, 'sign'); b.m.signs.push(s); }

  b.m.npcs = [
    {
      x: 26, y: 17, variant: 0,
      lines: [
        'Welcome to TVG Grove! Four houses hold your application: the Visitor Cabin, TVG Hall, the Archive House, and the Research Lab.',
        'Step into a doorway to go inside. Every road out of town leads to a puzzle village: woods east, Summit Hollow north, Mirror Lake west, Driftwood Landing south. All optional, all bonus points.',
        'Your progress saves automatically. Leave and come back anytime.',
      ],
    },
    { x: 32, y: 10, variant: 1, lines: ['The Hall folks ask real questions. Two to three sentences each. Make them count.'] },
    { x: 42, y: 32, variant: 2, lines: ['Keep east past the bridge for the Puzzle Woods. And that is not the only village out there: try the north, west, and south roads too. Every puzzle is bonus points.'] },
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
  rect(26, 10, 39, 11, T_PATH); // continues east into Deepwood

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
    { x: 4, y: 9, text: 'PUZZLE WOODS: two dens, two puzzles, real bonus points. Solve them, claim a leaderboard alias, and the top 5 skip to interviews.' },
  ];
  for (const s of signs) { solid(s.x, s.y, 'sign'); b.m.signs.push(s); }

  b.m.npcs = [
    { x: 28, y: 13, variant: 2, lines: ['The Den up north has a racing puzzle. The Trading Post asks a nastier question than it looks. Both are worth bonus points. Take your time. Thinking is the whole point.'] },
  ];
  for (const n of b.m.npcs) block(n.x, n.y);

  // west edge back to town; east edge onward to Deepwood
  for (const y of [10, 11]) b.m.warps.push({ x: 0, y, toMap: 'town', toX: 66, toY: y + 23, facing: 'left' });
  for (const y of [10, 11]) b.m.warps.push({ x: W - 1, y, toMap: 'deepwood', toX: 1, toY: y - 1, facing: 'right' });

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

// A forest route off one edge of town, leading onward to a village.
function buildRoute(
  id: string, name: string, w: number, h: number, vertical: boolean,
  back: { edge: 'top' | 'bottom' | 'left' | 'right'; toX: number; toY: number; facing: Facing },
  signText: string,
  forward?: { toMap: string; toX: number; toY: number; facing: Facing },
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
  // far end: either open onward to a village, or dead-end at the sign
  if (forward) {
    if (vertical) {
      const yEnd = back.edge === 'bottom' ? 0 : h - 1;
      for (const x of [c0, c0 + 1])
        b.m.warps.push({ x, y: yEnd, toMap: forward.toMap, toX: forward.toX + (x - c0), toY: forward.toY, facing: forward.facing });
    } else {
      const xEnd = back.edge === 'right' ? 0 : w - 1;
      for (const y of [c0, c0 + 1])
        b.m.warps.push({ x: xEnd, y, toMap: forward.toMap, toX: forward.toX, toY: forward.toY + (y - c0), facing: forward.facing });
    }
  } else if (vertical) {
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


// ---------------- WILD DRESSING ----------------
// Shared outdoor decoration: forest border, scattered trees, grass accents.
function dressWild(b: Builder, opts: { rings?: number; density?: number; accents?: number; tree?: 'tree' | 'pine' }) {
  const { m } = b;
  const W = m.w, H = m.h;
  const rings = opts.rings ?? 3;
  const clearOf = (x: number, y: number, pad = 0) => {
    for (let dy = -pad; dy <= pad; dy++)
      for (let dx = -pad; dx <= pad + 1; dx++) {
        const t = b.get(x + dx, y + dy);
        if (t === T_PATH || t === T_WATER || t === T_SEA || t === T_MARSHW || t === T_BRIDGE || t === T_CLIFF) return false;
      }
    for (const h of m.houses)
      if (x + 1 >= h.x - 1 && x <= h.x + h.w && y >= h.y - 1 && y <= h.y + h.h + 1) return false;
    return true;
  };
  const nearWater = (x: number, y: number) => {
    for (let dy = -2; dy <= 0; dy++)
      for (let dx = 0; dx <= 1; dx++) {
        const t = b.get(x + dx, y + dy);
        if (t === T_WATER || t === T_SEA || t === T_MARSHW || t === T_BRIDGE) return true;
      }
    return false;
  };
  const kind = opts.tree ?? 'tree';
  const treeAt = (x: number, y: number) => {
    if (nearWater(x, y)) return;
    m.above.push({ x, y, kind, variant: Math.floor(hash(x, y, 8) * 3), ox: (y % 2) * 8 });
    b.block(x, y);
    b.block(x + 1, y);
  };
  for (let ring = 0; ring < rings; ring++) {
    for (let x = -1 + (ring % 2); x < W; x += 1) {
      if (clearOf(x, ring * 2 - 1)) treeAt(x, ring * 2 - 1);
      if (clearOf(x, H - 2 - ring * 2)) treeAt(x, H - 2 - ring * 2);
    }
    for (let y = -1; y < H; y += 1) {
      const xL = ring * 2 - 1 + (y % 2 ? 1 : 0);
      const xR = W - 3 - ring * 2 - (y % 2 ? 1 : 0);
      if (clearOf(xL, y)) treeAt(xL, y);
      if (clearOf(xR, y)) treeAt(xR, y);
    }
  }
  const density = opts.density ?? 0.3;
  for (let i = 0; i < 60; i++) {
    const x = 4 + Math.floor(hash(i, 4, 51 + W) * (W - 10));
    const y = 4 + Math.floor(hash(i, 5, 53 + H) * (H - 10));
    if (hash(i, 6, 55) < density && clearOf(x, y, 1)) treeAt(x, y);
  }
  const accents = opts.accents ?? 30;
  for (let i = 0; i < accents; i++) {
    const x = 3 + Math.floor(hash(i, 7, 61 + W) * (W - 8));
    const y = 3 + Math.floor(hash(i, 8, 63 + H) * (H - 8));
    const g0 = b.get(x, y);
    if ((g0 !== T_GRASS && g0 !== T_ALPINE) || m.collision[y * W + x]) continue;
    const r = hash(x, y, 65);
    if (r < 0.3) b.deco(x, y, 'flower', Math.floor(r * 12));
    else if (r < 0.5 && g0 === T_GRASS) b.set(x, y, T_TALL);
  }
}

// horizontal cliff band with a gap for the path; cliff tiles are solid
function cliffBand(b: Builder, x0: number, x1: number, y: number, gapX0: number, gapX1: number) {
  for (let x = x0; x <= x1; x++) {
    if (x >= gapX0 && x <= gapX1) continue;
    const t = b.get(x, y);
    if (t !== T_GRASS && t !== T_ALPINE) continue;
    if (b.m.houses.some((h) => x >= h.x && x < h.x + h.w && y >= h.y && y < h.y + h.h)) continue;
    b.set(x, y, T_CLIFF);
    b.m.collision[y * b.m.w + x] = 1;
  }
}

// ---------------- PUZZLE VILLAGES ----------------
const byId = (id: string) => PUZZLES.find((pz) => pz.id === id)!;

// Summit Hollow: alpine terraces. Cliff bands, rocks, sparse trees. Exit north to The Overlook.
function buildSummit(): GameMap {
  const W = 44, H = 30;
  const b = newMap('summit', 'Summit Hollow', W, H, true, T_ALPINE);
  const { rect, set, get, block, solid, deco } = b;
  const collision = b.m.collision;

  // the street climbs the mountain through two cliff lines (stair gaps)
  rect(21, 0, 22, 29, T_PATH);
  rect(8, 14, 37, 15, T_PATH);            // mid-terrace cross street
  rect(12, 26, 31, 27, T_PATH);           // lower lane

  // houses first so cliff lines flow around their footprints
  // upper terrace: the signature Locker Lodge anchors the summit
  placeHouse(b, { id: 'puzzle-lockers', label: 'Locker Lodge', x: 24, y: 1, w: 8, h: 4, roof: 'blue', wall: 'gray', big: true });
  // mid terrace
  placeHouse(b, { id: 'puzzle-cube', label: 'House of Steps', x: 10, y: 9, w: 5, h: 4, roof: 'blue', wall: 'gray' });
  placeDecoHouse(b, { id: 'welcome', label: 'Cabin', x: 30, y: 9, w: 4, h: 4, roof: 'blue', wall: 'wood', deco: true });
  // lower terrace
  placeDecoHouse(b, { id: 'welcome', label: 'Cabin', x: 14, y: 21, w: 4, h: 4, roof: 'blue', wall: 'wood', deco: true });

  // continuous terrace cliff lines, edge to edge, pierced only by the street
  cliffBand(b, 0, 43, 6, 21, 22);
  cliffBand(b, 0, 43, 7, 21, 22);
  cliffBand(b, 0, 43, 18, 21, 22);
  cliffBand(b, 0, 43, 19, 21, 22);
  // second staircase: the lodge's walk cuts through the upper cliff line
  rect(27, 5, 28, 8, T_PATH);
  for (let y = 5; y <= 8; y++) for (const x of [27, 28]) collision[y * W + x] = 0;

  // cold tarn on the mid terrace with rocky banks
  rect(33, 10, 38, 13, T_TARN);
  rect(32, 11, 33, 12, T_TARN);
  for (let i = 0; i < W * H; i++) if (b.m.terrain[i] === T_TARN) collision[i] = 1;

  dressWild(b, { rings: 2, density: 0.3, accents: 18, tree: 'pine' });
  // boulder clusters and scree between the terraces
  for (const [x, y] of [[4, 10], [5, 11], [17, 3], [36, 3], [37, 4], [6, 16], [26, 16], [27, 17], [39, 16], [4, 22], [34, 22], [35, 23], [18, 24], [9, 28], [33, 28]] as [number, number][])
    if (get(x, y) === T_ALPINE && !collision[y * W + x]) solid(x, y, 'rock');
  solid(18, 13, 'lamp');
  solid(25, 25, 'lamp');

  // upper terrace vista pocket
  solid(12, 2, 'sign');
  b.m.signs.push({ x: 12, y: 2, text: 'UPPER TERRACE VISTA: from here you can pick out every roof in TVG Grove. Worth the climb, no points required.' });
  for (const [x, y] of [[9, 3], [15, 1], [17, 3]] as [number, number][])
    if (get(x, y) === T_ALPINE && !collision[y * W + x]) deco(x, y, 'flower', 1);

  solid(19, 24, 'sign');
  b.m.signs.push({ x: 19, y: 24, text: 'SUMMIT HOLLOW: the House of Steps on this terrace, the Locker Lodge at the top. 45 bonus points. The Overlook is past the summit.' });
  b.m.npcs.push({ x: 25, y: 16, variant: 1, lines: ['Thin air up here clears the head. The House of Steps is on this terrace; the Locker Lodge crowns the top one. The Overlook is higher still.'] });
  block(25, 16);

  for (const x of [21, 22]) b.m.warps.push({ x, y: H - 1, toMap: 'route-north', toX: 6 + (x - 21), toY: 1, facing: 'down' });
  for (const x of [21, 22]) b.m.warps.push({ x, y: 0, toMap: 'overlook', toX: 14 + (x - 21), toY: 18, facing: 'up' });
  return b.m;
}

// Mirror Lake: a big lake with a long footbridge to a quiet south shore. Exit west to Fern Marsh.
function buildMirror(): GameMap {
  const W = 44, H = 30;
  const b = newMap('mirror', 'Mirror Lake', W, H, true, T_GRASS);
  const { rect, set, get, block, solid, deco } = b;
  const collision = b.m.collision;

  rect(0, 14, 43, 15, T_PATH);            // through-street, marsh (west) to route (east)
  rect(20, 16, 21, 18, T_PATH);           // walk down to the bridge
  rect(14, 28, 29, 28, T_PATH);           // south shore walk

  rect(12, 19, 31, 27, T_WATER);          // the lake
  rect(10, 21, 12, 25, T_WATER);
  rect(31, 20, 33, 24, T_WATER);
  rect(14, 18, 19, 18, T_WATER);
  rect(23, 18, 28, 18, T_WATER);
  for (let i = 0; i < W * H; i++) if (b.m.terrain[i] === T_WATER) collision[i] = 1;
  rect(20, 19, 21, 27, T_BRIDGE);         // footbridge across the lake
  for (let y = 19; y <= 27; y++) for (const x of [20, 21]) collision[y * W + x] = 0;
  // the islet: a patch of grass out in the lake with its own little bridge
  for (let yy = 23; yy <= 25; yy++) for (let xx = 25; xx <= 28; xx++) { set(xx, yy, T_GRASS); collision[yy * W + xx] = 0; }
  rect(26, 26, 26, 27, T_BRIDGE);
  for (let y = 26; y <= 27; y++) collision[y * W + 26] = 0;

  placeHouse(b, { id: 'puzzle-dice', label: 'Dice Lodge', x: 8, y: 9, w: 5, h: 4, roof: 'green', wall: 'wood' });
  placeHouse(b, { id: 'puzzle-coin', label: 'Coin Cabin', x: 27, y: 9, w: 5, h: 4, roof: 'green', wall: 'gray' });
  placeDecoHouse(b, { id: 'welcome', label: 'Cottage', x: 17, y: 9, w: 4, h: 4, roof: 'green', wall: 'gray', deco: true });
  placeDecoHouse(b, { id: 'welcome', label: 'Stilt House', x: 34, y: 17, w: 4, h: 4, roof: 'green', wall: 'wood', deco: true, stilt: true });

  dressWild(b, { rings: 3, density: 0.25, accents: 30 });
  // gardens by the lodges
  for (let x = 14; x <= 16; x++) if (get(x, 12) === T_GRASS && !collision[12 * W + x]) solid(x, 12, 'crops');
  for (let x = 33; x <= 35; x++) if (get(x, 12) === T_GRASS && !collision[12 * W + x]) solid(x, 12, 'crops');
  solid(15, 13, 'lamp');
  solid(26, 13, 'lamp');
  solid(24, 28, 'rock');

  // islet pocket
  solid(27, 24, 'sign');
  b.m.signs.push({ x: 27, y: 24, text: 'THE ISLET: locals swear the lake is deepest right here. Nobody has ever checked.' });
  deco(25, 24, 'flower', 2);

  solid(39, 13, 'sign');
  b.m.signs.push({ x: 39, y: 13, text: 'MIRROR LAKE: the Dice Lodge and the Coin Cabin. 45 bonus points. Fern Marsh lies west; bring boots.' });
  b.m.npcs.push({ x: 24, y: 17, variant: 0, lines: ['Still water, sharp thinking. The lodges hold probability puzzles. Cross the footbridge if you just want to sit a while.'] });
  block(24, 17);

  for (const y of [14, 15]) b.m.warps.push({ x: W - 1, y, toMap: 'route-west', toX: 1, toY: 6 + (y - 14), facing: 'right' });
  for (const y of [14, 15]) b.m.warps.push({ x: 0, y, toMap: 'marsh', toX: 28, toY: 9 + (y - 14), facing: 'left' });
  return b.m;
}

// Driftwood Landing: a river town with two bridges. Exit south to South Shore.
function buildDrift(): GameMap {
  const W = 44, H = 30;
  const b = newMap('drift', 'Driftwood Landing', W, H, true, T_GRASS);
  const { rect, set, get, block, solid, deco } = b;
  const collision = b.m.collision;

  rect(21, 0, 22, 29, T_PATH);            // through-street, route (north) to shore (south)
  rect(8, 15, 37, 16, T_PATH);            // cross street
  rect(12, 23, 31, 24, T_PATH);           // lower lane

  rect(33, 0, 34, 29, T_WATER);           // the river
  rect(35, 5, 35, 9, T_WATER);
  rect(32, 12, 32, 14, T_WATER);
  rect(35, 19, 35, 22, T_WATER);
  for (let i = 0; i < W * H; i++) if (b.m.terrain[i] === T_WATER) collision[i] = 1;
  rect(33, 15, 34, 16, T_BRIDGE);         // cross-street bridge
  rect(33, 23, 34, 24, T_BRIDGE);         // lower-lane bridge
  for (const [bx0, by0] of [[33, 15], [33, 23]] as [number, number][])
    for (let y = by0; y <= by0 + 1; y++) for (let x = bx0; x <= bx0 + 1; x++) collision[y * W + x] = 0;
  rect(35, 15, 37, 16, T_PATH);           // east-bank street continues
  rect(35, 23, 39, 24, T_PATH);

  placeHouse(b, { id: 'puzzle-plane', label: 'Ferry House', x: 10, y: 10, w: 5, h: 4, roof: 'red', wall: 'wood' });
  placeHouse(b, { id: 'puzzle-ace', label: 'Card House', x: 26, y: 10, w: 5, h: 4, roof: 'red', wall: 'gray' });
  placeDecoHouse(b, { id: 'welcome', label: 'Boathouse', x: 32, y: 8, w: 4, h: 4, roof: 'red', wall: 'wood', deco: true, stilt: true });
  placeDecoHouse(b, { id: 'welcome', label: 'Cottage', x: 15, y: 18, w: 4, h: 4, roof: 'red', wall: 'wood', deco: true });
  placeDecoHouse(b, { id: 'welcome', label: 'Cottage', x: 26, y: 18, w: 4, h: 4, roof: 'red', wall: 'wood', deco: true });

  dressWild(b, { rings: 3, density: 0.2, accents: 30 });
  solid(18, 14, 'lamp');
  solid(25, 22, 'lamp');
  solid(8, 22, 'barrel');
  solid(9, 22, 'barrel');

  solid(19, 4, 'sign');
  b.m.signs.push({ x: 19, y: 4, text: 'DRIFTWOOD LANDING: the Ferry House and the Card House. 50 bonus points. South Shore is down the street, past the docks.' });
  b.m.npcs.push({ x: 24, y: 18, variant: 2, lines: ['River folk love a wager. The Ferry House and Card House both hold puzzles, and the Shore Shack south of here holds one more.'] });
  block(24, 18);

  for (const x of [21, 22]) b.m.warps.push({ x, y: 0, toMap: 'route-south', toX: 6 + (x - 21), toY: 22, facing: 'up' });
  for (const x of [21, 22]) b.m.warps.push({ x, y: H - 1, toMap: 'shore', toX: 14 + (x - 21), toY: 1, facing: 'down' });
  return b.m;
}

// ---------------- FRONTIER MAPS ----------------
// The Overlook: a windy plateau above Summit Hollow.
function buildOverlook(): GameMap {
  const W = 30, H = 20;
  const b = newMap('overlook', 'The Overlook', W, H, true, T_ALPINE);
  const { rect, set, get, block, solid, deco } = b;
  const collision = b.m.collision;

  rect(14, 4, 15, 19, T_PATH);
  rect(6, 10, 23, 11, T_PATH);

  placeHouse(b, { id: 'puzzle-bridge', label: "Bridge Keeper's Hut", x: 10, y: 4, w: 5, h: 4, roof: 'red', wall: 'gray' });

  // plateau rims: continuous north wall, and a double south rim (the drop-off)
  cliffBand(b, 0, 29, 1, -1, -1);
  cliffBand(b, 0, 29, 2, -1, -1);
  cliffBand(b, 0, 29, 14, 14, 15);
  cliffBand(b, 0, 29, 15, 14, 15);
  cliffBand(b, 0, 29, 17, 14, 15);
  cliffBand(b, 0, 29, 18, 14, 15);

  dressWild(b, { rings: 1, density: 0.22, accents: 12, tree: 'pine' });
  for (const [x, y] of [[5, 6], [22, 5], [25, 8], [4, 12], [24, 12], [7, 13], [19, 5], [26, 4]] as [number, number][])
    if (get(x, y) === T_ALPINE && !collision[y * W + x]) solid(x, y, 'rock');

  // cliff-edge pocket on the west end of the rim walk
  solid(4, 13, 'sign');
  b.m.signs.push({ x: 4, y: 13, text: 'CLIFF EDGE: mind the drop. On a clear day the whole region reads like a map from here.' });

  solid(18, 9, 'sign');
  b.m.signs.push({ x: 18, y: 9, text: 'THE OVERLOOK: the Bridge Keeper pays 30 bonus points for a sharp answer.' });
  b.m.npcs.push({ x: 19, y: 12, variant: 1, lines: ['Not many make the climb. The hut up here holds the bridge-crossing puzzle. Worth the thin air, I promise.'] });
  block(19, 12);

  for (const x of [14, 15]) b.m.warps.push({ x, y: H - 1, toMap: 'summit', toX: 21 + (x - 14), toY: 1, facing: 'down' });
  return b.m;
}

// Fern Marsh: waterlogged tall-grass flats west of Mirror Lake.
function buildMarsh(): GameMap {
  const W = 30, H = 20;
  const b = newMap('marsh', 'Fern Marsh', W, H, true, T_GRASS);
  const { rect, set, get, block, solid, deco } = b;
  const collision = b.m.collision;

  rect(0, 9, 29, 10, T_PATH);
  rect(12, 5, 13, 9, T_PATH);

  // murky pools, organic edges
  const pool = (x: number, y: number, w2: number, h2: number) => rect(x, y, x + w2, y + h2, T_MARSHW);
  pool(4, 3, 4, 2); pool(3, 4, 1, 1); pool(19, 2, 5, 3); pool(18, 3, 1, 1); pool(25, 3, 1, 1);
  pool(5, 13, 5, 3); pool(4, 14, 1, 1); pool(11, 14, 1, 1);
  pool(16, 13, 4, 2); pool(22, 12, 4, 3); pool(21, 13, 1, 1); pool(27, 13, 1, 1);
  pool(2, 16, 3, 1);
  for (let i = 0; i < W * H; i++) if (b.m.terrain[i] === T_MARSHW) collision[i] = 1;
  // mud flats
  for (const [x, y, w2, h2] of [[9, 3, 3, 2], [15, 15, 3, 2], [25, 6, 3, 2], [2, 12, 2, 2]] as [number, number, number, number][])
    for (let yy = y; yy < y + h2; yy++)
      for (let xx = x; xx < x + w2; xx++)
        if (get(xx, yy) === T_GRASS && !collision[yy * W + xx]) set(xx, yy, T_MUD);

  placeHouse(b, { id: 'puzzle-ants', label: 'Marsh Hut', x: 10, y: 1, w: 5, h: 4, roof: 'green', wall: 'wood', stilt: false });

  // reeds everywhere
  for (let y = 2; y < H - 2; y++)
    for (let x = 2; x < W - 2; x++)
      if (b.get(x, y) === T_GRASS && !collision[y * W + x] && hash(x, y, 77) < 0.55) set(x, y, T_TALL);
  dressWild(b, { rings: 1, density: 0.08, accents: 8 });

  // heron pocket: a mud islet off the path with its own sign
  for (let yy = 16; yy <= 17; yy++) for (let xx = 24; xx <= 27; xx++)
    if (get(xx, yy) === T_GRASS || get(xx, yy) === T_TALL) set(xx, yy, T_MUD);
  solid(26, 16, 'sign');
  b.m.signs.push({ x: 26, y: 16, text: 'HERON FLATS: the birds fish here at dawn. Quietest spot in the region.' });
  solid(24, 17, 'log');

  solid(4, 8, 'sign');
  b.m.signs.push({ x: 4, y: 8, text: 'FERN MARSH: mind your step in the reeds. The Marsh Hut pays 20 bonus points for the ant question.' });
  b.m.npcs.push({ x: 17, y: 8, variant: 2, lines: ['The reeds hide more water than you think. The hut up the boardwalk has a probability puzzle about my ants. Yes, my ants.'] });
  block(17, 8);

  for (const y of [9, 10]) b.m.warps.push({ x: W - 1, y, toMap: 'mirror', toX: 1, toY: 14 + (y - 9), facing: 'right' });
  return b.m;
}

// South Shore: the sea, a pier, and one shack.
function buildShore(): GameMap {
  const W = 30, H = 20;
  const b = newMap('shore', 'South Shore', W, H, true, T_GRASS);
  const { rect, set, get, block, solid, deco } = b;
  const collision = b.m.collision;

  rect(14, 0, 15, 10, T_PATH);
  rect(8, 8, 21, 9, T_PATH);

  // beach and open water
  rect(0, 10, 29, 12, T_SAND);
  rect(2, 9, 5, 9, T_SAND);
  rect(24, 9, 27, 9, T_SAND);
  rect(0, 13, 29, 19, T_SEA);
  for (let i = 0; i < W * H; i++) if (b.m.terrain[i] === T_SEA) collision[i] = 1;
  rect(14, 13, 15, 16, T_BRIDGE);         // the pier
  for (let y = 13; y <= 16; y++) for (const x of [14, 15]) collision[y * W + x] = 0;

  placeHouse(b, { id: 'puzzle-monty', label: 'Shore Shack', x: 17, y: 3, w: 5, h: 4, roof: 'red', wall: 'wood' });

  dressWild(b, { rings: 1, density: 0.1, accents: 10 });
  // beachcombing
  for (const [x, y] of [[5, 11], [10, 11], [19, 11], [25, 11]] as [number, number][])
    if (get(x, y) === T_SAND) deco(x, y, 'shell');
  solid(7, 10, 'log');
  solid(22, 10, 'log');
  solid(3, 11, 'rock');
  solid(26, 10, 'rock');
  solid(7, 7, 'barrel');
  // pier furniture
  deco(13, 13, 'pierpost');
  deco(16, 13, 'pierpost');
  deco(13, 15, 'pierpost');
  deco(16, 15, 'pierpost');
  deco(16, 16, 'boat');
  solid(14, 16, 'sign');
  b.m.signs.push({ x: 14, y: 16, text: "PIER'S END: the ferryman rows out on calm mornings. Ask him nothing about probability. He has heard it all." });

  solid(11, 7, 'sign');
  b.m.signs.push({ x: 11, y: 7, text: 'SOUTH SHORE: end of the road. The Shore Shack runs a three-crate game for 20 bonus points. Walk the pier while you think.' });
  b.m.npcs.push({ x: 17, y: 10, variant: 0, lines: ['Sea air is free. The Shore Shack game is not; it costs most people their pride. Switch or stay, that is the whole question.'] });
  block(17, 10);

  for (const x of [14, 15]) b.m.warps.push({ x, y: 0, toMap: 'drift', toX: 21 + (x - 14), toY: 28, facing: 'up' });
  return b.m;
}

// Deepwood: old-growth forest east of the Puzzle Woods.
function buildDeepwood(): GameMap {
  const W = 30, H = 20;
  const b = newMap('deepwood', 'Deepwood', W, H, true, T_GRASS);
  const { rect, set, get, block, solid, deco } = b;
  const collision = b.m.collision;
  b.m.tint = 'rgba(8, 26, 14, 0.22)';

  rect(0, 9, 13, 10, T_PATH);
  rect(12, 5, 13, 9, T_PATH);
  rect(12, 5, 20, 6, T_PATH);

  placeHouse(b, { id: 'puzzle-egg', label: "Hermit's Hut", x: 14, y: 0, w: 5, h: 4, roof: 'green', wall: 'wood' });

  // hidden clearing SE, reached through a one-tile gap in the trees
  const clearing = { x0: 22, y0: 13, x1: 26, y1: 16 };
  const gap = { x0: 18, y0: 14, x1: 22, y1: 15 };
  const reserved = (x: number, y: number) =>
    (x >= clearing.x0 - 1 && x <= clearing.x1 + 1 && y >= clearing.y0 - 1 && y <= clearing.y1 + 1) ||
    (x >= gap.x0 - 1 && x <= gap.x1 + 1 && y >= gap.y0 - 1 && y <= gap.y1 + 1);

  const clearOf = (x: number, y: number) => {
    if (reserved(x, y)) return false;
    for (let dy = -1; dy <= 0; dy++)
      for (let dx = 0; dx <= 1; dx++) {
        const t = get(x + dx, y + dy);
        if (t === T_PATH) return false;
      }
    for (const h of b.m.houses)
      if (x + 1 >= h.x - 1 && x <= h.x + h.w && y >= h.y - 1 && y <= h.y + h.h + 1) return false;
    return true;
  };
  const treeAt = (x: number, y: number) => {
    b.m.above.push({ x, y, kind: 'bigtree', variant: Math.floor(hash(x, y, 9) * 2), ox: (y % 2) * 8 });
    block(x, y);
    block(x + 1, y);
  };
  for (let y = -1; y < H; y++)
    for (let x = -1 + (y % 2); x < W; x += 2)
      if (clearOf(x, y)) treeAt(x, y);
  for (let y = 0; y < H; y += 2)
    for (let x = (y + 1) % 2; x < W; x += 2)
      if (clearOf(x, y) && hash(x, y, 79) < 0.7) treeAt(x, y);

  // forest floor life
  for (let i = 0; i < 14; i++) {
    const x = 2 + Math.floor(hash(i, 3, 81) * (W - 6));
    const y = 2 + Math.floor(hash(i, 5, 83) * (H - 6));
    if (get(x, y) === T_GRASS && !collision[y * W + x]) {
      if (hash(i, 7, 85) < 0.5) deco(x, y, 'mushroom');
      else set(x, y, T_TALL);
    }
  }
  solid(6, 7, 'log');
  solid(20, 8, 'mushroom');

  // the clearing itself: mossy, quiet, one old sign
  for (let yy = clearing.y0; yy <= clearing.y1; yy++)
    for (let xx = clearing.x0; xx <= clearing.x1; xx++)
      if (get(xx, yy) === T_GRASS && hash(xx, yy, 87) < 0.4) deco(xx, yy, 'flower', Math.floor(hash(xx, yy, 88) * 4));
  solid(24, 13, 'sign');
  b.m.signs.push({ x: 24, y: 13, text: 'THE QUIET CLEARING: whoever finds this place was not following the road. That instinct will serve you.' });
  solid(23, 16, 'mushroom');
  solid(26, 15, 'log');

  solid(4, 8, 'sign');
  b.m.signs.push({ x: 4, y: 8, text: 'DEEPWOOD: the forest keeps its own counsel. A hermit lives up the bend; his egg question pays 30 bonus points.' });
  b.m.npcs.push({ x: 17, y: 8, variant: 1, lines: ['You came deeper than most. The hermit up the bend traded the city for two eggs and a good question. He will tell you the rest.'] });
  block(17, 8);

  for (const y of [9, 10]) b.m.warps.push({ x: 0, y, toMap: 'woods', toX: 38, toY: y + 1, facing: 'left' });
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
      npcLines: ['Take a seat. I have four questions for you. Answer like you mean it: two or three sentences each.'],
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
      npcLines: ['The archive keeps what people leave behind. Leave something worth keeping: an essay you care about, and your resume for the record.'],
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
      npcLines: ['Ah, the applicant. I have a paper for you: the Hennessy and Patterson Turing Lecture on computer architecture. Read it, then explain it back to me on camera. Three minutes, and the whiteboard is yours.'],
      furnish: (b) => {
        b.solid(1, 2, 'machine'); b.solid(2, 2, 'machine');
        b.solid(9, 2, 'machine'); b.solid(10, 2, 'machine');
        b.solid(1, 5, 'machine');
        b.solid(10, 5, 'shelf');
        b.solid(3, 6, 'table'); b.deco(4, 6, 'stool');
        b.solid(8, 4, 'plant');
      },
    },
  ];
  // one interior per puzzle house, furnished from a rotating set
  PUZZLES.forEach((pz, i) => {
    const furnishes: ((b: Builder) => void)[] = [
      (b) => { b.solid(1, 2, 'shelf'); b.solid(2, 2, 'shelf'); b.solid(8, 2, 'plant'); b.solid(2, 5, 'table'); b.solid(7, 5, 'barrel'); },
      (b) => { b.solid(1, 2, 'barrel'); b.solid(2, 2, 'barrel'); b.solid(7, 2, 'shelf'); b.solid(8, 2, 'shelf'); b.solid(1, 5, 'table'); b.solid(8, 5, 'plant'); },
      (b) => { b.solid(1, 2, 'plant'); b.solid(7, 2, 'shelf'); b.solid(8, 2, 'shelf'); b.solid(2, 5, 'stool'); b.solid(7, 5, 'table'); },
      (b) => { b.solid(1, 2, 'machine'); b.solid(8, 2, 'shelf'); b.solid(1, 5, 'barrel'); b.solid(8, 5, 'plant'); },
    ];
    interiors.push({
      id: pz.id as StationId, name: pz.house, w: 10, h: 8, rug: i % 4, npcVariant: i % 3,
      npcLines: [pz.hostLine],
      furnish: furnishes[i % furnishes.length],
    });
  });

  const maps: Record<string, GameMap> = { town, woods };
  maps['route-north'] = buildRoute('route-north', 'North Trail', 14, 26, true,
    { edge: 'bottom', toX: 24, toY: 1, facing: 'down' },
    'NORTH TRAIL: Summit Hollow ahead, and The Overlook above it. 75 bonus points that way.',
    { toMap: 'summit', toX: 21, toY: 28, facing: 'up' });
  maps['route-west'] = buildRoute('route-west', 'West Trail', 30, 14, false,
    { edge: 'right', toX: 1, toY: 13, facing: 'right' },
    'WEST TRAIL: Mirror Lake ahead, and Fern Marsh beyond. 65 bonus points that way.',
    { toMap: 'mirror', toX: 42, toY: 14, facing: 'left' });
  maps['route-south'] = buildRoute('route-south', 'South Trail', 14, 24, true,
    { edge: 'top', toX: 37, toY: 50, facing: 'up' },
    'SOUTH TRAIL: Driftwood Landing ahead, and South Shore past it. 70 bonus points that way.',
    { toMap: 'drift', toX: 21, toY: 1, facing: 'down' });

  maps['summit'] = buildSummit();
  maps['mirror'] = buildMirror();
  maps['drift'] = buildDrift();
  maps['overlook'] = buildOverlook();
  maps['marsh'] = buildMarsh();
  maps['shore'] = buildShore();
  maps['deepwood'] = buildDeepwood();
  for (const spec of interiors) maps[`int-${spec.id}`] = buildInterior(spec);

  // wire door warps: exterior door -> interior mat position; interior mats -> outside the door
  const outdoors = [town, woods, maps['summit'], maps['mirror'], maps['drift'], maps['overlook'], maps['marsh'], maps['shore'], maps['deepwood']];
  for (const outdoor of outdoors) {
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
