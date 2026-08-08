import { Reveal } from '../hooks/useReveal'

const STEPS = [
  {
    num: '01',
    title: 'Sign Up',
    text: 'Complete a short registration form with your personal details and create secure login credentials.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Deposit',
    text: 'Fund your account using bank transfer, card, or e-wallet — deposits are credited promptly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Start Trading',
    text: 'Access global markets instantly and place your first trade with professional-grade tools.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 16l4-4 3 3 5-6 4 4" />
        <path d="M4 20h16" />
      </svg>
    ),
  },
]

export default function Steps() {
  return (
    <section className="steps section" id="resources">
      <div className="container">
        <Reveal as="h2" className="section-title">
          Open an Explore Markets Limited trading account in minutes
        </Reveal>
        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} as="article" className="step-card hover-lift" delay={i * 200}>
              <div className="step-num">{s.num}</div>
              <div className="step-icon" aria-hidden="true">
                {s.icon}
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
