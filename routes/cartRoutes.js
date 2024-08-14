const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get cart items
router.get('/', cartController.getCartItems);

// Add item to cart
router.post('/add', cartController.addToCart);

// Remove item from cart
router.delete('/remove/:productId', cartController.removeFromCart);

module.exports = router;
