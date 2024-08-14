const Product = require('../models/Product');
const axios = require('axios');

// Fetch products from Shopify and store them in the database
const fetchAndStoreProducts = async () => {
  try {
    const response = await axios.get('YOUR_SHOPIFY_API_ENDPOINT');
    const products = response.data.products;

    for (const product of products) {
      await Product.findOneAndUpdate(
        { product_id: product.id },
        {
          name: product.title,
          category: product.product_type,
          tags: product.tags.split(','),
          imageUrl: product.image.src,
          price: product.variants[0].price,
        },
        { upsert: true }
      );
    }
    console.log('Products fetched and stored');
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

module.exports = { fetchAndStoreProducts };
