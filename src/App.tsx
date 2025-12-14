import './App.css'
import { useState } from 'react'
import BaitOverlay from './BaitOverlay'
import ProductReveal from './ProductReveal'

function App() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  function handleRequestReveal() {
    if (isExiting || isRevealed) return

    setIsExiting(true)

    // Match this duration to the CSS exit animation.
    window.setTimeout(() => {
      setIsRevealed(true)
    }, 700)
  }

  return (
    <div className="appRoot">
      {isRevealed ? (
        <ProductReveal />
      ) : (
        <BaitOverlay isExiting={isExiting} onRequestReveal={handleRequestReveal} />
      )}
    </div>
  )
}

export default App
