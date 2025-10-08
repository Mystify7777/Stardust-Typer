
# Project Structure

```bash
stardust-typer/
│
├── public/
│   ├── index.html            # HTML template for the single-page app
│   └── favicon.ico           # App icon for browsers
│
├── src/
│   ├── assets/
│   │   ├── star.png                 # Star visual sprite(s)
│   │   ├── audio/
│   │   │   ├── chime.mp3            # SFX for successful word
│   │   │   ├── burst.mp3            # SFX for star destroyed
│   │   │   ├── error.mp3            # SFX for invalid keystroke
│   │   │   └── thud.mp3             # SFX for failed star
│   │   └── bg/
│   │       └── starscape.jpg        # Background image for starfield
│   │
│   ├── components/
│   │   ├── GameContainer.jsx        # Main component, game loop and state logic
│   │   ├── StarField.jsx            # Renders all falling stars
│   │   ├── FallingStar.jsx          # Visual/logic for one falling star
│   │   ├── HUD.jsx                  # Score, lives, difficulty display, controls
│   │   ├── GameOverModal.jsx        # Game over screen and action buttons
│   │   ├── Leaderboard.jsx          # Online leaderboard component
│   │   └── SettingsModal.jsx        # UI for difficulty selection, word packs, etc.
│   │
│   ├── hooks/
│   │   ├── useGameLoop.js           # Custom hook for managing the animation/game loop
│   │   ├── useStars.js              # Hook for star objects, spawning, speed, movement
│   │   ├── useKeyboardInput.js      # Hook for handling and debouncing key events
│   │   └── useAudio.js              # Hook for playing and managing audio
│   │
│   ├── utils/
│   │   ├── wordLists.js             # Export curated word lists by difficulty/theme
│   │   ├── leaderboardApi.js        # Functions to fetch/submit leaderboard data
│   │   └── scoring.js               # Point calculations, penalty logic
│   │
│   ├── context/
│   │   └── GameContext.js           # React Context for global game state (score, lives, diff.)
│   │
│   ├── styles/
│   │   ├── App.css                  # General app styles
│   │   └── StarAnimations.css       # Particle/star motion and effects
│   │
│   ├── App.jsx                      # App root; routes to main menu/game/leaderboard
│   ├── index.js                     # Entrypoint: bootstraps React app
│   └── serviceWorker.js             # (Optional) For offline/PWA support
│
├── .env                             # Environment variables (API endpoints, keys)
├── .gitignore
├── package.json
├── README.md                        # Intro, setup, usage, and credits
└── yarn.lock / package-lock.json

```

## File/Folder Descriptions

### `public/`

- All static assets for serving, includes the HTML template and favicon.

### `src/assets/`

- Contains all game art (star sprites, background) and audio files (SFX, music).

### `src/components/`

- **GameContainer.jsx**: The entry point for gameplay—runs the game loop, manages primary game state, passes props to child components.
- **StarField.jsx**: Lays out all currently active stars, each rendered via FallingStar.
- **FallingStar.jsx**: Handles position, animation, word progress, and effects for each individual star.
- **HUD.jsx**: Displays score, lives, difficulty, and action buttons.
- **GameOverModal.jsx**: Pops up when game ends, shows the score and lets user retry or view leaderboard.
- **Leaderboard.jsx**: Fetches and displays top scores from backend or local storage.
- **SettingsModal.jsx**: For selecting difficulty, optional word packs or other player preferences.

### `src/hooks/`

- **useGameLoop.js**: Custom hook for efficient, pausable animation frame loop.
- **useStars.js**: Generates stars, updates their movement, and removes them when destroyed or failed.
- **useKeyboardInput.js**: Handles all keypress inputs, target star logic, and smart switching.
- **useAudio.js**: For SFX and music playback and management.

### `src/utils/`

- **wordLists.js**: Contains or loads arrays of words, sorted by difficulty and category.
- **leaderboardApi.js**: API methods to GET/POST scores to a cloud backend (Firebase, Supabase, etc.).
- **scoring.js**: Functions for points calculation and applying penalties.

### `src/context/`

- **GameContext.js**: Provides and manages app/game-wide state such as current score, lives, player preferences.

### `src/styles/`

- **App.css**: Main application styles (layouts, colors, fonts).
- **StarAnimations.css**: Animation keyframes for stars, twinkles, particles, etc.

## Root Files

- **App.jsx**: Sets up routing or main menu, renders GameContainer, Leaderboard, etc.
- **index.js**: Main React app entry, renders App.jsx into HTML root.
- **serviceWorker.js**: Optional for PWA/offline.
- **README.md**: Project documentation, installation steps, and contributor notes.

