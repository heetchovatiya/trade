import { useState } from 'react'
import { Reveal } from '../hooks/useReveal'

const FAQS = [
  {
    q: 'How quickly can I start trading?',
    a: 'Most accounts are ready within minutes after registration and a successful deposit. Verification may be required based on your region.',
  },
  {
    q: 'Are my funds protected?',
    a: 'Client funds are held in segregated accounts. We use encrypted connections and continuous monitoring on every session.',
  },
  {
    q: 'Which platforms can I use?',
    a: 'Trade from web, iOS, and Android with synchronized watchlists, charts, and order tickets across devices.',
  },
  {
    q: 'What are the withdrawal times?',
    a: 'Withdrawal requests can be submitted any time. Processing speed depends on the funding method and compliance checks.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="faq-section section" id="faq">
      <div className="container faq-layout">
        <Reveal className="faq-intro">
          <h2 className="section-title left">
            Questions, <span className="gold">answered</span>
          </h2>
          <p className="section-lead left">
            Straight answers on funding, security, and how Explore Markets Limited works day to day.
          </p>
        </Reveal>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const active = open === i
            return (
              <Reveal key={item.q} className={`faq-item ${active ? 'is-open' : ''}`} delay={i * 90}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={active}
                  onClick={() => setOpen(active ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-plus">{active ? '−' : '+'}</span>
                </button>
                <div className="faq-panel">
                  <p>{item.a}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
