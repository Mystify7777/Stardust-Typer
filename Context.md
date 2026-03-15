# Stardust Typer – Project Context

## Overview

**Stardust Typer** is a fast-paced browser typing game built with **React 19 and Vite**.  
Players eliminate falling word “stars” by typing them correctly before they reach the bottom of the screen.

The project is designed to demonstrate:

- Interactive real-time UI systems
- Modular React architecture using custom hooks
- Game loop design in the browser
- Performance-aware rendering
- Clean project organization suitable for portfolio projects

The long-term goal is to make this a **resume-ready frontend engineering project** that showcases architecture, maintainability, and user experience.

---

# Core Gameplay

Stars containing words fall from the top of the screen.

Players must type the word associated with a star.

### When a word is typed correctly

- The star is destroyed
- Points are awarded
- Combo counter increases

### If a star reaches the bottom

- The player loses a life

### Additional mechanics

- **Combo system** with multiplier
- **Perfect word bonus**
- **Heart drops** that restore lives
- **Pause / resume**
- **Difficulty selection**
- **Manual target switching** (arrow keys)

The game ends when the player runs out of lives.

---

# Current Implemented Features

## Game Loop

- Difficulty-based spawn timing
- Falling star movement
- Combo system (capped at 3x)
- Perfect-word scoring bonus
- Heart pickups
- Pause and resume
- Full restart on difficulty change

---

## UI / UX

The interface currently includes:

- Game stage for falling stars
- HUD side panel
- Active target highlighting
- Combo indicator
- Perfect bonus badge
- Difficulty buttons
- Manual target switching (arrow keys)
- Live display of:
  - score
  - time
  - lives
  - combo multiplier

---

## Persistence

High scores are stored locally.

Features:

- **Top 5 highscores**
- Saved in **localStorage**
- Includes difficulty and survival time
- Displayed in HUD and Game Over screen
- Lightweight audio cues for hit/miss/life/pause events via Web Audio

---

## Reset Handling

Restarting or switching difficulty resets the game state.

Mechanism used:

- `loopSeed` value to reset the game loop
- Clearing active stars
- Resetting score, lives, combos, and timer

---

# Architecture

## Tech Stack

- React 19
- Vite
- JavaScript (ES6+)
- CSS animations
- LocalStorage persistence

---

# Planned Modular Hook Architecture

To improve maintainability, game logic will be separated into dedicated hooks.

### `useGameLoop`

Responsible for:

- frame updates
- spawn intervals
- movement timing
- difficulty scaling

---

### `useStars`

Manages star lifecycle.

Responsibilities:

- star spawning
- position updates
- removing destroyed stars
- detecting missed stars
- managing active targets

---

### `useKeyboardInput`

Handles player input.

Responsibilities:

- input buffer
- word matching
- star targeting
- keyboard event handling

---

### `useScoring`

Handles score calculations.

Responsibilities:

- base score
- combo multiplier
- perfect word bonus
- updating totals

---

### `useAudio`

Centralized sound manager.

Responsibilities:

- hit sounds
- miss sounds
- combo sound
- heart pickup
- game over

---

# Folder Structure

```

public/
index.html
favicon

src/

assets/
images
sprites
audio

components/
GameContainer
StarField
FallingStar
HUD
GameOverModal

planned
LeaderboardModal
SettingsModal

hooks/
useGameLoop

planned
useStars
useKeyboardInput
useScoring
useAudio

utils/
wordLists
scoring helpers
leaderboard helpers

styles/
global.css
animations.css

entry point

src/main.jsx → App.jsx → GameContainer

```

---

# Planned Feature Roadmap

## Progressive Difficulty Scaling

Difficulty should gradually increase during gameplay.

Possible scaling factors:

- increased spawn frequency
- faster falling stars
- longer words appearing later

Example concept:

```

spawnRate = baseRate * (1 + timeElapsed / 60)

```

---

## Manual Target Switching

Players can switch active targets.

Possible controls:

- Arrow Left / Arrow Right
- Tab key

This adds more strategic gameplay.

---

## Word Pack System

Allow multiple selectable word sets.

Example packs:

- Common words
- Programming terminology
- Cyberpunk themed words
- Anime themed words

Words will be loaded from **JSON files**.

Example:

```

wordpacks/
common.json
programming.json
cyberpunk.json

```

Players can select packs from the **Settings panel**.

---

# UI / UX Improvements

## Audio Feedback

Add sound effects for:

- word hit
- miss
- combo
- heart pickup
- game over

---

## Visual Effects

Planned visual improvements include:

- particle explosion when a star is destroyed
- floating score indicators
- animated combo meter
- smoother star destruction animation

Possible tools:

- CSS animation
- Canvas particles
- Framer Motion

---

# Leaderboard Expansion

Currently highscores are stored locally.

Future upgrade:

**Global leaderboard API**

Possible backend stack:

- Node.js
- Express
- MongoDB or Supabase

Example endpoints:

```

POST /scores
GET /scores
GET /scores?difficulty=hard

```

Leaderboard will support:

- player names
- difficulty filtering
- global top scores

---

# Performance Goals

Improve rendering efficiency.

Planned optimizations:

- use `requestAnimationFrame` for the game loop
- memoize derived state using `useMemo`
- stabilize handlers with `useCallback`
- isolate star rendering into independent components

These improvements reduce unnecessary re-renders.

---

# Testing Plan

Introduce unit tests for core systems.

Tools:

- **Vitest**
- **React Testing Library**

Test targets:

- scoring logic
- combo calculations
- star spawning
- keyboard input handling

---

# Portfolio Value

This project demonstrates:

- interactive UI engineering
- real-time browser game mechanics
- modular React architecture
- performance optimization
- extensible system design

When completed it will represent a **production-quality frontend portfolio project** suitable for:

- frontend developer roles
- full-stack developer roles
