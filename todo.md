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

[x] Manual target switching (arrow keys / tab)

[x] Progressive difficulty scaling

[ ] Word pack system

[ ] Settings modal

- difficulty selection
- word pack selection

[x] Leaderboard UI stub

[x] Player name input on Game Over

[x] Miss-handling UX: when a word is missed, clear all stars in the lower half of the stage with a score penalty (no extra life loss beyond the missed star) — implemented with 10% score penalty per cleared star.

---

## P2 – UX Improvements

[x] Implement audio system

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

[x] Add live demo link
