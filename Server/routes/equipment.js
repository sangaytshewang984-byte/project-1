const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const auth = require('../middleware/auth');

// Get all equipment
router.get('/', async (req, res) => {
	try {
		const equipmentList = await Equipment.find();
		res.json(equipmentList);
	} catch (err) {
		res.status(500).json({ message: 'Failed to fetch equipment', error: err.message });
	}
});

// Create new equipment (protected route)
router.post('/', auth, async (req, res) => {
	try {
		const { name, description, status } = req.body;
		const equipment = new Equipment({ name, description, status });
		await equipment.save();
		res.status(201).json(equipment);
	} catch (err) {
		res.status(400).json({ message: 'Failed to add equipment', error: err.message });
	}
});

module.exports = router;
