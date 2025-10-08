import React from 'react'
import FallingStar from './FallingStar'

export default function StarField({stars}) {
  return (
    <div className="stage">
      {stars.map(s => <FallingStar key={s.id} star={s} />)}
    </div>
  )
}
