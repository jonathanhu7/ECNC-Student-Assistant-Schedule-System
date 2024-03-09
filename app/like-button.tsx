'use client'

import React, { useState } from 'react'

export default function LikeButton (): React.ReactElement {
  const [likes, setLikes] = useState(0)

  function handleClick (): void {
    setLikes(likes + 1)
  }

  return <button onClick={handleClick}>Like ({likes})</button>
}
