// routes/productRoutes.js
const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authmiddleware");
const { createProductController, updateProductController, getProductsController, getProductController, deleteProductController } = require("./../controllers/productController");

const router = express.Router();

// Route to create a new product
router.post("/create-product", requireSignIn, isAdmin, createProductController);

// Route to update an existing product
router.put("/update-product/:id", requireSignIn, isAdmin, updateProductController);

// Route to get all products
router.get("/products", getProductsController);

// Route to get a single product by ID
router.get("/:id", getProductController);

// Route to delete a product by ID
router.delete("/:id", requireSignIn, isAdmin, deleteProductController);

module.exports = router;
