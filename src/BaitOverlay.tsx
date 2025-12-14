import { useEffect, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'

type BaitOverlayProps = {
  isExiting: boolean
  onRequestReveal: () => void
}

function formatTime(totalSeconds: number) {
  const clamped = Math.max(0, totalSeconds)
  const minutes = Math.floor(clamped / 60)
  const seconds = clamped % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function BaitOverlay({ isExiting, onRequestReveal }: BaitOverlayProps) {
  const [secondsLeft, setSecondsLeft] = useState(5 * 60)
  const [isClaiming, setIsClaiming] = useState(false)

  const iphoneImgSrc = useMemo(() => {
    // === EDIT HERE: Replace with your own iPhone image path (e.g. /iphone.png) ===
    // Keep this as a simple inline SVG placeholder so the project works offline.
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='420' height='840' viewBox='0 0 420 840'>
        <defs>
          <linearGradient id='g' x1='0' x2='0' y1='0' y2='1'>
            <stop offset='0' stop-color='#1b1b1f'/>
            <stop offset='1' stop-color='#0b0b0d'/>
          </linearGradient>
        </defs>
        <rect x='35' y='25' width='350' height='790' rx='64' fill='url(#g)' stroke='#2a2a2f' stroke-width='10'/>
        <rect x='60' y='90' width='300' height='650' rx='36' fill='#0f172a'/>
        <circle cx='210' cy='65' r='10' fill='#2d2d33'/>
        <rect x='165' y='55' width='90' height='18' rx='9' fill='#1f1f24'/>
        <text x='210' y='810' fill='#9ca3af' font-family='system-ui, Arial' font-size='22' text-anchor='middle'>iPhone (placeholder)</text>
      </svg>
    `.trim()
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => window.clearInterval(id)
  }, [])

  function burstConfetti() {
    const defaults = {
      origin: { x: 0.5, y: 0.35 },
      spread: 90,
      ticks: 140,
      gravity: 1.0,
      scalar: 1.0,
      zIndex: 9999,
    }

    void confetti({ ...defaults, particleCount: 120 })
    void confetti({ ...defaults, particleCount: 80, angle: 60, origin: { x: 0.25, y: 0.35 } })
    void confetti({ ...defaults, particleCount: 80, angle: 120, origin: { x: 0.75, y: 0.35 } })
  }

  function handleClaim() {
    if (isClaiming) return
    setIsClaiming(true)

    burstConfetti()

    // Let the confetti start, then begin the exit transition.
    window.setTimeout(() => {
      onRequestReveal()
    }, 200)
  }

  return (
    <section
      className={`baitOverlay ${isExiting ? 'baitOverlay--exit' : ''}`}
      aria-label="Free iPhone giveaway overlay"
    >
      <div className="baitOverlay__rays" aria-hidden="true" />

      <div className="baitOverlay__content">
        <div className="baitBadge">LIMITED TIME • FINAL CHANCE • ACT NOW</div>

        <h1 className="baitHeadline">CONGRATULATIONS!</h1>
        <p className="baitSubtext">
          You are the <strong>1,000,000th Visitor!</strong>
        </p>

        <p className="baitWinnerLine">
          WINNER: <span className="baitWinnerPrize">iPhone 16 Pro Max</span>
        </p>

        <div className="baitGrid">
          <div className="baitPhone">
            <img className="baitPhone__img" src={iphoneImgSrc} alt="iPhone placeholder" />
          </div>

          <div className="baitRight">
            <div className="baitTimer" role="status" aria-live="polite">
              <div className="baitTimer__label">Offer expires in</div>
              <div className="baitTimer__time">{formatTime(secondsLeft)}</div>
              <div className="baitTimer__finePrint">(mock countdown for school project)</div>
            </div>

            <button
              type="button"
              className="baitButton"
              onClick={handleClaim}
              disabled={isClaiming}
            >
              CLAIM REWARD NOW
            </button>

            <div className="baitDisclaimer">
              By clicking, you agree to absolutely nothing (because this is a prank demo).
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
