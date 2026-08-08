import { useEffect, useState } from 'react'

const INITIAL = [
  { pair: 'EUR/USD', price: 1.0842, change: 0.12, spark: 'M0,20 L12,16 L24,18 L36,10 L48,14 L60,6 L80,8' },
  { pair: 'GBP/USD', price: 1.2631, change: -0.08, spark: 'M0,8 L12,12 L24,10 L36,16 L48,14 L60,20 L80,18' },
  { pair: 'XAU/USD', price: 2341.8, change: 0.34, spark: 'M0,18 L12,14 L24,16 L36,8 L48,10 L60,4 L80,6' },
  { pair: 'BTC/USD', price: 67420, change: 1.42, spark: 'M0,22 L12,18 L24,20 L36,12 L48,8 L60,10 L80,4' },
]

export function useTickers() {
  const [tickers, setTickers] = useState(INITIAL)

  useEffect(() => {
    const id = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          const delta = t.price * (Math.random() * 0.0008 - 0.0004)
          const next = t.price + delta
          const changeDelta = Math.random() * 0.04 - 0.02
          return {
            ...t,
            price: next,
            change: +(t.change + changeDelta).toFixed(2),
          }
        }),
      )
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return tickers
}

export function formatPrice(price) {
  const decimals = price >= 100 ? 2 : 4
  return price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
