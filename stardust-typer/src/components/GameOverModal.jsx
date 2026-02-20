import React from "react";
import { formatTime } from "../utils/formatTime";

const GameOverModal = ({ score, elapsedMs = 0, combo = 0, comboMultiplier = 1, highScores = [], onRestart, onMenu }) => {
  return (
    <div className="modal">
      <div className="modal-card">
        <h2 className="modal-title">💫 Game Over 💫</h2>
        <p className="modal-text">Your Score: {score}</p>
        <p className="modal-text">Time: {formatTime(elapsedMs)}</p>
        <p className="modal-text">Best Combo: {combo} (x{comboMultiplier.toFixed(1)})</p>
        <div className="modal-actions">
          <button onClick={onRestart} className="cta">Restart</button>
          <button onClick={onMenu} className="ghost">Main Menu</button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
