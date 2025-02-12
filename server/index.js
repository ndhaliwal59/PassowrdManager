const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://passowrd-manager.vercel.app',
  'https://passowrd-manager-git-main-nishan-dhaliwals-projects.vercel.app',
  'http://localhost:5173'
];

// Global middleware to handle CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Check if origin is in allowed origins
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
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