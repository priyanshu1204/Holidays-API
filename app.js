require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Holiday = require('./models/Holiday');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get('/api/holidays', async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.json(holidays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/holidays/:country', async (req, res) => {
  try {
    const country = req.params.country.toLowerCase();
    const holidays = await Holiday.find({ 
      country: new RegExp(country, 'i') 
    });
    holidays.length ? res.json(holidays) : res.status(404).json({ message: "No holidays found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/holidays', async (req, res) => {
  const { country, name, date } = req.body;
  if (!country || !name || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const holiday = new Holiday({ country, name, date });
    const newHoliday = await holiday.save();
    res.status(201).json(newHoliday);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/holidays/:id', async (req, res) => {
  try {
    const updatedHoliday = await Holiday.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    updatedHoliday ? res.json(updatedHoliday) : res.status(404).json({ message: 'Holiday not found' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/holidays/:id', async (req, res) => {
  try {
    const deletedHoliday = await Holiday.findByIdAndDelete(req.params.id);
    deletedHoliday ? res.json({ message: 'Holiday deleted' }) : res.status(404).json({ message: 'Holiday not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
