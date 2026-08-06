// Procedural 16px pixel-art tileset in the style of the reference town map:
// pale mint grass, tan paths, blue ponds, round bushy trees, wooden fences,
// gabled houses. Everything is drawn once to offscreen canvases at load.

export const TILE = 16;

export type SpriteMap = Record<string, HTMLCanvasElement>;

// ---- palette ----
export const PAL = {
  grass: '#a5d6a0',
  grassLight: '#b2dfab',
  grassDark: '#93c98e',
  tuft: '#7fbc7a',
  tallGrass: '#6fae6a',
  tallGrassDark: '#5c9a58',
  path: '#ead9a2',
  pathLight: '#f2e5b8',
  pathEdge: '#cbb479',
  water: '#4f96c8',
  waterLight: '#6fb2dc',
  waterDark: '#3d7fae',
  waterEdge: '#2f6c96',
  cliff: '#a5836a',
  cliffDark: '#7d5f4a',
  cliffLight: '#c0a184',
  treeDark: '#2e6b3f',
  tree1: '#3f8a50',
  tree2: '#54a763',
  tree3: '#6fc077',
  tree4: '#8fd48f',
  trunk: '#8a6242',
  trunkDark: '#6b4a30',
  fence: '#e7dbc0',
  fenceDark: '#b7a882',
  wallWood: '#c9a06a',
  wallWoodDark: '#a37e4e',
  wallGray: '#b9beb6',
  wallGrayDark: '#8f948c',
  roofBlue: '#4a7fa6',
  roofBlueDark: '#38617f',
  roofBlueLight: '#6b9cbf',
  roofRed: '#b5524a',
  roofRedDark: '#8a3c36',
  roofRedLight: '#cf7069',
  roofGreen: '#4e9b62',
  roofGreenDark: '#3a7a4a',
  roofGreenLight: '#6fb87e',
  door: '#a04a28',
  doorDark: '#6f2f18',
  window: '#8fd0e8',
  windowDark: '#4a7f9a',
  outline: '#2b3b2f',
} as const;

function cv(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  g.imageSmoothingEnabled = false;
  return [c, g];
}

function px(g: CanvasRenderingContext2D, x: number, y: number, color: string, w = 1, h = 1) {
  g.fillStyle = color;
  g.fillRect(x, y, w, h);
}

// deterministic hash noise
function hash(x: number, y: number, seed = 0): number {
  let h = x * 374761393 + y * 668265263 + seed * 1274126177;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

// ---- terrain tiles ----

export function drawGrass(g: CanvasRenderingContext2D, tx: number, ty: number) {
  // mowed-lawn checker: alternate tiles get a slightly lighter base
  g.fillStyle = (tx + ty) % 2 === 0 ? PAL.grass : '#abdaa5';
  g.fillRect(0, 0, TILE, TILE);
  // occasional variant tiles: dense tuft cluster or worn patch
  const v = hash(tx, ty, 130);
  if (v < 0.06) {
    g.fillStyle = '#9ccf96';
    g.fillRect(3, 4, 10, 8);
    g.fillStyle = PAL.grassDark;
    g.fillRect(4, 6, 3, 1); g.fillRect(9, 8, 3, 1); g.fillRect(6, 10, 3, 1);
  } else if (v < 0.14) {
    g.fillStyle = PAL.tuft;
    g.fillRect(3, 5, 2, 2); g.fillRect(10, 4, 2, 2); g.fillRect(6, 9, 2, 2); g.fillRect(12, 11, 2, 2);
    g.fillStyle = PAL.tree3;
    g.fillRect(3, 4, 1, 1); g.fillRect(10, 3, 1, 1); g.fillRect(6, 8, 1, 1);
  }
  // sparse tufts and light specks, deterministic per world tile
  for (let i = 0; i < 3; i++) {
    const r = hash(tx, ty, i * 7 + 1);
    if (r < 0.55) {
      const x = Math.floor(hash(tx, ty, i * 13 + 2) * 14);
      const y = Math.floor(hash(tx, ty, i * 17 + 3) * 14);
      if (r < 0.3) {
        px(g, x, y, PAL.grassDark, 2, 1);
        px(g, x, y - 1, PAL.tuft, 1, 1);
      } else {
        px(g, x, y, PAL.grassLight, 2, 1);
      }
    }
  }
}

export function drawTallGrass(g: CanvasRenderingContext2D) {
  g.fillStyle = PAL.grass;
  g.fillRect(0, 0, TILE, TILE);
  // three jagged tufts, Pokemon-style
  const tuft = (ox: number, oy: number) => {
    g.fillStyle = PAL.tallGrass;
    g.fillRect(ox, oy + 2, 7, 5);
    g.fillRect(ox + 1, oy, 1, 3);
    g.fillRect(ox + 3, oy + 1, 1, 2);
    g.fillRect(ox + 5, oy, 1, 3);
    g.fillStyle = PAL.tallGrassDark;
    g.fillRect(ox + 2, oy + 4, 1, 3);
    g.fillRect(ox + 4, oy + 3, 1, 3);
    g.fillRect(ox, oy + 6, 7, 1);
  };
  tuft(0, 2);
  tuft(8, 4);
  tuft(4, 8);
}

// Path with rounded autotile edges. mask bits: 1=N,2=E,4=S,8=W neighbor IS path.
export function drawPath(g: CanvasRenderingContext2D, mask: number, tx: number, ty: number, dmask = 15) {
  g.fillStyle = PAL.grass;
  g.fillRect(0, 0, TILE, TILE);
  g.fillStyle = PAL.path;
  g.fillRect(0, 0, TILE, TILE);
  const n = mask & 1, e = mask & 2, s = mask & 4, w = mask & 8;
  g.fillStyle = PAL.grass;
  // grass creeps in on open edges with a wavy border
  const wave = (i: number, seed: number) => (hash(tx * 4 + i, ty, seed) < 0.5 ? 1 : 2);
  if (!n) for (let i = 0; i < 4; i++) g.fillRect(i * 4, 0, 4, wave(i, 1));
  if (!s) for (let i = 0; i < 4; i++) g.fillRect(i * 4, TILE - wave(i, 2), 4, 2);
  if (!w) for (let i = 0; i < 4; i++) g.fillRect(0, i * 4, wave(i, 3), 4);
  if (!e) for (let i = 0; i < 4; i++) g.fillRect(TILE - wave(i, 4), i * 4, 2, 4);
  // rounded outer corners
  if (!n && !w) { g.fillRect(0, 0, 3, 3); }
  if (!n && !e) { g.fillRect(TILE - 3, 0, 3, 3); }
  if (!s && !w) { g.fillRect(0, TILE - 3, 3, 3); }
  if (!s && !e) { g.fillRect(TILE - 3, TILE - 3, 3, 3); }
  // edge shading just inside grass border, all four sides
  g.fillStyle = PAL.pathEdge;
  if (!n) g.fillRect(0, 2, TILE, 1);
  if (!w) g.fillRect(2, 0, 1, TILE);
  if (!s) g.fillRect(0, TILE - 3, TILE, 1);
  if (!e) g.fillRect(TILE - 3, 0, 1, TILE);
  // inner corners: grass nib where two path edges meet around a grass diagonal
  // dmask bits: 1=NE, 2=SE, 4=SW, 8=NW diagonal IS path
  const nib = (x: number, y: number) => {
    g.fillStyle = PAL.grass;
    g.fillRect(x, y, 3, 3);
    g.fillStyle = PAL.pathEdge;
    if (x === 0 && y === 0) { g.fillRect(3, 0, 1, 3); g.fillRect(0, 3, 4, 1); }
    else if (x > 0 && y === 0) { g.fillRect(x - 1, 0, 1, 3); g.fillRect(x - 1, 3, 4, 1); }
    else if (x === 0) { g.fillRect(3, y, 1, 3); g.fillRect(0, y - 1, 4, 1); }
    else { g.fillRect(x - 1, y, 1, 3); g.fillRect(x - 1, y - 1, 4, 1); }
  };
  if (n && e && !(dmask & 1)) nib(TILE - 3, 0);
  if (s && e && !(dmask & 2)) nib(TILE - 3, TILE - 3);
  if (s && w && !(dmask & 4)) nib(0, TILE - 3);
  if (n && w && !(dmask & 8)) nib(0, 0);
  // speckles
  for (let i = 0; i < 3; i++) {
    const r = hash(tx, ty, 40 + i);
    if (r < 0.4) {
      const x = 3 + Math.floor(hash(tx, ty, 50 + i) * 10);
      const y = 3 + Math.floor(hash(tx, ty, 60 + i) * 10);
      px(g, x, y, r < 0.2 ? PAL.pathLight : PAL.pathEdge, 2, 1);
    }
  }
}

// Water with grass banks. mask bits like path: neighbor IS water.
export function drawWater(
  g: CanvasRenderingContext2D,
  mask: number,
  tx: number,
  ty: number,
  frame: number,
) {
  g.fillStyle = PAL.grass;
  g.fillRect(0, 0, TILE, TILE);
  const n = mask & 1, e = mask & 2, s = mask & 4, w = mask & 8;
  g.fillStyle = PAL.water;
  g.fillRect(0, 0, TILE, TILE);
  // tonal wave bands (offset per frame for subtle motion)
  g.fillStyle = '#4890c2';
  for (let y = (ty * 3 + frame) % 4; y < TILE; y += 4) g.fillRect(0, y, TILE, 1);
  g.fillStyle = '#5ba2d2';
  for (let y = (ty * 3 + 2 + frame) % 4; y < TILE; y += 8) g.fillRect(0, y, TILE, 1);
  // animated ripple highlights
  for (let i = 0; i < 5; i++) {
    const r = hash(tx, ty, 70 + i);
    if (r < 0.55) {
      const x = Math.floor(hash(tx, ty, 80 + i) * 12);
      const y = (Math.floor(hash(tx, ty, 90 + i) * 12) + frame) % 14;
      px(g, x, y, PAL.waterLight, 3, 1);
    }
  }
  // banks: grass lip + dark water edge
  g.fillStyle = PAL.grass;
  if (!n) g.fillRect(0, 0, TILE, 2);
  if (!s) g.fillRect(0, TILE - 2, TILE, 2);
  if (!w) g.fillRect(0, 0, 2, TILE);
  if (!e) g.fillRect(TILE - 2, 0, 2, TILE);
  // pale shore lip between grass and dark rim
  g.fillStyle = '#dce8c8';
  if (!n) g.fillRect(0, 2, TILE, 1);
  if (!s) g.fillRect(0, TILE - 3, TILE, 1);
  if (!w) g.fillRect(2, 0, 1, TILE);
  if (!e) g.fillRect(TILE - 3, 0, 1, TILE);
  g.fillStyle = PAL.waterEdge;
  if (!n) g.fillRect(0, 3, TILE, 2);
  if (!s) g.fillRect(0, TILE - 5, TILE, 2);
  if (!w) g.fillRect(3, 0, 2, TILE);
  if (!e) g.fillRect(TILE - 5, 0, 2, TILE);
  // rounded bank corners: quarter-circle grass bite with dark rim
  const corner = (sx: number, sy: number, dx: number, dy: number) => {
    for (let i = 0; i < 6; i++) {
      const w2 = 6 - i;
      g.fillStyle = PAL.grass;
      g.fillRect(sx + (dx < 0 ? -w2 + 1 : 0), sy + dy * i, w2, 1);
    }
    g.fillStyle = PAL.waterEdge;
    for (let i = 0; i < 6; i++) {
      const w2 = 6 - i;
      g.fillRect(sx + (dx < 0 ? -w2 - 1 : w2 - 1) + (dx < 0 ? 1 : 0), sy + dy * i, 2, 1);
    }
  };
  if (!n && !w) corner(0, 0, 1, 1);
  if (!n && !e) corner(TILE - 1, 0, -1, 1);
  if (!s && !w) corner(0, TILE - 1, 1, -1);
  if (!s && !e) corner(TILE - 1, TILE - 1, -1, -1);
}

// Rock cliff face. Tiles stack two rows tall: a lit cap on top, shadowed base below.
export function drawCliff(g: CanvasRenderingContext2D, mask: number, tx: number, ty: number) {
  const n = mask & 1, sN = mask & 4;
  g.fillStyle = '#9c8468';
  g.fillRect(0, 0, TILE, TILE);
  // vertical cracks
  for (let i = 0; i < 3; i++) {
    const x = 2 + Math.floor(hash(tx, ty, 100 + i) * 12);
    g.fillStyle = '#7d6750';
    g.fillRect(x, 2 + Math.floor(hash(tx, ty, 104 + i) * 6), 1, 5 + Math.floor(hash(tx, ty, 108 + i) * 6));
  }
  g.fillStyle = '#b59a7c';
  for (let i = 0; i < 2; i++) {
    const x = 1 + Math.floor(hash(tx, ty, 112 + i) * 12);
    const y = 3 + Math.floor(hash(tx, ty, 116 + i) * 9);
    g.fillRect(x, y, 3, 1);
  }
  if (!n) {
    // lit cap where the cliff meets upper ground
    g.fillStyle = '#c9b190';
    g.fillRect(0, 0, TILE, 3);
    g.fillStyle = '#e0cbaa';
    g.fillRect(0, 0, TILE, 1);
    g.fillStyle = '#6b5843';
    g.fillRect(0, 3, TILE, 1);
  }
  if (!sN) {
    // shadowed footing where it meets lower ground
    g.fillStyle = '#6b5843';
    g.fillRect(0, TILE - 3, TILE, 2);
    g.fillStyle = '#4f4131';
    g.fillRect(0, TILE - 1, TILE, 1);
  }
}

// High-altitude grass: desaturated, cooler, sparse.
export function drawAlpine(g: CanvasRenderingContext2D, tx: number, ty: number) {
  g.fillStyle = (tx + ty) % 2 === 0 ? '#9cc4a0' : '#a4cba7';
  g.fillRect(0, 0, TILE, TILE);
  const v = hash(tx, ty, 131);
  if (v < 0.12) {
    g.fillStyle = '#8ab08d';
    g.fillRect(3 + Math.floor(v * 80) % 9, 4, 3, 1);
    g.fillRect(6, 9, 2, 1);
  }
  if (v > 0.9) {
    g.fillStyle = '#b8b4a8';
    g.fillRect(4 + Math.floor(hash(tx, ty, 133) * 8), 5 + Math.floor(hash(tx, ty, 135) * 7), 2, 1);
  }
}

// Murky marsh water: desaturated green-blue, reedy edges.
export function drawMarshWater(g: CanvasRenderingContext2D, mask: number, tx: number, ty: number, frame: number) {
  g.fillStyle = '#a5d6a0';
  g.fillRect(0, 0, TILE, TILE);
  const n = mask & 1, e = mask & 2, sN = mask & 4, w = mask & 8;
  g.fillStyle = '#5d8a7a';
  g.fillRect(0, 0, TILE, TILE);
  g.fillStyle = '#54806f';
  for (let y = (ty * 3 + frame) % 5; y < TILE; y += 5) g.fillRect(0, y, TILE, 1);
  g.fillStyle = '#6f9c8a';
  for (let i = 0; i < 3; i++) {
    if (hash(tx, ty, 140 + i) < 0.5) {
      g.fillRect(Math.floor(hash(tx, ty, 144 + i) * 12), (Math.floor(hash(tx, ty, 148 + i) * 12) + frame) % 14, 3, 1);
    }
  }
  // mud lip + reeds on exposed banks
  g.fillStyle = '#8a7a55';
  if (!n) g.fillRect(0, 0, TILE, 2);
  if (!sN) g.fillRect(0, TILE - 2, TILE, 2);
  if (!w) g.fillRect(0, 0, 2, TILE);
  if (!e) g.fillRect(TILE - 2, 0, 2, TILE);
  g.fillStyle = '#42665a';
  if (!n) g.fillRect(0, 2, TILE, 1);
  if (!sN) g.fillRect(0, TILE - 3, TILE, 1);
  if (!w) g.fillRect(2, 0, 1, TILE);
  if (!e) g.fillRect(TILE - 3, 0, 1, TILE);
  // cattails
  if (!n && hash(tx, ty, 152) < 0.6) {
    const x = 3 + Math.floor(hash(tx, ty, 154) * 9);
    g.fillStyle = '#5c9a58';
    g.fillRect(x, 0, 1, 4);
    g.fillStyle = '#8a5f3a';
    g.fillRect(x, 0, 1, 2);
  }
}

// Mud patch ground for the marsh.
export function drawMud(g: CanvasRenderingContext2D, tx: number, ty: number) {
  g.fillStyle = '#8a7a55';
  g.fillRect(0, 0, TILE, TILE);
  g.fillStyle = '#79694a';
  for (let i = 0; i < 4; i++) {
    const x = Math.floor(hash(tx, ty, 160 + i) * 13);
    const y = Math.floor(hash(tx, ty, 164 + i) * 13);
    g.fillRect(x, y, 3, 2);
  }
  g.fillStyle = '#9c8c66';
  g.fillRect(2 + Math.floor(hash(tx, ty, 168) * 10), 3 + Math.floor(hash(tx, ty, 169) * 9), 4, 1);
}

// Cold alpine tarn: slate-teal water with rocky gray banks.
export function drawTarn(g: CanvasRenderingContext2D, mask: number, tx: number, ty: number, frame: number) {
  g.fillStyle = '#9cc4a0';
  g.fillRect(0, 0, TILE, TILE);
  const n = mask & 1, e = mask & 2, sN = mask & 4, w = mask & 8;
  g.fillStyle = '#527d94';
  g.fillRect(0, 0, TILE, TILE);
  g.fillStyle = '#48708a';
  for (let y = (ty * 3 + frame) % 5; y < TILE; y += 5) g.fillRect(0, y, TILE, 1);
  g.fillStyle = '#6d97ab';
  for (let i = 0; i < 3; i++) {
    if (hash(tx, ty, 200 + i) < 0.4) {
      g.fillRect(Math.floor(hash(tx, ty, 204 + i) * 12), (Math.floor(hash(tx, ty, 208 + i) * 12) + frame) % 14, 3, 1);
    }
  }
  // rocky banks
  g.fillStyle = '#8f948c';
  if (!n) g.fillRect(0, 0, TILE, 2);
  if (!sN) g.fillRect(0, TILE - 2, TILE, 2);
  if (!w) g.fillRect(0, 0, 2, TILE);
  if (!e) g.fillRect(TILE - 2, 0, 2, TILE);
  g.fillStyle = '#c0c4bb';
  if (!n) g.fillRect(0, 0, TILE, 1);
  if (!w) g.fillRect(0, 0, 1, TILE);
  g.fillStyle = '#33546b';
  if (!n) g.fillRect(0, 2, TILE, 1);
  if (!sN) g.fillRect(0, TILE - 3, TILE, 1);
  if (!w) g.fillRect(2, 0, 1, TILE);
  if (!e) g.fillRect(TILE - 3, 0, 1, TILE);
}

// Beach sand; wet strip drawn on tiles adjacent to sea (mask bit 4 = sea to the south).
export function drawSand(g: CanvasRenderingContext2D, seaSouth: boolean, tx: number, ty: number) {
  g.fillStyle = '#ecdcb0';
  g.fillRect(0, 0, TILE, TILE);
  g.fillStyle = '#dcc998';
  for (let i = 0; i < 3; i++) {
    const x = Math.floor(hash(tx, ty, 170 + i) * 13);
    const y = Math.floor(hash(tx, ty, 174 + i) * 13);
    g.fillRect(x, y, 2, 1);
  }
  g.fillStyle = '#f6ecc8';
  g.fillRect(2 + Math.floor(hash(tx, ty, 178) * 9), 2 + Math.floor(hash(tx, ty, 179) * 9), 3, 1);
  if (seaSouth) {
    g.fillStyle = '#cbb488';
    g.fillRect(0, TILE - 4, TILE, 4); // wet sand
    g.fillStyle = '#b9a173';
    g.fillRect(0, TILE - 2, TILE, 2);
  }
}

// Open sea: deeper blue with depth banding and foam where it meets sand.
export function drawSea(g: CanvasRenderingContext2D, mask: number, tx: number, ty: number, frame: number, depth: number) {
  const n = mask & 1;
  const base = depth < 1 ? '#4f96c8' : depth < 3 ? '#4488ba' : '#3a77a8';
  g.fillStyle = base;
  g.fillRect(0, 0, TILE, TILE);
  g.fillStyle = depth < 1 ? '#5ba2d2' : '#4f94c2';
  for (let y = (ty * 3 + frame) % 4; y < TILE; y += 4) g.fillRect(0, y, TILE, 1);
  g.fillStyle = '#6fb2dc';
  for (let i = 0; i < 3; i++) {
    if (hash(tx, ty, 180 + i) < 0.4) {
      g.fillRect(Math.floor(hash(tx, ty, 184 + i) * 12), (Math.floor(hash(tx, ty, 188 + i) * 12) + frame) % 14, 3, 1);
    }
  }
  if (!n) {
    // surf line: animated foam
    g.fillStyle = '#ffffff';
    for (let x = 0; x < TILE; x += 4) {
      const o = (Math.floor(hash(tx, x, 190) * 2) + frame) % 2;
      g.fillRect(x, o, 3, 1);
    }
    g.fillStyle = '#d8ecf8';
    g.fillRect(0, 1, TILE, 1);
    g.fillStyle = '#a8d0e8';
    g.fillRect(0, 2, TILE, 1);
  }
}

// ---- objects (drawn as sprites, may span tiles) ----

// Round bushy tree ~32x40 for above-player canopy feel; variant changes hue.
export function makeTree(variant: number): HTMLCanvasElement {
  const W = 32, H = 40;
  const [c, g] = cv(W, H);
  const shades =
    variant % 3 === 0
      ? [PAL.treeDark, PAL.tree1, PAL.tree2, PAL.tree3]
      : variant % 3 === 1
        ? [PAL.treeDark, PAL.tree2, PAL.tree3, PAL.tree4]
        : ['#2a5f46', '#3d7f58', '#57a06d', '#79bb84'];
  // small trunk peeking under the canopy
  px(g, 13, 33, PAL.trunkDark, 6, 6);
  px(g, 14, 33, PAL.trunk, 4, 5);
  const blob = (cx: number, cy: number, rx: number, ry: number, col: string) => {
    g.fillStyle = col;
    for (let y = -ry; y <= ry; y++)
      for (let x = -rx; x <= rx; x++)
        if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) g.fillRect(cx + x, cy + y, 1, 1);
  };
  // canopy built from distinct overlapping lobes; shape varies per variant
  const shape = variant % 3;
  const lobes: [number, number, number][] =
    shape === 1
      ? [ // wider, squatter
          [8, 25, 8], [24, 25, 8], [16, 28, 8], [9, 15, 8], [23, 15, 8], [16, 10, 8],
        ]
      : shape === 2
        ? [ // taller, narrower crown
            [10, 25, 7], [22, 25, 7], [16, 28, 6], [11, 14, 7], [21, 14, 7], [16, 6, 7],
          ]
        : [
            [9, 24, 8], [23, 24, 8], [16, 27, 7], [10, 13, 8], [22, 13, 8], [16, 8, 7],
          ];
  // dark silhouette (outline + shadow base)
  for (const [cx, cy, r] of lobes) blob(cx, cy, r + 1, r + 1, shades[0]);
  // mid tone per lobe
  for (const [cx, cy, r] of lobes) blob(cx, cy - 1, r, r, shades[1]);
  // scalloped dark shadow along each lobe's lower edge
  g.fillStyle = shades[0];
  for (const [cx, cy, r] of lobes) {
    for (let x = -r; x <= r; x++) {
      const yy = Math.round(Math.sqrt(Math.max(0, r * r - x * x)));
      g.fillRect(cx + x, cy + yy - 2, 1, 2);
    }
  }
  // light tone on the upper-left of each upper lobe
  blob(9, 11, 5, 5, shades[2]);
  blob(15, 7, 5, 4, shades[2]);
  blob(21, 12, 4, 4, shades[2]);
  blob(8, 22, 4, 3, shades[2]);
  // solid highlight clusters, offset upper-left
  g.fillStyle = shades[3];
  blob(8, 9, 3, 2, shades[3]);
  blob(14, 6, 3, 2, shades[3]);
  blob(12, 12, 2, 2, shades[3]);
  blob(20, 10, 2, 1, shades[3]);
  return c;
}

// Conifer pine, 24x36: pointed layered canopy for alpine and deep forest.
export function makePine(variant: number): HTMLCanvasElement {
  const W = 24, H = 36;
  const [c, g] = cv(W, H);
  const shades = variant % 2 === 0
    ? ['#1f4a35', '#2e6647', '#417f58', '#5a9a6b']
    : ['#243f2e', '#35573d', '#4a7050', '#618a64'];
  // trunk
  px(g, 10, 30, PAL.trunkDark, 4, 6);
  px(g, 11, 30, PAL.trunk, 2, 5);
  // stacked triangle tiers, widest at the bottom
  const tier = (cy: number, half: number, hgt: number, col: string) => {
    g.fillStyle = col;
    for (let r = 0; r < hgt; r++) {
      const w2 = Math.round((half * (r + 1)) / hgt);
      g.fillRect(12 - w2, cy + r, w2 * 2, 1);
    }
  };
  tier(20, 11, 11, shades[0]);
  tier(19, 10, 10, shades[1]);
  tier(12, 9, 10, shades[0]);
  tier(11, 8, 9, shades[1]);
  tier(5, 7, 9, shades[0]);
  tier(4, 6, 8, shades[2]);
  tier(0, 4, 7, shades[1]);
  // snow/light dusting on the left edges
  g.fillStyle = shades[3];
  px(g, 8, 8, shades[3], 3, 1);
  px(g, 6, 15, shades[3], 3, 1);
  px(g, 4, 24, shades[3], 4, 1);
  px(g, 11, 2, shades[3], 2, 1);
  return c;
}

// Old-growth tree, 40x48: darker, wider canopy for the Deepwood.
export function makeBigTree(variant: number): HTMLCanvasElement {
  const W = 40, H = 48;
  const [c, g] = cv(W, H);
  const shades = variant % 2 === 0
    ? ['#1d4030', '#2a5a40', '#3a7050', '#4f8a60']
    : ['#1a3a2c', '#265038', '#356348', '#487a55'];
  px(g, 16, 40, PAL.trunkDark, 8, 8);
  px(g, 17, 40, '#5a4030', 6, 7);
  const blob = (cx: number, cy: number, rx: number, ry: number, col: string) => {
    g.fillStyle = col;
    for (let y = -ry; y <= ry; y++)
      for (let x = -rx; x <= rx; x++)
        if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) g.fillRect(cx + x, cy + y, 1, 1);
  };
  blob(20, 22, 19, 19, shades[0]);
  blob(10, 32, 8, 7, shades[0]);
  blob(30, 32, 8, 7, shades[0]);
  blob(20, 20, 16, 16, shades[1]);
  blob(11, 30, 5, 5, shades[1]);
  blob(29, 30, 5, 5, shades[1]);
  blob(18, 14, 11, 10, shades[2]);
  blob(10, 22, 5, 5, shades[2]);
  blob(28, 21, 5, 4, shades[2]);
  g.fillStyle = shades[3];
  blob(11, 10, 4, 3, shades[3]);
  blob(19, 7, 4, 2, shades[3]);
  blob(7, 17, 3, 2, shades[3]);
  return c;
}

export function makeMushroom(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 6, 9, '#e8dcc8', 4, 5);
  px(g, 4, 5, '#20242c', 8, 5);
  px(g, 5, 4, '#c8443a', 6, 5);
  px(g, 4, 6, '#c8443a', 8, 3);
  px(g, 6, 5, '#f0e8d8', 2, 1);
  px(g, 9, 7, '#f0e8d8', 1, 1);
  px(g, 5, 14, 'rgba(0,0,0,0.2)', 6, 1);
  return c;
}

export function makeLog(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 1, 6, '#4a3729', 14, 7);
  px(g, 2, 7, '#6b4a30', 12, 4);
  px(g, 2, 7, '#8a6242', 12, 1);
  px(g, 13, 6, '#a58057', 2, 7);
  px(g, 13, 8, '#6b4a30', 1, 3);
  px(g, 3, 9, '#4a3729', 4, 1);
  px(g, 2, 13, 'rgba(0,0,0,0.2)', 12, 1);
  return c;
}

export function makeShell(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 5, 7, '#e8b8c8', 6, 4);
  px(g, 6, 6, '#f2d0da', 4, 1);
  px(g, 7, 11, '#c890a4', 2, 1);
  px(g, 6, 8, '#c890a4', 1, 2);
  px(g, 9, 8, '#c890a4', 1, 2);
  return c;
}

// small rowboat, 32x16, drawn on water
export function makeBoat(): HTMLCanvasElement {
  const [c, g] = cv(32, 16);
  px(g, 2, 4, '#20242c', 28, 9);
  px(g, 4, 5, '#8a6242', 24, 6);
  px(g, 5, 6, '#a58057', 22, 2);
  px(g, 8, 8, '#6b4a30', 16, 2);
  px(g, 14, 5, '#4a3729', 3, 6);
  px(g, 3, 12, 'rgba(255,255,255,0.35)', 26, 1);
  return c;
}

export function makePierPost(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 6, 2, '#6b4a30', 4, 12);
  px(g, 6, 2, '#8a6242', 2, 12);
  px(g, 5, 1, '#4a3729', 6, 2);
  px(g, 5, 13, 'rgba(255,255,255,0.3)', 6, 1);
  return c;
}

// small round bush 16x16
export function makeBush(variant: number): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  const dark = variant ? '#2a5f46' : PAL.treeDark;
  const mid = variant ? '#4a9464' : PAL.tree2;
  const light = variant ? '#6fb884' : PAL.tree3;
  const blob = (cx: number, cy: number, r: number, col: string) => {
    g.fillStyle = col;
    for (let y = -r; y <= r; y++)
      for (let x = -r; x <= r; x++)
        if (x * x + y * y <= r * r) g.fillRect(cx + x, cy + y, 1, 1);
  };
  blob(8, 9, 6, dark);
  blob(8, 8, 5, mid);
  blob(6, 7, 3, light);
  px(g, 10, 6, light, 2, 1);
  px(g, 7, 11, dark, 3, 1);
  return c;
}

export function makeFlower(variant: number): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  const petal = variant % 2 ? '#e86a6a' : '#f2f2f2';
  const center = '#f2c94c';
  const spots: [number, number][] = variant % 3 === 0 ? [[4, 5], [10, 9]] : [[8, 4], [3, 10], [11, 11]];
  for (const [x, y] of spots) {
    px(g, x, y - 1, petal);
    px(g, x, y + 1, petal);
    px(g, x - 1, y, petal);
    px(g, x + 1, y, petal);
    px(g, x, y, center);
    px(g, x - 1, y + 2, PAL.tuft);
    px(g, x + 1, y + 2, PAL.tuft);
  }
  return c;
}

export function makeFence(kind: 'h' | 'v' | 'post'): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  if (kind === 'h') {
    // two continuous rails with outline + one post
    px(g, 0, 4, '#8a7550', 16, 1);
    px(g, 0, 5, PAL.fence, 16, 2);
    px(g, 0, 7, PAL.fenceDark, 16, 1);
    px(g, 0, 9, '#8a7550', 16, 1);
    px(g, 0, 10, PAL.fence, 16, 2);
    px(g, 0, 12, PAL.fenceDark, 16, 1);
    px(g, 6, 2, '#8a7550', 4, 1);
    px(g, 6, 3, PAL.fence, 4, 10);
    px(g, 7, 3, PAL.fenceDark, 1, 10);
    px(g, 6, 13, '#8a7550', 4, 1);
  } else if (kind === 'v') {
    // two vertical rails running the full tile, like the horizontal fence rotated
    px(g, 4, 0, '#8a7550', 1, 16);
    px(g, 5, 0, PAL.fence, 2, 16);
    px(g, 7, 0, PAL.fenceDark, 1, 16);
    px(g, 9, 0, '#8a7550', 1, 16);
    px(g, 10, 0, PAL.fence, 2, 16);
    px(g, 12, 0, PAL.fenceDark, 1, 16);
    // post spanning both rails
    px(g, 3, 6, '#8a7550', 11, 1);
    px(g, 3, 7, PAL.fence, 11, 3);
    px(g, 3, 10, PAL.fenceDark, 11, 1);
  } else {
    px(g, 6, 2, PAL.fence, 4, 12);
    px(g, 6, 13, PAL.fenceDark, 4, 1);
    px(g, 6, 2, PAL.fenceDark, 4, 1);
  }
  return c;
}

export function makeSign(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 7, 8, PAL.trunkDark, 3, 7);
  px(g, 2, 2, PAL.trunkDark, 12, 7);
  px(g, 3, 3, PAL.wallWood, 10, 5);
  px(g, 4, 4, PAL.wallWoodDark, 8, 1);
  px(g, 4, 6, PAL.wallWoodDark, 6, 1);
  return c;
}

export function makeLamp(): HTMLCanvasElement {
  const [c, g] = cv(16, 32);
  px(g, 7, 8, '#4a4f57', 2, 22);
  px(g, 5, 28, '#3a3e45', 6, 2);
  px(g, 4, 2, '#3a3e45', 8, 7);
  px(g, 5, 3, '#f2d98c', 6, 5);
  px(g, 6, 0, '#4a4f57', 4, 2);
  return c;
}

export function makeBarrel(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 3, 2, PAL.trunkDark, 10, 12);
  px(g, 4, 3, PAL.wallWood, 8, 10);
  px(g, 4, 5, PAL.wallWoodDark, 8, 1);
  px(g, 4, 10, PAL.wallWoodDark, 8, 1);
  px(g, 5, 3, PAL.pathLight, 2, 2);
  return c;
}

export function makeRock(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 3, 6, '#8f948c', 10, 7);
  px(g, 4, 4, '#a8ada4', 8, 4);
  px(g, 5, 5, '#c0c4bb', 4, 2);
  px(g, 3, 12, '#6f746c', 10, 1);
  return c;
}

export function makeCrops(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  g.fillStyle = '#b08a5e';
  g.fillRect(0, 0, 16, 16);
  g.fillStyle = '#96714a';
  for (let y = 0; y < 16; y += 4) g.fillRect(0, y, 16, 1);
  g.fillStyle = PAL.tree2;
  for (let x = 2; x < 16; x += 5) {
    px(g, x, 4, PAL.tree1, 2, 2);
    px(g, x, 3, PAL.tree3, 1, 1);
    px(g, x, 10, PAL.tree1, 2, 2);
    px(g, x + 1, 9, PAL.tree3, 1, 1);
  }
  return c;
}

// ---- houses ----
// Gabled house drawn programmatically. Size in tiles (w x h), roof color scheme.
export function makeHouse(opts: {
  wTiles: number;
  hTiles: number;
  roof: 'blue' | 'green' | 'red';
  wall: 'wood' | 'gray';
  big?: boolean;
}): HTMLCanvasElement {
  const W = opts.wTiles * TILE;
  const H = opts.hTiles * TILE;
  const [c, g] = cv(W, H);
  const roofC = opts.roof === 'blue' ? PAL.roofBlue : opts.roof === 'red' ? PAL.roofRed : PAL.roofGreen;
  const roofD = opts.roof === 'blue' ? PAL.roofBlueDark : opts.roof === 'red' ? PAL.roofRedDark : PAL.roofGreenDark;
  const roofL = opts.roof === 'blue' ? PAL.roofBlueLight : opts.roof === 'red' ? PAL.roofRedLight : PAL.roofGreenLight;
  const wallC = opts.wall === 'wood' ? PAL.wallWood : PAL.wallGray;
  const wallD = opts.wall === 'wood' ? PAL.wallWoodDark : PAL.wallGrayDark;

  const roofH = Math.floor(H * 0.46);
  const peakInset = Math.floor(W * 0.2);
  const wallInset = 7; // eaves overhang the walls by ~7px each side

  // walls (log/plank rows with alternating tones and end caps)
  const wx0 = wallInset, wx1 = W - wallInset;
  for (let y = roofH; y < H - 2; y += 4) {
    g.fillStyle = (Math.floor((y - roofH) / 4) % 2 === 0) ? wallC : wallD;
    g.fillRect(wx0, y, wx1 - wx0, 4);
    g.fillStyle = PAL.outline;
    g.fillRect(wx0, y + 3, wx1 - wx0, 1);
    // log end caps
    g.fillStyle = wallD;
    g.fillRect(wx0, y, 2, 3);
    g.fillRect(wx1 - 2, y, 2, 3);
  }
  // dark band directly under the eave
  g.fillStyle = 'rgba(0,0,0,0.28)';
  g.fillRect(wx0, roofH, wx1 - wx0, 3);
  // wall outline
  g.fillStyle = PAL.outline;
  g.fillRect(wx0 - 1, roofH, 1, H - roofH - 2);
  g.fillRect(wx1, roofH, 1, H - roofH - 2);
  g.fillRect(wx0, H - 2, wx1 - wx0, 1);

  // gabled roof (trapezoid, full width so it overhangs the walls)
  for (let y = 0; y < roofH; y++) {
    const t = y / roofH;
    const inset = Math.round(peakInset * (1 - t));
    g.fillStyle = roofC;
    g.fillRect(inset, y, W - inset * 2, 1);
    g.fillStyle = PAL.outline;
    g.fillRect(inset, y, 1, 1);
    g.fillRect(W - inset - 1, y, 1, 1);
  }
  // flat ridge plane (top-down view of the roof crest)
  g.fillStyle = roofL;
  g.fillRect(peakInset - 2, 0, W - peakInset * 2 + 4, 5);
  g.fillStyle = roofC;
  g.fillRect(peakInset - 2, 3, W - peakInset * 2 + 4, 1);
  g.fillStyle = PAL.outline;
  g.fillRect(peakInset - 3, 0, W - peakInset * 2 + 6, 1);
  g.fillRect(peakInset - 3, 0, 1, 5);
  g.fillRect(W - peakInset + 2, 0, 1, 5);
  g.fillStyle = roofD;
  g.fillRect(peakInset - 2, 5, W - peakInset * 2 + 4, 1);
  // roof shading stripes
  for (let y = 4; y < roofH - 3; y += 4) {
    const t = y / roofH;
    const inset = Math.round(peakInset * (1 - t)) + 2;
    g.fillStyle = roofD;
    g.fillRect(inset, y, W - inset * 2, 1);
  }
  // eave lip: light edge + outline along the roof bottom
  g.fillStyle = roofL;
  g.fillRect(0, roofH - 3, W, 2);
  g.fillStyle = PAL.outline;
  g.fillRect(0, roofH - 1, W, 1);

  // door centered at bottom, framed, with a lintel and stone step
  const doorW = 12;
  const doorX = Math.floor(W / 2 - doorW / 2);
  const doorH = Math.min(18, H - roofH - 2);
  const doorTop = H - doorH - 2;
  g.fillStyle = PAL.doorDark;
  g.fillRect(doorX - 2, doorTop - 1, doorW + 4, doorH + 1);
  g.fillStyle = '#e0c890';
  g.fillRect(doorX - 2, doorTop - 3, doorW + 4, 2); // lintel beam
  g.fillStyle = PAL.outline;
  g.fillRect(doorX - 3, doorTop - 4, doorW + 6, 1);
  g.fillStyle = PAL.door;
  g.fillRect(doorX, doorTop + 1, doorW, doorH - 2);
  g.fillStyle = '#b86038';
  g.fillRect(doorX, doorTop + 1, doorW, 2); // door top rail
  g.fillStyle = PAL.doorDark;
  g.fillRect(doorX + doorW / 2 - 1, doorTop + 1, 1, doorH - 2); // double-door split
  g.fillStyle = '#f2c94c';
  g.fillRect(doorX + doorW - 4, H - Math.floor(doorH / 2) - 2, 2, 2);
  // stone step under the door
  g.fillStyle = '#a8ada4';
  g.fillRect(doorX - 2, H - 3, doorW + 4, 2);
  g.fillStyle = '#6f746c';
  g.fillRect(doorX - 2, H - 1, doorW + 4, 1);

  // striped awning over the door
  const awY = doorTop - 9;
  g.fillStyle = PAL.outline;
  g.fillRect(doorX - 4, awY - 1, doorW + 8, 6);
  for (let i = 0; i < doorW + 6; i += 4) {
    g.fillStyle = i % 8 === 0 ? roofL : '#f2ecd8';
    g.fillRect(doorX - 3 + i, awY, Math.min(4, doorW + 3 - i + 3), 4);
  }
  g.fillStyle = roofD;
  g.fillRect(doorX - 4, awY + 4, doorW + 8, 1);

  // windows either side of door: shutters + flower box
  const winY = roofH + 4;
  const win = (x: number) => {
    // shutters
    g.fillStyle = roofD;
    g.fillRect(x - 3, winY - 1, 2, 10);
    g.fillRect(x + 9, winY - 1, 2, 10);
    g.fillStyle = PAL.outline;
    g.fillRect(x - 1, winY - 1, 10, 10);
    g.fillStyle = PAL.window;
    g.fillRect(x, winY, 8, 8);
    g.fillStyle = PAL.windowDark;
    g.fillRect(x, winY + 4, 8, 1);
    g.fillRect(x + 4, winY, 1, 8);
    g.fillStyle = '#ffffff';
    g.fillRect(x + 1, winY + 1, 2, 1);
    // flower box
    g.fillStyle = '#8a5f3a';
    g.fillRect(x - 2, winY + 9, 12, 3);
    g.fillStyle = PAL.outline;
    g.fillRect(x - 2, winY + 12, 12, 1);
    g.fillStyle = '#e86a6a';
    g.fillRect(x, winY + 8, 2, 2);
    g.fillRect(x + 6, winY + 8, 2, 2);
    g.fillStyle = PAL.tree3;
    g.fillRect(x + 3, winY + 8, 2, 2);
  };
  // stone foundation strip
  g.fillStyle = '#8f948c';
  g.fillRect(wx0, H - 5, wx1 - wx0, 3);
  g.fillStyle = '#6f746c';
  g.fillRect(wx0, H - 3, wx1 - wx0, 1);

  // chimney on the right roof slope
  g.fillStyle = PAL.outline;
  g.fillRect(W - peakInset - 8, 2, 7, 10);
  g.fillStyle = '#9a6a4a';
  g.fillRect(W - peakInset - 7, 3, 5, 8);
  g.fillStyle = '#b5825c';
  g.fillRect(W - peakInset - 7, 3, 5, 2);
  g.fillStyle = '#6f4a30';
  g.fillRect(W - peakInset - 7, 6, 5, 1);

  win(wallInset + 2);
  win(W - wallInset - 12);
  if (opts.big) {
    // gable window in roof
    const gx = Math.floor(W / 2) - 5;
    g.fillStyle = PAL.outline;
    g.fillRect(gx - 1, 6, 12, 10);
    g.fillStyle = wallC;
    g.fillRect(gx, 7, 10, 8);
    g.fillStyle = PAL.window;
    g.fillRect(gx + 2, 9, 6, 4);
  }
  return c;
}

// ---- interior tiles ----

export function drawFloor(g: CanvasRenderingContext2D, tx: number, ty: number) {
  g.fillStyle = '#d8b27e';
  g.fillRect(0, 0, TILE, TILE);
  // plank rows with staggered seams
  g.fillStyle = '#c49c66';
  g.fillRect(0, 7, TILE, 1);
  g.fillRect(0, 15, TILE, 1);
  const off = (tx + ty) % 2 === 0 ? 4 : 11;
  g.fillStyle = '#b8905c';
  g.fillRect(off, 0, 1, 7);
  g.fillRect((off + 7) % 16, 8, 1, 7);
  g.fillStyle = '#e2c08e';
  g.fillRect(1, 1, 5, 1);
  if (hash(tx, ty, 120) < 0.3) {
    g.fillStyle = '#cfa872';
    g.fillRect(3 + Math.floor(hash(tx, ty, 121) * 9), 3 + Math.floor(hash(tx, ty, 122) * 9), 3, 1);
  }
}

export function drawWall(g: CanvasRenderingContext2D, ty: number) {
  if (ty === 0) {
    // upper wall: dark panels
    g.fillStyle = '#5a4433';
    g.fillRect(0, 0, TILE, TILE);
    g.fillStyle = '#6b523d';
    for (let x = 0; x < TILE; x += 8) g.fillRect(x + 1, 1, 6, 14);
    g.fillStyle = '#4a3729';
    g.fillRect(0, 14, TILE, 2);
  } else {
    // lower wall: warm paneling with baseboard where it meets the floor
    g.fillStyle = '#8a6a4a';
    g.fillRect(0, 0, TILE, TILE);
    g.fillStyle = '#79593c';
    for (let x = 0; x < TILE; x += 4) g.fillRect(x, 2, 1, 10);
    g.fillStyle = '#a58057';
    g.fillRect(0, 0, TILE, 2);
    g.fillStyle = '#5f4632';
    g.fillRect(0, 12, TILE, 1);
    g.fillStyle = '#3a2c20';
    g.fillRect(0, 13, TILE, 3);
    g.fillStyle = '#6b523d';
    g.fillRect(0, 13, TILE, 1);
  }
}

export function drawRug(g: CanvasRenderingContext2D, mask: number, variant: number) {
  const schemes = [
    ['#d88a70', '#b86a50', '#f0b09a'], // terracotta
    ['#7a9ac8', '#5a7aa8', '#a0bce0'], // blue
    ['#a88ac0', '#886aa0', '#c8aede'], // purple
    ['#7ab094', '#5a9074', '#a0d0b8'], // green
  ][variant % 4];
  g.fillStyle = schemes[0];
  g.fillRect(0, 0, TILE, TILE);
  // woven texture
  g.fillStyle = schemes[1] + '55';
  for (let y = 0; y < TILE; y += 4) g.fillRect(0, y, TILE, 1);
  // dark outline on exposed edges so the rug reads as an object on the floor
  g.fillStyle = '#5a4433';
  {
    const n2 = mask & 1, e2 = mask & 2, s2 = mask & 4, w2 = mask & 8;
    if (!n2) g.fillRect(0, 0, TILE, 1);
    if (!s2) g.fillRect(0, TILE - 1, TILE, 1);
    if (!w2) g.fillRect(0, 0, 1, TILE);
    if (!e2) g.fillRect(TILE - 1, 0, 1, TILE);
  }
  const n = mask & 1, e = mask & 2, s = mask & 4, w = mask & 8;
  g.fillStyle = schemes[2];
  if (!n) g.fillRect(0, 0, TILE, 2);
  if (!s) g.fillRect(0, TILE - 2, TILE, 2);
  if (!w) g.fillRect(0, 0, 2, TILE);
  if (!e) g.fillRect(TILE - 2, 0, 2, TILE);
  g.fillStyle = schemes[1];
  if (!n) g.fillRect(0, 2, TILE, 1);
  if (!s) g.fillRect(0, TILE - 3, TILE, 1);
  if (!w) g.fillRect(2, 0, 1, TILE);
  if (!e) g.fillRect(TILE - 3, 0, 1, TILE);
  // center pattern dot
  if (mask === 15) {
    g.fillStyle = schemes[1];
    g.fillRect(6, 6, 4, 4);
    g.fillStyle = schemes[2];
    g.fillRect(7, 7, 2, 2);
  }
}

export function drawMat(g: CanvasRenderingContext2D) {
  g.fillStyle = '#6fae6a';
  g.fillRect(0, 0, TILE, TILE);
  g.fillStyle = '#5c9a58';
  g.fillRect(0, 0, TILE, 2);
  g.fillRect(0, TILE - 2, TILE, 2);
  g.fillStyle = '#8fc98a';
  for (let x = 2; x < TILE; x += 4) g.fillRect(x, 5, 2, 6);
}

export function makeShelf(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 0, 0, '#4a3729', 16, 16);
  px(g, 1, 1, '#8a6a4a', 14, 14);
  px(g, 1, 5, '#4a3729', 14, 1);
  px(g, 1, 10, '#4a3729', 14, 1);
  // books
  const cols = ['#c85a4a', '#4a6fa8', '#4a8a6a', '#d8a84a', '#7a5aa0'];
  for (let i = 0; i < 5; i++) {
    px(g, 2 + i * 2.5, 2, cols[i], 2, 3);
    px(g, 2 + ((i * 3 + 1) % 12), 7, cols[(i + 2) % 5], 2, 3);
  }
  px(g, 2, 12, '#e8dcc8', 5, 2);
  px(g, 9, 12, '#c85a4a', 3, 2);
  return c;
}

export function makeDesk(): HTMLCanvasElement {
  const [c, g] = cv(32, 16);
  // outline
  px(g, 0, 1, '#20242c', 32, 14);
  // top plane (lighter, catches light)
  px(g, 1, 2, '#b08655', 30, 6);
  px(g, 1, 2, '#c69a68', 30, 2);
  // front face (darker, 2-tone with panel lines)
  px(g, 1, 8, '#8a5f3a', 30, 6);
  px(g, 1, 8, '#9a6f45', 30, 1);
  px(g, 8, 9, '#775231', 1, 5);
  px(g, 16, 9, '#775231', 1, 5);
  px(g, 24, 9, '#775231', 1, 5);
  // floor shadow
  px(g, 1, 14, 'rgba(0,0,0,0.35)', 30, 1);
  // papers on the top plane
  px(g, 4, 3, '#f0e8d8', 6, 4);
  px(g, 5, 4, '#b0a890', 4, 1);
  px(g, 22, 3, '#f0e8d8', 5, 4);
  return c;
}

export function makePlantIn(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 5, 10, '#b06a3a', 6, 5);
  px(g, 5, 10, '#8a4f28', 6, 1);
  px(g, 4, 14, '#8a4f28', 8, 1);
  px(g, 6, 4, PAL.tree2, 4, 6);
  px(g, 4, 5, PAL.tree2, 3, 3);
  px(g, 9, 5, PAL.tree3, 3, 3);
  px(g, 7, 2, PAL.tree3, 2, 3);
  px(g, 5, 3, PAL.tree4, 2, 2);
  return c;
}

export function makeMachine(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 1, 1, '#3a3e45', 14, 14);
  px(g, 2, 2, '#5a616b', 12, 12);
  px(g, 3, 3, '#8fd0e8', 10, 5);
  px(g, 4, 4, '#c8ecf8', 4, 1);
  px(g, 3, 10, '#2ecc71', 2, 2);
  px(g, 6, 10, '#e74c3c', 2, 2);
  px(g, 9, 10, '#f2c94c', 2, 2);
  px(g, 3, 13, '#3a3e45', 10, 1);
  return c;
}

export function makeTableIn(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 2, 4, '#6b4a2f', 12, 8);
  px(g, 3, 5, '#9a7048', 10, 5);
  px(g, 3, 5, '#b08655', 10, 1);
  px(g, 2, 12, '#4a3729', 2, 3);
  px(g, 12, 12, '#4a3729', 2, 3);
  return c;
}

export function makeStool(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 4, 6, '#8a4f28', 8, 6);
  px(g, 5, 7, '#c85a4a', 6, 3);
  px(g, 4, 12, '#5c3a20', 2, 3);
  px(g, 10, 12, '#5c3a20', 2, 3);
  return c;
}

export function makeWindowIn(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  px(g, 2, 1, '#4a3729', 12, 12);
  px(g, 3, 2, '#a8d8ec', 10, 10);
  px(g, 3, 6, '#4a3729', 10, 1);
  px(g, 7, 2, '#4a3729', 2, 10);
  px(g, 4, 3, '#e0f4fc', 3, 2);
  px(g, 2, 13, '#6b523d', 12, 2);
  return c;
}

export function makeBridgeH(): HTMLCanvasElement {
  const [c, g] = cv(16, 16);
  g.fillStyle = '#d8b878';
  g.fillRect(0, 0, 16, 16);
  g.fillStyle = '#b8945a';
  for (let x = 0; x < 16; x += 4) g.fillRect(x, 0, 1, 16);
  g.fillStyle = '#8a6a3a';
  g.fillRect(0, 0, 16, 2);
  g.fillRect(0, 14, 16, 2);
  g.fillStyle = '#f0d8a0';
  g.fillRect(0, 2, 16, 1);
  return c;
}

// ---- character sprites: 16x24, outlined, 3-tone, 4 directions x 3 frames ----
// Drawn from pixel string maps. Legend:
//   . transparent   O outline        h hair-light  H hair-dark
//   S skin          s skin-shadow    E eye         W eye-white
//   J top           j top-light      d top-dark    P pants   B boots

export interface CharPalette {
  hairL: string; hairD: string; skin: string; skinS: string;
  top: string; topL: string; topD: string; pants: string; boots: string;
}

export const PLAYER_PAL: CharPalette = {
  hairL: '#9a5a32', hairD: '#6f3e20', skin: '#f2cda4', skinS: '#d8a878',
  top: '#c25c10', topL: '#e07a2c', topD: '#8f4208', pants: '#3a4a6a', boots: '#4a3729',
};

// selectable player avatars (chosen at registration)
export const AVATARS: { name: string; pal: CharPalette }[] = [
  { name: 'Scout', pal: PLAYER_PAL },
  {
    name: 'Sage',
    pal: { hairL: '#3a3a44', hairD: '#26262e', skin: '#e8c098', skinS: '#c89868',
      top: '#3f7fb5', topL: '#5f9fd0', topD: '#2c5f8a', pants: '#2f3a2f', boots: '#26201a' },
  },
  {
    name: 'Ember',
    pal: { hairL: '#d0a848', hairD: '#a07c28', skin: '#f8dcc0', skinS: '#e0b890',
      top: '#b5455a', topL: '#d0657c', topD: '#8a3242', pants: '#3a4a6a', boots: '#4a3729' },
  },
  {
    name: 'Moss',
    pal: { hairL: '#7a4a32', hairD: '#573322', skin: '#c8935e', skinS: '#a8744a',
      top: '#4a9a5f', topL: '#6ab87c', topD: '#357846', pants: '#44405a', boots: '#302a22' },
  },
];

const NPC_PALS: CharPalette[] = [
  { hairL: '#4a4a55', hairD: '#30303a', skin: '#f2cda4', skinS: '#d8a878', top: '#3f7fb5', topL: '#5f9fd0', topD: '#2c5f8a', pants: '#5a4a3a', boots: '#3a2f24' },
  { hairL: '#d0a848', hairD: '#a07c28', skin: '#f8dcc0', skinS: '#e0b890', top: '#4a9a5f', topL: '#6ab87c', topD: '#357846', pants: '#3a4a6a', boots: '#4a3729' },
  { hairL: '#7a4a8a', hairD: '#573064', skin: '#e8c098', skinS: '#c89868', top: '#b54a5a', topL: '#d06a78', topD: '#8a3542', pants: '#3a3a44', boots: '#2f2a24' },
];

const CHAR_DOWN = [
  '................',
  '.....OOOOOO.....',
  '....OhhhhhhO....',
  '...OhhhhhhhhO...',
  '...OhhHHHHhhO...',
  '...OHHHHHHHHO...',
  '...OHShhhhSHO...',
  '...OSSESSESSO...',
  '...OSsESSEssO...',
  '...OSssSSssSO...',
  '....OssssssO....',
  '....OOJJJJOO....',
  '...OJjjJJjjJO...',
  '..OJjJJJJJJjJO..',
  '..OJjJJJJJJjJO..',
  '..OsJJdJJdJJsO..',
  '..OsOJJJJJJOsO..',
  '...OOJdJJdJOO...',
  '...OPPPPPPPPO...',
  '...OPPPOOPPPO...',
  '...OPPOO.OPPO...',
  '...OBBO..OBBO...',
  '...OBBO..OBBO...',
  '...OOOO..OOOO...',
];

const CHAR_UP = [
  '................',
  '.....OOOOOO.....',
  '....OhhhhhhO....',
  '...OhhhhhhhhO...',
  '...OhhhhhhhhO...',
  '...OHhhhhhhHO...',
  '...OHHhhhhHHO...',
  '...OHHHHHHHHO...',
  '...OHHHHHHHHO...',
  '...OsHHHHHHsO...',
  '....OssssssO....',
  '....OOJJJJOO....',
  '...OJjjJJjjJO...',
  '..OJjJJJJJJjJO..',
  '..OJjJJJJJJjJO..',
  '..OsJJJJJJJJsO..',
  '..OsOJJJJJJOsO..',
  '...OOJJJJJJOO...',
  '...OPPPPPPPPO...',
  '...OPPPOOPPPO...',
  '...OPPOO.OPPO...',
  '...OBBO..OBBO...',
  '...OBBO..OBBO...',
  '...OOOO..OOOO...',
];

const CHAR_LEFT = [
  '................',
  '.....OOOOOO.....',
  '....OhhhhhhO....',
  '...OhhhhhhhhO...',
  '...OhhhHHhhhO...',
  '...OHHHHHHHHO...',
  '...OHShhhhHHO...',
  '...OSEsSSsHHO...',
  '...OSEsSSsHHO...',
  '...OsSssssHsO...',
  '....OssssssO....',
  '....OOJJJJOO....',
  '...OJjjJJJJO....',
  '...OJjJJJJJJO...',
  '...OJjJJJJJJO...',
  '...OsJJdJJJsO...',
  '...OsOJJJJOsO...',
  '....OOJdJJOO....',
  '....OPPPPPPO....',
  '....OPPPPPPO....',
  '....OPPOOPPO....',
  '....OBBO.OBO....',
  '....OBBO.OBO....',
  '....OOOO.OOO....',
];

// walking frames: alternate lifted/planted legs (front-facing) or a stride (side)
const FRONT_WALK_A = [ // left leg lifted, right leg planted
  '...OPPOO.OPPO...',
  '...OBBO..OBBO...',
  '...OOOO..OBBO...',
  '.........OOOO...',
];
const FRONT_WALK_B = [ // right leg lifted, left leg planted
  '...OPPOO.OPPO...',
  '...OBBO..OBBO...',
  '...OBBO..OOOO...',
  '...OOOO.........',
];
const SIDE_WALK_A = [ // legs apart mid-stride
  '...OPPO.OPPO....',
  '...OBBO..OBO....',
  '...OOOO..OOO....',
  '................',
];
const SIDE_WALK_B = [ // legs passing, together
  '.....OPPPPO.....',
  '.....OBBBBO.....',
  '.....OOOOOO.....',
  '................',
];

function legFrame(base: string[], frame: number, side: boolean): string[] {
  if (frame === 0) return base;
  const legs = side
    ? (frame === 1 ? SIDE_WALK_A : SIDE_WALK_B)
    : (frame === 1 ? FRONT_WALK_A : FRONT_WALK_B);
  const m = base.slice();
  for (let i = 0; i < 4; i++) m[20 + i] = legs[i];
  return m;
}

function drawCharMap(g: CanvasRenderingContext2D, rows: string[], pal: CharPalette, mirror: boolean) {
  const colors: Record<string, string> = {
    O: '#20242c', h: pal.hairL, H: pal.hairD, S: pal.skin, s: pal.skinS,
    E: '#20242c', W: '#ffffff', J: pal.top, j: pal.topL, d: pal.topD,
    P: pal.pants, B: pal.boots,
  };
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < 16; x++) {
      const ch = row[mirror ? 15 - x : x];
      if (!ch || ch === '.') continue;
      const col = colors[ch];
      if (col) { g.fillStyle = col; g.fillRect(x, y, 1, 1); }
    }
  }
}

export function makeCharacter(pal: CharPalette): Record<string, HTMLCanvasElement[]> {
  const out: Record<string, HTMLCanvasElement[]> = {};
  const bases: Record<string, { rows: string[]; mirror: boolean }> = {
    down: { rows: CHAR_DOWN, mirror: false },
    up: { rows: CHAR_UP, mirror: false },
    left: { rows: CHAR_LEFT, mirror: false },
    right: { rows: CHAR_LEFT, mirror: true },
  };
  for (const dir of Object.keys(bases)) {
    out[dir] = [0, 1, 2].map((frame) => {
      const [c, g] = cv(16, 24);
      const rows = legFrame(bases[dir].rows, frame, dir === 'left' || dir === 'right');
      const bob = frame !== 0 ? -1 : 0;
      g.save();
      g.translate(0, bob);
      drawCharMap(g, rows, pal, bases[dir].mirror);
      g.restore();
      return c;
    });
  }
  return out;
}

export function makePlayer(): Record<string, HTMLCanvasElement[]> {
  return makeCharacter(PLAYER_PAL);
}

export function makeNpc(variant: number): HTMLCanvasElement {
  return makeCharacter(NPC_PALS[variant % NPC_PALS.length]).down[0];
}
