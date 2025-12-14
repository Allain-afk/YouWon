// === EDIT HERE: Product poster image ===
// Replace with your own image if you rename/move it.
import productPosterSrc from './images/VibratorProduct.jpg'

export default function ProductReveal() {
  return (
    <main className="reveal" aria-label="Product advertisement reveal">
      <div className="revealCard">
        <div className="revealHeader">
          <h1 className="revealTitle">This offer is actually real.</h1>
          <p className="revealSubtitle">by yours truly, Lorence Mae Bonane</p>
        </div>

        <img className="revealPoster" src={productPosterSrc} alt="Product poster" />

        <section className="revealDetails" aria-label="Product details">
          <div className="revealDetails__top">
            <h2 className="revealProductName">VibeSpark™ Personal Massager</h2>
            <div className="revealPrice">₱1499</div>
          </div>

          <p className="revealBlurb">
            A discreet, rechargeable vibrator designed for comfort, control, and confidence.
          </p>

          <div className="revealKpis">
            <div className="revealKpi">
              <div className="revealKpi__label">Modes</div>
              <div className="revealKpi__value">10</div>
            </div>
            <div className="revealKpi">
              <div className="revealKpi__label">Noise</div>
              <div className="revealKpi__value">Quiet</div>
            </div>
            <div className="revealKpi">
              <div className="revealKpi__label">Charge</div>
              <div className="revealKpi__value">USB</div>
            </div>
            <div className="revealKpi">
              <div className="revealKpi__label">Material</div>
              <div className="revealKpi__value">Soft-touch</div>
            </div>
          </div>

          <div className="revealCtaRow">
            <button className="revealCtaBtn" type="button">Order Now</button>
            <div className="revealFinePrint">• 18+ only</div>
          </div>
        </section>

        <p className="revealCaption">Just kidding! But this product is a real winner.</p>
      </div>
    </main>
  )
}
