import { Reveal } from '../hooks/useReveal'

const TOOLS = [
  {
    title: 'Economic calendar',
    desc: 'Track high-impact releases and prepare positions before volatility hits.',
  },
  {
    title: 'Sentiment meter',
    desc: 'See long/short positioning across popular instruments at a glance.',
  },
  {
    title: 'Trade analytics',
    desc: 'Review win rate, average hold time, and risk metrics after every session.',
  },
  {
    title: 'Price alerts',
    desc: 'Push and email alerts when markets reach your levels — desktop or mobile.',
  },
]

const INSIGHTS = [
  { tag: 'Strategy', title: 'How professionals size risk across correlated pairs' },
  { tag: 'Markets', title: 'What tight spreads really mean during London open' },
  { tag: 'Platform', title: 'Five chart layouts that keep decision fatigue low' },
]

export default function ToolsInsights() {
  return (
    <section className="tools-section section" id="tools">
      <div className="container">
        <Reveal as="h2" className="section-title">
          Tools & insights that <span className="gold">sharpen timing</span>
        </Reveal>

        <div className="tools-layout">
          <div className="tools-list">
            {TOOLS.map((t, i) => (
              <Reveal key={t.title} as="article" className="tool-row hover-lift" delay={i * 100}>
                <div className="tool-index">0{i + 1}</div>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="insights-panel">
            <Reveal as="h3" className="insights-heading" delay={80}>
              From the desk
            </Reveal>
            {INSIGHTS.map((item, i) => (
              <Reveal key={item.title} as="a" href="#" className="insight-card hover-lift" delay={160 + i * 120}>
                <span className="insight-tag">{item.tag}</span>
                <strong>{item.title}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
