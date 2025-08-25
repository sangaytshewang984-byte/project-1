import axios from 'axios';

const API_BASE_URL = '/api';

// Equipment APIs
export const fetchEquipment = () => axios.get(`${API_BASE_URL}/equipment`);

// Bookings APIs
export const fetchBookings = (userId) => axios.get(`${API_BASE_URL}/bookings`, { params: { userId } });
export const createBooking = (bookingData) => axios.post(`${API_BASE_URL}/bookings`, bookingData);

// Dashboard stats
export const fetchDashboardStats = () => axios.get(`${API_BASE_URL}/dashboard`);

// User APIs
export const loginUser = (credentials) => axios.post(`${API_BASE_URL}/users/login`, credentials);
export const registerUser = (userData) => axios.post(`${API_BASE_URL}/users/register`, userData);
