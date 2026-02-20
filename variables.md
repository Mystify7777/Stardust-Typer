# Variables Reference

## src/components/GameContainer.jsx
- gameState: "menu" | "playing" | "gameover"; drives which screen shows and whether the loop runs.
- score: numeric points earned; increments on completed words.
- lives: remaining chances; decrements when a star escapes; reaching 0 triggers game over (capped at MAX_LIVES on gains).
- difficulty: "Easy" | "Normal" | "Hard"; influences spawn rate, speed, and score multiplier.
- stars: array from `useGameLoop`; active falling stars rendered in StarField.
- activeId: id of the currently targeted star for highlighting.
- elapsedMs: pause-aware elapsed time for the current run.
- combo: current streak count; bestCombo tracks the max streak achieved in the run.
- comboMultiplier / bestComboMultiplier: derived multipliers (1–3x) from current/best combo.
- comboFlashKey: increments to retrigger the combo badge animation when streaks increase.
- perfectFlashKey: increments to retrigger the perfect badge animation when a word is finished without mistakes.
- perfectVisible: boolean controlling the Perfect badge visibility with an auto-hide timer.
- startGame(): resets score/lives/time/combo and sets gameState to playing.
- handleDifficultyChange(level): updates difficulty and restarts the game immediately when already playing.
- highScores: top 5 entries persisted in localStorage and displayed in the HUD panel; now stores {score, difficulty, timeMs}.
- paused: toggles pause/resume; disables loop/input when true.
- loopSeed: incremented to reset loop state (stars/timers) when starting or changing difficulty.

## src/hooks/useGameLoop.js
- DIFFICULTY_CONFIG: maps each difficulty to spawnInterval (ms), speed (px/sec), scoreMultiplier.
- STAGE_HEIGHT: fixed fall distance (px) before a star counts as missed.
- EXTRA_LIFE_STREAK: streak interval that triggers a heart pickup; pickups don’t cost lives when missed.
- MAX_COMBO_MULTIPLIER / COMBO_INCREMENT: combo multiplier growth (up to 3x with +0.1 per word after the first).
- stars: stateful array of star objects kept in sync with starsRef.
- starsRef: mutable mirror of stars used inside the animation loop.
- rafRef: requestAnimationFrame handle for canceling the loop.
- lastSpawnRef: timestamp of last star spawn (ms).
- lastFrameRef: timestamp of previous frame to compute delta time.
- comboRef: tracks current streak; reported via onComboChange.
- spawnStar(type): creates a new star; type is 'word' or 'life'.
- spawnLifePickup(): spawns a heart pickup (type 'life') if none is present.
- syncStars(): helper to update stars state + ref together.
- step(): per-frame updater; moves stars, removes escaped ones, spawns new ones, calls onLifeLost; resets combo on misses.
- keyboard handler: listens for a–z keys, targets the lowest active star, advances typed progress, removes completed stars, calls onScoreGain, awards lives on life pickups, spawns life after streak thresholds, and applies combo multiplier to score.
- getWordForDifficulty(difficulty): returns a random word from the corresponding pool.
- activeId: exposed for current target highlighting.

### Star object shape
- id: unique identifier (UUID).
- word: target string to type.
- x: horizontal position in px (within stage width).
- y: vertical position in px; increases downward.
- typed: count of correctly typed characters.
- type: 'word' (regular) or 'life' (heart pickup).
- mistyped: boolean flag set when a wrong key was pressed for this word (used for perfect bonus).

## src/components/StarField.jsx
- props.stars: array of star objects to render within the stage; stage is wrapped to host overlay elements like the combo and perfect badges.

## src/components/FallingStar.jsx
- props.star: star object; uses `typed` to split rendered word into typed/rest segments.

## src/components/HUD.jsx
- props.score: current score display.
- props.lives: remaining lives display.
- props.difficulty: active difficulty label.
- props.elapsedMs: time display for the current run.
- props.combo / props.comboMultiplier: current streak and multiplier display.
- props.onChangeDifficulty: setter to switch difficulty.

## src/utils/wordLists.js
- WORDS: array of available words to spawn.
