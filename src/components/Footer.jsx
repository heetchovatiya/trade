import Logo from './Logo'

const COLS = [
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Markets',
    links: ['Forex', 'Commodities', 'Indices', 'Crypto CFDs'],
  },
  {
    title: 'Trading',
    links: ['Account Types', 'Spreads & Fees', 'Copy Trading', 'Education'],
  }
]

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-top">
          <Logo variant="dark" />
          <div className="socials" aria-label="Social links">
            {['f', '𝕏', 'in', '◎'].map((s) => (
              <a key={s} href="#" aria-label="Social">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-cols">
          {COLS.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <a key={l} href="#">
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="disclaimer">
          <p>
            Trading CFDs and leveraged products involves significant risk of loss and may not be
            suitable for all investors. Past performance is not indicative of future results. Explore
            Markets Limited does not provide investment advice. Please ensure you fully understand
            the risks involved and seek independent advice if necessary. This website is for
            informational purposes only and does not constitute an offer or solicitation in any
            jurisdiction where such activity is restricted. Clients are responsible for ensuring that
            their use of our services complies with local laws.
          </p>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Explore Markets Limited. All rights reserved.</span>
          <span>Risk warning · Privacy · Terms</span>
        </div>
      </div>
    </footer>
  )
}
