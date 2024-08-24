const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const categoryRoutes=require("./routes/category.js")
const productRoutes=require("./routes/productRoutes.js")
const cors=require("cors")

const app = express();

require('dotenv').config();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/ecommerce')

.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('Error connecting to MongoDB:', error.message));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/category",categoryRoutes)
app.use("/api/product",productRoutes)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





