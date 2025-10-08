import React from 'react'

export default function FallingStar({star}) {
  // show typed part differently
  const typedLen = star.typed || 0
  const typed = star.word.slice(0, typedLen)
  const rest = star.word.slice(typedLen)
  const style = {
    left: star.x + 'px',
    top: star.y + 'px',
    fontSize: Math.max(14, 12 + star.word.length),
    transform: 'translate(-50%, -50%)'
  }
  return (
    <div className="star" style={style}>
      <span className="typed">{typed}</span><span>{rest}</span>
    </div>
  )
}
