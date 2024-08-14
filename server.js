const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Importing routes
const authRoutes = require("./routes/auth.js");  // Ensure the correct import

require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')


app.use(cors());
app.use(express.json());

// Use routes
app.use('/auth', authRoutes);  // Correctly using the auth.js routes

app.get('/', (req, res) => {
    res.send("Welcome to my ecommerce app");
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});




