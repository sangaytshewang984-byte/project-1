import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb+srv://Sangay123:Sangay@123@inventory-cluster.zgytgwq.mongodb.net/?retryWrites=true&w=majority&appName=Inventory-Cluster')
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
