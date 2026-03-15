# Stardust Typer

Fast-paced typing game (React 19 + Vite): type the words on falling stars before they hit the ground. Difficulty-based pacing, streak combos, perfect-word bonuses, heart pickups, pause/resume, manual target switching, lightweight audio cues, and local highscores.

## Status (MVP phase)
- Game loop: difficulty-tuned spawn/move, keyboard typing, scoring with up to 3x combo, perfect-word bonus, streak-based heart drops, pause/resume, and clean resets on restart/difficulty change.
- UI/UX: stage + HUD columns, styled menu/gameover panels, target highlighting, combo/perfect badges, active difficulty buttons, live timer/score/lives/combo in HUD, in-play heading/subtitle, manual target switching (arrow keys).
- Audio: lightweight Web Audio tones for hits, misses, life gain, life loss, and pause toggles.
- Persistence: local top-5 highscores (difficulty + time) shown in HUD and GameOver; stars clear via loopSeed when restarting.
- Open work (see todo.md): stub leaderboard UI with mock/local data; settings/leaderboard UI parity; split logic into `useStars`/`useKeyboardInput`/`useAudio`; add progressive difficulty scaling, word packs, visual polish, and backend leaderboard.

## Controls and gameplay
- Start typing to lock the nearest star and advance its word.
- Finish a word: gain points (with combo and perfect-word bonuses); streaks can drop a heart if lives < 3.
- Missed key: breaks perfect for the current word and streak.
- Missed word: costs a life and triggers a blast that clears lower-half stars with a 10% score penalty per cleared star (no extra life loss beyond the missed one).
- Lives: lose one when a star reaches the ground; game ends at 0.
- Pause/resume: spacebar or stage click.
- Manual targeting: Arrow Up/Down cycles the active star.
- Difficulties: Easy/Normal/Hard adjust spawn interval, fall speed, and score multiplier using difficulty-based word lists.

## Run it
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`

## Live demo
- https://stardusttyper.netlify.app/

## Project layout (key paths)
```bash
stardust-typer/
  public/               # HTML shell, favicon
  src/
    assets/             # Sprites, bg, audio stubs
    components/         # GameContainer, StarField, FallingStar, HUD, GameOverModal (+ planned Leaderboard/Settings)
    hooks/              # useGameLoop (planned: useStars, useKeyboardInput, useAudio)
    utils/              # wordLists, scoring/leaderboard helpers (planned)
    styles/             # Global and animation CSS
    App.jsx, main.jsx   # App entry
  package.json, vite.config.js, eslint.config.js
```

## Tech
- React 19 + Vite
- CSS (index.css) for layout/visuals; gradients + glow for stage and stars
- LocalStorage for highscores; future leaderboard/API planned

## License
MIT — see LICENSE.
