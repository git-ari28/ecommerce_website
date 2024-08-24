const express = require('express');
const router = express.Router();
const {
    addToCartController,
    viewCartController
} = require('./../controllers/cartcontroller');

// Middleware to authenticate user (assumed to be available)
const auth = require('../middleware/auth');

// Add product to cart
router.post('/add', auth, addToCartController);

// View cart
router.get('/', auth, viewCartController);

module.exports = router;
