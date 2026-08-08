import { Reveal } from '../hooks/useReveal'

const PARTNERS = ['NorthBridge', 'Atlas Feed', 'Lumen Clear', 'Vertex Soft', 'PrimeRail', 'Horizon FX']

export default function Partners() {
  return (
    <section className="partners-section section">
      <div className="container">
        <Reveal as="p" className="partners-label">
          Built with institutional-grade connectivity
        </Reveal>
        <div className="partners-row">
          {PARTNERS.map((name, i) => (
            <Reveal key={name} as="span" className="partner-name" delay={i * 80}>
              {name}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
