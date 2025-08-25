import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Equipment = () => {
	const [equipmentList, setEquipmentList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		axios.get('/api/equipment')
			.then(res => {
				setEquipmentList(res.data);
				setError('');
			})
			.catch(() => setError('Failed to fetch equipment list.'))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="equipment-page">
			<h2>FabLab Equipment</h2>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>{error}</p>
			) : equipmentList.length === 0 ? (
				<p>No equipment found.</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{equipmentList.map(eq => (
							<tr key={eq._id}>
								<td>{eq.name}</td>
								<td>{eq.description}</td>
								<td>{eq.status || 'Available'}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Equipment;
