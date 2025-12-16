import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import BaitOverlay from './BaitOverlay'
import ProductReveal from './ProductReveal'
import CloudflareCaptcha from './CloudflareCaptcha'

function App() {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const bgAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // === EDIT HERE: Background music ===
    // File location: public/audio/tensionado.mp3
    const audio = new Audio('/audio/tensionado.mp3')
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.35
    bgAudioRef.current = audio

    const onPause = () => setIsMusicPlaying(false)
    const onPlay = () => setIsMusicPlaying(true)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('play', onPlay)

    return () => {
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('play', onPlay)
      try {
        audio.pause()
        audio.src = ''
      } catch {
        // no-op
      }
      bgAudioRef.current = null
    }
  }, [])

  const handleToggleMusic = useCallback(() => {
    const audio = bgAudioRef.current
    if (!audio) return

    if (audio.paused) {
      void audio.play().catch(() => {
        // Autoplay policies or missing file: fail silently.
      })
    } else {
      audio.pause()
    }
  }, [])

  function handleRequestReveal() {
    if (isExiting || isRevealed) return

    setIsExiting(true)

    // Match this duration to the CSS exit animation.
    window.setTimeout(() => {
      setIsRevealed(true)
    }, 700)
  }

  if (!isCaptchaVerified) {
    return <CloudflareCaptcha onVerified={() => setIsCaptchaVerified(true)} />
  }

  return (
    <div className="appRoot">
      <div className="musicToggleWrap">
        <button
          type="button"
          className="musicToggleBtn"
          onClick={handleToggleMusic}
          aria-pressed={isMusicPlaying}
          aria-label={isMusicPlaying ? 'Pause background music' : 'Play background music'}
          title={isMusicPlaying ? 'Pause music' : 'Play music'}
        >
          {isMusicPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      {isRevealed ? (
        <ProductReveal />
      ) : (
        <BaitOverlay isExiting={isExiting} onRequestReveal={handleRequestReveal} />
      )}
    </div>
  )
}

export default App
