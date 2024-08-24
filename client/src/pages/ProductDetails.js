import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className='container'>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
      <p><strong>Shipping:</strong> {product.shipping ? 'Available' : 'Not Available'}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
    </div>
  );
};

export default ProductDetails;

