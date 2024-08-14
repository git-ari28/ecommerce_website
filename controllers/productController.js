const Product = require('../models/products');
const mongoose = require('mongoose');

// GET all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new product
const createProduct = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const newProducts = await Product.insertMany(req.body);
            res.status(201).json(newProducts);
        } else {
            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                imageUrl: req.body.imageUrl,
                quantity: req.body.quantity
            });

            const newProduct = await product.save();
            res.status(201).json(newProduct);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET a product by ID
const getProductById = async (req, res) => {
    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid productId' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE a product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST search products
const searchProducts = async (req, res) => {
    const { searchQuery } = req.body;

    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Middleware function to get a product by ID
const getProduct = async (req, res, next) => {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    deleteProduct,
    searchProducts,
    getProduct
};

