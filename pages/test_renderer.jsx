import React from 'react'
import Canvas from '../components/renderer/Canvas'
import { draw } from '../components/renderer/draw'

function TestRenderer() {
  return <Canvas draw={draw} />
}

export default TestRenderer
