import React from 'react'

export default function HUD({score, lives, difficulty, onChangeDifficulty}) {
  return (
    <div className="hud">
      <h3>HUD</h3>
      <div className="stat"><span>Score</span><strong>{score}</strong></div>
      <div className="stat"><span>Lives</span><strong>{lives}</strong></div>
      <div className="stat"><span>Difficulty</span><strong>{difficulty}</strong></div>

      <div className="controls">
        <label>Difficulty</label>
        <div style={{display:'flex',gap:8, marginTop:6}}>
          <button className="button" onClick={() => onChangeDifficulty('Easy')}>Easy</button>
          <button className="button" onClick={() => onChangeDifficulty('Normal')}>Normal</button>
          <button className="button" onClick={() => onChangeDifficulty('Hard')}>Hard</button>
        </div>
      </div>
      <div className="inputBox">
        <input placeholder="Type here (or use keyboard)" readOnly value="" />
        <small style={{opacity:.7}}>Typing uses global keyboard events</small>
      </div>
    </div>
  )
}
