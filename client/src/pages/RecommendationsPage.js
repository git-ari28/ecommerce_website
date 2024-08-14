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
                const productIds = response.data.recommendations;

                // Assuming you have a function to fetch product details by ID
                const productDetails = await Promise.all(
                    productIds.map(id => axios.get(`/api/products/${id}`))
                );

                setRecommendedProducts(productDetails.map(response => response.data));
            } catch (error) {
                console.error("Error fetching recommendations", error);
            }
        };

        if (searchQuery) {
            fetchRecommendations();
        }
    }, [location.search]);

    return (
        <div>
            <h1>Recommended Products for "{new URLSearchParams(location.search).get('query')}"</h1>
            <div className="product-grid">
                {recommendedProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationsPage;
