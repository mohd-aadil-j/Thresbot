const axios = require('axios');

const ALPACA_KEY = process.env.BROKER_API_KEY;
const ALPACA_SECRET = process.env.BROKER_SECRET;
const ALPHA_KEY = process.env.MARKET_API_KEY;
const PROVIDER = process.env.MARKET_API || 'mock';

// Fetch live price for a symbol
async function getLivePrice(symbol) {
  if (PROVIDER === 'mock') {
    const base = symbol.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const variation = (Date.now() / 60000) % 1;
    return Number(((base % 100) + 50 + variation).toFixed(2));
  }
  if (PROVIDER === 'alpha') {
    // Alpha Vantage API
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_KEY}`;
    const res = await axios.get(url);
    const price = res.data["Global Quote"]?.["05. price"];
    return price ? Number(price) : null;
  }
  if (PROVIDER === 'alpaca') {
    // Alpaca API
    const url = `https://data.alpaca.markets/v1/last/stocks/${symbol}`;
    const res = await axios.get(url, {
      headers: {
        'APCA-API-KEY-ID': ALPACA_KEY,
        'APCA-API-SECRET-KEY': ALPACA_SECRET
      }
    });
    const price = res.data?.last?.price;
    return price ? Number(price) : null;
  }
  // fallback
  const base = symbol.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return Number(((base % 100) + 60).toFixed(2));
}

// Place a buy/sell order using Alpaca
async function placeOrder({ symbol, qty, side, type = 'market', time_in_force = 'gtc' }) {
  if (PROVIDER !== 'alpaca') throw new Error('Live trading only supported with Alpaca');
  const url = 'https://paper-api.alpaca.markets/v2/orders';
  const res = await axios.post(url, {
    symbol,
    qty,
    side,
    type,
    time_in_force
  }, {
    headers: {
      'APCA-API-KEY-ID': ALPACA_KEY,
      'APCA-API-SECRET-KEY': ALPACA_SECRET,
      'Content-Type': 'application/json'
    }
  });
  return res.data;
}

module.exports = { getLivePrice, placeOrder };
