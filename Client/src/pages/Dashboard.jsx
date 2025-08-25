import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
	const [stats, setStats] = useState({
		totalEquipment: 0,
		totalBookings: 0,
		availableEquipment: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		axios.get('/api/dashboard')
			.then(res => {
				setStats(res.data);
				setError('');
			})
			.catch(() => setError('Failed to fetch dashboard stats.'))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="dashboard-page">
			<h2>Dashboard</h2>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<div className="dashboard-stats">
					<div>
						<strong>Total Equipment:</strong> {stats.totalEquipment}
					</div>
					<div>
						<strong>Total Bookings:</strong> {stats.totalBookings}
					</div>
					<div>
						<strong>Available Equipment:</strong> {stats.availableEquipment}
					</div>
				</div>
			)}
			<div className="dashboard-links">
				<a href="/bookings">View My Bookings</a> | <a href="/equipment">View Equipment</a>
			</div>
		</div>
	);
};

export default Dashboard;
