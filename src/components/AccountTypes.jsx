import { Reveal } from '../hooks/useReveal'

const ACCOUNTS = [
  {
    name: 'Starter',
    min: '$50',
    description: 'Entry tier — ideal for new traders.',
    features: [
      'Indicative spreads from 1.2 pips',
      'Leverage up to 1:100',
      'MT5 desktop · web · mobile',
      'Demo account included',
      '24/5 Email & phone support'
    ]
  },
  {
    name: 'Pro',
    min: '$500',
    description: 'For active retail & professional traders.',
    featured: true,
    badge: 'MOST POPULAR',
    features: [
      'EURUSD spread from 0.6 pips · zero commission',
      'Leverage up to 1:200',
      'Advanced charting toolkit & priority execution',
      '24/7 Priority support & dealing desk',
      'API connectivity available'
    ]
  },
  {
    name: 'Elite',
    min: '$5,000',
    description: 'Institutional-grade access for HNW clients.',
    features: [
      'EURUSD spread from 0.0 pips · raw spreads',
      'Leverage up to 1:400',
      'Dedicated relationship manager',
      'Bespoke liquidity routing',
      'FIX / API institutional access'
    ]
  }
]

export default function AccountTypes({ onOpenSignup }) {
  return (
    <section className="accounts-section section" id="accounts">
      <div className="container">
        <Reveal as="span" className="accounts-subtitle">
          — ACCOUNT TYPES —
        </Reveal>

        <Reveal as="h2" className="accounts-title">
          Pick the tier that fits your <span className="gold">capital & ambition.</span>
        </Reveal>

        <Reveal as="p" className="accounts-lead" delay={120}>
          Three live tiers <span className="dot">·</span> transparent pricing <span className="dot">·</span> zero hidden fees.
        </Reveal>

        <div className="accounts-grid">
          {ACCOUNTS.map((a, i) => (
            <Reveal
              key={a.name}
              as="article"
              className={`account-card hover-lift ${a.featured ? 'account-card--featured' : ''}`}
              delay={i * 140}
            >
              {a.featured && a.badge && (
                <span className="account-badge">{a.badge}</span>
              )}

              <div className="account-header">
                <span className="account-tier-number">TIER 0{i + 1}</span>
                <h3 className="account-name">{a.name}</h3>
              </div>

              <div className="account-price-container">
                <span className="account-price-from">from</span>
                <span className="account-price-amount">
                  {a.min}
                </span>
              </div>

              <p className="account-description">{a.description}</p>

              <div className="account-divider"></div>

              <ul className="account-features-list">
                {a.features.map((f, idx) => (
                  <li key={idx}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="account-check-icon"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`account-btn ${a.featured ? 'account-btn--featured' : ''}`}
                onClick={onOpenSignup}
              >
                Open {a.name}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
