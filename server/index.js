const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const app = express();
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:5173', 
    'https://passowrd-manager-4tgw.vercel.app',
    'https://passowrd-manager-4tgw-o0e2bmupf-nishan-dhaliwals-projects.vercel.app',
    'https://passowrd-manager-4tgw-16xn905v7-nishan-dhaliwals-projects.vercel.app'
  ]
}));

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((error) => console.error('Database connection error:', error));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/authRoutes')) 

const port = 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));