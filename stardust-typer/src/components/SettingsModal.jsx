import React, { useState } from "react";

const WORD_PACKS = ["Core", "Programming", "Cyberpunk", "Anime"];

export default function SettingsModal({ difficulty, wordPack, onChangeDifficulty, onChangeWordPack, onClose }) {
  const [tempDifficulty, setTempDifficulty] = useState(difficulty);
  const [tempPack, setTempPack] = useState(wordPack || "Core");

  const apply = () => {
    if (tempDifficulty && tempDifficulty !== difficulty) {
      onChangeDifficulty?.(tempDifficulty);
    }
    if (tempPack && tempPack !== wordPack) {
      onChangeWordPack?.(tempPack);
    }
    onClose?.();
  };

  return (
    <div className="modal">
      <div className="modal-card">
        <h2 className="modal-title">Settings</h2>
        <div className="modal-section">
          <label>Difficulty</label>
          <div className="pill-row">
            {["Easy", "Normal", "Hard"].map((level) => (
              <button
                key={level}
                className={`button pill${level === tempDifficulty ? " active" : ""}`}
                onClick={() => setTempDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <label>Word Pack (stub)</label>
          <div className="pill-row">
            {WORD_PACKS.map((pack) => (
              <button
                key={pack}
                className={`button pill${pack === tempPack ? " active" : ""}`}
                onClick={() => setTempPack(pack)}
              >
                {pack}
              </button>
            ))}
          </div>
          <p className="modal-hint">Word pack selection is stubbed; hook into loader later.</p>
        </div>

        <div className="modal-actions">
          <button className="cta" onClick={apply}>Apply</button>
          <button className="ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
