import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useCart } from '../context/CartContext';
import './Cart.css'; // Import CSS for styling

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  // Calculate the total cost
  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle checkout and navigate to login page
  const handleCheckout = () => {
    // Add your checkout logic here (e.g., saving order, clearing cart)
    
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className='cart-container'>
      <div className='cart-items'>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <>
            <ul className='list-group'>
              {cart.map((item) => (
                <li key={item._id} className='list-group-item d-flex justify-content-between align-items-center'>
                  <div>
                    <strong>{item.name}</strong> - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                  </div>
                  <button
                    className='btn btn-danger'
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              className='btn btn-secondary mt-3'
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
      <div className='cart-sidebar'>
        <h3>Total: ${totalCost.toFixed(2)}</h3>
        <button className='btn btn-primary' onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;







