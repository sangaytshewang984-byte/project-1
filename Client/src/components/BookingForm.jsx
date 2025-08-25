import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [form, setForm] = useState({
    equipment: '',
    date: '',
    timeSlot: '',
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch equipment list from API
    axios.get('/api/equipment')
      .then(res => setEquipmentList(res.data))
      .catch(() => setEquipmentList([]));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/api/bookings', form);
      setMessage('Booking successful!');
      setForm({ equipment: '', date: '', timeSlot: '', name: '', email: '' });
    } catch (err) {
      setMessage('Booking failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="booking-form-container">
      <h2>Book Equipment</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Equipment:
          <select name="equipment" value={form.equipment} onChange={handleChange} required>
            <option value="">Select equipment</option>
            {equipmentList.map(eq => (
              <option key={eq._id} value={eq._id}>{eq.name}</option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <label>
          Time Slot:
          <input type="text" name="timeSlot" value={form.timeSlot} onChange={handleChange} placeholder="e.g. 10:00-11:00" required />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Booking...' : 'Book Now'}</button>
      </form>
      {message && <p className="booking-message">{message}</p>}
    </div>
  );
};

export default BookingForm;
