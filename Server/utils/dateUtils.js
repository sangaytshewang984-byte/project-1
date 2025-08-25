// Format date to YYYY-MM-DD
function formatDate(date) {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

// Check if date is in the past
function isPastDate(date) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const d = new Date(date);
	return d < today;
}

// Check if date is valid (YYYY-MM-DD)
function isValidDate(dateStr) {
	return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

module.exports = {
	formatDate,
	isPastDate,
	isValidDate,
};
