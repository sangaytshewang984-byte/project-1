const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
	equipment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Equipment',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	timeSlot: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: 1,
		default: 1,
	},
	status: {
		type: String,
		enum: ['Pending', 'Approved', 'Rejected'],
		default: 'Pending',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Booking', bookingSchema);
