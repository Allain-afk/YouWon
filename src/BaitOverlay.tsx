import { useEffect, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'

// === EDIT HERE: iPhone image (real PNG) ===
// If this image still has a checkerboard baked into it, it will show.
// In that case, switch back to the SVG fallback below.
import iphonePngSrc from './images/Iphone.png'

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
    // === EDIT HERE: iPhone image ===
    // Preferred: use your new PNG.
    return iphonePngSrc

    // Fallback: custom SVG illustration (no transparency artifacts)
    // eslint-disable-next-line no-unreachable
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='900' height='1200' viewBox='0 0 900 1200'>
        <defs>
          <linearGradient id='frame' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0' stop-color='#1f2937'/>
            <stop offset='1' stop-color='#0b0f18'/>
          </linearGradient>
          <linearGradient id='gold' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0' stop-color='#f7e7b1'/>
            <stop offset='0.45' stop-color='#d9b66f'/>
            <stop offset='1' stop-color='#8a6a2b'/>
          </linearGradient>
          <radialGradient id='glow' cx='30%' cy='20%' r='80%'>
            <stop offset='0' stop-color='#fffbeb' stop-opacity='0.85'/>
            <stop offset='0.5' stop-color='#f59e0b' stop-opacity='0.12'/>
            <stop offset='1' stop-color='#000000' stop-opacity='0'/>
          </radialGradient>
          <linearGradient id='screen' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0' stop-color='#0b1220'/>
            <stop offset='1' stop-color='#111827'/>
          </linearGradient>
          <filter id='softShadow' x='-30%' y='-30%' width='160%' height='160%'>
            <feDropShadow dx='0' dy='22' stdDeviation='22' flood-color='#000' flood-opacity='0.35'/>
          </filter>
        </defs>

        <rect width='900' height='1200' fill='#0000'/>

        <!-- back plate -->
        <g filter='url(#softShadow)'>
          <rect x='150' y='70' width='600' height='1060' rx='110' fill='url(#frame)'/>
          <rect x='170' y='90' width='560' height='1020' rx='98' fill='url(#gold)' opacity='0.95'/>
          <rect x='170' y='90' width='560' height='1020' rx='98' fill='url(#glow)'/>

          <!-- camera bump -->
          <rect x='225' y='140' width='220' height='220' rx='52' fill='rgba(17,24,39,0.58)'/>
          <circle cx='285' cy='200' r='44' fill='#0b0f18'/>
          <circle cx='285' cy='200' r='26' fill='#111827'/>
          <circle cx='385' cy='220' r='44' fill='#0b0f18'/>
          <circle cx='385' cy='220' r='26' fill='#111827'/>
          <circle cx='315' cy='305' r='44' fill='#0b0f18'/>
          <circle cx='315' cy='305' r='26' fill='#111827'/>
          <circle cx='410' cy='315' r='14' fill='#e5e7eb' opacity='0.8'/>

          <!-- screen inset (stylized) -->
          <rect x='220' y='410' width='460' height='600' rx='72' fill='rgba(17,24,39,0.8)'/>
          <rect x='240' y='430' width='420' height='560' rx='62' fill='url(#screen)'/>
          <path d='M260 900 C360 820, 430 720, 640 680' stroke='rgba(245,158,11,0.35)' stroke-width='18' fill='none'/>
          <path d='M260 860 C360 780, 430 680, 640 640' stroke='rgba(255,255,255,0.18)' stroke-width='10' fill='none'/>

          <!-- badge text -->
          <text x='450' y='1045' fill='rgba(17,24,39,0.68)' font-family='system-ui, Arial' font-size='34' font-weight='800' text-anchor='middle'>Premium Phone (Illustration)</text>
        </g>
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
          YOU WON: <span className="baitWinnerPrize">iPhone 16 Pro Max</span>
        </p>

        <div className="baitGrid">
          <div className="baitPhone">
            <img className="baitPhone__img" src={iphoneImgSrc} alt="iPhone 16 Pro Max" />
          </div>

          <div className="baitRight">
            <div className="baitTimer" role="status" aria-live="polite">
              <div className="baitTimer__label">Offer expires in</div>
              <div className="baitTimer__time">{formatTime(secondsLeft)}</div>
              <div className="baitTimer__finePrint">( Claim it now before timer ends! )</div>
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
              By clicking, you agree to absolutely nothing! 
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
