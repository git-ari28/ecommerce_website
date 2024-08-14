import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const RecommendationsPage = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query');

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`/api/recommendations?query=${searchQuery}`);
        setRecommendedProducts(response.data);
      } catch (error) {
        console.error("Error fetching recommendations", error);
      }
    };

    fetchRecommendations();
  }, [location.search]);

  return (
    <div>
      <h1>Recommended Products</h1>
      <div className="product-grid">
        {recommendedProducts.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;

