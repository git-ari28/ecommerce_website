const Cart = require('../models/cart'); // Assuming you have a Cart model
const Product = require('../models/product');

// Add product to cart
exports.addToCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id; // Assuming user ID is available in the request

        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find or create cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Add product to cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

// View cart
exports.viewCartController = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is available in the request
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ cart });
    } catch (error) {
        console.error("Error viewing cart:", error);
        res.status(500).json({ message: "Error viewing cart", error: error.message });
    }
};
