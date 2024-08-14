const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const productRoutes = require('./routes/products.js');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce')

.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('Error connecting to MongoDB:', error.message));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); 

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





