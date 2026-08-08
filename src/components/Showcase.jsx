import { Reveal } from '../hooks/useReveal'

export default function Showcase() {
  return (
    <section className="showcase section" id="platforms">
      <div className="container">
        <Reveal as="h2" className="section-title">
          Everything is in <span className="gold">one place</span>
        </Reveal>

        <Reveal className="stats-row" delay={200}>
          <div className="stat hover-lift">
            <div className="stat-value count-up">110</div>
            <div className="stat-label">Trading instruments</div>
          </div>
          <div className="stat hover-lift">
            <div className="stat-value">SSL</div>
            <div className="stat-label">Security protection</div>
          </div>
          <div className="stat hover-lift">
            <div className="stat-value">4.8</div>
            <div className="stat-label">User rating</div>
          </div>
        </Reveal>

        <div className="device-stage">
          <Reveal className="phone-wrap" delay={100}>
            <div className="phone-mock hover-float">
              <div className="phone-notch" />
              <div className="phone-ui">
                <div className="pui-head">
                  <span>Total Balance</span>
                  <strong>$18,058.41</strong>
                </div>
                <svg className="pui-chart" viewBox="0 0 260 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="goldSoft" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C5A059" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    className="draw-line"
                    d="M0,95 C40,90 60,70 90,75 C120,80 140,40 170,45 C200,50 220,25 260,20"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="3"
                  />
                  <path
                    d="M0,95 C40,90 60,70 90,75 C120,80 140,40 170,45 C200,50 220,25 260,20 L260,120 L0,120 Z"
                    fill="url(#goldSoft)"
                  />
                </svg>
                <div className="pui-row">
                  <span>Today&apos;s P/L</span>
                  <span className="up">+$1,204.12</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="float-cards" delay={350}>
            <div className="float-card hover-lift">
              <h4>Current Trending Trading</h4>
              <div className="fc-row">
                <span>NAS100</span>
                <span className="up">+0.84%</span>
              </div>
              <div className="fc-row">
                <span>XAUUSD</span>
                <span className="up">+0.34%</span>
              </div>
              <div className="fc-row">
                <span>USDJPY</span>
                <span className="down">−0.11%</span>
              </div>
              <svg viewBox="0 0 200 50" className="fc-spark">
                <path
                  className="draw-line"
                  d="M0,40 L30,35 L60,38 L90,20 L120,25 L150,10 L200,14"
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="float-card hover-lift">
              <h4>Daily Asset Performance</h4>
              <div className="bars" aria-hidden="true">
                {[45, 70, 35, 85, 55, 92, 40, 65].map((h, i) => (
                  <i key={i} style={{ '--h': `${h}%`, '--i': i }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
