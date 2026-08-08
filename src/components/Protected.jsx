import { Reveal } from '../hooks/useReveal'

const CANDLES = [
  { type: 'up', b: '40%', w: '55%' },
  { type: 'down', b: '55%', w: '35%' },
  { type: 'up', b: '30%', w: '60%' },
  { type: 'up', b: '45%', w: '40%' },
  { type: 'down', b: '60%', w: '50%' },
  { type: 'up', b: '25%', w: '70%' },
  { type: 'down', b: '50%', w: '45%' },
  { type: 'up', b: '35%', w: '55%' },
  { type: 'up', b: '20%', w: '65%' },
  { type: 'down', b: '48%', w: '38%' },
  { type: 'up', b: '28%', w: '72%' },
  { type: 'down', b: '42%', w: '48%' },
]

export default function Protected() {
  return (
    <section className="protected section-dark">
      <div className="container protected-grid">
        <Reveal className="chart-phone" delay={0}>
          <div className="phone-mock dark hover-float">
            <div className="phone-notch" />
            <div className="phone-ui candle-ui">
              <div className="pui-head compact">
                <span>XAUUSD · H1</span>
                <strong>2,341.80</strong>
              </div>
              <div className="candles" aria-hidden="true">
                {CANDLES.map((c, i) => (
                  <span
                    key={i}
                    className={`c ${c.type}`}
                    style={{ '--b': c.b, '--w': c.w, '--i': i }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="trust-card hover-lift" delay={300}>
          <div className="trust-badge pulse-badge" aria-hidden="true">
            ✓
          </div>
          <h3>Your Funds Are Always In Trusted Hands</h3>
          <p>
            Client funds are held in segregated accounts with bank-grade encryption and continuous
            monitoring across every session.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
