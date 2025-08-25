import express from 'express'
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb+srv://pema:skNUW3dT8R92uh61@cluster0.ozlznbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
