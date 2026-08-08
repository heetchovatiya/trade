import { Reveal } from '../hooks/useReveal'

export default function Support() {
  return (
    <section className="support section-dark">
      <div className="container">
        <Reveal className="support-banner hover-lift">
          <div className="support-copy">
            <h2>
              Expert help in <span className="gold">6 languages.</span>
            </h2>
            <p>Speak with specialists who understand markets — any time you need them.</p>
            <a href="#contact" className="btn btn-light">
              Chat with Support
            </a>
          </div>
          <div className="headset" aria-hidden="true">
            <svg viewBox="0 0 80 80" fill="none">
              <rect
                x="8"
                y="8"
                width="64"
                height="64"
                rx="14"
                stroke="#C5A059"
                strokeWidth="2"
                opacity="0.5"
              />
              <path d="M22 42v-6a18 18 0 0 1 36 0v6" stroke="#C5A059" strokeWidth="2.5" />
              <rect x="16" y="40" width="12" height="18" rx="4" fill="#C5A059" />
              <rect x="52" y="40" width="12" height="18" rx="4" fill="#C5A059" />
              <path
                d="M58 58c0 6-5 10-12 10h-6"
                stroke="#C5A059"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
