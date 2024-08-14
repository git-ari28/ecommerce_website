const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Importing routes
const authRoutes = require("./routes/auth.js");  // Ensure the correct import

require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')


const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();
connectDB();

app.use('/api/products', productRoutes);
app.use('/api/recommendations', recommendationRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




