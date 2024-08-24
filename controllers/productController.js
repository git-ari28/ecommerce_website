const Product = require("../models/product");
const Category = require("../models/category");

// Create multiple products
exports.createProductController = async (req, res) => {
    try {
        const products = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Products array is required and cannot be empty" });
        }

        for (const product of products) {
            const { product_id, name, category, tags, imageUrl, price, shipping, quantity } = product;

            if (!product_id || !name || !category || !tags || !imageUrl || price === undefined || shipping === undefined || quantity === undefined) {
                return res.status(400).json({ message: "All fields are required for each product" });
            }

            const existingProduct = await Product.findOne({ product_id });
            if (existingProduct) {
                return res.status(400).json({ message: `Product with product_id ${product_id} already exists` });
            }

            // Validate category (if necessary)
            const categoryExists = await Category.findOne({ name: category });
            if (!categoryExists) {
                return res.status(400).json({ message: `Category ${category} does not exist` });
            }
        }

        const savedProducts = await Product.insertMany(products);
        res.status(201).json({
            success: true,
            message: "Products created successfully",
            products: savedProducts,
        });
    } catch (error) {
        console.error("Error creating products:", error);
        res.status(500).json({
            success: false,
            message: "Error creating products",
            error: error.message,
        });
    }
};

// Update a product
exports.updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_id, name, category, tags, imageUrl, price, shipping, quantity } = req.body;

        if (!product_id || !name || !category || !tags || !imageUrl || price === undefined || shipping === undefined || quantity === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Validate category (if necessary)
        const categoryExists = await Category.findOne({ name: category });
        if (!categoryExists) {
            return res.status(400).json({ message: `Category ${category} does not exist` });
        }

        product.product_id = product_id;
        product.name = name;
        product.category = category;
        product.tags = tags;
        product.imageUrl = imageUrl;
        product.price = price;
        product.shipping = shipping;
        product.quantity = quantity;

        await product.save();
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message,
        });
    }
};

// Get all products
exports.getProductsController = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message,
        });
    }
};

// Get a single product
exports.getProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching product",
            error: error.message,
        });
    }
};

// Delete a product
exports.deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message,
        });
    }
};
// Get products by category





