require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
   app.listen(PORT, '0.0.0.0', () => console.log(`API running on port ${PORT}`));

  })
  .catch(err => console.error('MongoDB connection error:', err));
