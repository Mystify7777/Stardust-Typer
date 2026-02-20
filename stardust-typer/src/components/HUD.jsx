import React from 'react'
import { formatTime } from '../utils/formatTime'

export default function HUD({score, lives, difficulty, paused=false, elapsedMs=0, combo=0, comboMultiplier=1, onChangeDifficulty}) {
  return (
    <div className="hud">
      <h3>HUD</h3>
      <div className="stat"><span>Score</span><strong>{score}</strong></div>
      <div className="stat"><span>Lives</span><strong>{lives}</strong></div>
      <div className="stat"><span>Time</span><strong>{formatTime(elapsedMs)}</strong></div>
      <div className="stat"><span>Combo</span><strong>{combo}</strong></div>
      <div className="stat"><span>Multiplier</span><strong>x{comboMultiplier.toFixed(1)}</strong></div>
      <div className="stat"><span>Difficulty</span><strong>{difficulty}</strong></div>
      <div className="stat"><span>Status</span><strong>{paused ? 'Paused' : 'Playing'}</strong></div>

      <div className="controls">
        <label>Difficulty</label>
        <div style={{display:'flex',gap:8, marginTop:6}}>
          {['Easy','Normal','Hard'].map(level => (
            <button
              key={level}
              className={`button diff-btn${level === difficulty ? ' active' : ''}`}
              onClick={() => onChangeDifficulty(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
