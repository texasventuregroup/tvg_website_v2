'use client';

// Multi-map canvas engine: town + puzzle woods + building interiors.
// Walking into a doorway (or onto an exit mat / map edge) warps with a fade.

import { useEffect, useRef } from 'react';
import {
  TILE, drawGrass, drawTallGrass, drawPath, drawWater, drawCliff,
  drawFloor, drawWall, drawRug, drawMat,
  makeTree, makeBush, makeFlower, makeFence, makeSign, makeLamp, makeBarrel,
  makeRock, makeCrops, makeHouse, makeBridgeH, makeNpc,
  makeShelf, makeDesk, makePlantIn, makeMachine, makeTableIn, makeStool, makeWindowIn, PAL,
  makeCharacter, AVATARS,
} from './tileset';
import {
  T_GRASS, T_PATH, T_WATER, T_TALL, T_CLIFF, T_BRIDGE, T_FLOOR, T_WALL, T_RUG, T_MAT,
  buildAllMaps, GameMap, Facing,
} from './map';
import { ApplySession, StationId, stationComplete } from './state';

export interface Interaction {
  type: 'sign' | 'npc';
  text?: string;
  lines?: string[];
  station?: StationId;
}

interface Props {
  session: ApplySession;
  onInteract: (i: Interaction) => void;
  onMove: (mapId: string, px: number, py: number, facing: Facing) => void;
  paused: boolean;
}

const SCALE = 2.5;

export default function Engine({ session, onInteract, onMove, paused }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ paused, onInteract, onMove, session });
  stateRef.current.paused = paused;
  stateRef.current.onInteract = onInteract;
  stateRef.current.onMove = onMove;
  stateRef.current.session = session;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    const maps = buildAllMaps();

    // ---- sprites ----
    const trees = [makeTree(0), makeTree(1), makeTree(2)];
    const bushes = [makeBush(0), makeBush(1)];
    const flowers = [makeFlower(0), makeFlower(1), makeFlower(2), makeFlower(3)];
    const sprites: Record<string, HTMLCanvasElement> = {
      fenceH: makeFence('h'), fenceV: makeFence('v'), fencePost: makeFence('post'),
      sign: makeSign(), lamp: makeLamp(), barrel: makeBarrel(), rock: makeRock(),
      crops: makeCrops(), shelf: makeShelf(), desk: makeDesk(), plant: makePlantIn(),
      machine: makeMachine(), table: makeTableIn(), stool: makeStool(), window: makeWindowIn(),
    };
    const bridgeH = makeBridgeH();
    const npcSprites = [makeNpc(0), makeNpc(1), makeNpc(2)];
    const playerFrames = makeCharacter(AVATARS[session.avatar % AVATARS.length].pal);
    const houseSpriteCache = new Map<string, HTMLCanvasElement>();
    const houseSprite = (m: GameMap, i: number) => {
      const key = `${m.id}:${i}`;
      if (!houseSpriteCache.has(key)) {
        const h = m.houses[i];
        houseSpriteCache.set(key, makeHouse({ wTiles: h.w, hTiles: h.h, roof: h.roof, wall: h.wall, big: h.big }));
      }
      return houseSpriteCache.get(key)!;
    };

    // ---- per-map prerendered layers ----
    const rugVariant: Record<string, number> = {
      'int-welcome': 0, 'int-whytvg': 1, 'int-artifact': 2, 'int-lab': 3,
      'int-puzzle-cipher': 1, 'int-puzzle-market': 0,
    };
    const terrainCache = new Map<string, HTMLCanvasElement[]>();
    const groundCache = new Map<string, HTMLCanvasElement>();

    const buildTerrain = (m: GameMap): HTMLCanvasElement[] => {
      if (terrainCache.has(m.id)) return terrainCache.get(m.id)!;
      const terrAt = (x: number, y: number) =>
        x < 0 || y < 0 || x >= m.w || y >= m.h ? (m.outdoor ? T_GRASS : T_WALL) : m.terrain[y * m.w + x];
      const maskOf = (x: number, y: number, t: number) => {
        const same = (xx: number, yy: number) => {
          const v = terrAt(xx, yy);
          if (t === T_WATER) return v === T_WATER || v === T_BRIDGE;
          if (t === T_PATH) return v === T_PATH || v === T_BRIDGE;
          return v === t;
        };
        return (same(x, y - 1) ? 1 : 0) | (same(x + 1, y) ? 2 : 0) | (same(x, y + 1) ? 4 : 0) | (same(x - 1, y) ? 8 : 0);
      };
      const frames = [0, 1].map((frame) => {
        const c = document.createElement('canvas');
        c.width = m.w * TILE;
        c.height = m.h * TILE;
        const g = c.getContext('2d')!;
        g.imageSmoothingEnabled = false;
        const tileC = document.createElement('canvas');
        tileC.width = TILE;
        tileC.height = TILE;
        const tg = tileC.getContext('2d')!;
        for (let y = 0; y < m.h; y++) {
          for (let x = 0; x < m.w; x++) {
            tg.clearRect(0, 0, TILE, TILE);
            const t = terrAt(x, y);
            if (t === T_GRASS) drawGrass(tg, x, y);
            else if (t === T_TALL) { drawGrass(tg, x, y); drawTallGrass(tg); }
            else if (t === T_PATH) {
              const samePath = (xx: number, yy: number) => {
                const v = terrAt(xx, yy);
                return v === T_PATH || v === T_BRIDGE;
              };
              const dmask =
                (samePath(x + 1, y - 1) ? 1 : 0) | (samePath(x + 1, y + 1) ? 2 : 0) |
                (samePath(x - 1, y + 1) ? 4 : 0) | (samePath(x - 1, y - 1) ? 8 : 0);
              drawPath(tg, maskOf(x, y, T_PATH), x, y, dmask);
            }
            else if (t === T_WATER) drawWater(tg, maskOf(x, y, T_WATER), x, y, frame * 5);
            else if (t === T_CLIFF) drawCliff(tg, maskOf(x, y, T_CLIFF), x, y);
            else if (t === T_BRIDGE) tg.drawImage(bridgeH, 0, 0);
            else if (t === T_FLOOR) drawFloor(tg, x, y);
            else if (t === T_WALL) drawWall(tg, y);
            else if (t === T_RUG) drawRug(tg, maskOf(x, y, T_RUG), rugVariant[m.id] ?? 0);
            else if (t === T_MAT) { drawFloor(tg, x, y); drawMat(tg); }
            g.drawImage(tileC, x * TILE, y * TILE);
          }
        }
        // bridge shadow on water below
        g.fillStyle = 'rgba(0,0,30,0.18)';
        for (let y = 1; y < m.h; y++)
          for (let x = 0; x < m.w; x++)
            if (terrAt(x, y) === T_WATER && terrAt(x, y - 1) === T_BRIDGE)
              g.fillRect(x * TILE, y * TILE, TILE, 5);
        return c;
      });
      terrainCache.set(m.id, frames);
      return frames;
    };

    const buildGround = (m: GameMap): HTMLCanvasElement => {
      if (groundCache.has(m.id)) return groundCache.get(m.id)!;
      const c = document.createElement('canvas');
      c.width = m.w * TILE;
      c.height = m.h * TILE;
      const g = c.getContext('2d')!;
      g.imageSmoothingEnabled = false;
      // darker forest floor beneath tree canopies
      g.fillStyle = 'rgba(28, 66, 40, 0.30)';
      for (const t of m.above) g.fillRect(t.x * TILE + t.ox, t.y * TILE, TILE * 2, TILE);
      for (const o of m.objects) {
        const X = o.x * TILE, Y = o.y * TILE;
        if (o.kind === 'flower') g.drawImage(flowers[(o.variant ?? 0) % flowers.length], X, Y);
        else if (o.kind === 'bush') g.drawImage(bushes[(o.variant ?? 0) % 2], X, Y);
        else if (o.kind === 'desk') g.drawImage(sprites.desk, X, Y);
        else if (sprites[o.kind]) g.drawImage(sprites[o.kind], X, Y);
      }
      for (const h of m.houses) {
        g.fillStyle = 'rgba(20,35,20,0.20)';
        g.fillRect(h.x * TILE + 2, (h.y + h.h) * TILE - 3, h.w * TILE - 4, 8);
      }
      groundCache.set(m.id, c);
      return c;
    };

    // ---- game state ----
    let map: GameMap = maps[session.mapId] ?? maps.town;
    const p = {
      tx: session.px, ty: session.py,
      x: session.px * TILE, y: session.py * TILE,
      facing: session.facing as Facing,
      moving: false,
      moveFrom: { x: 0, y: 0 },
      moveTo: { x: 0, y: 0 },
      moveT: 0,
      animT: 0,
    };
    // debug: ?forcemap=int-whytvg spawns in that map (dev/testing only)
    const params = new URLSearchParams(window.location.search);
    const fm = params.get('forcemap');
    if (fm && maps[fm]) {
      map = maps[fm];
      let sx = Math.floor(map.w / 2), sy = map.h - 2;
      if (map.collision[sy * map.w + sx] === 1) {
        outer: for (let y = map.h - 2; y >= 0; y--)
          for (let x = 1; x < map.w - 1; x++)
            if (map.collision[y * map.w + x] === 0) { sx = x; sy = y; break outer; }
      }
      p.tx = sx; p.ty = sy; p.x = sx * TILE; p.y = sy * TILE; p.facing = 'up';
    }
    // sanity: if saved position is blocked (map changed between versions), respawn
    if (
      p.tx < 0 || p.ty < 0 || p.tx >= map.w || p.ty >= map.h ||
      map.collision[p.ty * map.w + p.tx] === 1
    ) {
      map = maps.town;
      p.tx = 24; p.ty = 16; p.x = 24 * TILE; p.y = 16 * TILE;
    }
    const fade = { alpha: 0, dir: 0 as -1 | 0 | 1, pending: null as null | { m: GameMap; x: number; y: number; facing: Facing } };
    let overview = false;
    const keys = new Set<string>();

    const blocked = (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= map.w || y >= map.h) return true;
      return map.collision[y * map.w + x] === 1;
    };

    const startWarp = (w: { toMap: string; toX: number; toY: number; facing: Facing }) => {
      fade.dir = 1;
      fade.pending = { m: maps[w.toMap], x: w.toX, y: w.toY, facing: w.facing };
    };

    const tryInteract = () => {
      const dx = p.facing === 'left' ? -1 : p.facing === 'right' ? 1 : 0;
      const dy = p.facing === 'up' ? -1 : p.facing === 'down' ? 1 : 0;
      // check the facing tile, and one tile further (talking over desks/counters)
      for (let reach = 1; reach <= 2; reach++) {
        const fx = p.tx + dx * reach, fy = p.ty + dy * reach;
        const s = map.signs.find((sg) => sg.x === fx && sg.y === fy);
        if (s) { stateRef.current.onInteract({ type: 'sign', text: s.text }); return; }
        // over a desk (reach 2), accept an NPC one tile to the side too
        const n = map.npcs.find((np) => np.y === fy && (np.x === fx || (reach === 2 && Math.abs(np.x - fx) <= 1)));
        if (n) { stateRef.current.onInteract({ type: 'npc', lines: n.lines, station: n.station }); return; }
        // stop extending reach unless the first tile is a counter-like object
        const overDesk = map.objects.some((o) =>
          (o.kind === 'desk' ? fx >= o.x && fx <= o.x + 1 && fy === o.y : o.x === fx && o.y === fy && o.kind === 'table'));
        if (!overDesk) break;
      }
    };

    const keyDown = (e: KeyboardEvent) => {
      if (stateRef.current.paused) return;
      const k = e.key;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(k)) e.preventDefault();
      keys.add(k.toLowerCase());
      if (k.toLowerCase() === 'm' && map.outdoor) {
        overview = !overview;
        window.dispatchEvent(new CustomEvent('tvg-overview', { detail: overview }));
        return;
      }
      if (overview) {
        overview = false;
        window.dispatchEvent(new CustomEvent('tvg-overview', { detail: false }));
        return;
      }
      if ((k === 'Enter' || k === ' ' || k.toLowerCase() === 'z' || k.toLowerCase() === 'e') && fade.dir === 0) {
        tryInteract();
      }
    };
    const keyUp = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    const resize = () => {
      const parent = canvas.parentElement!;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // ---- main loop ----
    let raf = 0;
    let last = performance.now();
    let waterT = 0;
    const SPEED = 5.2;

    const step = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      waterT += dt;

      // fade transitions
      if (fade.dir !== 0) {
        fade.alpha += fade.dir * dt * 4;
        if (fade.dir === 1 && fade.alpha >= 1) {
          fade.alpha = 1;
          if (fade.pending) {
            map = fade.pending.m;
            p.tx = fade.pending.x;
            p.ty = fade.pending.y;
            p.x = p.tx * TILE;
            p.y = p.ty * TILE;
            p.facing = fade.pending.facing;
            p.moving = false;
            fade.pending = null;
            stateRef.current.onMove(map.id, p.tx, p.ty, p.facing);
          }
          fade.dir = -1;
        } else if (fade.dir === -1 && fade.alpha <= 0) {
          fade.alpha = 0;
          fade.dir = 0;
        }
      }

      if (!stateRef.current.paused && fade.dir === 0 && !overview) {
        if (!p.moving) {
          let dir: Facing | null = null;
          if (keys.has('arrowup') || keys.has('w')) dir = 'up';
          else if (keys.has('arrowdown') || keys.has('s')) dir = 'down';
          else if (keys.has('arrowleft') || keys.has('a')) dir = 'left';
          else if (keys.has('arrowright') || keys.has('d')) dir = 'right';
          if (dir) {
            p.facing = dir;
            const dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
            const dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
            const nx = p.tx + dx, ny = p.ty + dy;
            if (!blocked(nx, ny)) {
              p.moving = true;
              p.moveFrom = { x: p.tx * TILE, y: p.ty * TILE };
              p.moveTo = { x: nx * TILE, y: ny * TILE };
              p.moveT = 0;
              p.tx = nx;
              p.ty = ny;
            }
          }
        }
        if (p.moving) {
          p.moveT += dt * SPEED;
          p.animT += dt;
          if (p.moveT >= 1) {
            p.moving = false;
            p.x = p.moveTo.x;
            p.y = p.moveTo.y;
            const w = map.warps.find((wp) => wp.x === p.tx && wp.y === p.ty);
            if (w) startWarp(w);
            else stateRef.current.onMove(map.id, p.tx, p.ty, p.facing);
          } else {
            p.x = p.moveFrom.x + (p.moveTo.x - p.moveFrom.x) * p.moveT;
            p.y = p.moveFrom.y + (p.moveTo.y - p.moveFrom.y) * p.moveT;
          }
        }
      }

      // ---- render ----
      const debugMap = window.location.search.includes('debugmap');
      const fitAll = debugMap || overview;
      const scale = fitAll
        ? Math.min(canvas.width / (map.w * TILE), canvas.height / (map.h * TILE))
        : map.outdoor
          ? SCALE
          : Math.min(4.5, canvas.width / (map.w * TILE), canvas.height / (map.h * TILE));
      const vw = canvas.width / scale;
      const vh = canvas.height / scale;
      const mw = map.w * TILE, mh = map.h * TILE;
      let camX: number, camY: number;
      if (mw <= vw) camX = (mw - vw) / 2;
      else camX = Math.max(0, Math.min(mw - vw, p.x + TILE / 2 - vw / 2));
      if (mh <= vh) camY = (mh - vh) / 2;
      else camY = Math.max(0, Math.min(mh - vh, p.y + TILE / 2 - vh / 2));

      ctx.fillStyle = map.outdoor ? PAL.treeDark : '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(scale, scale);
      ctx.translate(-Math.round(camX), -Math.round(camY));

      const terrFrames = buildTerrain(map);
      const terr = terrFrames[Math.abs(Math.floor(waterT * 1.6)) % 2];
      ctx.drawImage(terr, 0, 0);
      ctx.drawImage(buildGround(map), 0, 0);

      // houses + door markers
      for (let i = 0; i < map.houses.length; i++) {
        const h = map.houses[i];
        ctx.drawImage(houseSprite(map, i), h.x * TILE, h.y * TILE);
        if (h.deco) continue;
        const done = stationComplete(stateRef.current.session, h.id);
        const required = ['welcome', 'whytvg', 'artifact', 'lab'].includes(h.id);
        if (!done && !required) continue;
        // pixel emote bubble (Pokemon-style), 2-frame bob
        const bx = (h.x + Math.floor(h.w / 2)) * TILE + TILE / 2 - 5;
        const by = h.y * TILE - 14 + (Math.floor(now / 400) % 2 === 0 ? 0 : 1);
        ctx.fillStyle = '#20242c';
        ctx.fillRect(bx, by, 10, 10);
        ctx.fillRect(bx + 2, by + 10, 3, 2); // tail
        ctx.fillStyle = '#fffdf4';
        ctx.fillRect(bx + 1, by + 1, 8, 8);
        ctx.fillRect(bx + 3, by + 9, 1, 2);
        if (done) {
          ctx.fillStyle = '#2e7d32';
          ctx.fillRect(bx + 2, by + 5, 2, 2);
          ctx.fillRect(bx + 4, by + 6, 1, 2);
          ctx.fillRect(bx + 5, by + 5, 1, 1);
          ctx.fillRect(bx + 6, by + 4, 1, 1);
          ctx.fillRect(bx + 7, by + 3, 1, 1);
        } else {
          ctx.fillStyle = '#c8341e';
          ctx.fillRect(bx + 4, by + 2, 2, 4);
          ctx.fillRect(bx + 4, by + 7, 2, 1);
        }
      }

      // characters (16x24 sprites sit 8px above their tile; soft shadow at the feet)
      const charShadow = (x: number, y: number) => {
        ctx.fillStyle = 'rgba(20,30,20,0.25)';
        ctx.beginPath();
        ctx.ellipse(x + TILE / 2, y + TILE - 2, 6, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
      };
      for (const n of map.npcs) {
        charShadow(n.x * TILE, n.y * TILE);
        ctx.drawImage(npcSprites[n.variant % 3], n.x * TILE, n.y * TILE - 8);
      }
      const frames = playerFrames[p.facing];
      const frame = p.moving ? (Math.floor(p.animT * 8) % 2 === 0 ? 1 : 2) : 0;
      charShadow(Math.round(p.x), Math.round(p.y));
      ctx.drawImage(frames[frame], Math.round(p.x), Math.round(p.y) - 8);

      // above-player canopy
      if (map.above.length) {
        const sorted = [...map.above].sort((a, b) => a.y - b.y);
        for (const t of sorted) {
          ctx.drawImage(trees[t.variant % 3], t.x * TILE + t.ox, (t.y + 1) * TILE - 40);
        }
      }

      ctx.restore();

      // interaction hint: facing a sign/NPC
      if (!stateRef.current.paused && fade.dir === 0) {
        const dx = p.facing === 'left' ? -1 : p.facing === 'right' ? 1 : 0;
        const dy = p.facing === 'up' ? -1 : p.facing === 'down' ? 1 : 0;
        // same reach rules as tryInteract: adjacent tile, or over a desk/table
        let tx2 = -1, ty2 = -1;
        for (let reach = 1; reach <= 2; reach++) {
          const fx = p.tx + dx * reach, fy = p.ty + dy * reach;
          if (
            map.signs.some((sg) => sg.x === fx && sg.y === fy) ||
            map.npcs.some((np) => np.y === fy && (np.x === fx || (reach === 2 && Math.abs(np.x - fx) <= 1)))
          ) { tx2 = fx; ty2 = fy; break; }
          const overDesk = map.objects.some((o) =>
            (o.kind === 'desk' ? fx >= o.x && fx <= o.x + 1 && fy === o.y : o.x === fx && o.y === fy && o.kind === 'table'));
          if (!overDesk) break;
        }
        if (tx2 >= 0) {
          const isNpc = map.npcs.some((np) => np.y === ty2 && Math.abs(np.x - tx2) <= 1);
          const label = isNpc ? 'PRESS Z TO TALK' : 'PRESS Z TO READ';
          const sx = (tx2 * TILE + TILE / 2 - camX) * scale;
          const sy = (ty2 * TILE - 12 - camY) * scale + Math.sin(now / 250) * 2;
          ctx.font = `bold ${Math.round(4.5 * scale)}px monospace`;
          ctx.textAlign = 'center';
          const tw = ctx.measureText(label).width + 10 * (scale / 2.5);
          const th = 7 * scale;
          ctx.fillStyle = 'rgba(32,36,44,0.92)';
          ctx.fillRect(sx - tw / 2, sy - th / 2, tw, th);
          ctx.fillStyle = '#fffdf4';
          ctx.fillRect(sx - tw / 2, sy - th / 2, tw, 1);
          ctx.fillRect(sx - tw / 2, sy + th / 2 - 1, tw, 1);
          ctx.fillText(label, sx, sy + 1.6 * scale);
          // small tail pointing down at the target
          ctx.fillStyle = 'rgba(32,36,44,0.92)';
          ctx.beginPath();
          ctx.moveTo(sx - 3, sy + th / 2);
          ctx.lineTo(sx + 3, sy + th / 2);
          ctx.lineTo(sx, sy + th / 2 + 5);
          ctx.fill();
        }
      }

      // overview mode: blinking player blip + banner
      if (overview) {
        if (Math.floor(now / 350) % 2 === 0) {
          const bx = (p.x + TILE / 2 - camX) * scale;
          const by = (p.y + TILE / 2 - camY) * scale;
          ctx.fillStyle = '#20242c';
          ctx.fillRect(bx - 5, by - 5, 10, 10);
          ctx.fillStyle = '#e83a2e';
          ctx.fillRect(bx - 3, by - 3, 6, 6);
        }
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        const msg = `${map.name.toUpperCase()} · PRESS M TO CLOSE MAP`;
        const mw2 = ctx.measureText(msg).width + 24;
        ctx.fillStyle = 'rgba(32,36,44,0.92)';
        ctx.fillRect(canvas.width / 2 - mw2 / 2, 14, mw2, 26);
        ctx.fillStyle = '#fffdf4';
        ctx.fillText(msg, canvas.width / 2, 31);
      }

      // fade overlay
      if (fade.alpha > 0) {
        ctx.fillStyle = `rgba(10, 14, 10, ${fade.alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" style={{ imageRendering: 'pixelated' }} />;
}
