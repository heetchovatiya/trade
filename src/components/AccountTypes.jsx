import { Reveal } from '../hooks/useReveal'

const ACCOUNTS = [
  {
    name: 'Starter',
    spread: 'From 1.2 pips',
    leverage: 'Up to 1:100',
    min: '$50',
    features: ['Web & mobile access', 'Education hub', 'Email support'],
  },
  {
    name: 'Pro',
    spread: 'From 0.6 pips',
    leverage: 'Up to 1:200',
    min: '$500',
    featured: true,
    features: ['Priority execution', 'Advanced charting', '24/7 chat support'],
  },
  {
    name: 'Elite',
    spread: 'From 0.0 pips',
    leverage: 'Up to 1:400',
    min: '$5,000',
    features: ['Dedicated manager', 'Raw spreads', 'API access'],
  },
]

export default function AccountTypes({ onOpenSignup }) {
  return (
    <section className="accounts-section section" id="accounts">
      <div className="container">
        <Reveal as="h2" className="section-title">
          Account types that <span className="gold">scale with you</span>
        </Reveal>
        <Reveal as="p" className="section-lead" delay={120}>
          Choose the pricing and support level that matches how you trade — upgrade anytime.
        </Reveal>

        <div className="accounts-grid">
          {ACCOUNTS.map((a, i) => (
            <Reveal
              key={a.name}
              as="article"
              className={`account-card hover-lift ${a.featured ? 'account-card--featured' : ''}`}
              delay={i * 140}
            >
              {a.featured && <span className="account-pill">Most popular</span>}
              <h3>{a.name}</h3>
              <ul className="account-specs">
                <li>
                  <span>Spreads</span>
                  <strong>{a.spread}</strong>
                </li>
                <li>
                  <span>Leverage</span>
                  <strong>{a.leverage}</strong>
                </li>
                <li>
                  <span>Min. deposit</span>
                  <strong>{a.min}</strong>
                </li>
              </ul>
              <ul className="account-features">
                {a.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button type="button" className="btn btn-gold btn-block" onClick={onOpenSignup}>
                Open {a.name}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
