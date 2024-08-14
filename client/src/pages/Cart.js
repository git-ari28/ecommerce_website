import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './../components/Layouts/Layout';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      await axios.post('/api/cart/add', { product });
      fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/api/cart/remove/${productId}`);
      fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  useEffect(() => {
    fetchCartItems(); // Fetch cart items on component mount
  }, []);

  return (
    <Layout>
      <h1>Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product_id}>
              <h4>{item.name}</h4>
              <button onClick={() => removeFromCart(item.product_id)}>Remove from Cart</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is currently empty.</p>
      )}
      {/* Example button to add a product to the cart */}
      <button onClick={() => addToCart({ product_id: '123', name: 'Sample Product' })}>
        Add Sample Product to Cart
      </button>
    </Layout>
  );
};

export default Cart;


