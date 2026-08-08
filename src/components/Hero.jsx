import { useCallback, useRef, useState } from 'react'
import { Reveal } from '../hooks/useReveal'
import HeroVisual from './HeroVisual'

const TRUST = [
  'Segregated client funds',
  'Fast deposits & withdrawals',
  'Institutional liquidity',
]

const HERO_ASSETS = [
  {
    id: 'eurusd',
    symbol: 'EURUSD',
    name: 'Euro vs U.S. Dollar',
    icon: <div className="asset-badge">EUR</div>,
  },
  {
    id: 'us500',
    symbol: 'US500',
    name: 'S&P 500 (US500)',
    icon: <div className="asset-badge">500</div>,
  },
  {
    id: 'xauusd',
    symbol: 'GOLD',
    name: 'Gold Spot',
    icon: (
      <div className="asset-badge asset-badge--gold">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      </div>
    ),
  },
  {
    id: 'coffee',
    symbol: 'COFFEE',
    name: 'US Coffee',
    icon: <div className="asset-badge">☕</div>,
  },
  {
    id: 'aapl',
    symbol: 'Apple',
    name: 'Apple (AAPL.OQ)',
    icon: <div className="asset-badge"></div>,
  },
]

export default function Hero({ onOpenSignup }) {
  const heroRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [activeAssetId, setActiveAssetId] = useState('xauusd')

  const onMove = useCallback((e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMouse({
      x: Math.max(-1, Math.min(1, nx)),
      y: Math.max(-1, Math.min(1, ny)),
    })
  }, [])

  const onLeave = useCallback(() => setMouse({ x: 0, y: 0 }), [])

  return (
    <section
      className="hero"
      id="home"
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Full-bleed Interactive Stock Market Background */}
      <HeroVisual mouse={mouse} />

      <div className="container hero-layout">
        <div className="hero-copy">
          <Reveal as="div" className="hero-badge" delay={0}>
            Multi-asset access · Regulated pathways · Global coverage
          </Reveal>

          <Reveal as="h1" className="hero-title" delay={160}>
            Trade with
            <br />
            <span className="gold text-shimmer">Clear Direction.</span>
          </Reveal>

          <Reveal as="p" className="hero-sub" delay={320}>
            Explore Markets Limited connects you to forex, commodities, and indices with sharp
            pricing, deep liquidity, and tools designed for decisive traders.
          </Reveal>

          <Reveal className="hero-ctas" delay={480}>
            <button type="button" className="btn btn-gold" onClick={onOpenSignup}>
              Open Live Account
            </button>
            <a href="#platforms" className="btn btn-outline">
              See Platforms
            </a>
          </Reveal>

          <Reveal as="ul" className="hero-trust" delay={640}>
            {TRUST.map((item) => (
              <li key={item}>
                <span className="trust-check" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="container">
        <Reveal className="asset-access" delay={720}>
          <div className="asset-access-header">
            EASY ACCESS TO 1,400+ GLOBAL ASSETS
          </div>

          <div id="markets" className="asset-access-grid" aria-label="Easy access global assets">
            {HERO_ASSETS.map((asset) => {
              const isActive = activeAssetId === asset.id
              return (
                <div
                  key={asset.id}
                  onClick={() => setActiveAssetId(asset.id)}
                  className={`asset-card hover-lift ${isActive ? 'active' : ''}`}
                >
                  <div className="asset-card__icon">{asset.icon}</div>
                  <div className="asset-card__info">
                    <div className="asset-card__symbol">{asset.symbol}</div>
                    <div className="asset-card__name">{asset.name}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
