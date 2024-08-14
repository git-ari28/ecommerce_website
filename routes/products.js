const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAllProducts);

// POST a new product
router.post('/', productController.createProduct);

// GET a product by ID
router.get('/:productId', productController.getProductById);

// DELETE a product
router.delete('/:id', productController.deleteProduct);

// POST search products
router.post('/search', productController.searchProducts);

module.exports = router;

