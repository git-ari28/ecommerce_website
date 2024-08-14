const Product = require('../models/Product');
const { cosineSimilarity } = require('../utils/similarity');

const getRecommendations = async (req, res) => {
  try {
    const searchQuery = req.query.query;
    const product = await Product.findOne({ name: new RegExp(searchQuery, 'i') });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const allProducts = await Product.find();
    const similarities = allProducts.map((p) => ({
      product: p,
      score: cosineSimilarity(product.tags, p.tags),
    }));

    const sortedSimilarities = similarities.sort((a, b) => b.score - a.score);
    const recommendedProducts = sortedSimilarities.slice(1, 4).map((s) => s.product);

    res.json(recommendedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
};

module.exports = { getRecommendations };
