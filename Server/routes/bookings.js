const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');
const auth = require('../middleware/auth');

// Create a booking
router.post('/', auth, async (req, res) => {
	try {
		const { equipment, date, timeSlot } = req.body;
		const booking = new Booking({
			equipment,
			user: req.user._id,
			date,
			timeSlot,
		});
		await booking.save();
		res.status(201).json(booking);
	} catch (err) {
		res.status(400).json({ message: 'Booking failed', error: err.message });
	}
});

// Get bookings for a user
router.get('/', auth, async (req, res) => {
	try {
		const userId = req.query.userId || req.user._id;
		const bookings = await Booking.find({ user: userId })
			.populate('equipment', 'name description status');
		res.json(bookings.map(b => ({
			_id: b._id,
			equipment: b.equipment._id,
			equipmentName: b.equipment.name,
			date: b.date,
			timeSlot: b.timeSlot,
			status: b.status,
		})));
	} catch (err) {
		res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
	}
});

module.exports = router;
