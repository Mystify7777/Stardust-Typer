import React, { useState, useEffect, useRef } from "react";
import StarField from "./StarField";
import HUD from "./HUD";
import GameOverModal from "./GameOverModal";
import useGameLoop from "../hooks/useGameLoop";
import { formatTime } from "../utils/formatTime";

const GameContainer = () => {
  const MAX_LIVES = 8;
  const [gameState, setGameState] = useState("menu"); // "menu" | "playing" | "gameover"
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [difficulty, setDifficulty] = useState("Normal");
  const [paused, setPaused] = useState(false);
  const [loopSeed, setLoopSeed] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [comboFlashKey, setComboFlashKey] = useState(0);
  const [perfectFlashKey, setPerfectFlashKey] = useState(0);
  const [perfectVisible, setPerfectVisible] = useState(false);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const pauseRef = useRef(null);
  const perfectHideRef = useRef(null);
  const [highScores, setHighScores] = useState(() => {
    try {
      const stored = localStorage.getItem("stardust-highscores");
      const parsed = stored ? JSON.parse(stored) : [];
      // Migrate legacy numeric scores to object form
      if (Array.isArray(parsed) && typeof parsed[0] === "number") {
        return parsed.map((s) => ({ score: s, difficulty: "Unknown" })).slice(0, 5);
      }
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const comboMultiplier = React.useMemo(() => {
    const mult = 1 + Math.max(0, combo - 1) * 0.1;
    return Math.min(mult, 3);
  }, [combo]);

  const bestComboMultiplier = React.useMemo(() => {
    const mult = 1 + Math.max(0, bestCombo - 1) * 0.1;
    return Math.min(mult, 3);
  }, [bestCombo]);

  const { stars, activeId } = useGameLoop({
    isRunning: gameState === "playing" && !paused,
    paused,
    difficulty,
    resetSeed: loopSeed,
    onLifeLost: (lost = 1) => setLives((prev) => prev - lost),
    onScoreGain: (gained = 0) => setScore((prev) => prev + gained),
    onLifeGain: (gained = 1) => setLives((prev) => Math.min(MAX_LIVES, prev + gained)),
    onComboChange: (value = 0) => {
      setCombo(value);
      setBestCombo((prev) => Math.max(prev, value));
      if (value >= 2) setComboFlashKey((n) => n + 1);
    },
    onPerfectWord: () => {
      setPerfectFlashKey((n) => n + 1);
      setPerfectVisible(true);
      if (perfectHideRef.current) clearTimeout(perfectHideRef.current);
      perfectHideRef.current = setTimeout(() => setPerfectVisible(false), 1200);
    },
    onPerfectReset: () => {
      if (perfectHideRef.current) clearTimeout(perfectHideRef.current);
      perfectHideRef.current = null;
      setPerfectVisible(false);
    },
  });

  const startGame = () => {
    setScore(0);
    setLives(5);
    setPaused(false);
    setElapsedMs(0);
    setCombo(0);
    setBestCombo(0);
    setComboFlashKey(0);
    setPerfectFlashKey(0);
    setPerfectVisible(false);
    if (perfectHideRef.current) {
      clearTimeout(perfectHideRef.current);
      perfectHideRef.current = null;
    }
    startRef.current = performance.now();
    setLoopSeed((n) => n + 1);
    setGameState("playing");
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    // If currently playing, restart to apply new parameters immediately and clear stars.
    if (gameState === "playing") {
      // Briefly exit play state so components unmount, then restart clean.
      setGameState("menu");
      setLoopSeed((n) => n + 1); // force StarField/useGameLoop reset
      setScore(0);
      setLives(5);
      setPaused(false);
      // Defer start to next tick after unmount
      queueMicrotask(() => startGame());
    }
  };

  const togglePause = () => {
    if (gameState !== "playing") return;
    setPaused((p) => !p);
  };

  const stopTimer = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    timerRef.current = null;
  };

  // Timer loop tracks playtime excluding pauses
  useEffect(() => {
    if (gameState !== "playing") {
      stopTimer();
      pauseRef.current = null;
      startRef.current = null;
      return;
    }

    if (paused) {
      pauseRef.current = performance.now();
      stopTimer();
      return;
    }

    // Resume or start timer
    if (!startRef.current) startRef.current = performance.now() - elapsedMs;
    if (pauseRef.current) {
      const pausedDuration = performance.now() - pauseRef.current;
      startRef.current += pausedDuration;
      pauseRef.current = null;
    }

    const tick = (now) => {
      setElapsedMs(now - startRef.current);
      timerRef.current = requestAnimationFrame(tick);
    };
    timerRef.current = requestAnimationFrame(tick);

    return () => stopTimer();
  }, [gameState, paused]);

  // When the game ends, record high scores (top 5) locally
  useEffect(() => {
    if (gameState !== "gameover") return;
    setHighScores((prev) => {
      const entry = { score, difficulty, timeMs: elapsedMs };
      const next = [...prev, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      try { localStorage.setItem("stardust-highscores", JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, [gameState, score, difficulty]);

  useEffect(() => {
    if (lives <= 0) {
      setGameState("gameover");
    }
  }, [lives]);

  // Spacebar pause/resume
  useEffect(() => {
    if (gameState !== "playing") return;
    const onKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameState]);

  // If leaving playing state, clear pause flag
  useEffect(() => {
    if (gameState !== "playing" && paused) {
      setPaused(false);
    }
  }, [gameState, paused]);

  return (
    <div className="game-shell">
      {gameState === "menu" && (
        <div className="panel menu-panel">
          <div className="panel-content">
            <h1 className="title">✨ Stardust Typer ✨</h1>
            <p className="subtitle">Type the falling words before they hit the ground.</p>
            <button onClick={startGame} className="cta">Start Game</button>
          </div>
        </div>
      )}

      {gameState === "playing" && (
        <div className="game-layout">
          <div className="game-heading">
            <h2 className="title">Stardust Typer</h2>
            <p className="subtitle">Type the falling words before they land.</p>
          </div>
          <div className="left-panel" onClick={togglePause}>
            <div className="stage-wrap">
              <StarField key={loopSeed} stars={stars} activeId={activeId} />
              {combo >= 2 && (
                <div key={comboFlashKey} className="combo-badge">
                  <span className="combo-label">Combo</span>
                  <span className="combo-value">x{comboMultiplier.toFixed(1)}</span>
                </div>
              )}
              <div key={perfectFlashKey} className={`perfect-badge${perfectVisible ? ' show' : ''}`}>
                Perfect!
              </div>
            </div>
          </div>
          <div className="right-panel">
            <HUD
              score={score}
              lives={lives}
              difficulty={difficulty}
              onChangeDifficulty={handleDifficultyChange}
              paused={paused}
              elapsedMs={elapsedMs}
              combo={combo}
              comboMultiplier={comboMultiplier}
            />
            <div className="highscores">
              <div className="hs-header">Recent High Scores</div>
              <div className="hs-row hs-head"><span>Difficulty</span><span>Score</span><span>Time</span></div>
              {Array.from({length:5}).map((_, idx) => {
                const entry = highScores[idx]
                const difficultyLabel = entry?.difficulty || '—'
                const scoreVal = entry?.score ?? '—'
                const timeVal = entry?.timeMs != null ? formatTime(entry.timeMs) : '—'
                const tierClass = idx === 0 ? 'hs-top1' : idx === 1 ? 'hs-top2' : idx === 2 ? 'hs-top3' : ''
                return (
                  <div key={idx} className={`hs-row ${tierClass}`}>
                    <span>{difficultyLabel}</span>
                    <span>{scoreVal}</span>
                    <span>{timeVal}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {gameState === "gameover" && (
        <GameOverModal
          score={score}
          elapsedMs={elapsedMs}
          combo={bestCombo}
          comboMultiplier={bestComboMultiplier}
          highScores={highScores}
          onRestart={startGame}
          onMenu={() => setGameState("menu")}
        />
      )}
    </div>
  );
};

export default GameContainer;
