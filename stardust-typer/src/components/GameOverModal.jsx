import React from "react";
import { formatTime } from "../utils/formatTime";

const GameOverModal = ({ score, elapsedMs = 0, combo = 0, comboMultiplier = 1, highScores = [], playerName = "Guest", onChangePlayerName, onOpenLeaderboard, onRestart, onMenu }) => {
  return (
    <div className="modal">
      <div className="modal-card">
        <h2 className="modal-title">💫 Game Over 💫</h2>
        <p className="modal-text">Your Score: {score}</p>
        <p className="modal-text">Time: {formatTime(elapsedMs)}</p>
        <p className="modal-text">Best Combo: {combo} (x{comboMultiplier.toFixed(1)})</p>
        <div className="modal-section">
          <label>Player Name</label>
          <input
            className="input"
            value={playerName}
            maxLength={24}
            onChange={(e) => onChangePlayerName?.(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="modal-section">
          <div className="modal-row head"><span>Rank</span><span>Name</span><span>Score</span></div>
          {(highScores || []).map((entry, idx) => (
            <div key={idx} className="modal-row">
              <span>#{idx + 1}</span>
              <span>{entry.name || "Guest"}</span>
              <span>{entry.score}</span>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onRestart} className="cta">Restart</button>
          <button onClick={onOpenLeaderboard} className="ghost">Leaderboard</button>
          <button onClick={onMenu} className="ghost">Main Menu</button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
