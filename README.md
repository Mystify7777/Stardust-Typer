# Stardust Typer

**Stardust Typer** is a fast-paced arcade typing game built with React. Type words on falling stars to blast them into stardust before they collide with the ground. Sharpen your reflexes, rise on the online leaderboard, and enjoy a cosmic typing challenge!

---

## 🚀 Features

- Beautiful animated starfield and particle effects
- Three difficulty modes, from casual to pro
- Smart auto-targeting and manual switching between stars
- Responsive scoring, penalties, and streaks
- Persistent online leaderboard for each difficulty level
- Satisfying audio feedback for actions and successful combos
- Intuitive UI and accessible keyboard controls

---

## 🕹️ Gameplay Instructions

1. **Objective**: Type the words shown on falling stars before they hit the ground.
2. **Controls**:
   - Start typing a word to target and destroy its star.
   - Use **Up/Down Arrows** or *click/tap* to manually switch target stars (costs a small penalty).
   - Incorrect keypress or switching targets reduces score.
   - Lose a life each time a star reaches the ground. The game ends when all lives are lost.
3. **Modes**: Select from Easy, Normal, or Hard. Each mode uses unique word lists and star fall speeds.
4. **Game Over**: See your score and compare on the leaderboard. Play again to improve!

---

## 🛠️ Project Structure

```bash
src/
  assets/        # Sprites, audio, backgrounds
  components/    # All major React UI components
  hooks/         # Custom React hooks for game logic
  utils/         # Utility functions, word lists, API helpers
  context/       # Global game state/context
  styles/        # CSS and animation styles
  App.jsx        # Main app entry point
  index.js       # Renders the app
```

See the project structure above for details.

---

## 🧑‍💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Yarn](https://yarnpkg.com/) or npm

### Setup

```shell
git clone https://github.com/mystify7777/stardust-typer.git
cd stardust-typer
yarn install             # or npm install
yarn start               # or npm start
```

Visit [http://localhost:3000](http://localhost:3000) to play.

---

## 🌟 Tech Stack

- [React](https://reactjs.org/)
- [react-spring](https://www.react-spring.dev/) or [framer-motion](https://www.framer.com/motion/) (animations)
- [Howler.js](https://howlerjs.com/) (audio)
- [Firebase](https://firebase.google.com/) or [Supabase](https://supabase.com/) (leaderboard backend)
- CSS Modules or Styled Components

---

## ✨ Contributing

Pull requests are welcome. Open an issue to discuss ideas or report bugs.

1. Fork this repo.
2. Create a branch: `git checkout -b feature/feature-name`
3. Commit your changes and push.
4. Open a PR!

---

## 📄 License

MIT License — see `LICENSE` file.

---

## 📢 Credits

- Game/idea, code: [@Mystify7777](https://github.com/mystify7777)
- Sound & graphics: [Sources, if not original]
- Inspired by classic arcade typing and falling-object games.

---

Enjoy the game and blast some stardust! 🚀🌠

---
