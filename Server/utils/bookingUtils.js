// Utility to generate time slots for a day (e.g., 9:00-17:00, 1 hour each)
function generateTimeSlots(start = 9, end = 17) {
	const slots = [];
	for (let hour = start; hour < end; hour++) {
		slots.push(`${hour}:00-${hour + 1}:00`);
	}
	return slots;
}

// Check if a slot is available
function isSlotAvailable(bookedSlots, requestedSlot) {
	return !bookedSlots.includes(requestedSlot);
}

// Suggest free slots
function suggestFreeSlots(bookedSlots) {
	const allSlots = generateTimeSlots();
	return allSlots.filter(slot => !bookedSlots.includes(slot));
}

module.exports = {
	generateTimeSlots,
	isSlotAvailable,
	suggestFreeSlots,
};
