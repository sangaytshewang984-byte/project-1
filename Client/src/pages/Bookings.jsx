import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Bookings = () => {
	const { user } = useContext(AuthContext);
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!user) return;
		setLoading(true);
		axios.get('/api/bookings', { params: { userId: user._id } })
			.then(res => {
				setBookings(res.data);
				setError('');
			})
			.catch(() => setError('Failed to fetch bookings.'))
			.finally(() => setLoading(false));
	}, [user]);

	if (!user) {
		return <p>Please log in to view your bookings.</p>;
	}

	return (
		<div className="bookings-page">
			<h2>My Bookings</h2>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>{error}</p>
			) : bookings.length === 0 ? (
				<p>No bookings found.</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Equipment</th>
							<th>Date</th>
							<th>Time Slot</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map(booking => (
							<tr key={booking._id}>
								<td>{booking.equipmentName || booking.equipment}</td>
								<td>{booking.date}</td>
								<td>{booking.timeSlot}</td>
								<td>{booking.status || 'Pending'}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Bookings;
