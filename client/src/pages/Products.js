import React from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const { cart, addToCart } = useCart();
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/product/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/category/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Filter products by category, price range, and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  React.useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className='container'>
      {/* Search Bar */}
      <div className='mb-3'>
        <label htmlFor='search' className='form-label'>Search:</label>
        <input
          type='text'
          id='search'
          className='form-control'
          placeholder='Search for products...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter by Category */}
      <div className='mb-3'>
        <label htmlFor='category' className='form-label'>Filter by Category:</label>
        <select
          id='category'
          className='form-select'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Filter by Price */}
      <div className='mb-3'>
        <label htmlFor='priceRange' className='form-label'>Filter by Price:</label>
        <input
          type='range'
          id='priceRange'
          className='form-range'
          min='0'
          max='1000'
          step='10'
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, e.target.value])}
        />
        <div>Price Range: 0 - {priceRange[1]}</div>
      </div>

      {/* Display Products */}
      <div className='row'>
        {filteredProducts.map((product) => (
          <div key={product._id} className='col-md-4 mb-4'>
            <div className='card'>
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.imageUrl}
                  className='card-img-top'
                  alt={product.name}
                />
              </Link>
              <div className='card-body'>
                <h5 className='card-title'>{product.name}</h5>
                <p className='card-text'>Price: ${product.price}</p>
                <p className='card-text'>Category: {product.category}</p>
                <button 
                  className='btn btn-primary'
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;







