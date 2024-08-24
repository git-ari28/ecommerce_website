import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import AdminMenu from '../../components/Layouts/AdminMenu';
import axios from 'axios';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState('');

  // Get the token from localStorage
  const getToken = () => localStorage.getItem("token");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const token = getToken();
      const response = await axios.get('/api/category/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.categories);
    } catch (error) {
      setError('Error fetching categories');
    }
  };

  // Handle create category
  const handleCreateCategory = async () => {
    try {
      const token = getToken();
      await axios.post('/api/category/create-category', { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName('');
      fetchCategories(); // Refresh category list
    } catch (error) {
      setError('Error creating category');
    }
  };

  // Handle update category
  const handleUpdateCategory = async () => {
    try {
      const token = getToken();
      await axios.put(`/api/category/update-category/${selectedCategory._id}`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName('');
      setSelectedCategory(null);
      fetchCategories(); // Refresh category list
    } catch (error) {
      setError('Error updating category');
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`/api/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCategories(); // Refresh category list
    } catch (error) {
      setError('Error deleting category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage Categories</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <input 
                type="text"
                className="form-control"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button 
              className="btn btn-primary mb-3"
              onClick={selectedCategory ? handleUpdateCategory : handleCreateCategory}
            >
              {selectedCategory ? 'Update Category' : 'Create Category'}
            </button>

            <h2>Categories</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => {
                          setName(category.name);
                          setSelectedCategory(category);
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteCategory(category._id)}
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

export default CreateCategory;








