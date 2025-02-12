const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// Increase the timeout for the server
const timeout = require('connect-timeout');
app.use(timeout('30s'));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://passowrd-manager.vercel.app',
      'https://passowrd-manager-git-main-nishan-dhaliwals-projects.vercel.app',
      'http://localhost:5173'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Origin not allowed:', origin);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Debug middleware
app.use((req, res, next) => {
  console.log('Request from origin:', req.headers.origin);
  console.log('Request method:', req.method);
  console.log('Request path:', req.path);
  next();
});

// Other middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Database connection with increased timeout
mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

// Routes
app.use('/', require('./routes/authRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));