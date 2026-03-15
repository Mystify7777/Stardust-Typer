import React from "react";
import { formatTime } from "../utils/formatTime";

export default function LeaderboardModal({ highScores = [], onClose }) {
  const rows = highScores.length > 0 ? highScores : [{ name: "—", difficulty: "—", score: "—", timeMs: null }];

  return (
    <div className="modal">
      <div className="modal-card">
        <h2 className="modal-title">Leaderboard (Local)</h2>
        <div className="modal-table">
          <div className="modal-row head"><span>Player</span><span>Difficulty</span><span>Score</span><span>Time</span></div>
          {rows.map((entry, idx) => (
            <div key={idx} className="modal-row">
              <span>{entry.name || "Guest"}</span>
              <span>{entry.difficulty || "—"}</span>
              <span>{entry.score ?? "—"}</span>
              <span>{entry.timeMs != null ? formatTime(entry.timeMs) : "—"}</span>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
