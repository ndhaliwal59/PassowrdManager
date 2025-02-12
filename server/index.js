const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://passowrd-manager-git-main-nishan-dhaliwals-projects.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['set-cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware before other routes
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', (req, res) => {
  res.status(204).send();
});

// Other middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database connection error:', error));

// Routes
app.use('/', require('./routes/authRoutes'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));