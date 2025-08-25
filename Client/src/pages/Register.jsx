import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const res = await axios.post('/api/users/register', form);
			login(res.data.user);
			navigate('/dashboard');
		} catch (err) {
			setError(err.response?.data?.message || 'Registration failed.');
		}
		setLoading(false);
	};

	return (
		<div className="register-page">
			<h2>Register</h2>
			<form onSubmit={handleSubmit} className="register-form">
				<label>
					Name:
					<input type="text" name="name" value={form.name} onChange={handleChange} required />
				</label>
				<label>
					Email:
					<input type="email" name="email" value={form.email} onChange={handleChange} required />
				</label>
				<label>
					Password:
					<input type="password" name="password" value={form.password} onChange={handleChange} required />
				</label>
				<button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
			</form>
			{error && <p className="register-error">{error}</p>}
		</div>
	);
};

export default Register;
