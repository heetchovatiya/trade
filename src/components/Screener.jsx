import { useEffect, useState, useMemo } from 'react'
import { Reveal } from '../hooks/useReveal'

const TABS = ['All', 'Forex', 'Crypto', 'Indices', 'Metals', 'Commodities']

const INITIAL_INSTRUMENTS = [
  {
    id: 'eurusd',
    symbol: 'EUR/USD',
    name: 'Euro vs U.S. Dollar',
    category: 'Forex',
    price: 1.1552,
    change: 0.28,
    spread: '0.1 pips',
    badge: 'EUR',
    color: '#2563eb',
    bgColor: 'rgba(37, 99, 235, 0.1)'
  },
  {
    id: 'gbpusd',
    symbol: 'GBP/USD',
    name: 'Great Britain Pound vs U.S. Dollar',
    category: 'Forex',
    price: 1.3476,
    change: 0.45,
    spread: '0.2 pips',
    badge: 'GBP',
    color: '#7c3aed',
    bgColor: 'rgba(124, 58, 237, 0.1)'
  },
  {
    id: 'us500',
    symbol: 'US500',
    name: 'S&P 500 Index (US Benchmark)',
    category: 'Indices',
    price: 5542.10,
    change: 0.64,
    spread: '0.4 pips',
    badge: 'US5',
    color: '#d97706',
    bgColor: 'rgba(217, 119, 6, 0.1)'
  },
  {
    id: 'gold',
    symbol: 'GOLD',
    name: 'Gold Spot (XAUUSD)',
    category: 'Metals',
    price: 4338.86,
    change: 0.66,
    spread: '0.8 pips',
    badge: 'GOL',
    color: '#b45309',
    bgColor: 'rgba(180, 83, 9, 0.1)'
  },
  {
    id: 'oil',
    symbol: 'OIL',
    name: 'US WTI Crude Oil',
    category: 'Commodities',
    price: 78.45,
    change: -0.82,
    spread: '0.03 pips',
    badge: 'OIL',
    color: '#854d0e',
    bgColor: 'rgba(133, 77, 14, 0.1)'
  },
  {
    id: 'apple',
    symbol: 'Apple',
    name: 'Apple Inc. (AAPL) Stock CFD',
    category: 'Stocks',
    price: 224.20,
    change: 1.85,
    spread: '0.02 pips',
    badge: 'App',
    color: '#16a34a',
    bgColor: 'rgba(22, 163, 74, 0.1)'
  },
  {
    id: 'btcusd',
    symbol: 'BTC/USD',
    name: 'Bitcoin Spot',
    category: 'Crypto',
    price: 65010.04,
    change: 0.18,
    spread: '5 pips',
    badge: 'BTC',
    color: '#ea580c',
    bgColor: 'rgba(234, 88, 12, 0.1)'
  }
]

// Custom formatter for screener symbols
function formatScreenerPrice(price) {
  // If price is large (e.g. >= 10), format with 2 decimals. For Forex, format with 4 decimals.
  const decimals = price >= 10 ? 2 : 4
  return price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

// Generate deterministic historical points ending exactly at current price
function getChartPointsForInterval(currentPrice, interval, id) {
  const count = 30
  const points = []
  
  // Seed based on symbol id and interval to make it stable when toggling tabs
  let seed = 0
  for (let i = 0; i < id.length; i++) seed += id.charCodeAt(i)
  for (let i = 0; i < interval.length; i++) seed += interval.charCodeAt(i)

  const random = () => {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }

  // Define trend direction based on interval
  let trend = 0
  if (interval === '1M') trend = 0.001
  else if (interval === '5M') trend = -0.002
  else if (interval === '1H') trend = 0.004
  else if (interval === '1D') trend = 0.012
  else if (interval === '1W') trend = -0.025

  let price = currentPrice
  // Walk backwards from currentPrice
  for (let i = 0; i < count; i++) {
    points.unshift(price)
    // Add small price fluctuations
    const change = price * (random() * 0.008 - 0.004 + trend / count)
    price = price - change
  }
  
  return points
}

export default function Screener({ onOpenSignup }) {
  const [instruments, setInstruments] = useState(INITIAL_INSTRUMENTS)
  const [selectedTab, setSelectedTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState('gold')
  const [chartInterval, setChartInterval] = useState('1H')
  const [showMA, setShowMA] = useState(true)

  // Live Data fetching from APIs and local ticks
  useEffect(() => {
    async function fetchLiveScreener() {
      try {
        const forexRes = await fetch('https://open.er-api.com/v6/latest/USD')
        const forexData = await forexRes.json()

        const [btcRes, xauRes, eurRes, gbpRes] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=PAXGUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=EURUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=GBPUSDT')
        ])

        const btcData = await btcRes.json()
        const xauData = await xauRes.json()
        const eurData = await eurRes.json()
        const gbpData = await gbpRes.json()

        const eurRate = 1 / forexData.rates.EUR
        const gbpRate = 1 / forexData.rates.GBP

        setInstruments((prev) =>
          prev.map((inst) => {
            let nextPrice = inst.price
            let nextChange = inst.change

            if (inst.id === 'eurusd') {
              nextPrice = eurRate
              nextChange = parseFloat(eurData.priceChangePercent) || 0.28
            } else if (inst.id === 'gbpusd') {
              nextPrice = gbpRate
              nextChange = parseFloat(gbpData.priceChangePercent) || 0.45
            } else if (inst.id === 'gold') {
              nextPrice = parseFloat(xauData.lastPrice) || 4338.86
              nextChange = parseFloat(xauData.priceChangePercent) || 0.66
            } else if (inst.id === 'btcusd') {
              nextPrice = parseFloat(btcData.lastPrice) || 65010.04
              nextChange = parseFloat(btcData.priceChangePercent) || 0.18
            } else {
              // Simulated live tick updates for non-crypto/non-forex items (Stocks, Commodities, Indices)
              const tick = inst.price * (Math.random() * 0.0006 - 0.0003)
              nextPrice = inst.price + tick
              const changeTick = Math.random() * 0.02 - 0.01
              nextChange = +(inst.change + changeTick).toFixed(2)
            }

            return {
              ...inst,
              price: nextPrice,
              change: nextChange
            }
          })
        )
      } catch (err) {
        console.error('Screener fetch error:', err)
        // Simulation ticks fallback
        setInstruments((prev) =>
          prev.map((inst) => {
            const tick = inst.price * (Math.random() * 0.0004 - 0.0002)
            return {
              ...inst,
              price: inst.price + tick
            }
          })
        )
      }
    }

    fetchLiveScreener()
    const id = setInterval(fetchLiveScreener, 6000) // Poll every 6 seconds for high response
    return () => clearInterval(id)
  }, [])

  // Filter & Search logic
  const filteredInstruments = useMemo(() => {
    return instruments.filter((inst) => {
      const matchTab =
        selectedTab === 'All' ||
        inst.category.toLowerCase() === selectedTab.toLowerCase() ||
        (selectedTab === 'Commodities' && inst.category === 'Stocks')
      const matchQuery =
        inst.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchTab && matchQuery
    })
  }, [instruments, selectedTab, searchQuery])

  // Get current selected instrument details
  const selectedInstrument = useMemo(() => {
    return instruments.find((i) => i.id === selectedId) || instruments[3] // Fallback to Gold
  }, [instruments, selectedId])

  // Calculate Buyer / Seller sentiment from live change percentage
  const sentiment = useMemo(() => {
    const change = selectedInstrument.change
    const buyerPercent = Math.min(90, Math.max(30, Math.round(50 + change * 12)))
    const sellerPercent = 100 - buyerPercent
    return { buyers: buyerPercent, sellers: sellerPercent }
  }, [selectedInstrument])

  // Generate wiggling live points ending exactly at the selected instrument's price
  const chartPoints = useMemo(() => {
    return getChartPointsForInterval(selectedInstrument.price, chartInterval, selectedInstrument.id)
  }, [selectedInstrument.price, chartInterval, selectedInstrument.id])

  // Generate SVG Chart Path & Moving Average Path
  const chartPaths = useMemo(() => {
    const points = chartPoints
    if (points.length < 2) return { line: '', area: '', ma: '' }

    const width = 340
    const height = 180
    const padding = 15

    const min = Math.min(...points)
    const max = Math.max(...points)
    const range = max - min || 1

    const getX = (index) => padding + (index / (points.length - 1)) * (width - 2 * padding)
    const getY = (val) => height - padding - ((val - min) / range) * (height - 2 * padding)

    let linePath = `M ${getX(0)} ${getY(points[0])}`

    // Curved line interpolation
    for (let i = 0; i < points.length - 1; i++) {
      const x1 = getX(i)
      const y1 = getY(points[i])
      const x2 = getX(i + 1)
      const y2 = getY(points[i + 1])
      const cx = (x1 + x2) / 2
      linePath += ` C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`
    }

    const areaPath = linePath + ` L ${getX(points.length - 1)} ${height} L ${getX(0)} ${height} Z`

    // Render simple MA line path with lag
    let maPath = ''
    if (showMA) {
      const maPoints = points.map((val, idx) => {
        const sub = points.slice(Math.max(0, idx - 4), idx + 1)
        return sub.reduce((sum, v) => sum + v, 0) / sub.length
      })
      maPath = `M ${getX(0)} ${getY(maPoints[0])}`
      for (let i = 0; i < maPoints.length - 1; i++) {
        const x1 = getX(i)
        const y1 = getY(maPoints[i])
        const x2 = getX(i + 1)
        const y2 = getY(maPoints[i + 1])
        const cx = (x1 + x2) / 2
        maPath += ` C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`
      }
    }

    return { line: linePath, area: areaPath, ma: maPath }
  }, [chartPoints, showMA])

  // Get coordinates for indicator node
  const nodeCoords = useMemo(() => {
    const points = chartPoints
    if (points.length === 0) return { cx: 325, cy: 90 }
    const min = Math.min(...points)
    const max = Math.max(...points)
    const range = max - min || 1
    const lastVal = points[points.length - 1]
    const cx = 340 - 15
    const cy = 180 - 15 - ((lastVal - min) / range) * (180 - 30)
    return { cx, cy }
  }, [chartPoints])

  return (
    <section className="screener-section section" id="screener">
      <div className="container">
        <Reveal as="span" className="screener-subtitle">
          — REAL-TIME FINANCIAL SCREENER —
        </Reveal>

        <Reveal as="h2" className="screener-title">
          Trade <span className="gold">1,500+ Multi-Asset CFDs</span>
        </Reveal>

        <Reveal as="p" className="screener-lead" delay={120}>
          Analyze live order book depth, execution spreads, and real-time interactive technical charts.
        </Reveal>

        <div className="screener-layout">
          {/* Left Table Panel */}
          <Reveal className="screener-table-card" delay={200}>
            <div className="screener-header-controls">
              <div className="screener-tabs-wrapper">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`screener-tab-btn ${selectedTab === tab ? 'active' : ''}`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="screener-search-wrapper">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="search-icon"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search symbol..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="screener-search-input"
                />
              </div>
            </div>

            <div className="screener-table-scroll">
              <table className="screener-table">
                <thead>
                  <tr>
                    <th>INSTRUMENT</th>
                    <th className="text-right">LIVE PRICE</th>
                    <th className="text-right">24H %</th>
                    <th className="text-right">SPREAD</th>
                    <th className="text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstruments.map((inst) => {
                    const up = inst.change >= 0
                    const isSelected = selectedId === inst.id
                    return (
                      <tr
                        key={inst.id}
                        onClick={() => setSelectedId(inst.id)}
                        className={`screener-row ${isSelected ? 'screener-row--selected' : ''}`}
                      >
                        <td>
                          <div className="screener-symbol-cell">
                            <span
                              className="screener-symbol-badge"
                              style={{
                                backgroundColor: inst.bgColor,
                                color: inst.color
                              }}
                            >
                              {inst.badge}
                            </span>
                            <div className="screener-symbol-info">
                              <div className="screener-symbol-name">{inst.symbol}</div>
                              <div className="screener-symbol-full">{inst.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right font-mono font-bold">
                          {formatScreenerPrice(inst.price)}
                        </td>
                        <td className="text-right">
                          <span className={`screener-change-tag ${up ? 'up' : 'down'}`}>
                            {up ? '↗' : '↘'} {Math.abs(inst.change).toFixed(2)}%
                          </span>
                        </td>
                        <td className="text-right font-mono text-muted">
                          {inst.spread}
                        </td>
                        <td className="text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="screener-trade-btn"
                            onClick={onOpenSignup}
                          >
                            Trade
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                  {filteredInstruments.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted" style={{ padding: '40px 0' }}>
                        No instruments match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Right Technical Chart Panel */}
          <Reveal className="screener-chart-card" delay={350}>
            {/* Header info */}
            <div className="chart-header-block">
              <div className="chart-header-symbol">
                <span
                  className="chart-symbol-badge"
                  style={{
                    backgroundColor: selectedInstrument.bgColor,
                    color: selectedInstrument.color
                  }}
                >
                  {selectedInstrument.badge}
                </span>
                <div className="chart-symbol-text">
                  <h3>{selectedInstrument.symbol} Technical Chart</h3>
                  <span>{selectedInstrument.name}</span>
                </div>
              </div>
              <div className="chart-header-price">
                <div className="chart-live-price">
                  {formatScreenerPrice(selectedInstrument.price)}
                </div>
                <div className={`chart-change ${selectedInstrument.change >= 0 ? 'up' : 'down'}`}>
                  {selectedInstrument.change >= 0 ? '+' : ''}
                  {selectedInstrument.change.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Interval Filters Controls */}
            <div className="chart-controls">
              <div className="chart-intervals">
                {['1M', '5M', '1H', '1D', '1W'].map((interval) => (
                  <button
                    key={interval}
                    type="button"
                    className={`chart-interval-btn ${chartInterval === interval ? 'active' : ''}`}
                    onClick={() => setChartInterval(interval)}
                  >
                    {interval}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={`chart-indicator-btn ${showMA ? 'active' : ''}`}
                onClick={() => setShowMA(!showMA)}
              >
                MA 50
              </button>
            </div>

            {/* Sparkline Canvas Area */}
            <div className="chart-canvas-wrapper" aria-label="Interactive chart visualization">
              <svg viewBox="0 0 340 180" className="chart-svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C5A059" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines background */}
                <line x1="15" y1="15" x2="325" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="15" y1="60" x2="325" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="15" y1="105" x2="325" y2="105" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="15" y1="150" x2="325" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* Shaded gradient path */}
                {chartPaths.area && (
                  <path d={chartPaths.area} fill="url(#chartGrad)" />
                )}

                {/* Secondary dashed indicator line (MA) */}
                {showMA && chartPaths.ma && (
                  <path
                    d={chartPaths.ma}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.28)"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                )}

                {/* Main curve line */}
                {chartPaths.line && (
                  <path
                    d={chartPaths.line}
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="2.5"
                    className="chart-stroke-path"
                  />
                )}

                {/* Pulsing indicator node on the last point */}
                <circle
                  cx={nodeCoords.cx}
                  cy={nodeCoords.cy}
                  r="4.5"
                  fill="var(--gold)"
                  className="chart-pulse-node"
                />
              </svg>
            </div>

            {/* Buyer vs Seller Sentiment */}
            <div className="chart-sentiment-container">
              <div className="sentiment-labels">
                <span className="sentiment-buyers">Buyers ({sentiment.buyers}%)</span>
                <span className="sentiment-sellers">Sellers ({sentiment.sellers}%)</span>
              </div>
              <div className="sentiment-bar">
                <div
                  className="sentiment-fill-buyers"
                  style={{ width: `${sentiment.buyers}%` }}
                ></div>
                <div
                  className="sentiment-fill-sellers"
                  style={{ width: `${sentiment.sellers}%` }}
                ></div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="chart-cta-buttons">
              <button
                type="button"
                className="chart-btn-sell"
                onClick={onOpenSignup}
              >
                SELL {selectedInstrument.symbol.split('/')[0]}
              </button>
              <button
                type="button"
                className="chart-btn-buy"
                onClick={onOpenSignup}
              >
                BUY {selectedInstrument.symbol.split('/')[0]}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
