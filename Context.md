# Stardust Typer – Context

## What this repo is
- React 19 + Vite game prototype where falling word “stars” are typed to score points.
- Styling lives in src/index.css; assets are minimal and rely on gradients.

## App flow
- Entry: src/main.jsx mounts <App/>; App wraps GameContainer.
- GameContainer owns game state: `gameState` (menu | playing | gameover), `score`, `lives`, `difficulty`.
- Menu shows a start button; startGame resets score/lives and switches to playing.
- Playing runs the game loop via `useGameLoop`, renders StarField (falling stars) and HUD (score/lives/difficulty/combos/time controls).
- GameOverModal appears when lives drop to 0; restart resets score/lives/time/combo and resumes playing.

## Components
- StarField expects a `stars` array and renders FallingStar for each. Each star shows typed vs remaining letters and highlights the active target; life pickups render with a heart icon.
- HUD displays score/lives/difficulty, live time, combo and multiplier, and exposes difficulty buttons.
- GameOverModal shows final score/time/best combo with restart/menu actions.

## Data and hooks
- wordLists.js exports difficulty-based word pools.
- useGameLoop.js drives gameplay: spawns stars on an interval (difficulty-based), moves them downward, listens to keyboard input to advance `typed`, awards score on word completion, decrements lives when stars escape, spawns streak-based life pickups, and applies a combo multiplier (up to 3x) on scoring.
- Difficulty settings tweak spawn interval, fall speed, and score multiplier (Easy/Normal/Hard).

## Gaps/rough edges to fix
- UI refreshed: dedicated game shell layout (stage + HUD column), styled menu/gameover panels, and shared button styles.
- Stage visuals: starfield gradient background with twinkle overlay; stars glow for readability.
- Sound/feedback: no audio cues or animations on hit/miss.
- Persistence/leaderboard: none yet; short-term plan is a local stub (still pending).
- Loop behavior: loop clears stars when stopping; changing difficulty while playing restarts the round; streaks spawn heart pickups without costing lives on miss.
- Words: difficulty-based word pools (Easy/Normal/Hard) drive spawn selection.
- HUD updates: active difficulty styling, highscores table (Difficulty/Score/Time) with top-3 shading, live timer, combo/multiplier display.
- High scores: local top-5 stored in localStorage; include difficulty and elapsed time.

## How to run
- Install deps: `npm install`
- Dev server: `npm run dev` (Vite)
- Build: `npm run build`

## Next ideas
- Tighten visuals, sounds, and feedback once gameplay feels right.
- Consider splitting logic into smaller hooks (input, stars, audio) if the loop grows.
- Expand word list and add difficulty-based word selection.
- Add audio/visual feedback (hits/misses) and visual combo presentation.
