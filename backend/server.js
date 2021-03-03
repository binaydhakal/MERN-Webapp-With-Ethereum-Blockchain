const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./databse/db');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth');
const kycRoutes = require('./routes/kyc');
const kycAddressRoutes = require('./routes/kycAddress');
const app = express();

connectDB();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/kycAddress', kycAddressRoutes);
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;