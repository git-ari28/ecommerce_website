const Category = require("../models/category");
const slugify = require("slugify");

exports.createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists",
            });
        }

        const slug = slugify(name, { lower: true });

        const category = new Category({ name, slug });
        await category.save();

        res.status(201).send({
            success: true,
            message: "New category created",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category",
        });
    }
};

exports.updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).send({ success: false, message: "Category not found" });
        }

        category.name = name;
        category.slug = slugify(name, { lower: true });

        await category.save();

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error updating category",
        });
    }
};

exports.getCategoriesController = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).send({
            success: true,
            categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error fetching categories",
        });
    }
};

exports.getCategoryController = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).send({ success: false, message: "Category not found" });
        }

        res.status(200).send({
            success: true,
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error fetching category",
        });
    }
};

exports.deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).send({ success: false, message: "Category not found" });
        }

        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error deleting category",
        });
    }
};

