import { useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'

const STOCK_TICKERS = [
  { id: 'gold', symbol: 'XAU/USD', name: 'Gold Spot', price: '$2,748.50', change: '+1.85%', up: true, x: 14, y: 16, depth: 0.6 },
  { id: 'btc', symbol: 'BTC/USD', name: 'Bitcoin', price: '$94,280.00', change: '+5.24%', up: true, x: 86, y: 14, depth: 0.85 },
  { id: 'eur', symbol: 'EUR/USD', name: 'Euro / Dollar', price: '1.0855', change: '+0.38%', up: true, x: 10, y: 52, depth: 0.45 },
  { id: 'nvda', symbol: 'NVDA', name: 'NVIDIA Corp', price: '$128.40', change: '+4.12%', up: true, x: 88, y: 54, depth: 0.75 },
  { id: 'sp500', symbol: 'S&P 500', name: 'US Index', price: '5,890.20', change: '+0.82%', up: true, x: 18, y: 82, depth: 0.5 },
  { id: 'oil', symbol: 'WTI OIL', name: 'Crude Oil', price: '$76.40', change: '-0.65%', up: false, x: 82, y: 84, depth: 0.4 },
]

export default function HeroVisual({ mouse = { x: 0, y: 0 } }) {
  const { isDark } = useTheme()
  const isDarkRef = useRef(isDark)
  isDarkRef.current = isDark

  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const mouseRef = useRef(mouse)
  const smoothMouse = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const timeRef = useRef(0)

  mouseRef.current = mouse

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    const handleResize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Pre-generate candles data across background width
    const candleCount = 34
    const candles = Array.from({ length: candleCount }, (_, i) => {
      const isUp = (i * 7 + 3) % 4 !== 0
      return {
        open: 40 + Math.sin(i * 0.4) * 22 + (i % 3) * 4,
        close: 40 + Math.sin(i * 0.4) * 22 + (isUp ? 10 : -8),
        high: 40 + Math.sin(i * 0.4) * 22 + 16,
        low: 40 + Math.sin(i * 0.4) * 22 - 14,
        isUp,
      }
    })

    // Pre-generate network nodes
    const nodeCount = 36
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      radius: Math.random() * 2 + 1.2,
    }))

    const render = () => {
      timeRef.current += 0.012
      const dark = isDarkRef.current

      // Smooth mouse lerp
      const target = mouseRef.current
      smoothMouse.current.x += (target.x - smoothMouse.current.x) * 0.08
      smoothMouse.current.y += (target.y - smoothMouse.current.y) * 0.08

      const mx = ((smoothMouse.current.x + 1) / 2) * width
      const my = ((smoothMouse.current.y + 1) / 2) * height

      ctx.clearRect(0, 0, width, height)

      // 1. Theme-aware Vignette behind Text Center
      const textVignette = ctx.createRadialGradient(width * 0.5, height * 0.44, 40, width * 0.5, height * 0.44, 480)
      if (dark) {
        textVignette.addColorStop(0, 'rgba(9, 11, 16, 0.88)')
        textVignette.addColorStop(0.45, 'rgba(9, 11, 16, 0.65)')
        textVignette.addColorStop(1, 'rgba(9, 11, 16, 0)')
      } else {
        textVignette.addColorStop(0, 'rgba(255, 255, 255, 0.88)')
        textVignette.addColorStop(0.45, 'rgba(255, 255, 255, 0.65)')
        textVignette.addColorStop(1, 'rgba(255, 255, 255, 0)')
      }
      ctx.fillStyle = textVignette
      ctx.fillRect(0, 0, width, height)

      // 2. Grid & Price Axis Guidelines
      ctx.lineWidth = 1
      ctx.setLineDash([4, 8])
      const gridRows = 8
      const gridCols = 12

      ctx.strokeStyle = dark ? 'rgba(197, 160, 89, 0.05)' : 'rgba(197, 160, 89, 0.1)'
      for (let i = 1; i < gridRows; i++) {
        const y = (height / gridRows) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      for (let j = 1; j < gridCols; j++) {
        const x = (width / gridCols) * j
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      ctx.setLineDash([])

      // 3. Interactive Gold Stock Graph (Primary Trendline)
      ctx.beginPath()
      const mainPoints = []
      const step = width / 44
      for (let i = 0; i <= 44; i++) {
        const px = i * step
        const distToMouse = Math.hypot(px - mx, height * 0.55 - my)
        const warp = Math.max(0, 1 - distToMouse / 380) * -55

        const py =
          height * 0.52 +
          Math.sin(i * 0.18 + timeRef.current) * 45 +
          Math.cos(i * 0.32 - timeRef.current * 0.8) * 22 +
          warp

        mainPoints.push({ x: px, y: py })
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }

      // Draw Gradient Fill under Primary Line
      const grad = ctx.createLinearGradient(0, height * 0.25, 0, height)
      if (dark) {
        grad.addColorStop(0, 'rgba(197, 160, 89, 0.14)')
        grad.addColorStop(0.5, 'rgba(26, 155, 92, 0.05)')
        grad.addColorStop(1, 'rgba(9, 11, 16, 0)')
      } else {
        grad.addColorStop(0, 'rgba(197, 160, 89, 0.12)')
        grad.addColorStop(0.5, 'rgba(26, 155, 92, 0.04)')
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      }

      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()

      // Stroke Gold Trendline
      ctx.beginPath()
      mainPoints.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      })
      ctx.strokeStyle = dark ? '#c5a059' : '#b8860b'
      ctx.lineWidth = 2.5
      ctx.shadowColor = dark ? 'rgba(197, 160, 89, 0.6)' : 'rgba(184, 134, 11, 0.3)'
      ctx.shadowBlur = dark ? 12 : 6
      ctx.stroke()
      ctx.shadowBlur = 0

      // 4. Secondary Trendline (Bullish Emerald Green)
      ctx.beginPath()
      for (let i = 0; i <= 36; i++) {
        const px = (width / 36) * i
        const distToMouse = Math.hypot(px - mx, height * 0.62 - my)
        const warp = Math.max(0, 1 - distToMouse / 320) * 35
        const py =
          height * 0.64 +
          Math.cos(i * 0.25 + timeRef.current * 1.1) * 36 +
          Math.sin(i * 0.14 - timeRef.current) * 18 +
          warp
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.strokeStyle = dark ? 'rgba(26, 155, 92, 0.4)' : 'rgba(26, 155, 92, 0.5)'
      ctx.lineWidth = 1.8
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])

      // 5. Draw Candlesticks Layer with Center Opacity Fade (so text remains crisp)
      const candleWidth = Math.max(5, width / (candleCount * 2.4))
      const candleGap = width / candleCount
      candles.forEach((c, idx) => {
        const cx = candleGap * idx + candleGap * 0.5
        const dist = Math.hypot(cx - mx, height * 0.72 - my)
        const isHovered = dist < 160

        // Calculate distance from center X to smoothly reduce candle intensity under hero text
        const normDistFromCenter = Math.abs(cx - width * 0.5) / (width * 0.5)
        const centerFadeAlpha = Math.min(1, Math.max(dark ? 0.22 : 0.35, Math.pow(normDistFromCenter, 1.4)))

        const baseY = height * 0.74
        const openY = baseY - c.open * (height * 0.0035)
        const closeY = baseY - c.close * (height * 0.0035)
        const highY = baseY - c.high * (height * 0.0035)
        const lowY = baseY - c.low * (height * 0.0035)

        const color = c.isUp ? (dark ? '#1a9b5c' : '#14804b') : (dark ? '#d64545' : '#c0392b')

        ctx.save()
        ctx.globalAlpha = isHovered ? 1 : centerFadeAlpha

        // Wick
        ctx.beginPath()
        ctx.moveTo(cx, highY)
        ctx.lineTo(cx, lowY)
        ctx.strokeStyle = isHovered ? (c.isUp ? '#00ff88' : '#ff4444') : color
        ctx.lineWidth = isHovered ? 2 : 1
        ctx.stroke()

        // Body
        ctx.fillStyle = isHovered ? (c.isUp ? '#00ff88' : '#ff4444') : color
        const topY = Math.min(openY, closeY)
        const bodyH = Math.max(4, Math.abs(closeY - openY))
        ctx.fillRect(cx - candleWidth / 2, topY, candleWidth, bodyH)

        if (isHovered) {
          ctx.beginPath()
          ctx.arc(cx, topY, 3.5, 0, Math.PI * 2)
          ctx.fillStyle = dark ? '#ffffff' : '#0d0d0d'
          ctx.fill()
        }

        ctx.restore()
      })

      // 6. Interconnected Network Nodes
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > 1) n.vx *= -1
        if (n.y < 0 || n.y > 1) n.vy *= -1

        const nx = n.x * width
        const ny = n.y * height
        const dist = Math.hypot(nx - mx, ny - my)

        ctx.beginPath()
        ctx.arc(nx, ny, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = dist < 180
          ? (dark ? 'rgba(240, 215, 140, 0.85)' : 'rgba(184, 134, 11, 0.85)')
          : (dark ? 'rgba(197, 160, 89, 0.22)' : 'rgba(184, 134, 11, 0.35)')
        ctx.fill()

        if (dist < 180) {
          ctx.beginPath()
          ctx.moveTo(nx, ny)
          ctx.lineTo(mx, my)
          const opacity = (1 - dist / 180) * 0.32
          ctx.strokeStyle = dark ? `rgba(197, 160, 89, ${opacity})` : `rgba(184, 134, 11, ${opacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      // 7. Interactive Mouse Crosshair HUD & Dynamic Price Badge
      if (mx > 0 && mx < width && my > 0 && my < height) {
        ctx.setLineDash([3, 4])
        ctx.strokeStyle = dark ? 'rgba(197, 160, 89, 0.35)' : 'rgba(184, 134, 11, 0.45)'
        ctx.lineWidth = 1

        // Vertical laser line
        ctx.beginPath()
        ctx.moveTo(mx, 0)
        ctx.lineTo(mx, height)
        ctx.stroke()

        // Horizontal laser line
        ctx.beginPath()
        ctx.moveTo(0, my)
        ctx.lineTo(width, my)
        ctx.stroke()
        ctx.setLineDash([])

        // Target Ring
        ctx.beginPath()
        ctx.arc(mx, my, 8, 0, Math.PI * 2)
        ctx.strokeStyle = dark ? '#f0d78c' : '#b8860b'
        ctx.lineWidth = 1.8
        ctx.shadowColor = dark ? '#c5a059' : '#b8860b'
        ctx.shadowBlur = dark ? 8 : 4
        ctx.stroke()
        ctx.shadowBlur = 0

        // Ripple Effect
        const ripple = (timeRef.current * 45) % 55
        ctx.beginPath()
        ctx.arc(mx, my, 8 + ripple, 0, Math.PI * 2)
        ctx.strokeStyle = dark
          ? `rgba(197, 160, 89, ${Math.max(0, 0.5 - ripple / 55)})`
          : `rgba(184, 134, 11, ${Math.max(0, 0.5 - ripple / 55)})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Floating HUD Price Box
        const calculatedPrice = (4800 + (1 - my / height) * 250).toFixed(2)
        const hudText = `ORDER #8492 · $${calculatedPrice}  ▲ +2.45%`
        ctx.font = '600 11px system-ui, -apple-system, sans-serif'
        const textWidth = ctx.measureText(hudText).width

        const boxX = Math.min(mx + 16, width - textWidth - 28)
        const boxY = Math.max(my - 28, 20)

        ctx.fillStyle = dark ? 'rgba(11, 14, 20, 0.94)' : 'rgba(255, 255, 255, 0.95)'
        ctx.strokeStyle = dark ? 'rgba(197, 160, 89, 0.45)' : 'rgba(197, 160, 89, 0.4)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(boxX, boxY, textWidth + 18, 24, 6)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = dark ? '#f0d78c' : '#0f172a'
        ctx.fillText(hudText, boxX + 9, boxY + 16)
      }

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const px = smoothMouse.current.x || mouse.x
  const py = smoothMouse.current.y || mouse.y

  return (
    <div className="hero-stock-bg" ref={containerRef} aria-hidden="true">
      {/* Dynamic Background Glow */}
      <div
        className="hero-stock-glow"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 70% 60% at ${50 + px * 25}% ${50 + py * 25}%, rgba(197, 160, 89, 0.16), transparent 70%)`
            : `radial-gradient(ellipse 70% 60% at ${50 + px * 25}% ${50 + py * 25}%, rgba(197, 160, 89, 0.12), transparent 70%)`,
        }}
      />

      {/* HTML5 Canvas interactive stock market render */}
      <canvas ref={canvasRef} className="hero-stock-canvas" />

      {/* Floating Stock Chips Layer */}
      <div className="hero-stock-chips">
        {STOCK_TICKERS.map((chip) => {
          const ox = px * 32 * chip.depth
          const oy = py * 22 * chip.depth
          return (
            <div
              key={chip.id}
              className={`stock-chip stock-chip--${chip.up ? 'up' : 'down'}`}
              style={{
                left: `${chip.x}%`,
                top: `${chip.y}%`,
                transform: `translate3d(calc(-50% + ${ox}px), calc(-50% + ${oy}px), 0)`,
              }}
            >
              <div className="stock-chip__header">
                <span className="stock-chip__symbol">{chip.symbol}</span>
                <span className={`stock-chip__change ${chip.up ? 'up' : 'down'}`}>
                  {chip.change}
                </span>
              </div>
              <div className="stock-chip__price">{chip.price}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
