
const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');
const auth = require('../middleware/auth');
const marketService = require('../services/marketService');

// Create Trade (local DB)
router.post('/', auth, async (req, res, next) => {
  try {
    const { stockId, quantity, targetProfit, stopLoss } = req.body;
    const trade = await Trade.create({
      user: req.userId,
      stockId,
      quantity,
      targetProfit,
      stopLoss,
      currentPrice: 0,
      status: 'active'
    });
    res.json(trade);
  } catch (err) {
    next(err);
  }
});

// Get historical minute bars for a symbol from Alpaca
router.get('/alpaca/market/:symbol', auth, async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const limit = req.query.limit || 30;
    const axios = require('axios');
    const url = `https://data.alpaca.markets/v1/bars/minute?symbols=${symbol}&limit=${limit}`;
    let response;
    try {
      response = await axios.get(url, {
        headers: {
          'APCA-API-KEY-ID': process.env.BROKER_API_KEY,
          'APCA-API-SECRET-KEY': process.env.BROKER_SECRET
        }
      });
    } catch (alpacaErr) {
      console.error('Alpaca API error:', alpacaErr.response ? alpacaErr.response.data : alpacaErr.message);
      return res.status(alpacaErr.response?.status || 500).json({
        error: 'Alpaca API error',
        details: alpacaErr.response ? alpacaErr.response.data : alpacaErr.message
      });
    }
    res.json(response.data);
  } catch (err) {
    console.error('Route error:', err);
    next(err);
  }
});

// Get real-time price for a symbol
router.get('/price/:symbol', auth, async (req, res, next) => {
  try {
    const price = await marketService.getLivePrice(req.params.symbol);
    res.json({ symbol: req.params.symbol, price });
  } catch (err) {
    next(err);
  }
});

// Place a live buy/sell order using Alpaca
router.post('/order', auth, async (req, res, next) => {
  try {
    const { symbol, qty, side, type, time_in_force } = req.body;
    const order = await marketService.placeOrder({ symbol, qty, side, type, time_in_force });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Get Active Trades (local DB)
router.get('/', auth, async (req, res, next) => {
  try {
    const trades = await Trade.find({ user: req.userId, status: 'active' });
    res.json(trades);
  } catch (err) {
    next(err);
  }
});

// Sell Trade (local DB)
router.post('/sell', auth, async (req, res, next) => {
  try {
    const { stockId, quantity } = req.body;
    const trade = await Trade.findOne({ user: req.userId, stockId, status: 'active' });
    if (!trade) return res.status(404).json({ error: 'Trade not found' });
    trade.status = 'sold';
    trade.updatedAt = Date.now();
    await trade.save();
    res.json(trade);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
