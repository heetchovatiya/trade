import { Reveal } from '../hooks/useReveal'

export default function FinalCTA({ onOpenSignup }) {
  return (
    <section className="final-cta section">
      <div className="container">
        <Reveal className="final-cta__panel">
          <h2>
            Ready when the <span className="gold">market is</span>
          </h2>
          <p>
            Open an Explore Markets Limited account, fund securely, and start trading with tools
            built for decisive moves.
          </p>
          <div className="final-cta__actions">
            <button type="button" className="btn btn-gold" onClick={onOpenSignup}>
              Create Account
            </button>
            <a href="#faq" className="btn btn-outline">
              Read FAQ
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
