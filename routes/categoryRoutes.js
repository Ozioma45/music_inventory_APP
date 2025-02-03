const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../models/category");

// Show form to add a new category
router.get("/add", (req, res) => {
  res.render("add_category");
});

// Handle form submission
router.post("/add", async (req, res) => {
  try {
    const { name, description } = req.body;
    await createCategory(name, description);
    res.redirect("/categories");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.render("categories", { categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single category
router.get("/:id", async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new category
/* router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = await createCategory(name, description);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); */

// Update a category
/* router.put("/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedCategory = await updateCategory(
      req.params.id,
      name,
      description
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); */

// Show form to edit a category
router.get("/edit/:id", async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    res.render("edit_category", { category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Handle category update
router.post("/edit/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    await updateCategory(req.params.id, name, description);
    res.redirect("/categories");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
