require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/trade', require('./routes/trade'));
app.use('/trades', require('./routes/trade'));

// Error handler
app.use(require('./middleware/errorHandler'));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));