const express = require("express");
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../models/items");

const { getAllCategories } = require("../models/category");

// Show form to add a new item
router.get("/add", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.render("add_item", { categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Handle form submission
router.post("/add", async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category_id } = req.body;
    await createItem(name, description, price, stock_quantity, category_id);
    res.redirect("/items");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await getAllItems();
    res.render("items", { items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single item
router.get("/:id", async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Show form to edit an item
router.get("/edit/:id", async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    const categories = await getAllCategories();
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.render("edit_item", { item, categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Handle item update
router.post("/edit/:id", async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category_id } = req.body;
    await updateItem(
      req.params.id,
      name,
      description,
      price,
      stock_quantity,
      category_id
    );
    res.redirect("/items");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an item
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteItem(req.params.id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    /* res.json({ message: "Item deleted successfully" }); */
    res.redirect("/items");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
