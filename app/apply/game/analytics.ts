// PostHog event tracking for the application game.
//
// Event dictionary (all game events are prefixed `apply_`):
//   apply_gate_unlocked           - recruiting password accepted
//   apply_registered              - name/email/avatar chosen; also identifies the person
//   apply_map_entered             - every map transition {map_id, map_name, from_map}
//   apply_building_entered        - walked into any building {building_id, building_name}
//   apply_building_exited         - left a building {building_id, building_name, seconds_inside}
//   apply_station_opened          - an application/puzzle window opened {station_id}
//   apply_station_closed          - it closed {station_id, seconds_open}
//   apply_puzzle_attempted        - puzzle answer submitted {puzzle_id, correct}
//   apply_puzzle_solved           - correct answer {puzzle_id, points, total_bonus_points, puzzles_solved}
//   apply_paper_opened            - lab PDF opened
//   apply_video_recording_started - whiteboard recording began
//   apply_video_submitted         - recording submitted {seconds}
//   apply_submitted               - application submitted {bonus_points, puzzles_solved}
//   apply_mode_toggled            - world/plain-form switch {mode}
//   apply_map_overview_toggled    - M overview {open}

import posthog from 'posthog-js';

export function track(event: string, properties?: Record<string, unknown>) {
  try {
    posthog.capture(event, properties);
  } catch {
    // analytics must never break the game
  }
}

export function identifyApplicant(email: string, name: string, avatar: string) {
  try {
    posthog.identify(email, { email, name, avatar });
  } catch {
    // ignore
  }
}

export const MAP_NAMES: Record<string, string> = {
  town: 'TVG Grove',
  woods: 'Puzzle Woods',
  deepwood: 'Deepwood',
  summit: 'Summit Hollow',
  overlook: 'The Overlook',
  mirror: 'Mirror Lake',
  marsh: 'Fern Marsh',
  drift: 'Driftwood Landing',
  shore: 'South Shore',
  'route-north': 'North Trail',
  'route-west': 'West Trail',
  'route-south': 'South Trail',
};

export function mapName(id: string): string {
  if (id.startsWith('int-')) return `Interior: ${id.slice(4)}`;
  return MAP_NAMES[id] ?? id;
}
