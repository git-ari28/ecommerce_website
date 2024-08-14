const express = require('express');
const { fetchAndStoreProducts } = require('../controllers/productController');
const router = express.Router();

router.get('/fetch-products', fetchAndStoreProducts);

module.exports = router;
