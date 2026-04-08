const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security & Logging Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan('dev'));

// Body parsers
app.use(cors({
  origin: "*", // allow all (for now)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
const authRoutes = require('./routes/authRoutes');
const certificateRoutes = require('./routes/certificateRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({ status: 'OK', message: 'CertiVerify AI API v2.0 is running.' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 CertiVerify Server running on port ${PORT}`);
});
