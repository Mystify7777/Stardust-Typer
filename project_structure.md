
# Project Structure

```bash
stardust-typer/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   ├── components/
│   │   ├── FallingStar.jsx
│   │   ├── GameContainer.jsx
│   │   ├── GameOverModal.jsx
│   │   ├── HUD.jsx
│   │   └── StarField.jsx
│   ├── hooks/
│   │   ├── useAudio.js
│   │   └── useGameLoop.js
│   └── utils/
│       ├── formatTime.js
│       └── wordLists.js
├── eslint.config.js
├── package.json
├── README.md
└── vite.config.js
```

Notes
- Planned additions: Leaderboard/Settings components, `useStars`/`useKeyboardInput` hooks, scoring/leaderboard helpers under `utils/`.

