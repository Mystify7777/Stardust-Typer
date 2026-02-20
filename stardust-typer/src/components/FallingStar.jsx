import React from 'react'

export default function FallingStar({star, isActive}) {
  // show typed part differently
  const typedLen = star.typed || 0
  const typed = star.word.slice(0, typedLen)
  const rest = star.word.slice(typedLen)
  const style = {
    left: star.x + '%',
    top: star.y + 'px',
    fontSize: Math.max(14, 12 + star.word.length),
    transform: 'translate(-50%, -50%)'
  }
  const isLife = star.type === 'life'
  const cls = `star${isActive ? ' star-active' : ''}${isLife ? ' star-life' : ''}`
  const icon = isLife ? '❤️' : '✨'
  return (
    <div className={cls} style={style}>
      <span className="star-icon">{icon}</span>
      <span className="word">
        <span className="typed">{typed}</span>
        <span>{rest}</span>
      </span>
    </div>
  )
}
