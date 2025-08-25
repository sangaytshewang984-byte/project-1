const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Utility: Generate time slots for a day (e.g., 9:00-17:00, 1 hour each)
function generateTimeSlots(start = 9, end = 17) {
	const slots = [];
	for (let hour = start; hour < end; hour++) {
		slots.push(`${hour}:00-${hour + 1}:00`);
	}
	return slots;
}

// Get available time slots for a given equipment and date
router.get('/', async (req, res) => {
	try {
		const { equipmentId, date, requestedSlot } = req.query;
		if (!equipmentId || !date) {
			return res.status(400).json({ message: 'equipmentId and date are required' });
		}
		// Get all bookings for this equipment and date
		const bookings = await Booking.find({ equipment: equipmentId, date });
		const bookedSlots = bookings.map(b => b.timeSlot);
		const allSlots = generateTimeSlots();
		const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

		// If requestedSlot is provided and not available, suggest alternatives
		if (requestedSlot && !availableSlots.includes(requestedSlot)) {
			return res.json({
				available: false,
				message: 'Requested slot is booked. Here are available slots:',
				suggestedSlots: availableSlots,
			});
		}

		res.json({
			available: true,
			availableSlots,
		});
	} catch (err) {
		res.status(500).json({ message: 'Failed to fetch time slots', error: err.message });
	}
});

module.exports = router;
