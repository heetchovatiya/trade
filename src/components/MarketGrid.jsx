import { Reveal } from '../hooks/useReveal'

const MARKETS = [
  {
    title: 'Forex',
    desc: 'Major, minor, and exotic pairs with competitive spreads during peak sessions.',
    meta: '60+ pairs',
    icon: 'ƒx',
  },
  {
    title: 'Commodities',
    desc: 'Gold, silver, energy, and softs with deep liquidity across trading hours.',
    meta: '20+ assets',
    icon: 'Au',
  },
  {
    title: 'Indices',
    desc: 'Global equity indices with transparent pricing and fast order routing.',
    meta: '15+ markets',
    icon: '↗',
  },
  {
    title: 'Crypto CFDs',
    desc: 'Trade leading digital assets as CFDs without holding the underlying coin.',
    meta: '10+ coins',
    icon: '₿',
  },
]

export default function MarketGrid({ onOpenSignup }) {
  return (
    <section className="markets-section section" id="asset-markets">
      <div className="container">
        <Reveal as="h2" className="section-title">
          Markets built for <span className="gold">focused trading</span>
        </Reveal>
        <Reveal as="p" className="section-lead" delay={120}>
          Access the instruments you need from one account — priced for clarity, executed with speed.
        </Reveal>

        <div className="markets-grid">
          {MARKETS.map((m, i) => (
            <Reveal key={m.title} as="article" className="market-card hover-lift" delay={i * 120}>
              <div className="market-card__icon">{m.icon}</div>
              <div className="market-card__meta">{m.meta}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <button type="button" className="link-arrow link-arrow-btn" onClick={onOpenSignup}>
                Trade {m.title} →
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
