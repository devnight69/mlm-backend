const mongoose = require('./waxlife.com/config/database');
const express = require('express'); // Add this line
const bodyParser = require('body-parser'); // Add this line
const userRoutes = require('./waxlife.com/routes/userRoutes')
const authRoutes = require('./waxlife.com/routes/authRouter')
const { setupCors } = require('./waxlife.com/config/Security');

// MongoDB connection check (assuming it's already handled in the config)
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB:', err);
});



const app = express();

// Apply CORS configuration globally
setupCors(app);

app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);

// Default error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));