# Stardust Typer – Development TODO

Priority Levels

P0 – Critical architecture improvements  
P1 – Major gameplay features  
P2 – UX improvements  
P3 – Optional / advanced

---

## P0 – Architecture (High Priority)

[ ] Split game logic into hooks

- useStars
- useKeyboardInput
- useScoring
- useAudio

[ ] Refactor GameContainer to orchestrate hooks

[ ] Move scoring helpers to `/utils`

[ ] Create centralized word list loader

[ ] Clean up HUD rendering structure

---

## P1 – Gameplay Features

[ ] Manual target switching (arrow keys / tab)

[ ] Progressive difficulty scaling

[ ] Word pack system

[ ] Settings modal

- difficulty selection
- word pack selection

[ ] Leaderboard UI stub

[ ] Player name input on Game Over

[ ] Miss-handling UX: when a word is missed, clear all stars in the lower half of the stage with a score penalty (no extra life loss beyond the missed star) — confirm exact penalty and positioning rules before implementation.

---

## P2 – UX Improvements

[ ] Implement audio system

[ ] Particle burst when star destroyed

[x] Combo animation

[ ] Floating score indicators

[ ] Improve Game Over screen

[ ] Pause overlay UI

---

## P3 – Product Level Features

[ ] Online leaderboard API

[ ] Backend integration

[ ] Replay system (optional)

[ ] Mobile responsiveness

[ ] Theme polish (neon / dark)

---

## Engineering Tasks

[ ] Add Vitest

[ ] Write scoring tests

[ ] Write star spawn tests

[ ] Write keyboard input tests

---

## Documentation

[x] Update README
[x] Update Context overview

[ ] Add architecture diagram

[ ] Add gameplay screenshots

[ ] Add live demo link
