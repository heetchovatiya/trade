import { Reveal } from '../hooks/useReveal'

const BIG = [
  { value: '9.7 Billion', label: 'Monthly volume' },
  { value: 'Zero', label: 'Hidden fees' },
  { value: '94.3%', label: 'Client satisfaction' },
]

const BENEFITS = ['Tight Spreads', 'No Commissions', 'Liquidity Providers', 'Access 200 Assets']

export default function Results({ onOpenSignup }) {
  return (
    <section className="results section" id="why-us">
      <div className="container">
        <Reveal as="h2" className="section-title">
          Our Results Are Proven In Numbers
        </Reveal>

        <Reveal className="big-stats" delay={200}>
          {BIG.map((s) => (
            <div key={s.label} className="hover-lift">
              <div className="big-stat-value">{s.value}</div>
              <div className="big-stat-label">{s.label}</div>
            </div>
          ))}
        </Reveal>

        <Reveal className="benefit-row" delay={400}>
          {BENEFITS.map((b) => (
            <div key={b} className="benefit hover-glow">
              <span className="b-icon">◈</span> {b}
            </div>
          ))}
        </Reveal>

        <Reveal className="results-cta" delay={600}>
          <button type="button" className="btn btn-gold" onClick={onOpenSignup}>
            Start Trading Today
          </button>
        </Reveal>
      </div>
    </section>
  )
}
