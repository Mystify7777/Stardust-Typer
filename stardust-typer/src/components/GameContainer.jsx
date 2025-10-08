import React, { useState, useEffect } from "react";
import StarField from "./StarField";
import HUD from "./HUD";
import GameOverModal from "./GameOverModal";

const GameContainer = () => {
  const [gameState, setGameState] = useState("menu"); // "menu" | "playing" | "gameover"
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);

  // Start a new game
  const startGame = () => {
    setScore(0);
    setLives(5);
    setGameState("playing");
  };

  // When lives reach 0 → game over
  useEffect(() => {
    if (lives <= 0) {
      setGameState("gameover");
    }
  }, [lives]);

  return (
    <div className="game-container text-center text-white h-screen bg-black relative overflow-hidden">
      {gameState === "menu" && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl mb-4 font-bold">✨ Stardust Typer ✨</h1>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-2xl text-xl shadow-lg"
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <>
          <StarField score={score} setScore={setScore} lives={lives} setLives={setLives} />
          <HUD score={score} lives={lives} />
        </>
      )}

      {gameState === "gameover" && (
        <GameOverModal
          score={score}
          onRestart={startGame}
          onMenu={() => setGameState("menu")}
        />
      )}
    </div>
  );
};

export default GameContainer;
