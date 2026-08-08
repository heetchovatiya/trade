import { useCallback, useRef, useState } from 'react'
import { Reveal } from '../hooks/useReveal'
import { formatPrice, useTickers } from '../hooks/useTickers'
import HeroVisual from './HeroVisual'

const TRUST = [
  'Segregated client funds',
  'Fast deposits & withdrawals',
  'Institutional liquidity',
]

export default function Hero({ onOpenSignup }) {
  const tickers = useTickers()
  const heroRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

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
        <Reveal className="ticker" delay={720}>
          <div id="markets" className="ticker-grid" aria-label="Live market prices">
            {tickers.map((t) => {
              const up = t.change >= 0
              return (
                <article key={t.pair} className="ticker-card hover-lift">
                  <div className="ticker-top">
                    <span className="ticker-pair">{t.pair}</span>
                    <span className={`ticker-change ${up ? 'up' : 'down'}`}>
                      {up ? '+' : ''}
                      {t.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="ticker-price">{formatPrice(t.price)}</div>
                  <svg className="spark" viewBox="0 0 80 28" aria-hidden="true">
                    <path
                      d={t.spark}
                      fill="none"
                      stroke={up ? '#1a9b5c' : '#d64545'}
                      strokeWidth="2"
                      className="spark-path"
                    />
                  </svg>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
