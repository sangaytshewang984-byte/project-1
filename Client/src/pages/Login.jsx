import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
	const [form, setForm] = useState({ email: '', password: '' });
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
			const res = await axios.post('/api/users/login', form);
			login(res.data.user);
			navigate('/dashboard');
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed.');
		}
		setLoading(false);
	};

	return (
		<div className="login-page">
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className="login-form">
				<label>
					Email:
					<input type="email" name="email" value={form.email} onChange={handleChange} required />
				</label>
				<label>
					Password:
					<input type="password" name="password" value={form.password} onChange={handleChange} required />
				</label>
				<button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
			</form>
			{error && <p className="login-error">{error}</p>}
		</div>
	);
};

export default Login;
