import { useEffect, useState } from 'react'

const INITIAL = [
  { pair: 'EUR/USD', price: 1.1552, change: 0.23, name: 'Euro / US Dollar', symbol: '€', color: '#2563eb', bgColor: 'rgba(37, 99, 235, 0.1)' },
  { pair: 'GBP/USD', price: 1.3476, change: -0.59, name: 'Pound / US Dollar', symbol: '£', color: '#7c3aed', bgColor: 'rgba(124, 58, 237, 0.1)' },
  { pair: 'XAU/USD', price: 4338.78, change: 0.64, name: 'Gold Spot / USD', symbol: 'Au', color: '#d97706', bgColor: 'rgba(217, 119, 6, 0.1)' },
  { pair: 'BTC/USD', price: 65010.00, change: 0.22, name: 'Bitcoin / USD', symbol: '₿', color: '#ea580c', bgColor: 'rgba(234, 88, 12, 0.1)' },
]

export function useTickers() {
  const [tickers, setTickers] = useState(INITIAL)

  useEffect(() => {
    async function fetchLiveRates() {
      try {
        // 1. Fetch Forex rates from ExchangeRate API (CORS-friendly, no key required)
        const forexRes = await fetch('https://open.er-api.com/v6/latest/USD')
        const forexData = await forexRes.json()
        
        // 2. Fetch Binance tickers (CORS-friendly, no key required)
        const [btcRes, xauRes, eurRes, gbpRes] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=PAXGUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=EURUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=GBPUSDT'),
        ])
        
        const btcData = await btcRes.json()
        const xauData = await xauRes.json()
        const eurData = await eurRes.json()
        const gbpData = await gbpRes.json()

        const eurRate = 1 / forexData.rates.EUR
        const gbpRate = 1 / forexData.rates.GBP

        setTickers([
          {
            pair: 'EUR/USD',
            price: eurRate,
            change: parseFloat(eurData.priceChangePercent) || 0.23,
            name: 'Euro / US Dollar',
            symbol: '€',
            color: '#2563eb',
            bgColor: 'rgba(37, 99, 235, 0.12)'
          },
          {
            pair: 'GBP/USD',
            price: gbpRate,
            change: parseFloat(gbpData.priceChangePercent) || -0.59,
            name: 'Pound / US Dollar',
            symbol: '£',
            color: '#7c3aed',
            bgColor: 'rgba(124, 58, 237, 0.12)'
          },
          {
            pair: 'XAU/USD',
            price: parseFloat(xauData.lastPrice) || 4338.78,
            change: parseFloat(xauData.priceChangePercent) || 0.64,
            name: 'Gold Spot / USD',
            symbol: 'Au',
            color: '#d97706',
            bgColor: 'rgba(217, 119, 6, 0.12)'
          },
          {
            pair: 'BTC/USD',
            price: parseFloat(btcData.lastPrice) || 65010.00,
            change: parseFloat(btcData.priceChangePercent) || 0.22,
            name: 'Bitcoin / USD',
            symbol: '₿',
            color: '#ea580c',
            bgColor: 'rgba(234, 88, 12, 0.12)'
          }
        ])
      } catch (err) {
        console.error('Error fetching live rates:', err)
        // Fallback: update local price with tiny simulation ticks to keep it dynamic if APIs fail
        setTickers((prev) =>
          prev.map((t) => {
            const delta = t.price * (Math.random() * 0.0002 - 0.0001)
            return {
              ...t,
              price: t.price + delta,
            }
          })
        )
      }
    }

    fetchLiveRates()
    const id = setInterval(fetchLiveRates, 8000) // update every 8 seconds
    return () => clearInterval(id)
  }, [])

  return tickers
}

export function formatPrice(price, pair) {
  const decimals = (pair === 'BTC/USD' || pair === 'XAU/USD') ? 2 : 4
  return price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
