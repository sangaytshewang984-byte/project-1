const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user
router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body;
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: 'Email is already in use' });
			}
		const user = new User({ name, email, password });
		await user.save();
		// Generate JWT
		const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
		res.status(201).json({ user: { _id: user._id, name: user.name, email: user.email }, token });
	} catch (err) {
		res.status(400).json({ message: 'Registration failed', error: err.message });
	}
});

// Login user
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}
		// Generate JWT
		const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
		res.json({ user: { _id: user._id, name: user.name, email: user.email }, token });
	} catch (err) {
		res.status(400).json({ message: 'Login failed', error: err.message });
	}
});

module.exports = router;

// Password reset (forgot password)
router.post('/reset-password', async (req, res) => {
	try {
		const { email, newPassword } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'No user found with this email' });
		}
		user.password = newPassword;
		await user.save();
		res.json({ message: 'Password reset successful' });
	} catch (err) {
		res.status(400).json({ message: 'Password reset failed', error: err.message });
	}
});
