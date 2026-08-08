import { Reveal } from '../hooks/useReveal'

const QUOTES = [
  {
    name: 'Maya R.',
    role: 'Swing trader',
    text: 'Execution feels consistent during busy sessions. The platform stays clear when markets move fast.',
  },
  {
    name: 'Jonas K.',
    role: 'FX specialist',
    text: 'Spreads and funding options are straightforward. I spend less time guessing and more time trading.',
  },
  {
    name: 'Priya S.',
    role: 'Multi-asset trader',
    text: 'Having forex and metals in one place with the same workflow made my routine simpler overnight.',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials-section section" id="stories">
      <div className="container">
        <Reveal as="h2" className="section-title">
          Traders who value <span className="gold">clarity</span>
        </Reveal>

        <div className="testimonials-grid">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} as="blockquote" className="quote-card hover-lift" delay={i * 140}>
              <p>“{q.text}”</p>
              <footer>
                <strong>{q.name}</strong>
                <span>{q.role}</span>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
