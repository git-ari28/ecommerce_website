const cart = []; // This will serve as an in-memory cart. You might want to replace it with a database in a production app.

// Get cart items
exports.getCartItems = (req, res) => {
    res.json(cart);
};

// Add item to cart
exports.addToCart = (req, res) => {
    const { product } = req.body;
    if (!product) {
        return res.status(400).json({ message: 'Product is required' });
    }

    cart.push(product);
    res.status(201).json({ message: 'Product added to cart', cart });
};

// Remove item from cart
exports.removeFromCart = (req, res) => {
    const { productId } = req.params;
    const initialLength = cart.length;
    const updatedCart = cart.filter(item => item.id !== productId);
    cart.length = 0; // Clear the cart
    Array.prototype.push.apply(cart, updatedCart); // Push updated items back to cart

    if (cart.length === initialLength) {
        return res.status(404).json({ message: 'Product not found in cart' });
    }

    res.json({ message: 'Product removed from cart', cart });
};
