// routes/categoryRoutes.js
const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authmiddleware");
const { createCategoryController, updateCategoryController, getCategoriesController, getCategoryController, deleteCategoryController } = require("./../controllers/categoryController");

const router = express.Router();

// Route to create a new category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

// Route to update an existing category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

// Route to get all categories
router.get("/categories", getCategoriesController);

// Route to get a single category by ID
router.get("/:id", getCategoryController);

// Route to delete a category by ID
router.delete("/:id", requireSignIn, isAdmin, deleteCategoryController);

module.exports = router;




