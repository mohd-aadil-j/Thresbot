const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stockId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  targetProfit: { type: Number, required: true, min: 0 },
  stopLoss: { type: Number, required: true, min: 0 },
  currentPrice: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'sold', 'closed'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
