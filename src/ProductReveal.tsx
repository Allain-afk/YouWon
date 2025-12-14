import { useMemo } from 'react'

export default function ProductReveal() {
  const posterImgSrc = useMemo(() => {
    // === EDIT HERE: Replace with your own product poster image path (e.g. /poster.jpg) ===
    // Inline SVG placeholder so it works out of the box.
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='1600' viewBox='0 0 1200 1600'>
        <defs>
          <linearGradient id='bg' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0' stop-color='#ffffff'/>
            <stop offset='1' stop-color='#f3f4f6'/>
          </linearGradient>
        </defs>
        <rect width='1200' height='1600' fill='url(#bg)'/>
        <rect x='90' y='110' width='1020' height='1380' rx='36' fill='#ffffff' stroke='#e5e7eb' stroke-width='6'/>
        <text x='600' y='280' fill='#111827' font-family='system-ui, Arial' font-size='68' font-weight='800' text-anchor='middle'>MY PRODUCT</text>
        <text x='600' y='360' fill='#374151' font-family='system-ui, Arial' font-size='34' text-anchor='middle'>Poster Placeholder</text>
        <rect x='210' y='470' width='780' height='520' rx='28' fill='#111827'/>
        <text x='600' y='760' fill='#e5e7eb' font-family='system-ui, Arial' font-size='36' text-anchor='middle'>Put your image here</text>
        <text x='600' y='1120' fill='#111827' font-family='system-ui, Arial' font-size='44' font-weight='700' text-anchor='middle'>Feature • Benefit • Call-to-Action</text>
        <text x='600' y='1200' fill='#374151' font-family='system-ui, Arial' font-size='28' text-anchor='middle'>Price / Slogan / Contact</text>
        <text x='600' y='1410' fill='#6b7280' font-family='system-ui, Arial' font-size='24' text-anchor='middle'>Replace this with your real poster image</text>
      </svg>
    `.trim()
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  }, [])

  return (
    <main className="reveal" aria-label="Product advertisement reveal">
      <div className="revealCard">
        <div className="revealHeader">
          <h1 className="revealTitle">Just kidding... but this offer is actually real.</h1>
          <p className="revealSubtitle">Here’s the actual product ad for the project.</p>
        </div>

        <img className="revealPoster" src={posterImgSrc} alt="Product poster placeholder" />

        <p className="revealCaption">Just kidding! But this product is a real winner.</p>
      </div>
    </main>
  )
}
