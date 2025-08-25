const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['Available', 'Unavailable', 'Maintenance'],
		default: 'Available',
	},
	quantity: {
		type: Number,
		required: true,
		min: 0,
		default: 1,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Equipment', equipmentSchema);
