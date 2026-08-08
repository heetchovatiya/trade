import { Reveal } from '../hooks/useReveal'

export default function Advantages() {
  return (
    <section className="advantages section" id="advantages">
      <div className="container">
        <Reveal as="h2" className="section-title">
          Discover <span className="gold">Explore Markets Limited</span> Advantages
        </Reveal>

        <div className="bento">
          <Reveal as="article" className="bento-card bento-main hover-lift" delay={0}>
            <div className="bento-copy">
              <h3>
                Trade <span className="gold">Anywhere</span>, The Power is Yours.
              </h3>
              <p>
                Execute from desktop or mobile with the same depth of liquidity and institutional
                pricing.
              </p>
              <a href="#platforms" className="link-arrow">
                Explore platforms →
              </a>
            </div>
            <div className="bento-visual phone-float" aria-hidden="true">
              <div className="mini-phone">
                <div className="mini-phone-screen">
                  <div className="mps-bal">$18,058.41</div>
                  <div className="mps-chart">
                    <svg viewBox="0 0 120 60" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="goldSoftMini" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C5A059" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,50 L20,45 L40,48 L60,30 L80,35 L100,15 L120,20"
                        fill="none"
                        stroke="#C5A059"
                        strokeWidth="2.5"
                        className="draw-line"
                      />
                      <path
                        d="M0,50 L20,45 L40,48 L60,30 L80,35 L100,15 L120,20 L120,60 L0,60 Z"
                        fill="url(#goldSoftMini)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="coin coin-1" />
              <div className="coin coin-2" />
            </div>
          </Reveal>

          <Reveal as="article" className="bento-card bento-spread hover-lift" delay={150}>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
              alt="Trader reviewing markets on phone"
              loading="lazy"
            />
            <div className="bento-overlay">
              <h3>Trade with our Best Spreads</h3>
              <p>From 0.0 pips on major pairs during peak liquidity.</p>
            </div>
          </Reveal>

          <Reveal as="article" className="bento-card bento-withdraw hover-lift" delay={300}>
            <div className="withdraw-graphic" aria-hidden="true">
              <div className="wg-ring" />
              <div className="wg-core">24/7</div>
            </div>
            <h3>24/7 withdrawals</h3>
            <p>Request funds any time — processed with institutional speed.</p>
            <a href="#signup" className="btn btn-gold btn-sm">
              Withdraw
            </a>
          </Reveal>

          <Reveal as="article" className="bento-card bento-stable hover-lift" delay={200}>
            <div className="stable-visual" aria-hidden="true">
              <div className="gold-stack" />
            </div>
            <h3>Stable Market Price</h3>
            <p>Deep liquidity from tier-1 providers for consistent fills.</p>
          </Reveal>

          <Reveal as="article" className="bento-card bento-copytrade hover-lift" delay={350}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80"
              alt="Copy trading analytics dashboard"
              loading="lazy"
            />
            <div className="bento-overlay">
              <h3>Explore Markets Limited Copy Trading</h3>
              <p>Follow proven strategies and mirror positions automatically.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
