import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layouts/Layout';
import AdminMenu from '../../components/Layouts/AdminMenu';

const CreateProducts = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State for image URL
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/product/products', {
        headers: {
          Authorization: localStorage.getItem('token') // Directly include the token
        }
      });
      setProducts(response.data.products);
    } catch (error) {
      setError('Error fetching products');
    }
  };

  // Handle create product
  const handleCreateProduct = async () => {
    try {
      await axios.post('/api/product/create-product', { name, price, category, imageUrl }, {
        headers: {
          Authorization: localStorage.getItem('token') // Directly include the token
        }
      });
      setName('');
      setPrice('');
      setCategory('');
      setImageUrl(''); // Reset the image URL
      fetchProducts(); // Refresh product list
    } catch (error) {
      setError('Error creating product');
    }
  };

  // Handle update product
  const handleUpdateProduct = async () => {
    try {
      await axios.put(`/api/product/update-product/${selectedProduct._id}`, { name, price, category, imageUrl }, {
        headers: {
          Authorization: localStorage.getItem('token') // Directly include the token
        }
      });
      setName('');
      setPrice('');
      setCategory('');
      setImageUrl(''); // Reset the image URL
      setSelectedProduct(null);
      fetchProducts(); // Refresh product list
    } catch (error) {
      setError('Error updating product');
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/product/delete-product/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token') // Directly include the token
        }
      });
      fetchProducts(); // Refresh product list
    } catch (error) {
      setError('Error deleting product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage Products</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary mb-3"
              onClick={selectedProduct ? handleUpdateProduct : handleCreateProduct}
            >
              {selectedProduct ? 'Update Product' : 'Create Product'}
            </button>

            <h2>Products</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td><img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => {
                          setName(product.name);
                          setPrice(product.price);
                          setCategory(product.category);
                          setImageUrl(product.imageUrl);
                          setSelectedProduct(product);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;



