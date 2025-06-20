require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Holiday = require('./models/Holiday'); // Import model

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// GET all holidays
app.get('/api/holidays', async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.json(holidays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET holidays by country
app.get('/api/holidays/:country', async (req, res) => {
  try {
    const country = req.params.country.toLowerCase();
    const holidays = await Holiday.find({ 
      country: new RegExp(country, 'i') // Case-insensitive search
    });
    
    if (holidays.length === 0) {
      return res.status(404).json({ 
        message: "No holidays found for that country." 
      });
    }
    
    res.json(holidays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new holiday
app.post('/api/holidays', async (req, res) => {
  const { country, name, date } = req.body;
  
  if (!country || !name || !date) {
    return res.status(400).json({ 
      message: "Country, name, and date are required." 
    });
  }

  const holiday = new Holiday({ country, name, date });

  try {
    const newHoliday = await holiday.save();
    res.status(201).json(newHoliday);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
