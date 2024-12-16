const mongoose = require('mongoose');

// MongoDB connection string (replace with your actual database and credentials)
const MONGO_URI = 'mongodb://localhost:27017/waxlife';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('Unable to connect to MongoDB:', err));

// Handle database events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to the database...');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected...');
});

// Export the Mongoose connection
module.exports = mongoose;
